import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        /* JS and CSS under /_next/ stay crawlable on purpose: Googlebot renders
           the page before judging it, and blocking those files shows up as
           "blocked resource" and degrades how the page is assessed. AI crawlers
           (GPTBot, ClaudeBot, PerplexityBot, Google-Extended) are likewise left
           allowed — being citable is the point. */
        disallow: ["/api/"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
