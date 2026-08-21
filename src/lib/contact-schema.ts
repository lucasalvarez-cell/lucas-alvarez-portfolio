/**
 * Server-side validation for the contact form.
 *
 * Hand-rolled rather than `zod`. This runs server-side only, so bundle size is
 * not the argument — the argument is that the repo has no schema-validation
 * idiom to build on, this endpoint will never be reused, and every Spanish
 * error string would still be written by hand and mapped out of `ZodError` into
 * the field-keyed shape the client wants. That is a dependency plus an adapter
 * layer to replace fifty lines. If a second form ever ships, revisit it.
 *
 * The rule that is not cosmetic is the control-character check. `name` ends up
 * in the subject line and `email` in `Reply-To`, so a newline in either is an
 * attempt at header injection. The SDK almost certainly sanitises this, and
 * "almost certainly" is not a security posture.
 */

import { contactServiceOptions, type ServiceOption } from "@/content/servicios";

export type ContactField =
  | "name"
  | "email"
  | "phone"
  | "service"
  | "message"
  | "consent"
  | "form";
export type ContactErrors = Partial<Record<ContactField, string>>;

export type ContactSubmission = {
  name: string;
  email: string;
  /** Empty string when not provided — the field is optional. */
  phone: string;
  /** Resolved against the canonical list, never the raw value from the client. */
  service: ServiceOption;
  message: string;
};

export type ParseResult =
  | { status: "ok"; data: ContactSubmission }
  | { status: "invalid"; errors: ContactErrors }
  /* Accepted with a 200 and thrown away. Returning an error would tell whoever
     wrote the bot exactly which check to route around next time. */
  | { status: "discard"; reason: string };

const NAME_MIN = 2;
const NAME_MAX = 80;
/** RFC 5321's ceiling for a whole address. */
const EMAIL_MAX = 254;
const MESSAGE_MIN = 10;
const MESSAGE_MAX = 5000;
/** E.164 caps a whole international number at 15 digits; 6 is below any real one. */
const PHONE_MIN_DIGITS = 6;
const PHONE_MAX_DIGITS = 15;
/** Room for "+34 600 12 34 56" and its punctuation, and not much more. */
const PHONE_MAX_RAW = 30;

/** A person needs longer than this to read three fields and write a message. */
const MIN_FILL_MS = 3000;
/** Beyond this the timestamp is stale — a reopened tab, or a replayed payload. */
const MAX_FILL_MS = 24 * 60 * 60 * 1000;

function asString(value: unknown): string {
  /* NFC so that an accent typed as a combining character compares and renders
     the same as the precomposed form. Spanish names make this routine. */
  return typeof value === "string" ? value.normalize("NFC") : "";
}

/**
 * C0/C1 control characters, with `\n` and `\t` kept.
 *
 * The message needs its line breaks — people paste lists. `name` and `email`
 * get a stricter pass below, because those two reach mail headers.
 */
function stripControlChars(value: string): string {
  let out = "";
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    const isNewlineOrTab = code === 10 || code === 9;
    const isControl = code < 32 || (code >= 127 && code <= 159);
    if (isNewlineOrTab || !isControl) out += value[i];
  }
  return out;
}

/** True if the value carries a character that must never reach a mail header. */
function hasHeaderRisk(value: string): boolean {
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    if (code < 32 || (code >= 127 && code <= 159)) return true;
  }
  return false;
}

/**
 * Conservative on purpose.
 *
 * A fully RFC 5322 compliant expression accepts addresses no provider will
 * deliver to, and a false negative here is a real person who cannot get in
 * touch. So: one `@`, something either side, a dot-separated domain, a TLD of at
 * least two letters, no whitespace, and none of the characters that would break
 * out of a header. Anything stranger than that and the bounce is the better
 * teacher.
 */
const EMAIL_RE =
  /^[^\s@,;:<>"'\\()[\]]+@[a-z0-9](?:[a-z0-9-]*[a-z0-9])?(?:\.[a-z0-9](?:[a-z0-9-]*[a-z0-9])?)*\.[a-z]{2,}$/i;

/**
 * Everything a person plausibly types between the digits of a phone number, plus
 * a leading `+`.
 *
 * Deliberately permissive. The field is optional, so a strict rule cannot buy
 * data quality — the visitor who writes their number in an unexpected shape does
 * not go and fix it, they leave the field blank or the form entirely. Anything
 * that gets through here is still only ever read by a human before it is dialled.
 */
const PHONE_ALLOWED_RE = /^\+?[\d\s.\-()]+$/;

function countDigits(value: string): number {
  let digits = 0;
  for (let i = 0; i < value.length; i += 1) {
    const code = value.charCodeAt(i);
    if (code >= 48 && code <= 57) digits += 1;
  }
  return digits;
}

/**
 * Lowercase the domain, never the local part.
 *
 * Local parts are case-sensitive per the spec, so `John.Smith@` is not
 * guaranteed to be the same mailbox as `john.smith@`. Domains are not.
 */
function normaliseEmail(value: string): string {
  const at = value.lastIndexOf("@");
  if (at < 0) return value;
  return `${value.slice(0, at)}@${value.slice(at + 1).toLowerCase()}`;
}

/**
 * No person puts a URL in a name field. Every SEO form-spammer does — it is the
 * entire point of their submission. Treated like the honeypot: accepted, dropped.
 *
 * Note this check is on `name` only. The message field must never reject links:
 * the FAQ on /contacto explicitly asks for "el enlace a tu perfil o a tu web",
 * so a URL heuristic there would filter out the best-qualified leads.
 */
const URL_IN_NAME_RE = /https?:\/\/|www\.|\.(?:com|net|org|ru|xyz|top|shop)\b/i;

export function parseContactPayload(raw: unknown): ParseResult {
  if (typeof raw !== "object" || raw === null) {
    return { status: "invalid", errors: { form: "Petición no válida." } };
  }

  const payload = raw as Record<string, unknown>;

  /* Honeypot: a field a person never sees and a form-filler cannot resist. */
  if (asString(payload.website).trim() !== "") {
    return { status: "discard", reason: "honeypot" };
  }

  const renderedAt = Number(payload.renderedAt);
  if (Number.isFinite(renderedAt) && renderedAt > 0) {
    const elapsed = Date.now() - renderedAt;
    if (elapsed < MIN_FILL_MS || elapsed > MAX_FILL_MS) {
      return { status: "discard", reason: "timing" };
    }
  }

  /* Header risk is measured on the raw value, before stripping. Stripping is
     defence in depth; the check is the actual verdict, and running it after the
     strip would make it unreachable — a control character in `name` would be
     silently cleaned up and the submission would sail through looking normal. */
  const rawName = asString(payload.name);
  const nameHasHeaderRisk = hasHeaderRisk(rawName);
  const name = stripControlChars(rawName).replace(/\s+/g, " ").trim();

  if (!nameHasHeaderRisk && URL_IN_NAME_RE.test(name)) {
    return { status: "discard", reason: "url-in-name" };
  }

  const rawEmail = asString(payload.email);
  const emailHasHeaderRisk = hasHeaderRisk(rawEmail);
  const email = normaliseEmail(stripControlChars(rawEmail).trim());

  /* Checked for header risk like `name` and `email`: the phone number does not
     reach a mail header today, but it is one line and it means nobody has to
     remember this the day it does. */
  const rawPhone = asString(payload.phone);
  const phoneHasHeaderRisk = hasHeaderRisk(rawPhone);
  const phone = stripControlChars(rawPhone).replace(/\s+/g, " ").trim();

  /* The client sends a slug; the label comes from the canonical list. So the
     only service text that can ever reach an email is text from this repo. */
  const service = contactServiceOptions().find(
    (option) => option.value === asString(payload.service).trim(),
  );

  const message = stripControlChars(asString(payload.message))
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  /* Every failing field is reported in one pass. Returning the first error only
     makes the visitor play whack-a-mole with their own form. */
  const errors: ContactErrors = {};

  if (nameHasHeaderRisk) {
    errors.name = "El nombre contiene caracteres no permitidos.";
  } else if (name.length < NAME_MIN) {
    errors.name = "Escribe tu nombre.";
  } else if (name.length > NAME_MAX) {
    errors.name = "Ese nombre es demasiado largo.";
  }

  if (emailHasHeaderRisk) {
    errors.email = "El email contiene caracteres no permitidos.";
  } else if (!email) {
    errors.email = "Escribe tu email.";
  } else if (email.length > EMAIL_MAX || !EMAIL_RE.test(email)) {
    errors.email = "Ese email no parece válido. Revísalo y te respondo ahí.";
  }

  if (phone) {
    if (
      phoneHasHeaderRisk ||
      phone.length > PHONE_MAX_RAW ||
      !PHONE_ALLOWED_RE.test(phone) ||
      countDigits(phone) < PHONE_MIN_DIGITS ||
      countDigits(phone) > PHONE_MAX_DIGITS
    ) {
      /* Short on purpose: this sits under a field a third of a row wide, and
         the label right above it already says the number is optional. */
      errors.phone = "Revisa el teléfono.";
    }
  }

  if (!service) {
    errors.service = "Elige el servicio que te interesa.";
  }

  if (message.length < MESSAGE_MIN) {
    errors.message = "Cuéntame un poco más.";
  } else if (message.length > MESSAGE_MAX) {
    errors.message = "El mensaje es demasiado largo (máximo 5.000 caracteres).";
  }

  if (payload.consent !== true && payload.consent !== "on") {
    errors.consent =
      "Necesito que aceptes la política de privacidad para poder responderte.";
  }

  /* `!service` is already an error above; it is repeated here so the compiler
     can narrow the type, not because the case is reachable on its own. */
  if (Object.keys(errors).length > 0 || !service) {
    return { status: "invalid", errors };
  }

  return { status: "ok", data: { name, email, phone, service, message } };
}
