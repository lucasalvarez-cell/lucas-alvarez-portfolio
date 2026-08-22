export type CaseStudy = {
  slug: string;
  client: string;
  /**
   * The headline result in a few words. Carries the page <title>, the H1 kicker
   * and the OG card, so a listing entry reads as a result and not just a name.
   */
  headline: string;
  /**
   * SEO meta description. Written to fit a SERP snippet — `result` is prose and
   * runs far past the ~160 characters Google shows.
   */
  metaDescription: string;
  /**
   * ISO date the case first went live, for `datePublished`. Kept separate from
   * `updated`: reusing one date for both makes every case claim it was
   * published on the day it was last edited, which reads as churn.
   */
  published: string;
  /** ISO date of the last substantive update, for `dateModified` and sitemaps. */
  updated: string;
  sector: string;
  challenge: string;
  whatWeDid: string;
  result: string;
  stats?: { label: string; value: string }[];
  isPlaceholder: boolean;
  link?: string;
  /** Cover image. Falls back to a themed placeholder when absent. */
  image?: string;
  imageAlt?: string;
  /** Client logo shown on a branded tile in the portfolio grid and case hero. */
  logo?: string;
  /** Background color (hex) for the logo tile, matching the brand. */
  logoBg?: string;
};
