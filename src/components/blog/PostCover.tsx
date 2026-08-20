import { clsx } from "clsx";
import { coverAlt, coverUrl } from "@/lib/cover-svg";
import type { PostCover as CoverConfig } from "@/types/blog";

/**
 * The post's cover, as a crawlable image.
 *
 * Every post used to share one of six stock photos — work-03.jpg alone opened
 * six different articles. These covers are drawn from the post's own
 * frontmatter instead, so each one is unique, weighs about two kilobytes and
 * actually says something: the figure the article is about, how many entries
 * the ranking has, whether it is a guide or a comparison.
 *
 * A plain `<img>` rather than inline SVG: the drawing lives at its own URL, so
 * it can be indexed, cached and described with alt text. `next/image` is
 * deliberately skipped — the optimiser has nothing to gain on a 2 KB vector
 * and would only rasterise it.
 */
export function PostCover({
  cover,
  slug,
  className,
  priority = false,
}: {
  cover: CoverConfig;
  slug: string;
  className?: string;
  /** Set on the article hero, which is the LCP element. */
  priority?: boolean;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={coverUrl(slug)}
      alt={coverAlt(cover)}
      width={1200}
      height={675}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : undefined}
      decoding={priority ? "sync" : "async"}
      className={clsx("h-full w-full object-cover", className)}
    />
  );
}

export { coverAlt } from "@/lib/cover-svg";
