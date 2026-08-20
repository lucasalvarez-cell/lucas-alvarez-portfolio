import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, caseStudySchema } from "@/lib/schema";
import { filled } from "@/lib/content";
import {
  getCaseStudyBySlug,
  getPublishedCaseStudies,
} from "@/content/casos-de-exito";
import type { CaseStudy } from "@/types/case-study";

const PUBLISHED = getPublishedCaseStudies();

function getNeighbors(current: CaseStudy) {
  const index = PUBLISHED.findIndex((c) => c.slug === current.slug);
  if (index === -1 || PUBLISHED.length < 2) return { previous: null, next: null };

  const previous = PUBLISHED[(index - 1 + PUBLISHED.length) % PUBLISHED.length];
  const next = PUBLISHED[(index + 1) % PUBLISHED.length];
  return { previous, next };
}

export function generateStaticParams() {
  return PUBLISHED.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) return {};

  return buildMetadata({
    title: `${caseStudy.client}: ${caseStudy.headline}`,
    description: caseStudy.metaDescription,
    path: `/casos-de-exito/${caseStudy.slug}`,
  });
}

export default async function CasoDeExitoPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  const sector = filled(caseStudy.sector);
  const challenge = filled(caseStudy.challenge);
  const whatWeDid = filled(caseStudy.whatWeDid);
  const result = filled(caseStudy.result);

  const summaryRows = [
    { term: "Reto", value: challenge },
    { term: "Qué hicimos", value: whatWeDid },
    { term: "Resultado", value: result },
  ].filter((row): row is { term: string; value: string } => Boolean(row.value));

  const related = PUBLISHED.filter((c) => c.slug !== caseStudy.slug).slice(0, 3);
  const { previous, next } = getNeighbors(caseStudy);

  return (
    <>
      <JsonLd data={caseStudySchema(caseStudy)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Casos de éxito", path: "/casos-de-exito" },
          {
            name: `${caseStudy.client}: ${caseStudy.headline}`,
            path: `/casos-de-exito/${caseStudy.slug}`,
          },
        ])}
      />

      {/* Hero */}
      <Section tone="gradient" padding="huge">
        <Link
          href="/casos-de-exito"
          className="inline-flex items-center gap-2 text-base font-semibold text-turquoise transition-opacity hover:opacity-70"
        >
          <span aria-hidden>←</span> Todos los casos
        </Link>

        <div className="mt-8 flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
          <Reveal immediate className="flex-1">
            {sector ? (
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-turquoise">
                {sector}
              </p>
            ) : null}

            <h1 className="mt-3 text-white">
              {caseStudy.client}: {caseStudy.headline}
            </h1>

            {challenge ? (
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
                {challenge}
              </p>
            ) : null}
          </Reveal>

          <Reveal immediate className="w-full lg:w-2/5">
            <div
              className="relative aspect-[6.16/6] overflow-hidden rounded-[var(--radius-card)]"
              style={{ backgroundColor: caseStudy.logoBg ?? "#ffffff" }}
            >
              {caseStudy.logo ? (
                <Image
                  src={caseStudy.logo}
                  alt={`Logo de ${caseStudy.client}`}
                  fill
                  sizes="(min-width: 1024px) 35vw, 90vw"
                  className="object-contain p-12"
                />
              ) : null}
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Results */}
      {caseStudy.stats?.length ? (
        <section className="bg-white py-24 text-ink">
          <Container>
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
              <Reveal className="lg:w-1/3">
                <h2>Resultados</h2>
              </Reveal>
              <div className="grid flex-1 grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
                {caseStudy.stats.map((stat, index) => (
                  <Reveal key={stat.label} delay={index * 80}>
                    <p className="font-display text-4xl font-extrabold text-purple sm:text-5xl">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-base text-ink-soft">{stat.label}</p>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Summary */}
      {summaryRows.length ? (
        <section
          className={`py-24 text-ink ${caseStudy.stats?.length ? "bg-light-grey" : "bg-white"}`}
        >
          <Container>
            <div className="flex flex-col gap-10 lg:flex-row lg:gap-16">
              <Reveal className="lg:w-1/3">
                <h2>Resumen</h2>
              </Reveal>
              <div className="flex-1 space-y-8">
                {summaryRows.map((row, index) => (
                  <Reveal key={row.term} delay={index * 80}>
                    <p className="max-w-2xl text-lg leading-relaxed text-ink-soft">
                      <span className="font-semibold text-ink">{row.term}: </span>
                      {row.value}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </Container>
        </section>
      ) : null}

      {/* Prev / next */}
      {previous && next ? (
        <section className="bg-white py-16 text-ink">
          <Container>
            <Reveal className="grid grid-cols-1 gap-10 border-t-2 border-light-grey pt-10 sm:grid-cols-2">
              <Link href={`/casos-de-exito/${previous.slug}`} className="group">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-soft">
                  Anterior
                </p>
                <p className="mt-2 text-2xl transition-colors group-hover:text-purple">
                  {previous.client}
                </p>
              </Link>
              <Link
                href={`/casos-de-exito/${next.slug}`}
                className="group sm:text-right"
              >
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-ink-soft">
                  Siguiente
                </p>
                <p className="mt-2 text-2xl transition-colors group-hover:text-purple">
                  {next.client}
                </p>
              </Link>
            </Reveal>
          </Container>
        </section>
      ) : null}

      {/* Related */}
      {related.length ? (
        <Section tone="gradient" padding="huge">
          <Reveal>
            <SectionHeading
              kicker="Más casos"
              title="También te puede interesar"
              tone="dark"
            />
          </Reveal>
          <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((c, index) => (
              <Reveal key={c.slug} delay={index * 60}>
                <CaseStudyCard caseStudy={c} />
              </Reveal>
            ))}
          </div>
        </Section>
      ) : null}

      <CTASection
        title="¿Quieres ser el próximo caso de éxito?"
        subtitle="Hablemos de tu marca y de qué resultados podemos conseguir juntos."
      />
    </>
  );
}
