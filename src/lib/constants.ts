export const SITE_URL = "https://lucasalvarez.info";
export const SITE_NAME = "Lucas Álvarez";
export const SITE_LOCALE = "es_ES";
export const SITE_LANG = "es";

/** Default meta/OG description, reused by the root layout and the WebSite node. */
export const SITE_DESCRIPTION =
  "Estratega de contenido y social media manager en Barcelona. Cofundador de Publiqo. Gestiono las redes sociales de marcas reales: +250 % de visualizaciones en un mes para Camping Collvert, x6 para Camping Victòria.";

export const PUBLIQO_URL = "https://publiqo.es/";

export const CONTACT = {
  email: "lucas@publiqo.es",
  phoneDisplay: "+34 644 956 232",
  phoneHref: "tel:+34644956232",
  whatsappHref: "https://wa.me/34644956232",
};

export const SOCIALS = {
  instagram: {
    label: "Instagram",
    handle: "@lucasalvarez.x",
    href: "https://www.instagram.com/lucasalvarez.x",
  },
  /**
   * `href: null` hides the link everywhere it is rendered. A placeholder "#"
   * ships a dead link into the crawl, so the profile URL goes here or nowhere.
   */
  linkedin: {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/lucas-alvarez-199b63219/" as string | null,
  },
  /* TODO(lucas): canal propio, si lo hay. */
  youtube: {
    label: "YouTube",
    href: null as string | null,
  },
};

/**
 * Channels Lucas designs the content system for. They are not his profiles, so
 * they do not belong in `Person.sameAs`; they are evidence of the work and go
 * in the organisation's `sameAs` once the URLs are filled in.
 *
 * TODO(lucas): pegar las URLs de Reino Selva y RayWild.
 */
export const MANAGED_CHANNELS: { name: string; href: string | null }[] = [
  { name: "Reino Selva", href: null },
  { name: "RayWild", href: null },
];

/** Every social profile with a real URL — feeds `sameAs` in the Person schema. */
export const SOCIAL_PROFILE_URLS: string[] = [
  SOCIALS.instagram.href,
  SOCIALS.linkedin.href,
  SOCIALS.youtube.href,
].filter((href): href is string => Boolean(href));

/** Organisation `sameAs`: its own site plus any channel with a real URL. */
export const ORGANIZATION_PROFILE_URLS: string[] = [
  PUBLIQO_URL,
  ...MANAGED_CHANNELS.map((channel) => channel.href),
].filter((href): href is string => Boolean(href));

/**
 * Brands Lucas has worked with. Each slug has three files in
 * public/images/logos/: the original ({slug}.png), a white version for dark
 * backgrounds ({slug}-white.png) and the light-background version
 * ({slug}-dark.png). `file` picks whichever of those reads best on a white
 * chip — full color where the mark has one, `-dark` where the default file
 * is too pale to read.
 */
export const CLIENT_LOGOS = [
  { slug: "camping-victoria", name: "Camping Victoria", file: "camping-victoria" },
  { slug: "camping-collvert", name: "Camping Coll Vert", file: "camping-collvert-dark" },
  { slug: "camping-puzol", name: "Camping Puzol", file: "camping-puzol-dark" },
  { slug: "reino-selva", name: "Reino Selva", file: "reino-selva" },
  { slug: "grupo-arnal2", name: "Grupo Arnal2", file: "grupo-arnal2-dark" },
  { slug: "arnal2-coffee", name: "Arnal2 Coffee", file: "arnal2-coffee" },
  { slug: "zernio", name: "Zernio", file: "zernio-wordmark" },
  { slug: "gymshark", name: "Gymshark", file: "gymshark" },
];

export const NAV_LINKS = [
  { label: "Inicio", href: "/" },
  { label: "Sobre mí", href: "/sobre-mi" },
  { label: "Servicios", href: "/servicios" },
  { label: "Precios", href: "/precios" },
  { label: "Resultados", href: "/casos-de-exito" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

export const LEGAL_LINKS = [
  { label: "Política de privacidad", href: "/politica-privacidad" },
  { label: "Política de cookies", href: "/politica-cookies" },
];

/**
 * Service copy moved to `content/servicios.ts` — it is content, not
 * configuration, and it is the file that grows with every new page. Re-exported
 * here so the existing import sites keep working unchanged.
 */
export type {
  FaqItem,
  ProcessStep,
  Service,
  ServiceOption,
  ServicePricing,
  ServiceSection,
} from "@/content/servicios";
export {
  SERVICES,
  SERVICE_OPTION_UNDECIDED,
  contactServiceOptions,
  getServiceBySlug,
} from "@/content/servicios";

/**
 * The business entity, as distinct from the person. Both are real and both are
 * in the schema graph: `Person` is Lucas, `ProfessionalService` is the business
 * he sells through. Collapsing them into one node produces something no
 * crawler can resolve cleanly.
 */
export const BUSINESS_NAME = SITE_NAME;
export const BUSINESS_DESCRIPTION =
  "Social media manager y estratega de contenido en Barcelona. Gestión de redes sociales, estrategia de contenido, SEO, desarrollo web y campañas de Meta Ads y Google Ads para marcas de turismo, hostelería, industria y creadores.";

/** Lowest starting price across all services. Feeds llms.txt and /precios. */
export const PRICE_FROM = 290;

/**
 * Spanish thousands separator, done by hand.
 *
 * `toLocaleString("es-ES")` depends on the ICU data compiled into whatever
 * Node runs the build, and a slim build silently returns "1900" where the page
 * needs "1.190" — which reads as a typo sitting next to "490 €".
 */
export function formatEuros(amount: number): string {
  return String(amount).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
