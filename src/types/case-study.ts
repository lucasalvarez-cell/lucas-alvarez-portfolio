export type CaseStudy = {
  slug: string;
  client: string;
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
