import Link from "next/link";
import { clsx } from "clsx";
import { externalRel } from "@/lib/links";

/**
 * The in-body formats the articles were missing.
 *
 * Before this, every post was paragraph → heading → paragraph for two thousand
 * words, with one stock photo in the middle. The references that outrank us
 * break the column every few hundred words: Backlinko with annotated captures
 * and tip boxes, Ahrefs with "further reading" callouts and diagrams, HubSpot
 * with before/after tables. The point is not decoration — a reader scanning
 * for one answer needs handholds, and an extractor needs blocks it can lift.
 *
 * Every component here takes plain string props so the MDX stays readable and
 * cannot break the build on a malformed expression.
 */

/* -------------------------------------------------------------------------- */
/* Callout                                                                    */
/* -------------------------------------------------------------------------- */

const CALLOUT_STYLES = {
  dato: {
    box: "border-turquoise/60 bg-turquoise/10",
    label: "text-ink",
    defaultTitle: "El dato",
  },
  aviso: {
    box: "border-purple/30 bg-purple/[0.05]",
    label: "text-purple",
    defaultTitle: "Aviso",
  },
  error: {
    box: "border-error/40 bg-error/[0.05]",
    label: "text-error",
    defaultTitle: "El error caro",
  },
  nota: {
    box: "border-light-grey bg-light-grey/40",
    label: "text-ink-soft",
    defaultTitle: "Nota",
  },
} as const;

export function Callout({
  type = "nota",
  title,
  children,
}: {
  type?: keyof typeof CALLOUT_STYLES;
  title?: string;
  children: React.ReactNode;
}) {
  const style = CALLOUT_STYLES[type] ?? CALLOUT_STYLES.nota;

  return (
    <aside
      className={clsx(
        "mt-8 rounded-[var(--radius-card)] border-2 p-5 sm:p-6",
        style.box,
      )}
    >
      <p
        className={clsx(
          "font-display text-xs font-extrabold uppercase tracking-[0.2em]",
          style.label,
        )}
      >
        {title ?? style.defaultTitle}
      </p>
      {/* `[&>p:first-child]:mt-3` keeps the first paragraph from inheriting the
          mt-5 the MDX <p> carries, which would double the gap under the label. */}
      <div className="[&>p:first-child]:mt-3">{children}</div>
    </aside>
  );
}

/* -------------------------------------------------------------------------- */
/* Stats                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * The figures were buried mid-paragraph — "+250 % en un mes" is the strongest
 * evidence on the page and it read like any other clause. Pulled out, it is
 * also the block a reader screenshots and an AI answer quotes.
 */
export function Stats({
  source,
  sourceLabel,
  children,
}: {
  /** Slug of the post that explains how these figures were produced. */
  source?: string;
  sourceLabel?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{children}</div>

      {/*
        The same four figures appear across most of the blog and used to be a
        dead end everywhere. Pointing them at the article that actually walks
        through how they happened is both the honest citation and the link the
        deepest pieces were never getting.
      */}
      {source ? (
        <p className="mt-4 text-base text-ink-soft">
          <Link
            href={`/blog/${source}`}
            className="font-semibold text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple"
          >
            {sourceLabel ?? "Cómo se consiguieron, paso a paso"}
          </Link>
        </p>
      ) : null}
    </div>
  );
}

export function Stat({
  value,
  label,
  source,
}: {
  value: string;
  label: string;
  source?: string;
}) {
  return (
    <div className="rounded-[var(--radius-card)] border-2 border-light-grey p-5">
      <p className="font-display text-4xl font-extrabold leading-none text-purple">
        {value}
      </p>
      <p className="mt-3 text-base leading-snug text-ink">{label}</p>
      {source ? (
        <p className="mt-2 text-sm text-ink-soft/80">{source}</p>
      ) : null}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Bar chart                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * A before/after the reader can see. Percentages are given explicitly rather
 * than computed from the values, because these bars compare things of
 * different natures (views, months, euros) and an auto-scale would invent a
 * relationship that is not in the data.
 */
export function Bars({
  title,
  footnote,
  children,
}: {
  title: string;
  footnote?: string;
  children: React.ReactNode;
}) {
  return (
    <figure className="mt-10 rounded-[var(--radius-card)] border-2 border-light-grey p-6">
      <figcaption className="font-display text-base font-extrabold text-ink">
        {title}
      </figcaption>
      <div className="mt-6 space-y-4">{children}</div>
      {footnote ? (
        <p className="mt-6 text-sm leading-relaxed text-ink-soft/80">
          {footnote}
        </p>
      ) : null}
    </figure>
  );
}

export function Bar({
  label,
  percent,
  display,
  highlight,
}: {
  label: string;
  /** Width of the bar, 0–100, as a string so the MDX stays expression-free. */
  percent: string;
  display: string;
  highlight?: boolean;
}) {
  const width = Math.max(2, Math.min(100, Number(percent) || 0));

  return (
    <div>
      <div className="flex items-baseline justify-between gap-4 text-base">
        <span className="text-ink-soft">{label}</span>
        <span
          className={clsx(
            "font-display font-extrabold tabular-nums",
            highlight ? "text-purple" : "text-ink",
          )}
        >
          {display}
        </span>
      </div>
      <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-light-grey">
        <div
          className={clsx(
            "h-full rounded-full",
            highlight ? "bg-purple" : "bg-ink/25",
          )}
          style={{ width: `${width}%` }}
        />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Checklist                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Wraps an ordinary markdown list and turns the bullets into checks. Authors
 * keep writing `- item`; the reader gets the format that actually gets used —
 * these are questions to take into a meeting.
 */
export function Checklist({
  title,
  children,
}: {
  title?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-10 rounded-[var(--radius-card)] border-2 border-purple/20 bg-purple/[0.03] p-6 sm:p-8">
      {title ? (
        <p className="font-display text-base font-extrabold text-ink">
          {title}
        </p>
      ) : null}
      <div
        className={clsx(
          "[&_li]:relative [&_li]:pl-9 [&_li]:leading-relaxed",
          "[&_li]:before:absolute [&_li]:before:left-0 [&_li]:before:top-[0.15em]",
          "[&_li]:before:font-display [&_li]:before:text-purple [&_li]:before:content-['✓']",
          "[&_ul]:mt-4 [&_ul]:list-none [&_ul]:space-y-3 [&_ul]:pl-0",
          "[&>p:first-child]:mt-3",
        )}
      >
        {children}
      </div>
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Ficha                                                                      */
/* -------------------------------------------------------------------------- */

/**
 * The repeated agency card.
 *
 * The rankings that outrank us all break down halfway: the host agency gets
 * five paragraphs and bullet points, entries 2–10 get one sentence and no
 * comparable fields at all. That asymmetry is what makes those lists read as
 * advertising. Every entry here carries the same four fields, including the
 * one nobody publishes — who it is *not* for.
 */
export function Ficha({
  servicios,
  idealPara,
  noEncaja,
  web,
  webLabel,
}: {
  servicios: string;
  idealPara: string;
  noEncaja: string;
  web?: string;
  webLabel?: string;
}) {
  const rows = [
    { term: "Servicios", value: servicios },
    { term: "Ideal para", value: idealPara },
    { term: "No encaja con", value: noEncaja },
  ];

  return (
    <dl className="mt-6 divide-y divide-light-grey rounded-[var(--radius-card)] border-2 border-light-grey">
      {rows.map((row) => (
        <div key={row.term} className="p-4 sm:flex sm:gap-6 sm:p-5">
          <dt className="font-display text-sm font-extrabold uppercase tracking-[0.1em] text-purple sm:w-36 sm:shrink-0">
            {row.term}
          </dt>
          <dd className="mt-1 text-base leading-relaxed text-ink-soft sm:mt-0">
            {row.value}
          </dd>
        </div>
      ))}

      {web ? (
        <div className="p-4 sm:flex sm:gap-6 sm:p-5">
          <dt className="font-display text-sm font-extrabold uppercase tracking-[0.1em] text-purple sm:w-36 sm:shrink-0">
            Web
          </dt>
          <dd className="mt-1 text-base sm:mt-0">
            <a
              href={web}
              target="_blank"
              rel={externalRel(web)}
              className="font-semibold text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple"
            >
              {webLabel ?? web.replace(/^https?:\/\//, "").replace(/\/$/, "")}
            </a>
          </dd>
        </div>
      ) : null}
    </dl>
  );
}

/* -------------------------------------------------------------------------- */
/* Disclosure                                                                 */
/* -------------------------------------------------------------------------- */

/** Inline conflict-of-interest note, for use inside the body of a ranking. */
export function Disclosure({ children }: { children: React.ReactNode }) {
  return (
    <aside className="mt-8 border-l-4 border-purple bg-purple/[0.04] p-5 [&>p:first-child]:mt-0">
      {children}
    </aside>
  );
}
