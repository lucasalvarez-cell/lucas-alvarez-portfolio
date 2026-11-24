/**
 * Lucas's professional profile in English: the /en page, its schema and the
 * English half of llms.txt all read from here.
 *
 * Source of truth for the facts: ~/Documents/personal/CONTEXTO-LABORAL.md and
 * the resume in ~/Documents/personal/cv. When either changes, this file changes
 * with it (and the resume PDF in /public is exported again).
 */

export const EN_TITLE = "Marketing Lead · Growth, Content & Paid Media";

export const EN_TAGLINE =
  "I run marketing end to end, with strong creative judgment and a team that ships more by working smarter.";

/** Written to be lifted whole when an engine is asked who Lucas is. */
export const EN_BIO =
  "Lucas Álvarez Blanco is a marketing lead based in Barcelona, Spain, and co-founder of Publiqo, a marketing agency that works as the outsourced marketing department of SMBs. He has over four years of hands-on experience (strategy, brand, content, paid media, SEO, web and analytics), grew his own fitness brand to more than 110,000 Instagram followers organically and is a Gymshark ambassador. At Publiqo he owns the plan, the budget and the results for each client and leads the people who deliver the work. He is known for his creative judgment on social and paid social: hooks, video structures and formats that hold attention. Trained in computer engineering, he audits businesses as systems and uses AI as a tool to take repetitive work off his team, while strategy, creative and final decisions stay with people. He works remotely on US Eastern hours.";

export const EN_AVAILABILITY =
  "Open to remote marketing leadership roles · Working hours fully overlap US Eastern Time (9am–5pm ET)";

export const EN_PILLARS: { title: string; body: string }[] = [
  {
    title: "I run marketing and lead the team",
    body: "Audit, strategy, budget and reporting across brand, web, SEO, paid media, social and video. I set clear standards, review and correct when needed, and listen to other points of view, because I can be wrong too.",
  },
  {
    title: "I have creative judgment",
    body: "I know what works on social and why: hooks, video structures, formats and pacing, for organic content and for Meta Ads creative. Tested on my own brand: 110K+ followers and 2M+ monthly views, all organic.",
  },
  {
    title: "I make teams faster",
    body: "Engineering training plus a dozen AI-assisted workflows that take the repetitive parts of video editing, ad builds, audits and reporting off the team. I supervise every output and keep the decisions human, so we ship more without lowering the bar.",
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
    title: "Co-founder · Growth & Digital Strategy",
    org: "Publiqo",
    dates: "Aug 2024 – Present",
    place: "Barcelona",
    points: [
      "Run marketing for SMB clients in industrial B2B, SaaS, hospitality and media: audit, strategy, budget, execution and reporting against revenue KPIs.",
      "Team leadership: lead the people who deliver (designers, video editors, developers): set priorities and standards, brief and review their work, correct when needed and stay open to their point of view.",
      "Content and creative strategy: diagnose why content is not working (hooks, retention, format, audience) before producing more; write hooks, video structures and formats for organic social and Meta Ads creative, validate with data, then scale what works.",
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
    body: "First cuts, captions and brand formatting in Remotion, plus scripting templates, so editors spend their time on the creative instead of the mechanics. Every piece is reviewed before it goes out.",
  },
  {
    title: "Paid media",
    body: "Research and campaign build setup for Google Ads and Meta Ads, plus audit checklists. Targeting, creative, budget and every change are decided and approved by me.",
  },
  {
    title: "Content and operations",
    body: "Carousel production from brand templates, new client site and tracking setup (GA4, GTM, Ads), prospecting research and bookkeeping, all reviewed by the team.",
  },
  {
    title: "GoFeed",
    body: "Co-built the agency's operations platform (scheduling, CRM, approvals, client reporting), now a SaaS with mobile apps.",
  },
];

export const EN_SKILLS: { group: string; items: string }[] = [
  { group: "Growth & strategy", items: "Business and funnel audits, go-to-market, positioning, CRO, budgeting and forecasting models" },
  { group: "Paid media & SEO", items: "Google Ads, Meta Ads, TikTok Ads, LinkedIn Ads · technical, content and local SEO, AI search visibility (GEO), Semrush" },
  { group: "Content & creative", items: "Creative strategy (hooks, video structures, paid social creative), scripting, short-form video, community management, creator partnerships" },
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
      "As a tool, not a replacement. He has built a dozen AI-assisted workflows that take the repetitive, mechanical parts of his agency's work off the team: first video cuts, campaign build setup, audit checklists, content production and reporting. Strategy, creative and every final decision stay with people, and everything is reviewed before it goes out. The point is throughput: a small team ships more without lowering the bar.",
  },
  {
    question: "Does he speak Spanish for US Hispanic or Latin American marketing?",
    answer:
      "Yes. Spanish and Catalan are his native languages, and his own content reaches audiences across Spain and Latin America. He also works in English and French.",
  },
];
