export const SITE_URL = "https://lucasalvarez.info";
export const SITE_NAME = "Lucas Álvarez";
export const SITE_LOCALE = "es_ES";
export const SITE_LANG = "es";

/** Default meta/OG description, reused by the root layout and the WebSite node. */
export const SITE_DESCRIPTION =
  "Estratega de contenido y social media manager en Barcelona. Cofundador de Publiqo. Gestiono las redes sociales de marcas reales: +250 % de visualizaciones en un mes para Camping Collvert, x6 para Camping Victòria.";

export const PUBLIQO_URL = "https://publiqo.es/";

export const CONTACT = {
  email: "bsocialspain@gmail.com",
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
    href: null as string | null,
  },
};

/** Every social profile with a real URL — feeds `sameAs` in the Person schema. */
export const SOCIAL_PROFILE_URLS: string[] = [
  SOCIALS.instagram.href,
  SOCIALS.linkedin.href,
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
  { label: "Resultados", href: "/casos-de-exito" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];

export const LEGAL_LINKS = [
  { label: "Política de privacidad", href: "/politica-privacidad" },
  { label: "Política de cookies", href: "/politica-cookies" },
];

/** One alternating text/image block on a service detail page. */
export type ServiceSection = {
  title: string;
  body: string;
  image: string;
  imageAlt: string;
};

export type Service = {
  slug: string;
  title: string;
  /** Short display name used in nav-style listings and cross-sell blocks. */
  shortTitle: string;
  shortDescription: string;
  description: string;
  /** Lede shown under the H1 on the service detail page. */
  intro: string;
  /** SEO <title> for the detail page. Carries the city; `title` does not. */
  metaTitle: string;
  metaDescription: string;
  sections: ServiceSection[];
};

export const SERVICES: Service[] = [
  {
    slug: "gestion-redes-sociales",
    title: "Gestión de redes sociales",
    shortTitle: "Redes sociales",
    shortDescription:
      "Gestiono tu cuenta entera: estrategia, guion, publicación y análisis. Con resultados a 30 días.",
    description:
      "Gestión completa de redes sociales para marcas: diagnóstico del perfil, línea editorial, guionaje, plan de grabación, publicación y análisis mensual de resultados para escalar lo que funciona y descartar lo que no.",
    intro:
      "Publicar más no arregla una cuenta estancada. Camping Collvert subió un 250 % sus visualizaciones en un mes sin publicar el doble: publicando otra cosa.",
    metaTitle: "Gestión de redes sociales en Barcelona",
    metaDescription:
      "Gestión de redes sociales en Barcelona: estrategia, guionaje, publicación y análisis. +250 % de visualizaciones en un mes para Camping Collvert. Social media manager en Barcelona.",
    sections: [
      {
        title: "Primero el diagnóstico, después el calendario",
        body: "Antes de planificar una sola publicación reviso qué está pasando de verdad en tu perfil: qué formatos has probado, en qué segundo se cae la retención, qué ganchos aguantan, qué frecuencia sostienes y a qué audiencia estás atrayendo realmente frente a la que crees tener. De ahí sale una línea editorial concreta, con objetivos medibles por plataforma. La mayoría de cuentas estancadas no publican poco: publican lo que no toca.",
        image: "/images/placeholders/work-01.jpg",
        imageAlt:
          "Análisis de formatos y retención de una cuenta de Instagram gestionada por Lucas Álvarez",
      },
      {
        title: "Guion, grabación, publicación y análisis",
        body: "Me encargo del guion, del plan de grabación, de la edición, de la publicación y del seguimiento. Cada mes revisamos qué ha rendido y ajustamos: se escala el formato ganador y se retira el que no aporta. Es exactamente el proceso con el que Camping Puzol subió un 62 % sus visualizaciones en un mes y con el que Camping Victòria las multiplicó por seis al pasar de uno a dos posts semanales, una vez identificado el formato que le funcionaba.",
        image: "/images/placeholders/work-02.jpg",
        imageAlt:
          "Resultados mensuales de gestión de redes sociales para Camping Puzol y Camping Victòria",
      },
    ],
  },
  {
    slug: "estrategia-contenido-crecimiento-organico",
    title: "Estrategia de contenido y crecimiento orgánico",
    shortTitle: "Estrategia de contenido",
    shortDescription:
      "Un sistema de contenido repetible, para que crecer no dependa de tener suerte cada mes.",
    description:
      "Estrategia de contenido para marcas que quieren crecer sin depender de publicidad: diagnóstico de posicionamiento, definición de pilares, formatos validados con datos y un sistema de producción que tu equipo pueda mantener sin mí.",
    intro:
      "El crecimiento orgánico no se compra. Se construye una vez, se documenta y se repite. Eso es lo que entrego: el sistema, no una campaña.",
    metaTitle: "Estrategia de contenido y crecimiento orgánico en Barcelona",
    metaDescription:
      "Estrategia de contenido en Barcelona: pilares, formatos validados con datos y un sistema repetible para crecer sin publicidad de pago. Content strategist en Barcelona.",
    sections: [
      {
        title: "Entender por qué no está funcionando",
        body: "El punto de partida es un diagnóstico honesto: tu posicionamiento actual, tu audiencia real frente a la que asumes, y los mensajes que estás lanzando. Casi ningún perfil estancado tiene un problema de volumen. Tiene un problema de enfoque: habla a quien no le escucha, o en un formato que esa audiencia concreta no consume. Hasta que eso no está resuelto, producir más contenido solo multiplica el mismo error.",
        image: "/images/placeholders/work-03.jpg",
        imageAlt: "Diagnóstico de posicionamiento y audiencia real de una marca",
      },
      {
        title: "Un sistema que sobrevive sin mí",
        body: "Construyo un marco que tu equipo o tú podéis mantener: pilares de contenido definidos, formatos ganadores identificados con datos, plantillas de guion y un proceso de producción claro. Es el mismo tipo de sistema que diseñamos para los canales de YouTube Reino Selva y RayWild, donde el guion, el título y la descripción siguen una estructura fija y replicable. El objetivo no es un pico puntual de alcance: es una base que siga creciendo cuando yo ya no lleve el día a día.",
        image: "/images/placeholders/work-04.jpg",
        imageAlt:
          "Sistema de guion, títulos y descripciones diseñado para los canales Reino Selva y RayWild",
      },
    ],
  },
  {
    slug: "seo",
    title: "SEO y posicionamiento web",
    shortTitle: "SEO",
    shortDescription:
      "Que te encuentre quien ya te está buscando. Técnica, contenido y arquitectura.",
    description:
      "SEO técnico, estrategia de palabras clave y arquitectura de contenido para que tu web gane visibilidad en Google y atraiga tráfico que se convierte en clientes, no en visitas.",
    intro:
      "Las redes sociales crean demanda. El SEO la recoge cuando ya existe. Las dos cosas juntas son lo que hace que un negocio deje de depender de la publicidad.",
    metaTitle: "SEO y posicionamiento web en Barcelona",
    metaDescription:
      "SEO en Barcelona: auditoría técnica, Core Web Vitals, palabras clave y arquitectura de contenido para atraer tráfico cualificado desde Google.",
    sections: [
      {
        title: "Base técnica sólida",
        body: "Reviso lo que impide que Google entienda y priorice tu web: velocidad de carga y Core Web Vitals, indexación, estructura de URLs, datos estructurados, versión móvil y errores de rastreo. Sin esta base, cualquier esfuerzo de contenido rinde por debajo de su potencial: estás escribiendo para un buscador que no te está leyendo bien.",
        image: "/images/placeholders/work-05.jpg",
        imageAlt: "Auditoría técnica de SEO y Core Web Vitals",
      },
      {
        title: "Palabras clave que traen clientes, no visitas",
        body: "Identifico las búsquedas que hacen tus clientes reales, no las que tienen más volumen, y diseño la arquitectura de contenido que responde a cada intención. Una página, una intención, un objetivo. Es la diferencia entre subir en un ranking y que suene el teléfono.",
        image: "/images/placeholders/work-06.jpg",
        imageAlt:
          "Estrategia de palabras clave y arquitectura de contenido orientada a conversión",
      },
    ],
  },
  {
    slug: "desarrollo-web",
    title: "Diseño y desarrollo web",
    shortTitle: "Desarrollo web",
    shortDescription:
      "Webs rápidas, indexables y construidas para que el visitante haga algo.",
    description:
      "Diseño y desarrollo de webs y landing pages rápidas, accesibles y optimizadas para buscadores, construidas desde el primer día alrededor de una acción concreta: que el visitante contacte, reserve o compre.",
    intro:
      "Una web bonita que no convierte es un gasto con buen aspecto. Cada página empieza por una pregunta: qué queremos que haga quien llega aquí.",
    metaTitle: "Diseño y desarrollo web en Barcelona",
    metaDescription:
      "Diseño y desarrollo web en Barcelona: sitios rápidos, accesibles y optimizados para SEO, pensados para convertir visitas en clientes.",
    sections: [
      {
        title: "Rendimiento y accesibilidad de serie",
        body: "Desarrollo con tecnologías modernas que priorizan la velocidad de carga y el rendimiento en móvil, porque afectan directamente al posicionamiento y a la tasa de conversión. La accesibilidad no es un extra que se añade al final: forma parte de cómo se construye cada componente. Una web que carga un segundo más tarde no es una web peor: es una web con menos clientes.",
        image: "/images/placeholders/work-01.jpg",
        imageAlt: "Desarrollo web optimizado para velocidad de carga y accesibilidad",
      },
      {
        title: "Construida para convertir",
        body: "La estructura, los textos y las llamadas a la acción se ordenan según lo que queremos que pase en esa página, y se miden después con datos reales de uso para poder ajustarlos. El diseño no es una cuestión de gusto: es una cuestión de dónde mira la gente y qué hace a continuación.",
        image: "/images/placeholders/work-02.jpg",
        imageAlt: "Estructura de una landing page orientada a conversión",
      },
    ],
  },
  {
    slug: "auditoria-consultoria-digital",
    title: "Auditoría y consultoría digital",
    shortTitle: "Consultoría",
    shortDescription:
      "Un diagnóstico completo y una lista de acciones ordenada por impacto. Sin informe de 100 páginas.",
    description:
      "Auditoría de tu presencia digital completa (redes sociales, web y SEO) con un plan de acción priorizado por impacto y esfuerzo, listo para que lo ejecute tu equipo o para que lo ejecute yo.",
    intro:
      "A veces no necesitas externalizar la gestión. Necesitas saber exactamente qué hacer y en qué orden. Eso es lo que entrega una auditoría.",
    metaTitle: "Auditoría y consultoría digital en Barcelona",
    metaDescription:
      "Auditoría y consultoría de marketing digital en Barcelona: diagnóstico de redes, web y SEO con un plan de acción priorizado por impacto.",
    sections: [
      {
        title: "Diagnóstico completo, sin puntos ciegos",
        body: "Analizo tu presencia digital como un conjunto: perfiles sociales, web, posicionamiento en buscadores y la coherencia del mensaje entre todos ellos. Los problemas de una marca rara vez están aislados en un solo canal, y tratarlos por separado suele ser exactamente la razón por la que llevan años sin resolverse.",
        image: "/images/placeholders/work-03.jpg",
        imageAlt: "Auditoría completa de presencia digital: redes sociales, web y SEO",
      },
      {
        title: "Una lista priorizada, no un informe",
        body: "El resultado no es un PDF de cien páginas que nadie abre. Es una lista concreta de acciones ordenadas por impacto y esfuerzo: qué hacer esta semana, qué puede esperar y qué no merece la pena hacer nunca. Si quieres, después acompaño la implementación; si no, te queda un plan que puede ejecutar cualquiera.",
        image: "/images/placeholders/work-04.jpg",
        imageAlt:
          "Plan de acción de marketing digital priorizado por impacto y esfuerzo",
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug);
}
