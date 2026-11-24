/**
 * English versions of the case studies in `content/casos-de-exito.ts`.
 *
 * Same slugs on purpose: /casos-de-exito/{slug} and /en/case-studies/{slug}
 * are declared as hreflang pairs, so a case that exists here must exist there.
 * `assertEnglishCases()` fails the build if they drift apart.
 *
 * Written for a hiring manager, not translated line by line: shorter, with
 * the decision and the result up front. The figures are the same ones the
 * Spanish pages publish.
 */
import { getPublishedCaseStudies } from "@/content/casos-de-exito";

export type EnglishCaseStudy = {
  slug: string;
  client: string;
  headline: string;
  metaDescription: string;
  sector: string;
  published: string;
  updated: string;
  challenge: string;
  approach: string;
  result: string;
  lesson: string;
  stats: { label: string; value: string }[];
};

export const EN_CASE_STUDIES: EnglishCaseStudy[] = [
  {
    slug: "reino-selva",
    client: "Reino Selva",
    headline: "2.6M views in one month, +483%",
    metaDescription:
      "How Reino Selva went from flat growth to 2.6M views, 1.5M reach and 105.7K interactions in one month by rebuilding format and scripting, with no ad spend.",
    sector: "Media · Nature and documentary content",
    published: "2026-08-19",
    updated: "2026-11-24",
    challenge:
      "The account was publishing consistently and still had months of flat growth. Nature content competes with big-budget productions and viewers decide in the first seconds whether to stay. Publishing more of a format that does not retain only doubles the pieces nobody finishes, so frequency was not the lever.",
    approach:
      "I started with analysis, not production: where exactly retention dropped, which openings held and which lost the viewer, which pieces were shared and which only collected impressions. From that I redesigned the three parts of the system. Shooting, so the raw footage gave editing options. Scripting, written for the format: what to tell first, what to hold back and when to give the viewer a reason to keep watching. And video structure, where retention is won or lost after the hook. Every iteration was validated against the data of the previous one.",
    result:
      "In one month: 2.6M combined views on Instagram and Facebook (+482.9%), 1.5M reach (+691.4%) and 105.7K interactions (+443.6%), with peaks of +1,833% in views. Reach grew faster than views and interactions faster than reach, which means the content was not just reaching more people: the people it reached stayed and responded.",
    lesson:
      "Growth came from the format finally matching what the audience wanted to watch, not from publishing more or buying distribution.",
    stats: [
      { label: "Combined views", value: "2.6M (+482.9%)" },
      { label: "Reach", value: "1.5M (+691.4%)" },
      { label: "Interactions", value: "105.7K (+443.6%)" },
    ],
  },
  {
    slug: "camping-victoria",
    client: "Camping Victòria",
    headline: "6× views by validating the format before scaling",
    metaDescription:
      "Camping Victòria multiplied its views by six: format validated with data at one post a week, then frequency doubled on the winning format only.",
    sector: "Hospitality · Campsite on the Barcelona coast",
    published: "2026-08-19",
    updated: "2026-11-24",
    challenge:
      "One post a week and reach was not growing. The question was whether the problem was frequency or content, and it decides the whole budget: one answer means producing more every month, the other means producing more is wasted money. At one post a week there was not enough volume to tell from the outside.",
    approach:
      "I answered the question before spending money on it. First I kept the frequency and changed only the type of piece, judging formats on retention across comparable posts rather than total impressions. Only when the data clearly picked a winner did we go from one to two posts a week, duplicating that specific format, not the whole calendar.",
    result:
      "Views multiplied by six. Doubling the frequency of the wrong format would have changed nothing; doubling what already worked is what multiplied it by six.",
    lesson:
      "Frequency is a multiplier, not an engine. Validate first and scale second, even if it means a month of apparent stillness.",
    stats: [{ label: "Views", value: "6×" }],
  },
  {
    slug: "camping-collvert",
    client: "Camping Collvert",
    headline: "+250% views in the first month, same frequency, $0 ads",
    metaDescription:
      "Camping Collvert grew views 250% in the first month with no ad spend and no extra posts, by giving the account an editorial line, a format and a script.",
    sector: "Hospitality · Campsite",
    published: "2026-08-19",
    updated: "2026-11-24",
    challenge:
      "The account posted consistently but without criteria: every piece was a different experiment in tone, length and topic. Nothing accumulated, viewers did not know what to expect and the algorithm did not know who to show it to. The usual temptation at that point is to ask for ad budget or to post even more.",
    approach:
      "I touched neither frequency nor budget. I defined an editorial line (what this campsite talks about, to whom and when in the season), a recognizable repeatable format, and scripts that show the place in the first seconds instead of introducing it. Then I focused production on what the data said the audience already watched and stopped producing the rest.",
    result:
      "+250% views in the first month, with no ad spend and the same number of posts as the month before. With frequency and budget fixed, the lift can only come from the content, which also makes it repeatable.",
    lesson:
      "The improvement came as much from what we stopped doing as from what we started.",
    stats: [{ label: "Views", value: "+250% in one month" }],
  },
  {
    slug: "zernio",
    client: "Zernio",
    headline: "A SaaS YouTube channel built from zero to a repeatable system",
    metaDescription:
      "End-to-end YouTube production for Zernio: scripting, studio-quality recording and editing on a documented process. 14,500+ views and 180+ watch hours in 28 days.",
    sector: "SaaS · YouTube production and scripting",
    published: "2026-08-19",
    updated: "2026-11-24",
    challenge:
      "Zernio needed a YouTube channel that looked and sounded professional from the first video, starting practically from zero: no scripting system, no repeatable recording process and no editing criteria to hold attention past the first seconds.",
    approach:
      "I took over the full production, from script to publish. Every script is written for YouTube: a hook in the first seconds, a structure that holds retention minute by minute and an ending that pushes to keep watching or subscribe. Studio-quality recording and editing (pacing, takes, graphics, captions and thumbnail) are designed for watch time, not just clicks. The whole process is documented so quality depends on a system, not on that week's inspiration, and it is tuned monthly with retention data.",
    result:
      "In 28 days the channel passed 14,500 views, 180 hours of watch time and 70 new subscribers, growing month over month on all three. Over two months the median views per video rose 82%.",
    lesson:
      "A channel is built by a process that runs the same way every episode, adjusted with real data.",
    stats: [
      { label: "Views", value: "14,500+ in 28 days" },
      { label: "Watch time", value: "180+ hours" },
      { label: "Median views per video", value: "+82% in 2 months" },
    ],
  },
  {
    slug: "camping-puzol",
    client: "Camping Puzol",
    headline: "+62% views by fixing the first seconds and the calendar",
    metaDescription:
      "Camping Puzol grew views 62% in a month with two zero-cost changes: what viewers see first in each piece, and a calendar ordered around retention.",
    sector: "Hospitality · Campsite",
    published: "2026-08-19",
    updated: "2026-11-24",
    challenge:
      "Good, well-shot content that never reached beyond existing followers. The pieces opened by presenting instead of showing, so viewers who did not know the place decided to scroll before the good part appeared.",
    approach:
      "Two cheap changes. Each piece now opens on its most specific, recognizable shot, the one that tells a stranger in a second what they are looking at and why they would want to be there. And the calendar was reordered around the formats with the best retention, so they go out when the most audience is available.",
    result:
      "+62% views in the first month without producing or shooting anything new. A smaller lift than other cases, on purpose: the system was reordered, not rebuilt.",
    lesson:
      "Part of an account's ceiling is not in budget or frequency but in decisions about the first few seconds that cost nothing.",
    stats: [{ label: "Views", value: "+62% in one month" }],
  },
];

export function getEnglishCaseStudy(slug: string) {
  return EN_CASE_STUDIES.find((caseStudy) => caseStudy.slug === slug);
}

/** Every English case must have its Spanish pair, and the other way round. */
export function assertEnglishCases() {
  const spanish = new Set(getPublishedCaseStudies().map((c) => c.slug));
  const english = new Set(EN_CASE_STUDIES.map((c) => c.slug));
  const missing = [...spanish].filter((slug) => !english.has(slug));
  const orphan = [...english].filter((slug) => !spanish.has(slug));
  if (missing.length || orphan.length) {
    throw new Error(
      `English case studies out of sync. Missing: ${missing.join(", ") || "none"}. Without a Spanish pair: ${orphan.join(", ") || "none"}.`,
    );
  }
}
