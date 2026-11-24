import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { FaqSection } from "@/components/blog/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { enProfileGraph, faqSchema } from "@/lib/schema";
import { CONTACT, RESUME_PDF, SITE_URL, SOCIALS } from "@/lib/constants";
import {
  EN_AI_WORKFLOWS,
  EN_AVAILABILITY,
  EN_BIO,
  EN_EDUCATION,
  EN_EXPERIENCE,
  EN_FAQ,
  EN_LANGUAGES,
  EN_PILLARS,
  EN_SKILLS,
  EN_TAGLINE,
  EN_TITLE,
} from "@/content/en/profile";
import { EN_CASE_STUDIES } from "@/content/en/case-studies";

/** Last substantive edit of this page. Bump it when the profile changes. */
const UPDATED = "2026-11-24";

export const metadata: Metadata = buildMetadata({
  title: "Lucas Álvarez | Marketing Lead, remote on US Eastern hours",
  description:
    "Marketing lead in Barcelona and co-founder of Publiqo. Growth, creative strategy, paid media and SEO, 110K+ organic followers on his own brand, and efficient marketing operations.",
  path: "/en",
  locale: "en_US",
  languages: { es: "/", en: "/en" },
});

const EXTRA_WORK = [
  {
    client: "Demand generation",
    sector: "IBPRINT (industrial B2B) · Brinkr (B2B)",
    text: "Rebuilt an industrial manufacturer's website, catalog and quote funnel, then launched paid search: inbound quote requests doubled. For a B2B brand, built the organic acquisition channel from zero: website, blog and SEO.",
  },
];

export default function EnglishHome() {
  return (
    <>
      <JsonLd data={enProfileGraph({ bio: EN_BIO, jobTitle: EN_TITLE, updated: UPDATED })} />
      <JsonLd data={faqSchema(EN_FAQ, `${SITE_URL}/en`, "en")!} />

      {/* Hero */}
      <section className="bg-brand-gradient text-white">
        <Container className="py-20 sm:py-24">
          <div className="grid items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
            <Reveal immediate>
              <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-turquoise">
                Barcelona · Remote · US Eastern hours
              </p>
              <h1 className="text-[clamp(2.25rem,5vw,4rem)]">
                Lucas Álvarez, Marketing Lead
              </h1>
              <p className="mt-6 max-w-2xl text-[clamp(1.25rem,2vw,1.75rem)] font-semibold leading-tight text-turquoise">
                {EN_TAGLINE}
              </p>
              <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
                Growth, content, paid media, SEO and analytics, owned end to
                end. Co-founder of a Barcelona marketing agency, creator with
                110K+ organic followers, and an engineer who uses AI as a
                tool so his team ships more.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Button href={`mailto:${CONTACT.email}`} variant="white">
                  Email me
                </Button>
                <Button href={RESUME_PDF} variant="outline">
                  Download resume
                </Button>
              </div>
              <p className="mt-6 text-sm text-white/60">{EN_AVAILABILITY}</p>
            </Reveal>

            <Reveal immediate className="relative mx-auto w-full max-w-sm lg:max-w-none">
              <div className="relative aspect-4/5 overflow-hidden rounded-[var(--radius-card)]">
                <Image
                  src="/images/lucas-alvarez.jpg"
                  alt="Lucas Álvarez, marketing lead based in Barcelona"
                  fill
                  priority
                  sizes="(min-width: 1024px) 35vw, 90vw"
                  className="object-cover"
                />
              </div>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* About */}
      <Section id="about">
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <Reveal>
            <SectionHeading kicker="About" title="What I bring to a marketing team" />
          </Reveal>
          <Reveal delay={100}>
            <p className="text-lg leading-relaxed text-ink-body">{EN_BIO}</p>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {EN_PILLARS.map((pillar, index) => (
            <Reveal key={pillar.title} delay={index * 100}>
              <div className="h-full rounded-[var(--radius-card)] border-2 border-light-grey p-7">
                <h3 className="text-[1.375rem] normal-case leading-tight text-ink">
                  {pillar.title}
                </h3>
                <p className="mt-4 text-base leading-relaxed text-ink-soft">{pillar.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Work */}
      <Section tone="grey" id="work">
        <Reveal>
          <SectionHeading
            kicker="Selected work"
            title="Results published with client names"
            subtitle="Every figure below comes from accounts I run personally, and none of them relied on ad spend unless stated."
          />
        </Reveal>
        <ul className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {EN_CASE_STUDIES.map((caseStudy) => (
            <li key={caseStudy.slug}>
              <Link
                href={`/en/case-studies/${caseStudy.slug}`}
                className="group flex h-full flex-col rounded-[var(--radius-card)] bg-white p-7 transition-shadow hover:shadow-lg"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-purple">
                  {caseStudy.client}
                </span>
                <span className="mt-3 text-[1.25rem] font-semibold leading-snug text-ink">
                  {caseStudy.headline}
                </span>
                <span className="mt-3 text-sm text-ink-soft">{caseStudy.sector}</span>
                <span className="mt-auto pt-6 text-sm font-semibold text-purple group-hover:underline">
                  Read the case →
                </span>
              </Link>
            </li>
          ))}
          {EXTRA_WORK.map((item) => (
            <li
              key={item.client}
              className="flex h-full flex-col rounded-[var(--radius-card)] bg-white p-7"
            >
              <span className="text-sm font-semibold uppercase tracking-[0.12em] text-purple">
                {item.client}
              </span>
              <span className="mt-3 text-base leading-relaxed text-ink-body">{item.text}</span>
              <span className="mt-auto pt-6 text-sm text-ink-soft">{item.sector}</span>
            </li>
          ))}
        </ul>
      </Section>

      {/* Experience */}
      <Section id="experience">
        <Reveal>
          <SectionHeading kicker="Experience" title="Four years of hands-on marketing" />
        </Reveal>
        <ol className="mt-12 space-y-10 border-l-2 border-light-grey pl-8">
          {EN_EXPERIENCE.map((role) => (
            <li key={`${role.title}-${role.dates}`} className="relative">
              <span
                aria-hidden
                className="absolute -left-[2.45rem] top-2 h-3 w-3 rounded-full bg-purple"
              />
              <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                <h3 className="text-[1.375rem] normal-case leading-tight text-ink">
                  {role.title}
                  {role.org ? <span className="text-purple"> · {role.org}</span> : null}
                </h3>
                <p className="text-sm font-semibold text-ink-soft">
                  {role.dates}
                  {role.place ? ` · ${role.place}` : ""}
                </p>
              </div>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-body marker:text-purple">
                {role.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      {/* AI */}
      <Section tone="gradient" id="ai">
        <Reveal>
          <SectionHeading
            kicker="Process optimization"
            title="AI as a tool, people in charge"
            subtitle="I built a dozen AI-assisted workflows (Claude Code with MCP integrations) that take the repetitive work off my team. Strategy, creative and final decisions stay human, and I review everything before it goes out."
            tone="dark"
          />
        </Reveal>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {EN_AI_WORKFLOWS.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <div className="h-full rounded-[var(--radius-card)] bg-white/10 p-7">
                <h3 className="text-[1.25rem] normal-case leading-tight text-white">{item.title}</h3>
                <p className="mt-3 text-base leading-relaxed text-white/75">{item.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Skills, education, languages */}
      <Section>
        <div className="grid gap-14 lg:grid-cols-2">
          <Reveal>
            <h2 className="text-[1.875rem] normal-case leading-tight text-ink">Skills</h2>
            <dl className="mt-6 space-y-5">
              {EN_SKILLS.map((skill) => (
                <div key={skill.group}>
                  <dt className="font-semibold text-ink">{skill.group}</dt>
                  <dd className="mt-1 text-base leading-relaxed text-ink-soft">{skill.items}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-[1.875rem] normal-case leading-tight text-ink">Education</h2>
            <ul className="mt-6 space-y-5">
              {EN_EDUCATION.map((item) => (
                <li key={item.title}>
                  <p className="font-semibold text-ink">{item.title}</p>
                  <p className="mt-1 text-base text-ink-soft">
                    {item.org} · {item.dates}
                  </p>
                </li>
              ))}
            </ul>
            <h2 className="mt-12 text-[1.875rem] normal-case leading-tight text-ink">Languages</h2>
            <p className="mt-4 text-base leading-relaxed text-ink-soft">{EN_LANGUAGES}</p>
          </Reveal>
        </div>

        <div className="mx-auto max-w-3xl">
          <FaqSection items={EN_FAQ} title="Questions about Lucas Álvarez" id="faq" />
        </div>
      </Section>

      {/* Contact */}
      <Section tone="grey" id="contact" padding="large">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="text-[clamp(1.75rem,3vw,2.5rem)] normal-case leading-tight text-ink">
              Hiring for marketing? Let&apos;s talk.
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              Tell me what marketing needs to deliver over the next twelve
              months and I will tell you how I would get there.
            </p>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button href={`mailto:${CONTACT.email}`} variant="primary">
              {CONTACT.email}
            </Button>
            {SOCIALS.linkedin.href ? (
              <Button href={SOCIALS.linkedin.href} variant="outlineDark">
                LinkedIn
              </Button>
            ) : null}
          </div>
        </div>
      </Section>
    </>
  );
}
