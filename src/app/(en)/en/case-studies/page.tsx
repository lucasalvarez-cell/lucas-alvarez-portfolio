import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { enBreadcrumbSchema, enCaseStudiesGraph } from "@/lib/schema";
import { assertEnglishCases, EN_CASE_STUDIES } from "@/content/en/case-studies";

assertEnglishCases();

export const metadata: Metadata = buildMetadata({
  title: "Case studies: organic growth and demand generation",
  description:
    "Marketing case studies by Lucas Álvarez with client names and real figures: +483% views in a month, 6× views, +250% with no ad spend, and a SaaS YouTube channel built from zero.",
  path: "/en/case-studies",
  locale: "en_US",
  languages: { es: "/casos-de-exito", en: "/en/case-studies" },
});

export default function EnglishCaseStudies() {
  return (
    <>
      <JsonLd data={enCaseStudiesGraph(EN_CASE_STUDIES)} />
      <JsonLd data={enBreadcrumbSchema([{ name: "Case studies", path: "/en/case-studies" }])} />

      <Section tone="gradient" padding="large">
        <Reveal immediate>
          <SectionHeading
            kicker="Case studies"
            title="What changed, why, and what it moved"
            subtitle="Accounts I run personally, published with the client's name so the figures can be checked. Each one starts with a diagnosis, not with more output."
            tone="dark"
            as="h1"
          />
        </Reveal>
      </Section>

      <Section>
        <ul className="grid gap-6 md:grid-cols-2">
          {EN_CASE_STUDIES.map((caseStudy, index) => (
            <Reveal key={caseStudy.slug} delay={index * 60}>
              <li className="h-full list-none">
                <Link
                  href={`/en/case-studies/${caseStudy.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-card)] border-2 border-light-grey p-8 transition-colors hover:border-purple/40"
                >
                  <span className="text-sm font-semibold uppercase tracking-[0.12em] text-purple">
                    {caseStudy.client} · {caseStudy.sector}
                  </span>
                  <h2 className="mt-3 text-[1.5rem] normal-case leading-snug text-ink">
                    {caseStudy.headline}
                  </h2>
                  <p className="mt-4 text-base leading-relaxed text-ink-soft">
                    {caseStudy.lesson}
                  </p>
                  <span className="mt-auto pt-6 text-sm font-semibold text-purple group-hover:underline">
                    Read the case →
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>
    </>
  );
}
