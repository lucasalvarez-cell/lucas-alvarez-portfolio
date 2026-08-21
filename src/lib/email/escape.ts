/**
 * HTML escaping for values that reach an email body.
 *
 * Every string interpolated into the templates in this folder comes from a
 * public form, so it is attacker-controlled. Without this, a message containing
 * `<img src=x onerror=...>` arrives intact in the inbox — and a mail client is a
 * far worse place to discover that than a browser, because the reader has no
 * address bar to sanity-check.
 */
export function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Escape, then turn newlines into `<br>`.
 *
 * The order matters: escaping after inserting the tags would escape the tags.
 */
export function escapeHtmlWithBreaks(value: string): string {
  return escapeHtml(value).replace(/\r?\n/g, "<br>");
}

/**
 * Percent-encode a string for use inside a `mailto:` query.
 *
 * `encodeURIComponent` leaves `!'()*` alone, and Outlook truncates a mailto at
 * an unencoded `'` — which is exactly the character a Spanish name or subject
 * line is most likely to contain.
 */
export function encodeMailto(value: string): string {
  return encodeURIComponent(value).replace(
    /[!'()*]/g,
    (char) => `%${char.charCodeAt(0).toString(16).toUpperCase()}`,
  );
}
