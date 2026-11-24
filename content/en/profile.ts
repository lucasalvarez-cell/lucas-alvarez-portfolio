/**
 * Lucas's professional profile in English: the /en page, its schema and the
 * English half of llms.txt all read from here.
 *
 * Source of truth for the facts: ~/Documents/personal/CONTEXTO-LABORAL.md and
 * the resume in ~/Documents/personal/cv. When either changes, this file changes
 * with it (and the resume PDF in /public is exported again).
 */

export const EN_TITLE = "Head of Marketing · Growth, Content & Paid Media";

export const EN_TAGLINE =
  "I run the whole marketing function and make it ship more with fewer people.";

/** Written to be lifted whole when an engine is asked who Lucas is. */
export const EN_BIO =
  "Lucas Álvarez Blanco is a marketing lead based in Barcelona, Spain, and co-founder of Publiqo, a marketing agency that works as the outsourced marketing department of its clients. He has over four years of experience running growth end to end (strategy, brand, content, paid media, SEO, web and analytics), grew his own fitness brand to more than 110,000 Instagram followers organically and is a Gymshark ambassador. Trained in computer engineering, he audits businesses as systems and has rebuilt his agency's delivery around AI workflows. He works remotely on US Eastern hours.";

export const EN_AVAILABILITY =
  "Open to remote marketing leadership roles · Working hours fully overlap US Eastern Time (9am–5pm ET)";

export const EN_PROOF: { value: string; label: string }[] = [
  { value: "110K+", label: "Instagram followers on my own brand, built from zero with no ad spend" },
  { value: "2M+", label: "monthly views on my own content; Gymshark ambassador" },
  { value: "+483%", label: "views in one month for a client media brand, fully organic" },
  { value: "6 channels", label: "owned end to end: brand, web, SEO/GEO, paid, social, video" },
];

export const EN_PILLARS: { title: string; body: string }[] = [
  {
    title: "I run the whole function",
    body: "Audit, strategy, budget, execution and reporting across brand, web, SEO, paid media, social and video. Campaigns are judged on leads and sales, not on clicks.",
  },
  {
    title: "I build audiences myself",
    body: "110K+ followers and 2M+ monthly views on my own brand, all organic. I know from the inside what makes content travel, and I test every method on my account before a client's.",
  },
  {
    title: "I make teams faster with AI",
    body: "Engineering training plus a dozen AI agent workflows I built for video editing, scripting, ad builds, SEO and reporting. Output and quality go up while headcount stays flat.",
  },
];

export type Role = {
  title: string;
  org?: string;
  dates: string;
  place?: string;
  points: string[];
};

export const EN_EXPERIENCE: Role[] = [
  {
    title: "Co-founder · Head of Growth & Digital Strategy",
    org: "Publiqo",
    dates: "Aug 2024 – Present",
    place: "Barcelona",
    points: [
      "Lead the full marketing function for clients in industrial B2B, SaaS, hospitality and media: audit, strategy, budget, execution and reporting against revenue KPIs.",
      "Content and social: format and scripting strategies that multiplied reach, +483% views in a month for a media brand, +250% and 6× for hospitality brands, +82% median views per video for a SaaS channel. All organic.",
      "Demand generation: rebuilt an industrial manufacturer's website and quote funnel, then launched paid search, doubling inbound quote requests; built a B2B brand's organic acquisition channel from zero.",
      "Paid media and analytics: Google, Meta, TikTok and LinkedIn Ads, with GA4 and Google Tag Manager tracking and leads routed into CRM.",
      "Brand: naming, visual identity and brand guidelines.",
    ],
  },
  {
    title: "Freelance Social Media Manager",
    dates: "2022 – Jul 2024",
    place: "Barcelona",
    points: [
      "Social media for local businesses: strategy, short-form video, design, copywriting and community management. Became Publiqo in 2024.",
    ],
  },
  {
    title: "Webmaster & Community Manager",
    org: "IBPRINT",
    dates: "Jan 2022 – Jan 2024 · part-time",
    points: [
      "Website, product pages and social channels of a printing machinery manufacturer. Now an agency client.",
    ],
  },
  {
    title: "IT Intern, Software QA",
    org: "Barcelona City Council",
    dates: "Jan 2024 – Jul 2024",
    points: [
      "Tested municipal software before release and documented defects. Nothing I publish goes live untested.",
    ],
  },
  {
    title: "Creator",
    org: "@lucasalvarez.x",
    dates: "Ongoing",
    points: [
      "Fitness and lifestyle brand with 110K+ followers and 2M+ monthly views, 100% organic. Gymshark ambassador and paid brand partnerships.",
    ],
  },
];

export const EN_AI_WORKFLOWS: { title: string; body: string }[] = [
  {
    title: "Video and scripting",
    body: "A reel-editing pipeline in Remotion with hooks, captions and brand rules built in, plus scripting guides. Fewer dedicated editors needed.",
  },
  {
    title: "Paid media",
    body: "Google Ads builds from Semrush research to bulk upload, and Meta Ads lead-generation setup, audits and recurring optimization with human sign-off.",
  },
  {
    title: "Content and operations",
    body: "Carousels for any brand from its design tokens, new client sites with full tracking (GA4, GTM, Ads) in one run, LinkedIn prospecting and bookkeeping.",
  },
  {
    title: "GoFeed",
    body: "Co-built the agency's operations platform (scheduling, CRM, approvals, client reporting), now a SaaS with mobile apps.",
  },
];

export const EN_SKILLS: { group: string; items: string }[] = [
  { group: "Growth & strategy", items: "Business and funnel audits, go-to-market, positioning, CRO, budgeting and forecasting models" },
  { group: "Paid media & SEO", items: "Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads · technical, content and local SEO, AI search visibility (GEO), Semrush" },
  { group: "Content & social", items: "Strategy, scripting, short-form video, community management, creator partnerships" },
  { group: "Data, web & AI", items: "GA4, Google Tag Manager, Search Console, SQL, Next.js, Shopify, CRM setup · Claude Code, AI agents, ChatGPT, ElevenLabs, Remotion" },
];

export const EN_EDUCATION: { title: string; org: string; dates: string }[] = [
  {
    title: "B.S. Informatics Engineering, Information Systems track",
    org: "Universitat Politècnica de Catalunya (UPC), Barcelona",
    dates: "2020 – Present",
  },
  {
    title: "French Baccalauréat",
    org: "Lycée International Barcelona Bon Soleil",
    dates: "2020",
  },
];

export const EN_LANGUAGES = "Spanish and Catalan (native) · English (C1) · French (C1)";

/** Rendered and marked up from the same array: one FAQPage per document. */
export const EN_FAQ: { question: string; answer: string }[] = [
  {
    question: "Who is Lucas Álvarez?",
    answer:
      "Lucas Álvarez Blanco is a Barcelona-based marketing lead and co-founder of Publiqo, a marketing agency that acts as the outsourced marketing department of its clients. He runs strategy, brand, content, paid media, SEO and analytics end to end, and grew his own fitness brand, @lucasalvarez.x, to more than 110,000 Instagram followers without paid promotion.",
  },
  {
    question: "Is Lucas Álvarez available for remote roles with US companies?",
    answer:
      "Yes. He is open to remote marketing leadership roles (Head of Marketing, Marketing Lead, Growth Lead) and works fully on US Eastern hours, 9am to 5pm ET, from Barcelona.",
  },
  {
    question: "What results has he delivered?",
    answer:
      "Published with client names: +483% views in one month for the media brand Reino Selva (2.6M views), six times more views for Camping Victòria, +250% in a month for Camping Collvert and +82% median views per video for the SaaS company Zernio's YouTube channel, all without ad spend. For an industrial manufacturer he rebuilt the site and quote funnel and then launched paid search, doubling inbound quote requests.",
  },
  {
    question: "How does he use AI in marketing?",
    answer:
      "He has built a dozen AI agent workflows that run his agency's recurring work: video editing and scripting, Google and Meta Ads builds, SEO audits, content production, client reporting and onboarding. The point is not novelty but throughput: a small team ships the volume and quality of a much larger one.",
  },
  {
    question: "Does he speak Spanish for US Hispanic or Latin American marketing?",
    answer:
      "Yes. Spanish and Catalan are his native languages, and his own content reaches audiences across Spain and Latin America. He also works in English and French.",
  },
];
