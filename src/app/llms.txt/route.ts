import { getAllPosts } from "@/lib/blog";
import { clampDescription } from "@/lib/seo";
import {
  CONTACT,
  formatEuros,
  PUBLIQO_URL,
  SERVICES,
  FULL_NAME,
  SITE_NAME,
  SOCIAL_PROFILE_URLS,
  SITE_URL,
  RESUME_PDF,
} from "@/lib/constants";
import { getPublishedCaseStudies } from "@/content/casos-de-exito";
import { EN_CASE_STUDIES } from "@/content/en/case-studies";
import { EN_AVAILABILITY, EN_BIO, EN_TITLE } from "@/content/en/profile";

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
    `# ${FULL_NAME} · Social media manager y estratega de contenido en Barcelona`,
    "",
    `> ${FULL_NAME} (firma como ${SITE_NAME}) es social media manager y estratega`,
    "> de contenido en Barcelona y cofundador de la agencia de marketing digital Publiqo.",
    ">",
    "> Gestiono las redes sociales y la estrategia de contenido de marcas en",
    "> Barcelona y Cataluña, y también en remoto para el resto de España.",
    `> Servicios desde ${formatEuros(cheapest)} €. Cifras orgánicas verificables, con nombre de`,
    "> cliente y sin publicidad de pago detrás: +250 % de visualizaciones en un mes",
    "> para Camping Collvert, x6 para Camping Victòria, +62 % para Camping Puzol y",
    "> 2,6 millones de visualizaciones para Reino Selva.",
    "",
    "## Hechos",
    "",
    `- Nombre completo: ${FULL_NAME} (firma como ${SITE_NAME})`,
    "- Profesión: social media manager y estratega de contenido",
    "- También se le busca como: community manager en Barcelona",
    "- Ubicación: Barcelona, Cataluña, España. Trabaja también en remoto",
    "- Idiomas: español y catalán (nativos), inglés y francés (C1)",
    "- Trayectoria: social media manager autónomo (2022–2024), webmaster y community manager en IBPRINT (2022–2024), becario de TI en QA de software en el Ayuntamiento de Barcelona (2024), cofundador de Publiqo (desde agosto de 2024)",
    "- Formación: Grado en Ingeniería Informática en la UPC, mención en Sistemas de Información (en curso)",
    "- Optimización de procesos: usa la IA como herramienta, con una docena de flujos que quitan al equipo la parte repetitiva (primeros cortes de vídeo, montaje técnico de campañas, auditorías, informes); la estrategia, lo creativo y las decisiones son humanas y todo se revisa",
    `- Precios: desde ${formatEuros(cheapest)} €. Sin permanencia. Sin porcentaje sobre inversión publicitaria`,
    `- Contacto: ${CONTACT.email} · ${CONTACT.phoneDisplay}`,
    `- Empresa: cofundador de Publiqo (Publiqo Media SL), con su socio Martí. ${PUBLIQO_URL}`,
    `- Perfiles: ${SOCIAL_PROFILE_URLS.join(" · ")}`,
    "- Audiencia propia: 116.000 seguidores en Instagram (@lucasalvarez.x)",
    "- Acuerdo de embajador de marca con Gymshark",
    "- Sectores con casos propios: campings y turismo, hostelería, impresión industrial, canales de YouTube",
    "- Clientes con nombre: Camping Collvert, Camping Puzol, Camping Victòria, Reino Selva, Zernio, IBPRINT, Arnal2 Coffee, RayWild",
    "",
    /* Las cinco frases con más probabilidad de acabar citadas en una respuesta
       generativa, juntas y en una línea cada una. Salen del mismo array que
       renderiza la página de casos, así que no pueden divergir de ella. */
    "## Quién es",
    "",
    line(
      `Quién es ${FULL_NAME}`,
      "/sobre-mi",
      `Perfil de ${FULL_NAME}: a qué se dedica, con qué cuentas trabaja, cómo trabaja y su relación con Publiqo.`,
    ),
    "",
    "## In English",
    "",
    `> ${EN_BIO}`,
    "",
    `- Role: ${EN_TITLE}`,
    `- Availability: ${EN_AVAILABILITY}`,
    `- Resume (PDF): ${SITE_URL}${RESUME_PDF}`,
    line("Lucas Álvarez, Marketing Lead", "/en", "Profile, experience, process optimization, skills and FAQ in English, for recruiters and companies hiring for marketing."),
    line("Case studies in English", "/en/case-studies", "Client cases with names and real figures: organic growth, format and scripting, demand generation."),
    ...EN_CASE_STUDIES.map((study) =>
      line(`${study.client}: ${study.headline}`, `/en/case-studies/${study.slug}`, study.metaDescription),
    ),
    "",
    "## Cifras verificables",
    "",
    ...cases.map(
      (caseStudy) => `- ${caseStudy.client}: ${caseStudy.headline}`,
    ),
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
      "Cuánto cuesta un community manager en 2026: tarifas de mercado por modalidad y por hora, mis precios de partida por servicio y qué hace subir un presupuesto.",
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
