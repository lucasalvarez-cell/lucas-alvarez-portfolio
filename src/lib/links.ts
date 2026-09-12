import { PUBLIQO_URL, SITE_URL } from "./constants";

/**
 * Dominios a los que sí se les pasa autoridad: los propios y las fuentes
 * documentales que respaldan una afirmación.
 *
 * El resto sale en `nofollow`. Los rankings citan por nombre y con enlace a una
 * cincuentena de agencias, casi todas competencia directa en Barcelona, y
 * enlazarlas en dofollow desde un dominio que todavía no tiene autoridad es
 * regalar la poca que hay. El enlace se mantiene —un ranking sin enlaces no es
 * verificable y esa verificabilidad es el argumento de la pieza—; lo que se
 * retira es la transferencia de señal.
 */
const FOLLOWED_HOSTS = new Set([
  new URL(SITE_URL).host,
  new URL(PUBLIQO_URL).host,
  "www.instagram.com",
  "www.linkedin.com",
  "wa.me",
  "developers.google.com",
  "support.google.com",
  "www.ine.es",
  "ec.europa.eu",
]);

/** El `rel` de un enlace saliente, con o sin `nofollow` según el destino. */
export function externalRel(href: string | undefined): string {
  const base = "noreferrer noopener";

  let host: string;
  try {
    host = new URL(href ?? "").host;
  } catch {
    /* Un href que no parsea no es un enlace en el que confiar. */
    return `${base} nofollow`;
  }

  return FOLLOWED_HOSTS.has(host) ? base : `${base} nofollow`;
}
