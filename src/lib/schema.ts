import { CONTACT, SERVICES, SITE_URL, SOCIALS } from "./constants";
import type { Service } from "./constants";
import type { PostFrontmatter } from "@/types/blog";

const PERSON_ID = `${SITE_URL}/#person`;
const ORGANIZATION_ID = `${SITE_URL}/#organization`;

export function personSchema() {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: "Lucas Álvarez",
    jobTitle: "Estratega de contenido y social media manager",
    description:
      "Estratega digital en Barcelona y cofundador de Publiqo. Gestiona la estrategia de contenido y las redes sociales de marcas de turismo, industria y medios.",
    url: SITE_URL,
    email: CONTACT.email,
    worksFor: { "@id": ORGANIZATION_ID },
    sameAs: [SOCIALS.instagram.href],
  };
}

export function organizationSchema() {
  return {
    "@type": "Organization",
    "@id": ORGANIZATION_ID,
    name: "Publiqo",
    description:
      "Publiqo es una agencia de marketing digital en Barcelona especializada en gestión de redes sociales, estrategia de contenido, SEO, desarrollo web y campañas de Google Ads y Meta Ads.",
    url: "https://publiqo.es/",
    sameAs: ["https://publiqo.es/"],
    logo: `${SITE_URL}/logo-publiqo.svg`,
    founder: [{ "@id": PERSON_ID }, { name: "Martí" }],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Barcelona",
      addressCountry: "ES",
    },
    contactPoint: {
      "@type": "ContactPoint",
      email: CONTACT.email,
      telephone: CONTACT.phoneDisplay,
      contactType: "customer service",
      areaServed: "ES",
      availableLanguage: "Spanish",
    },
  };
}

export function personAndOrganizationGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [personSchema(), organizationSchema()],
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
    areaServed: ["Barcelona", "España"],
  };
}

export function servicesGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": SERVICES.map(serviceNode),
  };
}

export function serviceSchema(service: Service) {
  return {
    "@context": "https://schema.org",
    ...serviceNode(service),
  };
}

export function faqSchema(post: PostFrontmatter) {
  if (!post.faq?.length) return null;

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: post.faq.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: { "@type": "Answer", text: item.answer },
    })),
  };
}

export function breadcrumbSchema(post: PostFrontmatter) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Inicio", item: SITE_URL },
      {
        "@type": "ListItem",
        position: 2,
        name: "Blog",
        item: `${SITE_URL}/blog`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  };
}

export function blogPostingSchema(post: PostFrontmatter) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    image: `${SITE_URL}${post.coverImage}`,
    author: { "@id": PERSON_ID },
    publisher: { "@id": ORGANIZATION_ID },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}`,
    },
  };
}
