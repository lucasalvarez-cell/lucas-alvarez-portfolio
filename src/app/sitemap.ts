import type { MetadataRoute } from "next";
import { SERVICES, SITE_URL } from "@/lib/constants";
import { getAllPosts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/sobre-mi",
    "/servicios",
    "/casos-de-exito",
    "/blog",
    "/contacto",
  ].map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date(),
  }));

  const serviceRoutes = SERVICES.map((service) => ({
    url: `${SITE_URL}/servicios/${service.slug}`,
    lastModified: new Date(),
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: `${SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.date),
  }));

  return [...staticRoutes, ...serviceRoutes, ...postRoutes];
}
