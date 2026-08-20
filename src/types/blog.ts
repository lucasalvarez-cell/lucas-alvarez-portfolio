/** One question/answer pair, rendered as an accordion and as FAQPage schema. */
export type FaqItem = {
  question: string;
  answer: string;
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
  coverImage: string;
  coverImageAlt: string;
  /** Optional: shown after the body and emitted as FAQPage structured data. */
  faq?: FaqItem[];
};

export type PostMeta = PostFrontmatter;

export type Post = PostFrontmatter & {
  content: string;
};
