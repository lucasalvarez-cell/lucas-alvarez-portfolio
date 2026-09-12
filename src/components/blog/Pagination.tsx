import Link from "next/link";
import { clsx } from "clsx";
import { pagePath } from "@/lib/pagination";

/**
 * Numbered pagination, every page a real crawlable link.
 *
 * `rel="prev"`/`rel="next"` are not here on purpose: Google stopped using them
 * as an indexing signal in 2019 and nothing replaced them. What works now is
 * plain anchors to every page, each page canonical to itself, and none of them
 * noindexed. Pointing page 3 at page 1 with a canonical is the classic way to
 * make Google ignore the forty posts that only appear on page 3.
 */
export function Pagination({
  current,
  total,
}: {
  current: number;
  total: number;
}) {
  if (total <= 1) return null;

  const pages = Array.from({ length: total }, (_, index) => index + 1);

  return (
    <nav
      aria-label="Paginación del blog"
      className="mt-16 border-t-2 border-light-grey pt-8"
    >
      <ul className="flex flex-wrap items-center gap-2.5">
        {current > 1 ? (
          <li>
            <Link
              href={pagePath(current - 1)}
              rel="prev"
              className="inline-flex items-center rounded-[var(--radius-card)] border-2 border-ink/10 bg-white px-4 py-2 text-base font-semibold text-ink transition-colors hover:border-purple hover:text-purple"
            >
              Anterior
            </Link>
          </li>
        ) : null}

        {pages.map((page) => (
          <li key={page}>
            {page === current ? (
              <span
                aria-current="page"
                className="inline-flex items-center rounded-[var(--radius-card)] border-2 border-purple bg-purple px-4 py-2 text-base font-semibold tabular-nums text-white"
              >
                {page}
              </span>
            ) : (
              <Link
                href={pagePath(page)}
                className={clsx(
                  "inline-flex items-center rounded-[var(--radius-card)] border-2 border-ink/10 bg-white px-4 py-2 text-base font-semibold tabular-nums text-ink transition-colors",
                  "hover:border-purple hover:text-purple",
                )}
              >
                {page}
              </Link>
            )}
          </li>
        ))}

        {current < total ? (
          <li>
            <Link
              href={pagePath(current + 1)}
              rel="next"
              className="inline-flex items-center rounded-[var(--radius-card)] border-2 border-ink/10 bg-white px-4 py-2 text-base font-semibold text-ink transition-colors hover:border-purple hover:text-purple"
            >
              Siguiente
            </Link>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}
