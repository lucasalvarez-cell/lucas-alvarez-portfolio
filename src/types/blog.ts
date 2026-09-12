/** One question/answer pair, rendered as an accordion and as FAQPage schema. */
/* Re-exported so existing blog imports keep working; the canonical
   definition is shared with service and sector pages. */
export type { FaqItem } from "./content";
import type { FaqItem } from "./content";

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
