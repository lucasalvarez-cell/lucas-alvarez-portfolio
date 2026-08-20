import type { Metadata } from "next";
import { SITE_LOCALE, SITE_NAME, SITE_URL } from "./constants";

/**
 * Serve full snippets and large image previews. Without this Google caps text
 * previews and thumbnails, which costs CTR in the SERP and in Discover.
 */
const ROBOTS: Metadata["robots"] = {
  index: true,
  follow: true,
  googleBot: {
    index: true,
    follow: true,
    "max-snippet": -1,
    "max-image-preview": "large",
    "max-video-preview": -1,
  },
};

type ArticleFields = {
  publishedTime: string;
  modifiedTime?: string;
  section?: string;
  tags?: string[];
};

type BuildMetadataOptions = {
  title: string;
  description: string;
  path: string;
  /**
   * Only for a segment with no `opengraph-image.tsx` of its own. Setting this
   * overrides the segment's generated card, so normally leave it undefined.
   */
  image?: string;
  /** Present on blog posts: switches `og:type` to `article`. */
  article?: ArticleFields;
};

/**
 * Google renders roughly 60 characters of a title. The root layout appends
 * " | Lucas Alvarez", which is worth the space on a short title and is dead
 * weight on a long one — it just gets truncated away, taking real words with
 * it. Past the budget the page opts out of the template instead.
 */
const TITLE_BUDGET = 60;
const TITLE_SUFFIX_LENGTH = ` | ${SITE_NAME}`.length;

function resolveTitle(title: string): Metadata["title"] {
  return title.length + TITLE_SUFFIX_LENGTH > TITLE_BUDGET
    ? { absolute: title }
    : title;
}

/** Trims to the last full word inside `max`, so SERP snippets do not cut mid-word. */
export function clampDescription(text: string, max = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;

  const cut = clean.slice(0, max - 1);
  const lastBreak = Math.max(cut.lastIndexOf(" "), cut.lastIndexOf(", "));
  return `${cut.slice(0, lastBreak > max * 0.6 ? lastBreak : cut.length).replace(/[.,;:\s]+$/, "")}…`;
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  article,
}: BuildMetadataOptions): Metadata {
  const url = `${SITE_URL}${path}`;
  const clamped = clampDescription(description);

  return {
    title: resolveTitle(title),
    description: clamped,
    alternates: { canonical: path },
    robots: ROBOTS,
    openGraph: {
      title,
      description: clamped,
      url,
      siteName: SITE_NAME,
      locale: SITE_LOCALE,
      ...(article
        ? {
            type: "article" as const,
            publishedTime: article.publishedTime,
            modifiedTime: article.modifiedTime ?? article.publishedTime,
            authors: [SITE_URL],
            section: article.section,
            tags: article.tags,
          }
        : { type: "website" as const }),
      ...(image ? { images: [image] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: clamped,
      ...(image ? { images: [image] } : {}),
    },
  };
}

export { ROBOTS };
