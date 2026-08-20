"use client";

import { useEffect, useState } from "react";
import { clsx } from "clsx";
import type { Heading } from "@/lib/headings";

/**
 * Sticky index with an active-section mark.
 *
 * The old index was a static block dropped between the cover and the body,
 * which is only useful for the two seconds it is on screen. Every long-form
 * reference in the sector (Ahrefs, Backlinko, HubSpot) keeps the index
 * reachable for the whole scroll, because these articles run 2.000+ words and
 * most readers arrive looking for one section.
 */
function useActiveHeading(headings: Heading[]): string | null {
  const [active, setActive] = useState<string | null>(null);

  useEffect(() => {
    if (!headings.length) return;

    const nodes = headings
      .map((heading) => document.getElementById(heading.id))
      .filter((node): node is HTMLElement => Boolean(node));

    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The heading nearest the top of the reading zone wins, so the mark
        // does not jump back and forth when two sections are both visible.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -70% 0px", threshold: 0 },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [headings]);

  return active;
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  const active = useActiveHeading(headings);

  if (headings.length < 3) return null;

  return (
    <nav aria-label="Índice del artículo" className="text-base">
      <p className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-purple">
        En este artículo
      </p>

      <ol className="mt-5 space-y-1 border-l-2 border-light-grey">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              aria-current={active === heading.id ? "location" : undefined}
              className={clsx(
                "-ml-0.5 block border-l-2 py-1.5 leading-snug transition-colors",
                heading.level === 3 ? "pl-7 text-sm" : "pl-4",
                active === heading.id
                  ? "border-purple font-semibold text-purple"
                  : "border-transparent text-ink-soft hover:text-ink",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Collapsed by default on mobile: on a phone the index is a wall, not a map. */
export function TableOfContentsMobile({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <details className="group mt-8 rounded-[var(--radius-card)] border-2 border-light-grey lg:hidden">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 marker:content-none">
        <span className="font-display text-xs font-extrabold uppercase tracking-[0.2em] text-purple">
          En este artículo
        </span>
        <span
          aria-hidden
          className="shrink-0 text-purple transition-transform group-open:rotate-45"
        >
          +
        </span>
      </summary>

      <ol className="space-y-2.5 px-5 pb-5">
        {headings.map((heading) => (
          <li key={heading.id} className={heading.level === 3 ? "pl-5" : ""}>
            <a
              href={`#${heading.id}`}
              className={clsx(
                "leading-snug",
                heading.level === 2
                  ? "font-semibold text-ink"
                  : "text-ink-soft",
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </details>
  );
}
