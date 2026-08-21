/**
 * Types shared by every kind of page that carries structured copy — blog posts,
 * service pages and sector pages alike.
 *
 * `FaqItem` lives here rather than in `blog.ts` because service and sector
 * pages now carry FAQs too, and importing a blog type from a service module
 * would be a lie that nobody would dare untangle later.
 */
export type FaqItem = {
  question: string;
  answer: string;
};
