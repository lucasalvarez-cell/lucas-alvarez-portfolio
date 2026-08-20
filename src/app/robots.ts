import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* Next's internal build assets carry no crawlable content and only
           burn crawl budget. The image optimiser stays open so Google Images
           can still fetch the served variants. */
        disallow: ["/_next/static/chunks/", "/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
