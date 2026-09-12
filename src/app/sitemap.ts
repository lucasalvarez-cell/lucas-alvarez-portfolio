import type { MetadataRoute } from "next";
import { SERVICES, SITE_URL } from "@/lib/constants";
import { SECTOR_PAGES, assertSectorPages } from "@/content/sectores";
import { getAllPosts } from "@/lib/blog";
import { activeTopics, postsByTopic } from "@/lib/topics";
import { getPublishedCaseStudies } from "@/content/casos-de-exito";

/**
 * `lastModified` is a ranking-neutral crawl hint, but a wrong one is worse than
 * none: stamping every static route with the build time tells Google the whole
 * site changed on every deploy and it starts ignoring the field. Static routes
 * therefore inherit the newest date of the content they list.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const caseStudies = getPublishedCaseStudies();

  const newest = (dates: string[]) =>
    new Date(dates.sort().at(-1) ?? new Date().toISOString());

  const latestPost = newest(posts.map((post) => post.updated ?? post.date));
  const latestCase = newest(caseStudies.map((caseStudy) => caseStudy.updated));
  const latestOverall = new Date(
    Math.max(latestPost.getTime(), latestCase.getTime())
  );

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      /* Sin barra final, igual que la canónica que declara la home. Google
         normaliza las dos formas al mismo destino, pero anunciar en el sitemap
         una URL distinta de la canónica es pedirle que elija, y no hay ninguna
         razón para dejarle esa elección. */
      url: SITE_URL,
      lastModified: latestOverall,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${SITE_URL}/servicios`,
      lastModified: latestOverall,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/precios`,
      lastModified: latestOverall,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/casos-de-exito`,
      lastModified: latestCase,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/blog`,
      lastModified: latestPost,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${SITE_URL}/sobre-mi`,
      lastModified: latestOverall,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/contacto`,
      lastModified: latestOverall,
      changeFrequency: "yearly",
      priority: 0.7,
    },
    {
      url: `${SITE_URL}/politica-privacidad`,
      lastModified: latestOverall,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${SITE_URL}/politica-cookies`,
      lastModified: latestOverall,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  /* Throws if a sector page is thin or recycles an FAQ answer from another. */
  assertSectorPages();

  const sectorRoutes: MetadataRoute.Sitemap = SECTOR_PAGES.map((page) => ({
    url: `${SITE_URL}/servicios/${page.service}/${page.sector}`,
    /* Their own `updated`, not the site-wide latest: fourteen routes all
       stamped with the same date is the signal that makes Google stop reading
       the field at all. */
    lastModified: new Date(page.updated),
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  const serviceRoutes: MetadataRoute.Sitemap = SERVICES.map((service) => ({
    url: `${SITE_URL}/servicios/${service.slug}`,
    lastModified: latestOverall,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const caseStudyRoutes: MetadataRoute.Sitemap = caseStudies.map(
    (caseStudy) => ({
      url: `${SITE_URL}/casos-de-exito/${caseStudy.slug}`,
      lastModified: new Date(caseStudy.updated),
      changeFrequency: "yearly",
      priority: 0.7,
    })
  );

  const postRoutes: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.updated ?? post.date),
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  /* Topic hubs inherit the newest date among the posts they list. */
  const topicRoutes: MetadataRoute.Sitemap = activeTopics(posts).map(
    (topic) => ({
      url: `${SITE_URL}/blog/tema/${topic.tag}`,
      lastModified: newest(
        postsByTopic(posts, topic.tag).map((post) => post.updated ?? post.date)
      ),
      changeFrequency: "monthly",
      priority: 0.7,
    })
  );

  return [
    ...staticRoutes,
    ...serviceRoutes,
    ...sectorRoutes,
    ...caseStudyRoutes,
    ...topicRoutes,
    ...postRoutes,
  ];
}
