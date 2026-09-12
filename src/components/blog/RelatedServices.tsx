import Link from "next/link";
import { SERVICES } from "@/lib/constants";
import type { Service } from "@/lib/constants";

/**
 * Maps post tags onto the services they belong to. Without this, blog posts
 * link only to other blog posts — the service pages get no internal links from
 * the content that ranks for their topic, and neither does /contacto.
 */
const TAG_TO_SERVICE: Record<string, string> = {
  /* Topic hubs — every post carries one of these as its first tag. */
  "redes-sociales": "gestion-redes-sociales",
  seo: "seo",
  /* Was pointing at the SEO service because no advertising page existed. Four
     posts target Google Ads and Meta Ads intent and now have somewhere real to
     send a reader. */
  publicidad: "publicidad-meta-ads-google-ads",
  "diseno-web": "desarrollo-web",
  turismo: "gestion-redes-sociales",
  "marketing-digital": "auditoria-consultoria-digital",

  /* Secondary tags. */
  "estrategia-contenido": "estrategia-contenido-crecimiento-organico",
  "negocios-locales": "seo",
  auditoria: "auditoria-consultoria-digital",
  agencias: "auditoria-consultoria-digital",
  pymes: "auditoria-consultoria-digital",
  publiqo: "auditoria-consultoria-digital",

  /* Tags introduced with the 2026 content plan. Every one needs an entry or
     its posts fall through to consultancy, which is the right default and the
     wrong answer for a post about Meta Ads pricing. */
  "ia-y-busqueda": "seo",
  precios: "auditoria-consultoria-digital",
  analitica: "auditoria-consultoria-digital",
  conversion: "desarrollo-web",
  ecommerce: "desarrollo-web",
  b2b: "gestion-redes-sociales",
  "email-marketing": "estrategia-contenido-crecimiento-organico",
  "google-ads": "publicidad-meta-ads-google-ads",
  "meta-ads": "publicidad-meta-ads-google-ads",
  hosteleria: "gestion-redes-sociales",
  salud: "gestion-redes-sociales",
  deporte: "gestion-redes-sociales",
  "marca-personal": "estrategia-contenido-crecimiento-organico",
};

/** Falls back to consultancy so the block is never empty on an untagged post. */
function pickServices(tags: string[] = [], limit = 2): Service[] {
  const slugs = tags
    .map((tag) => TAG_TO_SERVICE[tag])
    .filter((slug): slug is string => Boolean(slug));

  const unique = [...new Set(slugs.length ? slugs : ["auditoria-consultoria-digital"])];

  return unique
    .map((slug) => SERVICES.find((service) => service.slug === slug))
    .filter((service): service is Service => Boolean(service))
    .slice(0, limit);
}

export function RelatedServices({ tags }: { tags?: string[] }) {
  const services = pickServices(tags);
  if (!services.length) return null;

  return (
    <aside
      aria-label="Servicios relacionados"
      className="mt-16 rounded-[var(--radius-card)] border-2 border-light-grey bg-light-grey/40 p-6 sm:p-8"
    >
      <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-purple">
        Servicios relacionados
      </p>

      <ul className="mt-5 space-y-5">
        {services.map((service) => (
          <li key={service.slug}>
            <Link
              href={`/servicios/${service.slug}`}
              className="font-semibold text-ink underline decoration-purple/30 underline-offset-4 transition-colors hover:text-purple"
            >
              {service.metaTitle}
            </Link>
            <p className="mt-1 text-base leading-relaxed text-ink-soft">
              {service.shortDescription}
            </p>
          </li>
        ))}
      </ul>

      {/* La página de precios solo recibía enlaces desde el menú y el pie, que
          son los que menos pesan porque están en las 69 URLs. Este enlace la
          conecta con el contenido que trata su mismo tema, y lo hace con el
          término por el que se busca. */}
      <p className="mt-6 text-base text-ink-soft">
        Antes de pedir presupuesto:{" "}
        <Link
          href="/precios"
          className="font-semibold text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple"
        >
          cuánto cuesta un community manager en 2026
        </Link>
        , con las bandas de mercado y mis precios de partida.
      </p>

      <p className="mt-3 text-base text-ink-soft">
        ¿Prefieres que lo veamos sobre tu caso?{" "}
        <Link
          href="/contacto"
          className="font-semibold text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple"
        >
          Escríbeme y te digo por dónde empezaría
        </Link>
        .
      </p>
    </aside>
  );
}
