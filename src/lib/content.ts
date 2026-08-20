/**
 * Content in `content/casos-de-exito.ts` uses bracketed tokens ([RETO],
 * [SECTOR], [RESULTADO]) as authoring placeholders. They must never reach the
 * page, so every render path filters values through these helpers.
 */

const PLACEHOLDER_TOKEN = /^\s*\[.*\]\s*$/;

export function isPlaceholderText(value?: string): boolean {
  return !value || PLACEHOLDER_TOKEN.test(value);
}

/** Returns the value, or undefined when it is still an unfilled token. */
export function filled(value?: string): string | undefined {
  return isPlaceholderText(value) ? undefined : value;
}
