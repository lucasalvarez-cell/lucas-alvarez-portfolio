import {
  BUSINESS_DESCRIPTION,
  BUSINESS_NAME,
  CONTACT,
  ORGANIZATION_PROFILE_URLS,
  PUBLIQO_URL,
  SERVICES,
  SITE_DESCRIPTION,
  SITE_LANG,
  SITE_NAME,
  SITE_URL,
  SOCIALS,
  SOCIAL_PROFILE_URLS,
} from "./constants";
import type { Service, ServicePricing } from "./constants";
import type { Sector, SectorPage } from "@/content/sectores";
import { coverAlt } from "./cover-svg";
import type { PostFrontmatter, PostMeta } from "@/types/blog";
import type { CaseStudy } from "@/types/case-study";

const PERSON_ID = `${SITE_URL}/#person`;
/**
 * The business that actually sells the services, on this domain.
 *
 * This replaces a node that used to be `${SITE_URL}/#organization` while
 * describing Publiqo, whose url is publiqo.es. That combination asserted that
 * the organisation *of this site* lives somewhere else, which is the reason
 * none of the service pages accumulated any entity signal of their own.
 */
const BUSINESS_ID = `${SITE_URL}/#business`;
/** Publiqo's canonical node belongs on Publiqo's own domain, keyed to it. */
const PUBLIQO_ID = `${PUBLIQO_URL}#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;
const HOME_PAGE_ID = `${SITE_URL}/#webpage`;

const CONTEXT = "https://schema.org";

/** Wraps nodes in one @graph so cross-references by @id always resolve. */
function graph(...nodes: object[]) {
  return { "@context": CONTEXT, "@graph": nodes };
}

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Lucas Álvarez",
    givenName: "Lucas",
    familyName: "Álvarez",
    /* El handle atado al nombre legal: sin esto, el perfil de Instagram y la
       persona son dos entidades que un motor no tiene por qué unir. */
    additionalName: SOCIALS.instagram.handle,
    jobTitle: "Estratega de contenido y social media manager",
    nationality: { "@type": "Country", name: "España" },
    /* El único reconocimiento verificable, y está afirmado en /sobre-mi. No se
       añade `hasCredential`: no hay certificación real que declarar, e
       inventar una es la vía rápida a que la entidad deje de ser creíble. */
    award: ["Embajador de marca de Gymshark"],
    description:
      "Estratega digital en Barcelona y cofundador de Publiqo. Gestiona la estrategia de contenido y las redes sociales de marcas de turismo, industria y medios.",
    url: SITE_URL,
    image: `${SITE_URL}/images/lucas-alvarez.jpg`,
    email: CONTACT.email,
    telephone: CONTACT.phoneDisplay,
    knowsLanguage: ["es", "ca", "en"],
    knowsAbout: [
      "Marketing digital",
      "Gestión de redes sociales",
      "Community management",
      "Estrategia de contenido",
      "SEO",
      "Desarrollo web",
      "Google Ads",
      "Meta Ads",
      "Marketing turístico",
    ],
    homeLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Barcelona",
        addressRegion: "Cataluña",
        addressCountry: "ES",
      },
    },
    worksFor: { "@id": PUBLIQO_ID },
    memberOf: { "@id": PUBLIQO_ID },
    /* The business he sells through, on this domain. */
    owns: { "@id": BUSINESS_ID },
    /* Consolidates the entity on one page instead of leaving it implied by
       whichever URL a crawler happens to land on first. */
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE_URL}/sobre-mi` },
    hasOccupation: {
      "@type": "Occupation",
      name: "Estratega de contenido y social media manager",
      occupationLocation: { "@type": "City", name: "Barcelona" },
      skills:
        "Estrategia de contenido, gestión de redes sociales, community manager, SEO, Google Ads, Meta Ads, desarrollo web",
    },
    ...(SOCIAL_PROFILE_URLS.length ? { sameAs: SOCIAL_PROFILE_URLS } : {}),
  };
}

/**
 * The service provider. A `ProfessionalService` (a LocalBusiness subtype) that
 * lives on this domain and is named after Lucas, because he is who you hire.
 *
 * No `streetAddress` on purpose: this is a service-area business with no
 * verifiable storefront, and inventing an address — or borrowing a coworking
 * one — is the fastest route to a Google Business Profile suspension.
 */
export function businessSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": BUSINESS_ID,
    name: BUSINESS_NAME,
    /* Las dos formas en que se nombra el mismo trabajo. "Community manager" es
       con la que se busca en España y no aparecía en ningún nodo del grafo. */
    alternateName: [
      "Lucas Álvarez · Social media manager en Barcelona",
      "Lucas Álvarez · Community manager en Barcelona",
    ],
    description: BUSINESS_DESCRIPTION,
    url: SITE_URL,
    image: `${SITE_URL}/images/lucas-alvarez.jpg`,
    email: CONTACT.email,
    telephone: CONTACT.phoneDisplay,
    founder: { "@id": PERSON_ID },
    employee: { "@id": PERSON_ID },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barcelona",
      addressRegion: "Cataluña",
      addressCountry: "ES",
    },
    areaServed: [
      { "@type": "City", name: "Barcelona" },
      { "@type": "AdministrativeArea", name: "Cataluña" },
      { "@type": "Country", name: "España" },
    ],
    priceRange: "€€",
    currenciesAccepted: "EUR",
    knowsLanguage: ["es", "ca", "en"],
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT.email,
      telephone: CONTACT.phoneDisplay,
      contactType: "customer service",
      areaServed: "ES",
      availableLanguage: ["Spanish", "Catalan", "English"],
    },
    ...(SOCIAL_PROFILE_URLS.length ? { sameAs: SOCIAL_PROFILE_URLS } : {}),
  };
}

/**
 * Publiqo, kept as a credibility signal and nothing more.
 *
 * Deliberately minimal: no telephone, email, address or areaServed. This domain
 * does not get to publish a third party's NAP, and duplicating it from a site
 * Publiqo does not control is a citation-consistency liability. The node exists
 * so `Person.worksFor` resolves to something real.
 */
export function publiqoSchema() {
  return {
    "@type": "Organization",
    "@id": PUBLIQO_ID,
    name: "Publiqo",
    description:
      "Agencia de marketing digital en Barcelona cofundada por Lucas Álvarez.",
    url: PUBLIQO_URL,
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo-publiqo.svg`,
    },
    founder: [{ "@id": PERSON_ID }, { "@type": "Person", name: "Martí" }],
    ...(ORGANIZATION_PROFILE_URLS.length
      ? { sameAs: ORGANIZATION_PROFILE_URLS }
      : {}),
  };
}

export function webSiteSchema() {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE_URL,
    name: SITE_NAME,
    description: SITE_DESCRIPTION,
    inLanguage: SITE_LANG,
    publisher: { "@id": BUSINESS_ID },
    copyrightHolder: { "@id": PERSON_ID },
  };
}

/** Emitted once from the root layout, so every page carries the entity graph. */
export function siteGraph() {
  return graph(
    personSchema(),
    businessSchema(),
    publiqoSchema(),
    webSiteSchema(),
  );
}

type Crumb = { name: string; path: string };

/** BreadcrumbList for any page. "Inicio" is prepended automatically. */
export function breadcrumbSchema(crumbs: Crumb[]) {
  return {
    "@context": CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Inicio", path: "" }, ...crumbs].map(
      (crumb, index) => ({
        "@type": "ListItem",
        position: index + 1,
        name: crumb.name,
        item: `${SITE_URL}${crumb.path}`,
      })
    ),
  };
}

/**
 * A published starting price.
 *
 * `minPrice` rather than `price`, and deliberately: every figure on this site
 * is a floor ("desde 490 €"). Asserting a flat `price` for a starting point
 * is a false claim, and a generative engine will quote it back verbatim.
 *
 * Worth being clear about the payoff: `Service` is not eligible for a price
 * rich result in Google. This markup buys entity comprehension and citation in
 * AI answers to "cuánto cuesta…", not a price chip in the SERP. The visible
 * price block is what does the conversion work.
 */
function offerNode(url: string, pricing: ServicePricing) {
  return {
    "@type": "Offer",
    "@id": `${url}#offer`,
    url,
    priceCurrency: "EUR",
    availability: "https://schema.org/InStock",
    seller: { "@id": BUSINESS_ID },
    eligibleRegion: { "@type": "Country", name: "ES" },
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      minPrice: pricing.from,
      priceCurrency: "EUR",
      unitText: pricing.per ?? "proyecto",
      /* A monthly billing increment on a one-off project fee would be a
         contradiction in the data, so it only ships on retainers. */
      ...(pricing.per === "mes"
        ? {
            referenceQuantity: {
              "@type": "QuantitativeValue",
              value: 1,
              unitCode: "MON",
            },
            billingIncrement: 1,
          }
        : {}),
    },
  };
}

function serviceNode(service: Service) {
  const url = `${SITE_URL}/servicios/${service.slug}`;

  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: service.h1,
    ...(service.alternateName
      ? { alternateName: service.alternateName }
      : {}),
    serviceType: service.title,
    description: service.description,
    url,
    provider: { "@id": BUSINESS_ID },
    areaServed: [
      { "@type": "City", name: "Barcelona" },
      { "@type": "AdministrativeArea", name: "Cataluña" },
      { "@type": "Country", name: "España" },
    ],
    offers: offerNode(url, service.pricing),
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
      servicePhone: CONTACT.phoneDisplay,
    },
  };
}

/**
 * The catalogue of everything on sale, as a *partial* node re-declaring
 * `BUSINESS_ID`. `@graph` merges nodes that share an `@id`, so this augments
 * the site-wide business node instead of duplicating it.
 *
 * Not emitted site-wide on purpose: `siteGraph()` ships on every document, and
 * adding the catalogue to all of them is real weight for no marginal signal. It
 * goes only where the question it answers is actually being asked.
 */
function offerCatalogNode() {
  return {
    "@id": BUSINESS_ID,
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicios de marketing digital en Barcelona",
      itemListElement: SERVICES.map((service) => ({
        "@type": "Offer",
        "@id": `${SITE_URL}/servicios/${service.slug}#offer`,
        itemOffered: {
          "@id": `${SITE_URL}/servicios/${service.slug}#service`,
        },
      })),
    },
  };
}

/**
 * The home page as a node of its own. It had none: the only JSON-LD it carried
 * was the site-wide graph, so the strongest page on the site described the
 * entity without ever describing itself.
 *
 * `WebPage` and not `ProfilePage`, because `/sobre-mi` is already the
 * `ProfilePage` and `Person.mainEntityOfPage` points there. Two profile pages
 * for one person split exactly the signal this consolidation exists to gather.
 */
export function homeGraph(name: string) {
  return graph(
    {
      "@type": "WebPage",
      "@id": HOME_PAGE_ID,
      url: SITE_URL,
      name,
      description: SITE_DESCRIPTION,
      inLanguage: SITE_LANG,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": BUSINESS_ID },
      primaryImageOfPage: {
        "@type": "ImageObject",
        url: `${SITE_URL}/images/lucas-alvarez.jpg`,
      },
    },
    offerCatalogNode(),
  );
}

/**
 * The pricing page.
 *
 * This is the page most likely to be the source an AI answer cites for
 * "cuánto cuesta un social media manager en Barcelona", so it carries the
 * catalogue with every Offer resolved rather than referenced.
 */
export function pricingGraph() {
  const url = `${SITE_URL}/precios`;

  return graph(
    {
      "@type": "WebPage",
      "@id": `${url}#page`,
      url,
      name: "Precios de gestión de redes sociales, contenido y SEO en Barcelona",
      inLanguage: SITE_LANG,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": BUSINESS_ID },
      mainEntity: {
        "@type": "OfferCatalog",
        name: "Precios de servicios de marketing digital",
        itemListElement: SERVICES.map((service) =>
          offerNode(`${SITE_URL}/servicios/${service.slug}`, service.pricing),
        ),
      },
    },
    offerCatalogNode(),
  );
}

/**
 * A sector landing page.
 *
 * `audience` is the field that keeps these from reading as one Service node
 * copied N times: it states, in the graph, that this is a distinct offering
 * aimed at a distinct kind of buyer. `isRelatedTo` points back at the parent so
 * the hierarchy in the URL is also expressed in the data.
 */
export function sectorGraph(
  page: SectorPage,
  service: Service,
  sector: Sector,
) {
  const url = `${SITE_URL}/servicios/${page.service}/${page.sector}`;
  const faq = faqSchema(page.faq, url);

  return graph(
    {
      "@type": "Service",
      "@id": `${url}#service`,
      name: page.h1,
      serviceType: service.title,
      description: page.metaDescription,
      url,
      provider: { "@id": BUSINESS_ID },
      audience: {
        "@type": "BusinessAudience",
        name: sector.name,
        audienceType: sector.label,
      },
      areaServed: [
        { "@type": "City", name: "Barcelona" },
        { "@type": "AdministrativeArea", name: "Cataluña" },
        { "@type": "Country", name: "España" },
      ],
      offers: offerNode(url, page.pricing ?? service.pricing),
      isRelatedTo: {
        "@id": `${SITE_URL}/servicios/${page.service}#service`,
      },
    },
    {
      "@type": "WebPage",
      "@id": `${url}#page`,
      url,
      name: page.h1,
      description: page.metaDescription,
      inLanguage: SITE_LANG,
      isPartOf: { "@id": WEBSITE_ID },
      about: { "@id": `${url}#service` },
    },
    ...(faq ? [faq] : []),
  );
}

/** Everything a single service page needs: the Service node and its FAQ. */
export function serviceGraph(service: Service) {
  const url = `${SITE_URL}/servicios/${service.slug}`;
  const faq = faqSchema(service.faq, url);

  return graph(serviceNode(service), ...(faq ? [faq] : []));
}

/** The services index: an ItemList of every service, plus the service nodes. */
export function servicesGraph() {
  return graph(
    {
      "@type": "CollectionPage",
      "@id": `${SITE_URL}/servicios#page`,
      url: `${SITE_URL}/servicios`,
      name: "Servicios",
      inLanguage: SITE_LANG,
      isPartOf: { "@id": WEBSITE_ID },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: SERVICES.map((service, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${SITE_URL}/servicios/${service.slug}`,
          name: service.title,
        })),
      },
    },
    ...SERVICES.map(serviceNode),
    offerCatalogNode(),
  );
}

/**
 * `url` binds the FAQPage to a page instead of leaving it floating; the blog
 * calls this without one and is unaffected.
 *
 * Two rules the callers have to hold up, because schema cannot enforce them:
 * one FAQPage per document, and the array passed here must be the same array
 * rendered by `<FaqSection>`. Marking up questions a visitor cannot see is the
 * single most common cause of a structured-data manual action.
 *
 * Note on payoff: Google withdrew FAQ rich results for non-government and
 * non-health sites in 2023. This earns AI citation and entity comprehension,
 * not a SERP accordion.
 */
export function faqSchema(
  faq?: { question: string; answer: string }[],
  url?: string,
) {
  if (!faq?.length) return null;

  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
    ...(url
      ? { "@id": `${url}#faq`, url, mainEntityOfPage: { "@id": url } }
      : {}),
    inLanguage: SITE_LANG,
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

/** The blog index: a Blog node listing every post, newest first. */
export function blogGraph(posts: PostMeta[]) {
  return graph({
    "@type": "Blog",
    "@id": `${SITE_URL}/blog#blog`,
    url: `${SITE_URL}/blog`,
    name: `Blog de ${SITE_NAME}`,
    description:
      "Cómo elegir agencia de marketing digital, SEO, diseño web o gestión de redes sociales en Barcelona.",
    inLanguage: SITE_LANG,
    isPartOf: { "@id": WEBSITE_ID },
    publisher: { "@id": BUSINESS_ID },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}/blog/${post.slug}#post`,
      headline: post.title,
      url: `${SITE_URL}/blog/${post.slug}`,
      datePublished: post.date,
      dateModified: post.updated ?? post.date,
      author: { "@id": PERSON_ID },
    })),
  });
}

/**
 * The ranking as an ItemList.
 *
 * The comparison table is the block AI answers quote most from these pages, so
 * it is worth handing over already parsed: position, name and the one-line
 * description, in the order the article defends. `ItemListOrderDescending`
 * because position 1 is the recommendation, not the first row alphabetically.
 */
export function rankingSchema(post: PostFrontmatter) {
  if (!post.ranking?.length) return null;

  const url = `${SITE_URL}/blog/${post.slug}`;

  return {
    "@context": CONTEXT,
    "@type": "ItemList",
    "@id": `${url}#ranking`,
    name: post.title,
    itemListOrder: "https://schema.org/ItemListOrderDescending",
    numberOfItems: post.ranking.length,
    itemListElement: post.ranking.map((entry) => ({
      "@type": "ListItem",
      position: entry.position,
      name: entry.name,
      description: entry.specialty,
      url: `${url}#${entry.anchor}`,
    })),
  };
}

/** A topic hub: the cluster page listing every post on one subject. */
export function topicGraph(
  topic: { tag: string; title: string; description: string },
  posts: PostMeta[],
) {
  const url = `${SITE_URL}/blog/tema/${topic.tag}`;

  return graph({
    "@type": "CollectionPage",
    "@id": `${url}#page`,
    url,
    name: topic.title,
    description: topic.description,
    inLanguage: SITE_LANG,
    isPartOf: { "@id": `${SITE_URL}/blog#blog` },
    about: topic.title,
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: posts.length,
      itemListElement: posts.map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/blog/${post.slug}`,
        name: post.title,
      })),
    },
  });
}

export function blogPostingSchema(post: PostFrontmatter, wordCount: number) {
  const url = `${SITE_URL}/blog/${post.slug}`;

  return graph({
    "@type": "BlogPosting",
    "@id": `${url}#post`,
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.updated ?? post.date,
    inLanguage: SITE_LANG,
    wordCount,
    keywords: post.tags?.join(", "),
    articleSection: post.tags?.[0]?.replace(/-/g, " "),
    /*
     * Two images, and they do different jobs: the cover is the artwork that
     * appears on the page and carries the post's own figure, the OG card is
     * the 1200x630 raster social platforms need. Declaring both gives Google
     * something to index for the article and something to show in a share.
     */
    image: [
      {
        "@type": "ImageObject",
        url: `${url}/cover.svg`,
        width: 1200,
        height: 675,
        caption: coverAlt(post.cover),
        encodingFormat: "image/svg+xml",
      },
      {
        "@type": "ImageObject",
        url: `${url}/opengraph-image`,
        width: 1200,
        height: 630,
      },
    ],
    author: { "@id": PERSON_ID },
    publisher: { "@id": BUSINESS_ID },
    isPartOf: { "@id": `${SITE_URL}/blog#blog` },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  });
}

/** A case study is an Article about the client, not a page about Lucas. */
export function caseStudySchema(caseStudy: CaseStudy) {
  const url = `${SITE_URL}/casos-de-exito/${caseStudy.slug}`;

  return graph({
    "@type": "Article",
    "@id": `${url}#article`,
    headline: `${caseStudy.client}: ${caseStudy.headline}`,
    description: caseStudy.metaDescription,
    datePublished: caseStudy.published,
    dateModified: caseStudy.updated,
    inLanguage: SITE_LANG,
    image: {
      "@type": "ImageObject",
      url: `${url}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    about: {
      "@type": "Organization",
      name: caseStudy.client,
      ...(caseStudy.link ? { url: caseStudy.link } : {}),
    },
    author: { "@id": PERSON_ID },
    publisher: { "@id": BUSINESS_ID },
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
  });
}

export function caseStudiesGraph(caseStudies: CaseStudy[]) {
  return graph({
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/casos-de-exito#page`,
    url: `${SITE_URL}/casos-de-exito`,
    name: "Casos de éxito",
    inLanguage: SITE_LANG,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: caseStudies.map((caseStudy, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${SITE_URL}/casos-de-exito/${caseStudy.slug}`,
        name: `${caseStudy.client}: ${caseStudy.headline}`,
      })),
    },
  });
}

export function profilePageSchema() {
  return graph({
    "@type": "ProfilePage",
    "@id": `${SITE_URL}/sobre-mi#page`,
    url: `${SITE_URL}/sobre-mi`,
    name: "Sobre mí",
    inLanguage: SITE_LANG,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": PERSON_ID },
  });
}

export function contactPageSchema() {
  return graph({
    "@type": "ContactPage",
    "@id": `${SITE_URL}/contacto#page`,
    url: `${SITE_URL}/contacto`,
    name: "Contacto",
    inLanguage: SITE_LANG,
    isPartOf: { "@id": WEBSITE_ID },
    mainEntity: { "@id": BUSINESS_ID },
  });
}
