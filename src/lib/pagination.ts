import type { PostMeta } from "@/types/blog";

/**
 * 24 per page: eight rows of the three-column grid on desktop, which is about
 * as far as anyone scrolls a card list before giving up. At 138 posts a single
 * page would be one very long document whose last forty cards nobody reaches
 * and whose weight is paid on every visit.
 */
export const POSTS_PER_PAGE = 24;

/** Page 1 also carries the pillar card, so it holds one more than the rest. */
export function pageCount(total: number): number {
  return Math.max(1, Math.ceil(total / POSTS_PER_PAGE));
}

export function pageSlice(posts: PostMeta[], page: number): PostMeta[] {
  const start = (page - 1) * POSTS_PER_PAGE;
  return posts.slice(start, start + POSTS_PER_PAGE);
}

/**
 * Page 1 lives at /blog, not /blog/pagina/1. Two URLs listing the same posts
 * is the most common way a paginated blog splits its own signals.
 */
export function pagePath(page: number): string {
  return page <= 1 ? "/blog" : `/blog/pagina/${page}`;
}
