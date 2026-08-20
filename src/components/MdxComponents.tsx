import Link from "next/link";
import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-14 text-3xl text-ink" {...props} />,
  h3: (props) => <h3 className="mt-10 text-2xl text-ink" {...props} />,
  h4: (props) => <h4 className="mt-8 text-xl text-ink" {...props} />,
  p: (props) => (
    <p className="mt-5 text-lg leading-relaxed text-ink-soft" {...props} />
  ),
  ul: (props) => (
    <ul
      className="mt-5 list-disc space-y-2 pl-6 text-lg text-ink-soft"
      {...props}
    />
  ),
  ol: (props) => (
    <ol
      className="mt-5 list-decimal space-y-2 pl-6 text-lg text-ink-soft"
      {...props}
    />
  ),
  li: (props) => <li className="leading-relaxed" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="mt-8 border-l-4 border-purple pl-6 text-lg italic text-ink"
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
  hr: (props) => <hr className="mt-12 border-t-2 border-light-grey" {...props} />,
  strong: (props) => <strong className="font-semibold text-ink" {...props} />,
  img: (props) => (
    // MDX authors write plain markdown images; next/image needs known
    // dimensions, so a plain <img> is the right call inside post bodies.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      className="mt-8 w-full rounded-[var(--radius-card)]"
      alt=""
      {...props}
    />
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
          rel="noreferrer noopener"
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
    <div className="mt-8 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
      <table
        className="w-full min-w-[36rem] border-collapse text-left text-base"
        {...props}
      />
    </div>
  ),
  thead: (props) => <thead className="bg-light-grey" {...props} />,
  th: (props) => (
    <th
      className="border-b-2 border-light-grey px-4 py-3 font-display text-sm font-extrabold uppercase tracking-[0.1em] text-ink"
      {...props}
    />
  ),
  td: (props) => (
    <td
      className="border-b border-light-grey px-4 py-3 align-top leading-relaxed text-ink-soft"
      {...props}
    />
  ),
};
