import { createHash } from "node:crypto";
import { Resend } from "resend";
import { parseContactPayload } from "@/lib/contact-schema";
import { checkRateLimit, clientIp, recordSend } from "@/lib/rate-limit";
import { autoReplyEmail } from "@/lib/email/autoreply";
import { notificationEmail } from "@/lib/email/notification";

/**
 * `POST /api/contact` — the contact form's only server.
 *
 * Web3Forms did this job from the browser with a public access key, which meant
 * the validation was whatever the HTML attributes claimed and anybody holding
 * the key could post anything into the inbox. Moving it here buys three things a
 * third-party endpoint could not: the API key stays on the server, the payload
 * is checked before an email exists, and both messages are rendered from markup
 * in this repo instead of a vendor's default template.
 *
 * A route handler rather than a Server Action. Not for security — a Server
 * Action is also a public POST, just one carrying an action hash lifted from the
 * client bundle, so the abuse surface is identical. The reasons are that route
 * handlers are the house style (two others exist, no `"use server"` anywhere),
 * that the form is already a client component with a working fetch and status
 * machine, and above all that this endpoint has to be exercisable with `curl`:
 * the whole pipeline needs proving before the DNS records resolve.
 *
 * Missing configuration fails at request time, never at build time. A `throw` at
 * module scope would run during Next's build-time collection and take down all
 * sixty-odd static pages over one mistyped variable. A 500 takes down the form,
 * which still offers a `mailto:` fallback.
 */
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const DEFAULT_TO = "lucasalvarezblancob@gmail.com";
const DEFAULT_FROM = "Formulario lucasalvarez.info <formulario@lucasalvarez.info>";
const DEFAULT_REPLY_FROM = "Lucas Álvarez <hola@lucasalvarez.info>";

/** Comfortably above a 5.000-character message, far below a denial of service. */
const MAX_BODY_BYTES = 20_000;

function json(
  body: unknown,
  status: number,
  extraHeaders?: Record<string, string>,
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-store",
      ...extraHeaders,
    },
  });
}

export async function POST(request: Request): Promise<Response> {
  /* Read as text and measure before parsing, so a multi-megabyte payload is
     never handed to `JSON.parse`. */
  let bodyText: string;
  try {
    bodyText = await request.text();
  } catch {
    return json({ ok: false, message: "Petición no válida." }, 400);
  }

  if (bodyText.length > MAX_BODY_BYTES) {
    return json({ ok: false, message: "El mensaje es demasiado largo." }, 413);
  }

  let payload: unknown;
  try {
    payload = JSON.parse(bodyText);
  } catch {
    return json({ ok: false, message: "Petición no válida." }, 400);
  }

  const ip = clientIp(request);
  const verdict = checkRateLimit(ip);
  if (verdict.limited) {
    return json(
      {
        ok: false,
        rateLimited: true,
        message:
          "Has enviado varios mensajes seguidos. Espera unos minutos o escríbeme directamente por email.",
      },
      429,
      { "Retry-After": String(verdict.retryAfter) },
    );
  }

  const parsed = parseContactPayload(payload);

  /* A bot gets the same 200 a person gets. An error here would tell whoever
     wrote it exactly which check to route around next time. */
  if (parsed.status === "discard") {
    recordSend(ip);
    return json({ ok: true }, 200);
  }

  if (parsed.status === "invalid") {
    /* Deliberately not recorded against the limit. A visitor who submits, gets
       a validation error, fixes it and submits again would otherwise have burnt
       two of three slots and be blocked on their third honest attempt. */
    return json({ ok: false, errors: parsed.errors }, 400);
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    /* Naming the variable is the one log line worth having here, and it carries
       no personal data. Nothing else from this request is ever logged — on
       Vercel `console.log` goes to retained Runtime Logs, which would undo the
       point of hashing the IP in the first place. */
    console.error("[contact] falta la variable de entorno RESEND_API_KEY");
    return json(
      { ok: false, message: "No se ha podido enviar el mensaje." },
      500,
    );
  }

  const submission = parsed.data;
  const sentAt = new Date();
  const resend = new Resend(apiKey);

  const to = process.env.CONTACT_TO_EMAIL || DEFAULT_TO;
  const from = process.env.CONTACT_FROM_EMAIL || DEFAULT_FROM;
  const replyFrom = process.env.CONTACT_REPLY_FROM_EMAIL || DEFAULT_REPLY_FROM;

  /* Same visitor, same message, same minute — one email. Covers the double
     click and the impatient second tap, which is most of what duplicates. The
     payload is inside the hash, so the "same key, different body" conflict
     cannot arise. Two keys because these are two distinct requests: reusing one
     would make the second send return the first's cached response. */
  const digest = createHash("sha256")
    .update(
      `${submission.email}|${submission.phone}|${submission.service.value}|${submission.message}|${Math.floor(sentAt.getTime() / 60_000)}`,
    )
    .digest("hex")
    .slice(0, 40);

  recordSend(ip);

  const notification = notificationEmail(submission, sentAt);

  try {
    const result = await resend.emails.send(
      {
        from,
        to,
        replyTo: submission.email,
        subject: notification.subject,
        html: notification.html,
        text: notification.text,
        /* Stops Gmail collapsing separate notifications into one thread just
           because they share a subject shape. */
        headers: { "X-Entity-Ref-ID": digest },
      },
      { idempotencyKey: `contact-notify-${digest}` },
    );

    if (result.error) {
      console.error("[contact] el aviso no se ha enviado", result.error);
      return json(
        { ok: false, message: "No se ha podido enviar el mensaje." },
        502,
      );
    }
  } catch (error) {
    console.error("[contact] el aviso ha fallado", error);
    return json(
      { ok: false, message: "No se ha podido enviar el mensaje." },
      502,
    );
  }

  /* The receipt is a courtesy; the notification is the lead. Failing here must
     never turn a captured lead into an error the visitor sees — and it is the
     expected outcome while the domain is still unverified, when Resend will only
     deliver to the account owner's own address. Awaited separately rather than
     `Promise.all`ed precisely so the two cases stay distinguishable.
     `replyTo` points at the real inbox, not at the sending address: the domain
     has no MX record, so a reply to `hola@lucasalvarez.info` would hard-bounce.
     Drop this line the day a mailbox exists there. */
  const autoReply = autoReplyEmail(submission);
  let receiptSent = false;
  try {
    const result = await resend.emails.send(
      {
        from: replyFrom,
        to: submission.email,
        replyTo: to,
        subject: autoReply.subject,
        html: autoReply.html,
        text: autoReply.text,
      },
      { idempotencyKey: `contact-receipt-${digest}` },
    );
    if (result.error) {
      console.error("[contact] el acuse de recibo no se ha enviado", result.error);
    } else {
      receiptSent = true;
    }
  } catch (error) {
    console.error("[contact] el acuse de recibo ha fallado", error);
  }

  /* Reported back so the on-screen confirmation does not promise a copy that
     never arrived. It will be `false` for every submission until the sending
     domain is verified, which is exactly when a wrong promise would be most
     visible. */
  return json({ ok: true, receipt: receiptSent }, 200);
}
