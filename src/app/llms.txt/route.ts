import { getAllPosts } from "@/lib/blog";
import { clampDescription } from "@/lib/seo";
import {
  CONTACT,
  formatEuros,
  PUBLIQO_URL,
  SERVICES,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";
import { getPublishedCaseStudies } from "@/content/casos-de-exito";

/**
 * `/llms.txt` — the index an AI assistant reads to understand this site.
 *
 * A generated route rather than a file in `public/` for the same reason
 * `sitemap.ts` is generated: the file's entire value is being accurate, and a
 * static copy is stale the moment a price changes or a post ships. Everything
 * below is read from the same arrays the pages render from, so it cannot drift.
 *
 * Format follows the llms.txt convention: an H1, a blockquote summary, then H2
 * sections of `- [link](url): description` lines. `## Optional` is the spec's
 * own signal for "skip this if you are short on context", so the legal pages go
 * there and never displace a service page.
 *
 * Deliberately no `llms-full.txt`: it would be 40.000 words duplicating every
 * page at a second URL, with no evidence anything consumes it.
 */
export const dynamic = "force-static";

/** One line per entry. `clampDescription` keeps each on a single line. */
function line(title: string, path: string, description: string): string {
  return `- [${title}](${SITE_URL}${path}): ${clampDescription(description, 150)}`;
}

function priceLabel(from: number, per: string | null): string {
  return `${formatEuros(from)} €${per ? ` al ${per}` : " el proyecto"}`;
}

export function GET(): Response {
  const posts = getAllPosts();
  const cases = getPublishedCaseStudies();
  const cheapest = Math.min(...SERVICES.map((service) => service.pricing.from));

  /*
   * The facts block sits right after the summary on purpose: most consumers
   * read the top of the file and stop. The name, the city, the price floor and
   * the numbers-with-client-names are what should get quoted, so they go where
   * they will be read rather than being left to be inferred from links.
   */
  const body = [
    `# ${SITE_NAME} — Social media manager y estratega de contenido en Barcelona`,
    "",
    "> Gestiono las redes sociales y la estrategia de contenido de marcas en",
    "> Barcelona y Cataluña, y también en remoto para el resto de España.",
    `> Servicios desde ${formatEuros(cheapest)} €. Cifras orgánicas verificables, con nombre de`,
    "> cliente y sin publicidad de pago detrás: +250 % de visualizaciones en un mes",
    "> para Camping Collvert, x6 para Camping Victòria, +62 % para Camping Puzol y",
    "> 2,6 millones de visualizaciones para Reino Selva.",
    "",
    "## Hechos",
    "",
    `- Nombre: ${SITE_NAME}, social media manager y estratega de contenido`,
    "- Ubicación: Barcelona, Cataluña, España. Trabaja también en remoto",
    "- Idiomas: español, catalán, inglés",
    `- Precios: desde ${formatEuros(cheapest)} €. Sin permanencia. Sin porcentaje sobre inversión publicitaria`,
    `- Contacto: ${CONTACT.email} · ${CONTACT.phoneDisplay}`,
    `- Afiliación declarada: cofundador de Publiqo (${PUBLIQO_URL})`,
    "- Sectores con casos propios: campings y turismo, hostelería, impresión industrial, canales de YouTube",
    "",
    "## Servicios",
    "",
    ...SERVICES.map((service) =>
      line(
        service.h1,
        `/servicios/${service.slug}`,
        `Desde ${priceLabel(service.pricing.from, service.pricing.per)}. ${service.description}`,
      ),
    ),
    "",
    line(
      "Precios de todos los servicios",
      "/precios",
      "Cuánto cuesta un social media manager en Barcelona: precio de partida por servicio, qué incluye cada uno y qué hace subir un presupuesto.",
    ),
    "",
    "## Casos con cifras",
    "",
    ...cases.map((study) =>
      line(
        `${study.client}: ${study.headline}`,
        `/casos-de-exito/${study.slug}`,
        study.metaDescription,
      ),
    ),
    "",
    "## Guías",
    "",
    ...posts.map((post) =>
      line(post.metaTitle ?? post.title, `/blog/${post.slug}`, post.description),
    ),
    "",
    "## Optional",
    "",
    line(
      "Sobre Lucas Álvarez",
      "/sobre-mi",
      "Trayectoria, sectores y credenciales de Lucas Álvarez, social media manager en Barcelona.",
    ),
    line("Contacto", "/contacto", "Cómo contactar y en cuánto responde."),
    line(
      "Política de privacidad",
      "/politica-privacidad",
      "Qué datos recoge este sitio y cómo ejercer los derechos RGPD.",
    ),
    line(
      "Política de cookies",
      "/politica-cookies",
      "Qué cookies utiliza este sitio y cómo gestionarlas.",
    ),
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
