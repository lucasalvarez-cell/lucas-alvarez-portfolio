import type { ContactSubmission } from "@/lib/contact-schema";
import { escapeHtml, escapeHtmlWithBreaks } from "./escape";
import {
  button,
  emailShell,
  formatMadrid,
  heading,
  label,
  link,
  mailtoHref,
  metaRow,
  quoteBlock,
  rows,
  rule,
  siteLink,
  spacer,
} from "./shell";

/**
 * The notification Lucas receives.
 *
 * Designed to be triaged from the Gmail list view and answered in two taps: the
 * subject carries the name and the service, the preheader carries the first line
 * of the message, and the body puts the reply button under the words themselves.
 *
 * Two details do most of the work and neither is visible:
 *
 * - **`replyTo` is set to the visitor** on the send call in the route. Hitting
 *   Reply writes to them, not to the sending domain. It is the single thing most
 *   likely to be got wrong and the first thing worth testing.
 * - **`X-Entity-Ref-ID`** stops Gmail collapsing separate notifications into one
 *   thread because they share a subject shape.
 *
 * What is deliberately *not* here: the IP address and the user agent. Both are
 * tempting for spam triage and both would put a durable copy of personal data in
 * a Gmail inbox forever, which is the thing the rate limiter is designed to
 * avoid. Name, email, phone if they left one, service, message, time.
 */
export function notificationEmail(
  submission: ContactSubmission,
  sentAt: Date,
): { subject: string; html: string; text: string } {
  const { name, email, phone, service, message } = submission;

  /* Gmail truncates the subject around 60–70 characters on mobile, so the two
     tokens that actually help triage go there and nothing else: who wrote, and
     what about. The name goes first and is capped; the service uses `shortTitle`
     ("SEO", "Redes sociales") rather than the full title, which is what that
     field exists for. The message excerpt belongs in the preheader, where there
     is room for it. */
  const subjectName = name.length > 40 ? `${name.slice(0, 39)}…` : name;

  const replyHref = mailtoHref(email, "Re: tu mensaje en lucasalvarez.info");

  /* Everything but the digits and a leading `+` comes out of the href: the
     number is displayed as they wrote it, because that is how a Spanish number
     is read, but a dialler wants it without the spaces. */
  const telHref = phone ? `tel:${phone.replace(/[^\d+]/g, "")}` : "";

  const bodyHtml = rows(
    [
      `<tr><td>${heading(name)}</td></tr>`,
      `<tr><td style="padding-top:6px;font-size:15px;line-height:22px;">${link(mailtoHref(email), email)}</td></tr>`,
      phone
        ? `<tr><td style="padding-top:4px;font-size:15px;line-height:22px;">${link(telHref, phone)}</td></tr>`
        : "",
      spacer(20),
      rule(),
      spacer(20),
      `<tr><td>${label("Su mensaje")}${quoteBlock(escapeHtmlWithBreaks(message))}</td></tr>`,
      spacer(24),
      `<tr><td>${rows(
        metaRow("Servicio", escapeHtml(service.label)) +
          metaRow("Recibido", escapeHtml(formatMadrid(sentAt))) +
          metaRow("Página", "/contacto"),
      )}</td></tr>`,
      spacer(8),
      `<tr><td>${button(`Responder a ${name}`, replyHref)}</td></tr>`,
    ].join("\n"),
  );

  const html = emailShell({
    preheader: `${name} · ${message.replace(/\s+/g, " ").slice(0, 90)}`,
    kicker: "Nuevo contacto",
    documentTitle: `Nuevo mensaje de ${name}`,
    bodyHtml,
    footerHtml: `Enviado desde el formulario de ${siteLink()} · Responde a este correo y le llega directamente a quien escribió.`,
  });

  const text = [
    "NUEVO CONTACTO — lucasalvarez.info",
    "",
    `Nombre:    ${name}`,
    `Email:     ${email}`,
    ...(phone ? [`Teléfono:  ${phone}`] : []),
    `Servicio:  ${service.label}`,
    `Recibido:  ${formatMadrid(sentAt)}`,
    "Página:    /contacto",
    "",
    "Mensaje",
    "-------",
    message,
    "",
    "--",
    `Responde a este correo para contestar directamente a ${name}.`,
  ].join("\n");

  return {
    subject: `Nuevo mensaje de ${subjectName} · ${service.shortLabel}`,
    html,
    text,
  };
}
