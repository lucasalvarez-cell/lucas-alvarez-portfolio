/** One question/answer pair, rendered as an accordion and as FAQPage schema. */
/* Re-exported so existing blog imports keep working; the canonical
   definition is shared with service and sector pages. */
export type { FaqItem } from "./content";
import type { FaqItem } from "./content";

/**
 * Drives the generated cover art. There is no photography on this blog on
 * purpose: a stock photo repeated across six posts is worse than no photo, and
 * a cover built from the post's own numbers carries information a photo can't.
 */
export type PostCover = {
  /** Tints the accent and picks the motif palette. */
  theme:
    | "seo"
    | "ads"
    | "social"
    | "web"
    | "content"
    | "audit"
    | "local";
  /** Which composition to draw. */
  kind: "metric" | "rank" | "guide" | "compare";
  /** `metric` covers: the headline figure, e.g. "×6" or "+250 %". */
  metric?: string;
  /** Caption under the figure or the rank, e.g. "Camping Victòria · 1 mes". */
  metricLabel?: string;
  /** Small uppercase label in the corner, e.g. "SEO · Barcelona". */
  kicker?: string;
};

/** One row of the at-a-glance table that opens every ranking post. */
export type RankingEntry = {
  position: number;
  name: string;
  /** One line: what this agency is actually for. */
  specialty: string;
  /** Who it fits — the column readers scan for themselves. */
  bestFor: string;
  /** Anchor id of the full entry further down the article. */
  anchor: string;
  /** Set on the entry the author is affiliated with, so the bias is visible. */
  disclosed?: boolean;
};

/** One criterion of the declared selection method. */
export type MethodologyItem = {
  name: string;
  detail: string;
};

export type PostFrontmatter = {
  title: string;
  /**
   * SEO <title>, when the editorial `title` runs past what Google renders.
   * The H1 always uses `title`; only the tab and the SERP use this.
   */
  metaTitle?: string;
  description: string;
  date: string;
  /** ISO date of the last substantive edit. Feeds `dateModified` and sitemaps. */
  updated?: string;
  slug: string;
  tags: string[];
  cover: PostCover;
  /**
   * The 40-70 word answer to the question in the title, placed above the fold
   * and written to stand on its own. This is the block AI search engines lift.
   */
  quickAnswer?: string;
  /** Three to five scannable conclusions. Rendered under the quick answer. */
  keyTakeaways?: string[];
  /** Ranking posts: the at-a-glance table and the ItemList schema. */
  ranking?: RankingEntry[];
  /** Ranking posts: the declared criteria, so the list is auditable. */
  methodology?: MethodologyItem[];
  /**
   * Ranking posts: the conflict-of-interest note, in this post's own words.
   * It used to be one hardcoded sentence rendered on all nine rankings, which
   * turned the one paragraph that has to read as candour into a form letter.
   */
  disclosure?: string;
  /** Marks the pillar of a topic cluster: featured on the index and in hubs. */
  pillar?: boolean;
  /** Optional: shown after the body and emitted as FAQPage structured data. */
  faq?: FaqItem[];
};

export type PostMeta = PostFrontmatter;

export type Post = PostFrontmatter & {
  content: string;
};
