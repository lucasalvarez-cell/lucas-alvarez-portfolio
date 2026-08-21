import type { ContactSubmission } from "@/lib/contact-schema";
import { SITE_URL } from "@/lib/constants";
import { escapeHtml, escapeHtmlWithBreaks } from "./escape";
import {
  COLORS,
  FONT_BODY,
  FONT_DISPLAY,
  emailShell,
  label,
  p,
  quoteBlock,
  rows,
  rule,
  siteLink,
  spacer,
} from "./shell";

/**
 * The receipt the visitor gets.
 *
 * The site imposes a hard constraint on this email. The FAQ on `/contacto` says
 * out loud: "No hay un formulario que entra en un CRM ni una secuencia
 * automática de tres correos." A receipt does not break that promise, but it can
 * very easily *read* like message one of a funnel — so this template gives up
 * the things that would make it read that way:
 *
 * - **No call-to-action button, no links to services or prices, no "sígueme
 *   en".** Those are exactly the moves that turn a receipt into marketing.
 * - **No unsubscribe footer and no "recibes esto porque te suscribiste".** This
 *   is a reply to a message the visitor initiated, not a commercial
 *   communication under LSSI art. 21, so it needs no unsubscribe — and adding
 *   one would signal "list" where there is none. The footer says the opposite
 *   instead: you are not subscribed to anything.
 * - **`from` is a person, never `noreply@`.** A no-reply address is the single
 *   strongest "this is automated marketing" signal and it would destroy the
 *   "responde a este correo" affordance the copy depends on.
 * - **The greeting is sentence case in the body face**, not the site's uppercase
 *   display heading. Shouting at a stranger who just wrote to you is a
 *   newsletter masthead, which is the register this email must avoid.
 *
 * What it keeps is the one thing that justifies its existence: a copy of what
 * they sent. People close the tab and immediately wonder what they actually
 * wrote. The service and the phone number ride along inside that copy, as a
 * quiet line above the quote — they are their own words read back, not a pitch,
 * and seeing the chosen service is how a wrong click gets corrected before the
 * reply rather than after it.
 */
export function autoReplyEmail(submission: ContactSubmission): {
  subject: string;
  html: string;
  text: string;
} {
  const { name, phone, service, message } = submission;

  /* Part of the copy, so it uses the same muted register as a caption and never
     a heading. `service.fullLabel` is from this repo, `phone` from the visitor —
     both escaped, on the principle that the rule holds regardless of source. */
  const details = [`Servicio: ${escapeHtml(service.fullLabel)}`]
    .concat(phone ? [`Teléfono: ${escapeHtml(phone)}`] : [])
    .join(" · ");

  const rawFirstName = name.split(/\s+/)[0] ?? "";
  const firstName =
    rawFirstName.length > 0 && rawFirstName.length <= 20 ? rawFirstName : "";

  const greeting = firstName ? `Hola, ${firstName}.` : "Hola.";

  const bodyHtml = rows(
    [
      `<tr><td><p style="margin:0 0 16px;font-family:${FONT_BODY};font-size:20px;line-height:28px;mso-line-height-rule:exactly;color:${COLORS.ink};" class="t-heading">${escapeHtml(greeting)}</p></td></tr>`,
      `<tr><td>${p(
        "He recibido tu mensaje. Lo leo yo, no un equipo ni un bot, y te respondo personalmente en menos de 24 horas laborables.",
      )}</td></tr>`,
      `<tr><td>${p(
        "Si mientras tanto quieres añadir algo, responde a este mismo correo y se suma a la conversación.",
      )}</td></tr>`,
      spacer(16),
      rule(),
      spacer(24),
      `<tr><td>${label("Tu mensaje")}<p style="margin:0 0 12px;font-family:${FONT_BODY};font-size:14px;line-height:20px;mso-line-height-rule:exactly;color:${COLORS.soft};" class="t-muted">${details}</p>${quoteBlock(escapeHtmlWithBreaks(message))}</td></tr>`,
      spacer(24),
      `<tr><td style="font-family:${FONT_DISPLAY};font-size:16px;line-height:24px;mso-line-height-rule:exactly;color:${COLORS.ink};" class="t-heading">Lucas Álvarez</td></tr>`,
    ].join("\n"),
  );

  const html = emailShell({
    preheader:
      "Te respondo personalmente en menos de 24 horas laborables. Abajo tienes una copia de lo que me has enviado.",
    kicker: "Acuse de recibo",
    documentTitle: "He recibido tu mensaje",
    bodyHtml,
    footerHtml: `Recibes este correo porque has escrito a través del formulario de ${siteLink()}. No estás suscrito a ninguna lista. <a href="${SITE_URL}/politica-privacidad" class="t-link" style="color:${COLORS.purple};text-decoration:underline;">Política de privacidad</a>.`,
  });

  const text = [
    greeting,
    "",
    "He recibido tu mensaje. Lo leo yo, no un equipo ni un bot, y te",
    "respondo personalmente en menos de 24 horas laborables.",
    "",
    "Si mientras tanto quieres añadir algo, responde a este mismo correo",
    "y se suma a la conversación.",
    "",
    "TU MENSAJE",
    "----------",
    `Servicio: ${service.fullLabel}`,
    ...(phone ? [`Teléfono: ${phone}`] : []),
    "",
    message,
    "",
    "Lucas Álvarez",
    "",
    "--",
    "Recibes este correo porque has escrito a través del formulario de",
    `lucasalvarez.info. No estás suscrito a ninguna lista.`,
    `${SITE_URL}/politica-privacidad`,
  ].join("\n");

  return {
    subject: firstName
      ? `He recibido tu mensaje, ${firstName}`
      : "He recibido tu mensaje",
    html,
    text,
  };
}
