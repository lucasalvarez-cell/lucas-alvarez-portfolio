import {
  CONTACT,
  SERVICES,
  SITE_DESCRIPTION,
  SITE_LANG,
  SITE_NAME,
  SITE_URL,
  SOCIAL_PROFILE_URLS,
} from "./constants";
import type { Service } from "./constants";
import type { PostFrontmatter, PostMeta } from "@/types/blog";
import type { CaseStudy } from "@/types/case-study";

const PERSON_ID = `${SITE_URL}/#person`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const WEBSITE_ID = `${SITE_URL}/#website`;

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
    jobTitle: "Estratega de contenido y social media manager",
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
      "Estrategia de contenido",
      "SEO",
      "Desarrollo web",
      "Google Ads",
      "Meta Ads",
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
    worksFor: { "@id": ORGANIZATION_ID },
    ...(SOCIAL_PROFILE_URLS.length ? { sameAs: SOCIAL_PROFILE_URLS } : {}),
  };
}

export function organizationSchema() {
  return {
    "@type": "ProfessionalService",
    "@id": ORGANIZATION_ID,
    name: "Publiqo",
    description:
      "Publiqo es una agencia de marketing digital en Barcelona especializada en gestión de redes sociales, estrategia de contenido, SEO, desarrollo web y campañas de Google Ads y Meta Ads.",
    url: "https://publiqo.es/",
    sameAs: ["https://publiqo.es/"],
    logo: {
      "@type": "ImageObject",
      url: `${SITE_URL}/logo-publiqo.svg`,
    },
    image: `${SITE_URL}/logo-publiqo.svg`,
    email: CONTACT.email,
    telephone: CONTACT.phoneDisplay,
    founder: [{ "@id": PERSON_ID }, { "@type": "Person", name: "Martí" }],
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
    knowsLanguage: ["es", "ca", "en"],
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT.email,
      telephone: CONTACT.phoneDisplay,
      contactType: "customer service",
      areaServed: "ES",
      availableLanguage: ["Spanish", "Catalan", "English"],
    },
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
    publisher: { "@id": PERSON_ID },
  };
}

/** Emitted once from the root layout, so every page carries the entity graph. */
export function siteGraph() {
  return graph(personSchema(), organizationSchema(), webSiteSchema());
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

function serviceNode(service: Service) {
  return {
    "@type": "Service",
    "@id": `${SITE_URL}/servicios/${service.slug}#service`,
    name: service.title,
    serviceType: service.title,
    description: service.description,
    url: `${SITE_URL}/servicios/${service.slug}`,
    provider: { "@id": ORGANIZATION_ID },
    areaServed: [
      { "@type": "City", name: "Barcelona" },
      { "@type": "Country", name: "España" },
    ],
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: `${SITE_URL}/servicios/${service.slug}`,
      servicePhone: CONTACT.phoneDisplay,
    },
  };
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
    ...SERVICES.map(serviceNode)
  );
}

export function serviceSchema(service: Service) {
  return graph(serviceNode(service));
}

export function faqSchema(faq?: { question: string; answer: string }[]) {
  if (!faq?.length) return null;

  return {
    "@context": CONTEXT,
    "@type": "FAQPage",
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
    publisher: { "@id": ORGANIZATION_ID },
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
    image: {
      "@type": "ImageObject",
      url: `${url}/opengraph-image`,
      width: 1200,
      height: 630,
    },
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORGANIZATION_ID },
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
    datePublished: caseStudy.updated,
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
    publisher: { "@id": ORGANIZATION_ID },
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
    mainEntity: { "@id": ORGANIZATION_ID },
  });
}
