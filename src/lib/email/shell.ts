import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { encodeMailto, escapeHtml } from "./escape";

/**
 * The one place the email markup lives. Both templates call {@link emailShell};
 * only the body differs.
 *
 * Every constraint below is the result of what mail clients actually do rather
 * than what the spec says:
 *
 * - **Tables, not flex or grid.** Outlook on Windows renders with Word's
 *   engine. Modern layout does not exist there.
 * - **The XHTML transitional doctype**, because Word honours table widths under
 *   it and improvises under HTML5. Same reason widths are set twice, once as an
 *   attribute and once in CSS.
 * - **The `PixelsPerInch` block is mandatory.** Without it Outlook renders
 *   everything about a third too large, which is where "my 16px body looks like
 *   21px" comes from.
 * - **Not a single image.** There is no own-brand logo file in `public/` (only
 *   Publiqo's), Gmail and Outlook block remote images by default, and a remote
 *   image request is indistinguishable from an open-tracking pixel — which the
 *   site's published cookie policy promises it does not use. The wordmark is
 *   set in type. Nothing can break and there are no `alt` fallbacks to design.
 * - **Every cell declares its background colour.** Gmail on Android inverts
 *   colours with its own algorithm and ignores both the media query and
 *   `!important`. With backgrounds declared the result is legible; without them
 *   it is grey on grey.
 * - **Dark overrides are classes in a `<style>` block, and every element also
 *   carries its light values inline.** A client that strips the block still
 *   gets the complete light design. Nothing depends on the media query.
 *
 * Sizes are deliberately smaller than the site's: 16px/26px here against
 * 20px/1.75 there. Twenty pixels is right for a page you chose to open and
 * shouts in an inbox — and Outlook's scaling would push it further. This is the
 * brand rendered correctly for the medium, not a departure from it. Same for
 * the kicker: 12px/0.16em rather than the site's 14px/0.2em, which wraps on a
 * 600px card and hits unreliable `letter-spacing` support in Outlook.
 */

export const FONT_DISPLAY =
  "'Karla', 'Helvetica Neue', Helvetica, Arial, sans-serif";
export const FONT_BODY =
  "'Roboto', -apple-system, BlinkMacSystemFont, 'Segoe UI', Helvetica, Arial, sans-serif";

export const COLORS = {
  ink: "#0b0b1f",
  body: "#3C3C4C",
  soft: "#5D5D6C",
  purple: "#6423cd",
  /** Midpoint of the two gradient stops — what Outlook paints instead. */
  purpleMid: "#4a1aa7",
  purpleDeep: "#310778",
  purpleBright: "#6222cc",
  turquoise: "#82e5ce",
  lightGrey: "#e9f0f1",
  canvas: "#f5f5f5",
  white: "#ffffff",
} as const;

const TABLE_RESET =
  "border-collapse:collapse;mso-table-lspace:0pt;mso-table-rspace:0pt;";

type ShellOptions = {
  /** The one-line snippet mail clients show next to the subject in the list. */
  preheader: string;
  /** Small uppercase label in the gradient band. */
  kicker: string;
  /** Used for the `<title>` only; the band shows the wordmark. */
  documentTitle: string;
  /** Pre-escaped HTML for the white content area. */
  bodyHtml: string;
  /** Pre-escaped HTML for the grey footer band. */
  footerHtml: string;
};

/** A body paragraph. */
export function p(html: string, className = "t-body"): string {
  return `<p class="${className}" style="margin:0 0 16px;font-family:${FONT_BODY};font-size:16px;line-height:26px;mso-line-height-rule:exactly;color:${COLORS.body};">${html}</p>`;
}

/** The small uppercase label that introduces a block. */
export function label(text: string): string {
  return `<div class="t-label" style="margin:0 0 10px;font-family:${FONT_DISPLAY};font-size:12px;font-weight:700;line-height:16px;mso-line-height-rule:exactly;letter-spacing:0.16em;text-transform:uppercase;color:${COLORS.purple};">${escapeHtml(text)}</div>`;
}

/** The visitor's name, or any card-level heading. */
export function heading(text: string): string {
  return `<h1 class="t-heading" style="margin:0;font-family:${FONT_DISPLAY};font-size:22px;line-height:28px;mso-line-height-rule:exactly;font-weight:800;letter-spacing:0.01em;text-transform:uppercase;color:${COLORS.ink};">${escapeHtml(text)}</h1>`;
}

/** Vertical space. `margin` is unreliable in Outlook; a spacer row is not. */
export function spacer(height: number): string {
  return `<tr><td style="height:${height}px;line-height:${height}px;font-size:0;">&nbsp;</td></tr>`;
}

export function rule(): string {
  return `<tr><td class="rule" style="border-top:1px solid ${COLORS.lightGrey};font-size:0;line-height:0;">&nbsp;</td></tr>`;
}

/**
 * The visitor's own words, marked out with the site's turquoise accent.
 *
 * Used identically in both emails — it is the payload in one and the receipt in
 * the other, and it should look like the same object in both.
 */
export function quoteBlock(innerHtml: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="${TABLE_RESET}">
  <tr>
    <td class="quote" style="background-color:${COLORS.canvas};border-left:4px solid ${COLORS.turquoise};border-radius:8px;padding:20px;font-family:${FONT_BODY};font-size:16px;line-height:26px;mso-line-height-rule:exactly;color:${COLORS.body};">${innerHtml}</td>
  </tr>
</table>`;
}

/**
 * A solid purple call to action.
 *
 * Built as a table rather than a styled `<a>` so Outlook gives it a real
 * background and real padding instead of bare underlined text.
 */
export function button(text: string, href: string): string {
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="${TABLE_RESET}">
  <tr>
    <td bgcolor="${COLORS.purple}" style="background-color:${COLORS.purple};border-radius:8px;">
      <a href="${href}" style="display:inline-block;padding:14px 28px;font-family:${FONT_DISPLAY};font-size:16px;line-height:20px;font-weight:800;color:${COLORS.white};text-decoration:none;border-radius:8px;">${escapeHtml(text)}</a>
    </td>
  </tr>
</table>`;
}

/** A label/value pair in the meta block. Stacked — 320px inboxes exist. */
export function metaRow(name: string, valueHtml: string): string {
  return `<tr>
    <td style="padding:0 0 10px;">
      <span class="t-muted" style="font-family:${FONT_DISPLAY};font-size:11px;font-weight:800;letter-spacing:0.16em;text-transform:uppercase;color:${COLORS.soft};">${escapeHtml(name)}</span><br>
      <span class="t-body" style="font-family:${FONT_BODY};font-size:15px;line-height:22px;mso-line-height-rule:exactly;color:${COLORS.ink};">${valueHtml}</span>
    </td>
  </tr>`;
}

export function rows(inner: string): string {
  return `<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="${TABLE_RESET}">${inner}</table>`;
}

/** An escaped `mailto:` link, optionally with a pre-filled subject. */
export function mailtoHref(address: string, subject?: string): string {
  const base = `mailto:${encodeMailto(address)}`;
  return subject ? `${base}?subject=${encodeMailto(subject)}` : base;
}

export function link(href: string, text: string): string {
  return `<a href="${href}" class="t-link" style="color:${COLORS.purple};text-decoration:underline;">${escapeHtml(text)}</a>`;
}

/**
 * Padding entities after the preheader text.
 *
 * Without them the client pulls the first words of the body into the inbox
 * preview line, right after the preheader, and the two run together.
 */
const PREHEADER_PAD = "&#847;&zwnj;&nbsp;".repeat(60);

export function emailShell({
  preheader,
  kicker,
  documentTitle,
  bodyHtml,
  footerHtml,
}: ShellOptions): string {
  return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="es" xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<meta name="x-apple-disable-message-reformatting" />
<meta name="color-scheme" content="light dark" />
<meta name="supported-color-schemes" content="light dark" />
<title>${escapeHtml(documentTitle)}</title>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<style>
  a[x-apple-data-detectors]{color:inherit !important;text-decoration:none !important;}
  @media (prefers-color-scheme: dark) {
    .canvas{background-color:#0b0b1f !important;}
    .card{background-color:#14102e !important;border-color:rgba(255,255,255,0.10) !important;}
    .t-body,.t-heading{color:#e9f0f1 !important;}
    .t-muted{color:rgba(233,240,241,0.72) !important;}
    .t-label{color:${COLORS.turquoise} !important;}
    .t-link{color:${COLORS.turquoise} !important;}
    .quote{background-color:rgba(255,255,255,0.05) !important;color:#e9f0f1 !important;}
    .rule{border-top-color:rgba(255,255,255,0.14) !important;}
    .footer{background-color:#100c26 !important;border-top-color:rgba(255,255,255,0.10) !important;}
  }
</style>
</head>
<body style="margin:0;padding:0;background-color:${COLORS.canvas};-webkit-font-smoothing:antialiased;">
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${escapeHtml(preheader)}${PREHEADER_PAD}</div>
<table role="presentation" class="canvas" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLORS.canvas}" style="${TABLE_RESET}background-color:${COLORS.canvas};">
  <tr>
    <td align="center" style="padding:24px 12px;">
      <table role="presentation" class="card" width="600" cellpadding="0" cellspacing="0" border="0" bgcolor="${COLORS.white}" style="${TABLE_RESET}width:100%;max-width:600px;background-color:${COLORS.white};border:1px solid ${COLORS.lightGrey};border-radius:8px;">
        <tr>
          <td bgcolor="${COLORS.purpleMid}" style="background-color:${COLORS.purpleMid};background-image:linear-gradient(90deg, ${COLORS.purpleBright}, ${COLORS.purpleDeep});border-radius:8px 8px 0 0;padding:28px 24px;">
            <div style="font-family:${FONT_DISPLAY};font-size:12px;font-weight:700;line-height:16px;mso-line-height-rule:exactly;letter-spacing:0.16em;text-transform:uppercase;color:${COLORS.turquoise};">${escapeHtml(kicker)}</div>
            <div style="padding-top:14px;font-family:${FONT_DISPLAY};font-size:24px;font-weight:800;line-height:30px;mso-line-height-rule:exactly;letter-spacing:0.02em;text-transform:uppercase;color:${COLORS.white};">${escapeHtml(SITE_NAME)}</div>
          </td>
        </tr>
        <tr>
          <td bgcolor="${COLORS.white}" style="background-color:${COLORS.white};padding:32px 24px;">${bodyHtml}</td>
        </tr>
        <tr>
          <td class="footer t-muted" bgcolor="${COLORS.canvas}" style="background-color:${COLORS.canvas};border-top:1px solid ${COLORS.lightGrey};border-radius:0 0 8px 8px;padding:20px 24px;font-family:${FONT_BODY};font-size:13px;line-height:20px;mso-line-height-rule:exactly;color:${COLORS.soft};">${footerHtml}</td>
        </tr>
      </table>
    </td>
  </tr>
</table>
</body>
</html>`;
}

/** `lucasalvarez.info`, linked, for use in footers. */
export function siteLink(): string {
  return `<a href="${SITE_URL}" class="t-link" style="color:${COLORS.purple};text-decoration:none;">lucasalvarez.info</a>`;
}

/**
 * Timestamp in Madrid time, assembled by hand.
 *
 * Only the zone shift comes from `Intl`; every visible token is built here. A
 * slim-ICU Node build silently falls back to the `en-US` calendar for
 * `toLocaleString("es-ES")`, which is the same reason `formatEuros` exists in
 * `constants.ts`.
 */
export function formatMadrid(date: Date): string {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Madrid",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(date);

  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((part) => part.type === type)?.value ?? "";

  const months = [
    "enero",
    "febrero",
    "marzo",
    "abril",
    "mayo",
    "junio",
    "julio",
    "agosto",
    "septiembre",
    "octubre",
    "noviembre",
    "diciembre",
  ];
  const month = months[Number(get("month")) - 1] ?? get("month");

  return `${get("day")} de ${month} de ${get("year")}, ${get("hour")}:${get("minute")} (hora de Madrid)`;
}
