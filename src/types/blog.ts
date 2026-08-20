/** One question/answer pair, rendered as an accordion and as FAQPage schema. */
export type FaqItem = {
  question: string;
  answer: string;
};

export type PostFrontmatter = {
  title: string;
  description: string;
  date: string;
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
