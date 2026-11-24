import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { QuickAnswer } from "@/components/blog/QuickAnswer";
import { FaqSection } from "@/components/blog/FaqSection";
import { PriceBlock, ProofStrip } from "@/components/service/ServiceBlocks";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, sectorGraph } from "@/lib/schema";
import { getServiceBySlug } from "@/lib/constants";
import {
  SECTOR_PAGES,
  getSectorBySlug,
  getSectorPage,
} from "@/content/sectores";
import { getAllPosts } from "@/lib/blog";

/**
 * Sector landing pages: `/servicios/{servicio}/{sector}`.
 *
 * Nested under the service rather than flat (`/servicios/redes-sociales-para-
 * campings`) on purpose. A flat slug sits at the same depth as its parent, so a
 * crawler reads it as a sibling competing for the same query instead of as a
 * narrower child — and the breadcrumb would have to invent a hierarchy that the
 * URL does not express. Google tokenises `/` and `-` identically, so nesting
 * loses no keyword: every meaningful word of "gestión de redes sociales para
 * campings" is still in the path. The exact phrase lives in the H1, the title
 * and the breadcrumb leaf, which is where it is read.
 */
export const dynamicParams = false;

export function generateStaticParams() {
  return SECTOR_PAGES.map((page) => ({
    slug: page.service,
    sector: page.sector,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; sector: string }>;
}): Promise<Metadata> {
  const { slug, sector } = await params;
  const page = getSectorPage(slug, sector);
  if (!page) return {};

  return buildMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/servicios/${slug}/${sector}`,
  });
}

export default async function SectorPage({
  params,
}: {
  params: Promise<{ slug: string; sector: string }>;
}) {
  const { slug, sector } = await params;
  const page = getSectorPage(slug, sector);
  const service = getServiceBySlug(slug);
  const sectorMeta = getSectorBySlug(sector);
  if (!page || !service || !sectorMeta) notFound();

  const posts = getAllPosts();
  const related = page.relatedPosts
    .map((postSlug) => posts.find((post) => post.slug === postSlug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  return (
    <>
      <JsonLd data={sectorGraph(page, service, sectorMeta)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Servicios", path: "/servicios" },
          { name: service.title, path: `/servicios/${service.slug}` },
          {
            /* The breadcrumb leaf carries the exact phrase, because this is the
               string Google renders in the SERP breadcrumb. "Campings" alone
               would throw away the half of the query that converts. */
            name: page.h1,
            path: `/servicios/${service.slug}/${page.sector}`,
          },
        ])}
      />

      <Section tone="gradient" padding="large">
        <Link
          href={`/servicios/${service.slug}`}
          className="inline-flex items-center gap-2 text-base font-semibold text-turquoise transition-opacity hover:opacity-70"
        >
          <span aria-hidden>←</span> {service.title}
        </Link>

        <h1 className="mt-8 max-w-4xl text-white">{page.h1}</h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
          {page.intro}
        </p>
      </Section>

      <Section>
        <div className="max-w-4xl">
          <QuickAnswer
            question={page.h1}
            answer={page.quickAnswer}
            label="En corto"
            id="en-corto"
          />

          {page.sections.map((section) => (
            <section key={section.title} className="mt-16">
              <h2 className="scroll-mt-28 text-[clamp(1.75rem,3vw,2.5rem)] normal-case leading-tight tracking-[-0.01em] text-ink">
                {section.title}
              </h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 60)}
                  className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-body"
                >
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <ProofStrip
            slugs={page.proof}
            title={`Resultados en ${sectorMeta.label}`}
          />

          <PriceBlock
            pricing={page.pricing ?? service.pricing}
            title={`Cuánto cuesta`}
          />

          <FaqSection
            items={page.faq}
            title={`Preguntas frecuentes sobre ${page.h1.toLowerCase()}`}
          />

          {related.length ? (
            <section aria-labelledby="seguir-leyendo" className="mt-20">
              <h2
                id="seguir-leyendo"
                className="scroll-mt-28 text-[clamp(1.75rem,3vw,2.5rem)] normal-case leading-tight tracking-[-0.01em] text-ink"
              >
                Seguir leyendo
              </h2>
              <ul className="mt-8 space-y-4">
                {related.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}`}
                      className="text-lg font-semibold text-ink hover:text-purple"
                    >
                      {post.title}
                    </Link>
                    <p className="mt-1 max-w-2xl text-base leading-relaxed text-ink-soft">
                      {post.description}
                    </p>
                  </li>
                ))}
              </ul>
            </section>
          ) : null}
        </div>
      </Section>

      <CTASection
        title={`¿Tienes ${sectorMeta.label === "campings" ? "un camping" : `un negocio en ${sectorMeta.label}`}?`}
        subtitle="Escríbeme con el enlace a tu perfil y te digo qué veo y qué cambiaría primero, sin compromiso y sin cuestionarios de por medio."
      />
    </>
  );
}
