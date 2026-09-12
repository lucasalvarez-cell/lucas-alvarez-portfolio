import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import {
  Bar,
  Bars,
  Callout,
  Checklist,
  Disclosure,
  Ficha,
  Stat,
  Stats,
} from "@/components/blog/Blocks";
import { externalRel } from "@/lib/links";

/**
 * Article typography.
 *
 * Two deliberate departures from the site-wide heading style:
 *
 * 1. Body headings are sentence case. The global rule uppercases h1–h4, which
 *    is right for six words in a hero and wrong for the fifteen headings of a
 *    2.500-word guide — all-caps is measurably slower to scan, and scanning is
 *    the whole job of a heading in long form.
 * 2. Every heading carries `scroll-mt-28`. The header is `sticky top-0`, so
 *    without it the index and the ranking table would drop the reader with
 *    their target hidden behind the nav.
 */
export const mdxComponents: MDXComponents = {
  h2: (props) => (
    <h2
      className="mt-16 scroll-mt-28 text-balance text-[1.875rem] normal-case leading-tight tracking-[-0.01em] text-ink"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-10 scroll-mt-28 text-balance text-[1.375rem] normal-case leading-snug tracking-[-0.01em] text-ink"
      {...props}
    />
  ),
  h4: (props) => (
    <h4
      className="mt-8 scroll-mt-28 text-[1.125rem] normal-case leading-snug text-ink"
      {...props}
    />
  ),
  p: (props) => (
    <p className="mt-5 text-lg leading-relaxed text-ink-body" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mt-5 list-disc space-y-2.5 pl-6 text-lg text-ink-body marker:text-purple"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 list-decimal space-y-2.5 pl-6 text-lg text-ink-body marker:font-semibold marker:text-purple"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-10 border-l-4 border-purple pl-6 font-display text-xl font-extrabold leading-snug text-ink [&>p]:mt-0 [&>p+p]:mt-4"
      {...props}
    />
  ),
  code: (props) => (
    <code
      className="rounded bg-light-grey px-1.5 py-0.5 font-mono text-[0.9em] text-purple"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="mt-6 overflow-x-auto rounded-[var(--radius-card)] bg-ink p-5 text-sm text-white"
      {...props}
    />
  ),
  hr: (props) => (
    <hr className="mt-14 border-t-2 border-light-grey" {...props} />
  ),
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,

  /**
   * Body images are captioned figures, not decoration: the alt text doubles as
   * the caption, which forces whoever writes the post to say what the image
   * proves. There is no stock photography on this blog — the only images that
   * belong in a body here are captures and charts.
   */
  img: ({ src, alt, ...props }) => (
    <figure className="mt-10">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={typeof src === "string" ? src : undefined}
        alt={alt ?? ""}
        loading="lazy"
        className="w-full rounded-[var(--radius-card)] border-2 border-light-grey"
        {...props}
      />
      {alt ? (
        <figcaption className="mt-3 text-sm leading-relaxed text-ink-soft/80">
          {alt}
        </figcaption>
      ) : null}
    </figure>
  ),

  a: ({ href, ...props }) => {
    const isExternal = /^https?:\/\//.test(href ?? "");
    const className =
      "font-semibold text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple";

    // Outbound links to other agencies/sources open in a new tab so the reader
    // does not lose the article; internal links stay in the Next.js router.
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel={externalRel(href)}
          className={className}
          {...props}
        />
      );
    }

    return <Link href={href ?? "#"} className={className} {...props} />;
  },

  // Comparison tables come from remark-gfm. The wrapper scrolls on its own so a
  // wide table never makes the whole page scroll sideways on mobile.
  table: (props) => (
    <div className="mt-10 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:overflow-hidden sm:rounded-[var(--radius-card)] sm:border-2 sm:border-light-grey sm:px-0">
      <table
        className="w-full min-w-[36rem] border-collapse text-left text-base"
        {...props}
      />
    </div>
  ),
  thead: (props) => <thead className="bg-light-grey" {...props} />,
  th: (props) => (
    <th
      className="px-4 py-3 font-display text-xs font-extrabold uppercase tracking-[0.1em] text-ink"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-t border-light-grey px-4 py-4 align-top leading-relaxed text-ink-body"
      {...props}
    />
  ),

  // Article blocks, available to every post without an import.
  Callout,
  Checklist,
  Disclosure,
  Ficha,
  Stats,
  Stat,
  Bars,
  Bar,
};
