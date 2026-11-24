import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { enBreadcrumbSchema, enCaseStudyGraph } from "@/lib/schema";
import { CONTACT, RESUME_PDF } from "@/lib/constants";
import { EN_CASE_STUDIES, getEnglishCaseStudy } from "@/content/en/case-studies";

export function generateStaticParams() {
  return EN_CASE_STUDIES.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getEnglishCaseStudy(slug);
  if (!caseStudy) return {};

  return buildMetadata({
    title: `${caseStudy.client}: ${caseStudy.headline}`,
    description: caseStudy.metaDescription,
    path: `/en/case-studies/${caseStudy.slug}`,
    locale: "en_US",
    languages: {
      es: `/casos-de-exito/${caseStudy.slug}`,
      en: `/en/case-studies/${caseStudy.slug}`,
    },
  });
}

export default async function EnglishCaseStudy({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getEnglishCaseStudy(slug);
  if (!caseStudy) notFound();

  const others = EN_CASE_STUDIES.filter((c) => c.slug !== caseStudy.slug).slice(0, 3);
  const blocks = [
    { title: "The challenge", body: caseStudy.challenge },
    { title: "What I did", body: caseStudy.approach },
    { title: "The result", body: caseStudy.result },
  ];

  return (
    <>
      <JsonLd data={enCaseStudyGraph(caseStudy)} />
      <JsonLd
        data={enBreadcrumbSchema([
          { name: "Case studies", path: "/en/case-studies" },
          { name: caseStudy.client, path: `/en/case-studies/${caseStudy.slug}` },
        ])}
      />

      <Section tone="gradient" padding="large">
        <Reveal immediate>
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-white/60">
            <Link href="/en" className="hover:text-white">Home</Link>
            {" / "}
            <Link href="/en/case-studies" className="hover:text-white">Case studies</Link>
          </nav>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-turquoise">
            {caseStudy.client} · {caseStudy.sector}
          </p>
          <h1 className="max-w-4xl text-[clamp(2rem,4.4vw,3.5rem)]">{caseStudy.headline}</h1>
          <dl className="mt-10 grid max-w-4xl gap-6 sm:grid-cols-3">
            {caseStudy.stats.map((stat) => (
              <div key={stat.label} className="border-t-2 border-turquoise pt-3">
                <dt className="text-sm text-white/70">{stat.label}</dt>
                <dd className="mt-1 text-[1.5rem] font-semibold text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
      </Section>

      <Section>
        <article className="mx-auto max-w-3xl">
          {blocks.map((block) => (
            <section key={block.title} className="mt-12 first:mt-0">
              <h2 className="text-[1.875rem] normal-case leading-tight text-ink">{block.title}</h2>
              <p className="mt-5 text-lg leading-relaxed text-ink-body">{block.body}</p>
            </section>
          ))}
          <p className="mt-12 rounded-[var(--radius-card)] border-l-4 border-purple bg-light-grey p-6 text-lg font-semibold leading-relaxed text-ink">
            {caseStudy.lesson}
          </p>
          <div className="mt-12 flex flex-wrap gap-4">
            <Button href={`mailto:${CONTACT.email}`} variant="primary">
              Talk to me about your team
            </Button>
            <Button href={RESUME_PDF} variant="outlineDark">
              Download resume
            </Button>
          </div>
        </article>
      </Section>

      <Section tone="grey" padding="large">
        <h2 className="text-[1.5rem] normal-case leading-tight text-ink">More case studies</h2>
        <ul className="mt-6 grid gap-4 md:grid-cols-3">
          {others.map((other) => (
            <li key={other.slug}>
              <Link
                href={`/en/case-studies/${other.slug}`}
                className="block h-full rounded-[var(--radius-card)] bg-white p-6 hover:shadow-lg"
              >
                <span className="text-sm font-semibold uppercase tracking-[0.12em] text-purple">
                  {other.client}
                </span>
                <span className="mt-2 block text-lg font-semibold leading-snug text-ink">
                  {other.headline}
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
