import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { getPublishedCaseStudies } from "@/content/casos-de-exito";
import { getSectorPagesForService } from "@/content/sectores";
import type { ProcessStep, ServicePricing } from "@/lib/constants";

/**
 * The structural blocks a service page is made of.
 *
 * These are deliberately separate from `components/blog/Blocks.tsx`: those are
 * styled to wrap MDX output and compensate for the margins `mdxComponents`
 * adds, so rendering them from plain TSX produces wrong spacing. These take
 * props and own their own spacing.
 */

const SECTION_H2 =
  "scroll-mt-28 text-[clamp(1.75rem,3vw,2.5rem)] normal-case leading-tight tracking-[-0.01em] text-ink";

/** Concrete deliverables. The answer to "¿y esto qué incluye exactamente?". */
export function IncludesList({
  items,
  title,
  id = "que-incluye",
}: {
  items: string[];
  title: string;
  id?: string;
}) {
  if (!items.length) return null;

  return (
    <section aria-labelledby={id} className="mt-20">
      <h2 id={id} className={SECTION_H2}>
        {title}
      </h2>

      <ul className="mt-8 grid gap-x-10 gap-y-4 sm:grid-cols-2">
        {items.map((item) => (
          <li key={item} className="flex gap-3.5">
            <span
              aria-hidden
              className="mt-1.5 shrink-0 font-display text-sm font-extrabold text-turquoise"
            >
              ✓
            </span>
            <span className="text-lg leading-relaxed text-ink-body">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * The method, with what the client receives at each step and when.
 *
 * The deliverable and the timing carry the weight here: "diagnóstico" is a word
 * every competitor uses, "documento de diagnóstico y línea editorial, semana 1"
 * is a claim someone can hold you to.
 */
export function ProcessSteps({
  steps,
  title,
  id = "como-trabajo",
}: {
  steps: ProcessStep[];
  title: string;
  id?: string;
}) {
  if (!steps.length) return null;

  return (
    <section aria-labelledby={id} className="mt-20">
      <h2 id={id} className={SECTION_H2}>
        {title}
      </h2>

      <ol className="mt-10 space-y-10">
        {steps.map((step, index) => (
          <li key={step.title} className="flex gap-6 sm:gap-8">
            <span
              aria-hidden
              className="shrink-0 font-display text-[2.5rem] font-extrabold leading-none tabular-nums text-purple/25"
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex-1">
              <h3 className="text-xl normal-case leading-snug text-ink">
                {step.title}
              </h3>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-body">
                {step.detail}
              </p>
              <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-2 text-base">
                <div className="flex gap-2">
                  <dt className="font-semibold text-ink">Entregable:</dt>
                  <dd className="text-ink-soft">{step.deliverable}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold text-ink">Cuándo:</dt>
                  <dd className="text-ink-soft">{step.timing}</dd>
                </div>
              </dl>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/**
 * The published starting price.
 *
 * Publishing a floor is the single change on this page that captures the
 * "cuánto cuesta" cluster, and it filters the enquiries that were never going
 * to convert. Saying what is *not* included is what stops the number reading
 * as a bait price.
 */
export function PriceBlock({
  pricing,
  title,
  id = "precio",
}: {
  pricing: ServicePricing;
  title: string;
  id?: string;
}) {
  return (
    <section aria-labelledby={id} className="mt-20">
      <h2 id={id} className={SECTION_H2}>
        {title}
      </h2>

      <div className="mt-8 rounded-[var(--radius-card)] border-2 border-purple/25 bg-purple/[0.04] p-6 sm:p-8">
        <p className="font-display text-[clamp(1.75rem,3vw,2.25rem)] font-extrabold leading-none text-purple">
          {pricing.label}
        </p>

        <div className="mt-8 grid gap-8 sm:grid-cols-2">
          <div>
            <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-ink">
              Incluye
            </h3>
            <ul className="mt-4 space-y-2.5">
              {pricing.includes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-relaxed text-ink-body"
                >
                  <span aria-hidden className="shrink-0 text-turquoise">
                    ✓
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-ink-soft">
              No incluye
            </h3>
            <ul className="mt-4 space-y-2.5">
              {pricing.excludes.map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-base leading-relaxed text-ink-soft"
                >
                  <span aria-hidden className="shrink-0">
                    ·
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="mt-8 border-t-2 border-purple/15 pt-6 text-lg leading-relaxed text-ink-body">
          {pricing.note}
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Button href="/contacto" variant="primary">
            Pedir presupuesto
          </Button>
          <Button href="/precios" variant="outlineDark">
            Ver todos los precios
          </Button>
        </div>
      </div>
    </section>
  );
}

/**
 * Real results, pulled from the case studies by slug.
 *
 * Returns `null` on an empty array, which is the mechanism that keeps a page
 * honest: a service with no case study yet renders no proof block, and nothing
 * in the codebase can fabricate one.
 */
export function ProofStrip({
  slugs,
  title,
  id = "resultados",
}: {
  slugs: string[];
  title: string;
  id?: string;
}) {
  const cases = getPublishedCaseStudies().filter((study) =>
    slugs.includes(study.slug),
  );
  if (!cases.length) return null;

  return (
    <section aria-labelledby={id} className="mt-20">
      <h2 id={id} className={SECTION_H2}>
        {title}
      </h2>

      <div className="mt-8 grid gap-6 sm:grid-cols-3">
        {cases.map((study) => (
          <Link
            key={study.slug}
            href={`/casos-de-exito/${study.slug}`}
            className="group rounded-[var(--radius-card)] border-2 border-light-grey bg-white p-6 transition-colors hover:border-purple/40"
          >
            <p className="font-display text-[1.75rem] font-extrabold leading-none text-purple">
              {study.stats?.[0]?.value ?? study.headline}
            </p>
            <p className="mt-3 text-base font-semibold text-ink">
              {study.client}
            </p>
            <p className="mt-1 text-base leading-relaxed text-ink-soft">
              {study.stats?.[0]?.label ?? study.sector}
            </p>
            <span className="mt-4 inline-block text-base font-semibold text-purple group-hover:underline">
              Ver el caso →
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}

/**
 * Who this is not for.
 *
 * Counter-intuitive as a conversion block and reliably effective: naming who
 * should not hire you is the cheapest credibility signal there is, and it is
 * the passage an AI answer quotes when someone asks whether a service fits.
 */
export function NotForList({
  items,
  title,
  id = "para-quien-no",
}: {
  items: string[];
  title: string;
  id?: string;
}) {
  if (!items.length) return null;

  return (
    <section aria-labelledby={id} className="mt-20">
      <h2 id={id} className={SECTION_H2}>
        {title}
      </h2>

      <ul className="mt-8 space-y-4">
        {items.map((item) => (
          <li key={item} className="flex gap-3.5">
            <span
              aria-hidden
              className="mt-1 shrink-0 font-display font-extrabold text-ink-soft"
            >
              —
            </span>
            <span className="max-w-3xl text-lg leading-relaxed text-ink-body">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

/**
 * The sector pages that belong to this service.
 *
 * This block is what makes the nesting pay: each child gets a contextual link
 * from the money page, and the money page gains a section that says, in plain
 * words, which industries this has actually been done in.
 */
export function SectorLinks({
  serviceSlug,
  title,
  id = "sectores",
}: {
  serviceSlug: string;
  title: string;
  id?: string;
}) {
  const pages = getSectorPagesForService(serviceSlug);
  if (!pages.length) return null;

  return (
    <section aria-labelledby={id} className="mt-20">
      <h2 id={id} className={SECTION_H2}>
        {title}
      </h2>

      <ul className="mt-8 grid gap-4 sm:grid-cols-2">
        {pages.map((page) => (
          <li key={page.sector}>
            <Link
              href={`/servicios/${page.service}/${page.sector}`}
              className="group block rounded-[var(--radius-card)] border-2 border-light-grey bg-white p-6 transition-colors hover:border-purple/40"
            >
              <span className="text-lg font-semibold text-ink group-hover:text-purple">
                {page.h1}
              </span>
              <span className="mt-2 block text-base leading-relaxed text-ink-soft">
                {page.intro}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
