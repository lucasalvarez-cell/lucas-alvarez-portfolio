import type { RankingEntry } from "@/types/blog";

/**
 * The at-a-glance table every ranking that outranks us opens with — and the
 * single most-cited format in AI answers after numbered lists, because each
 * row is a self-contained comparable fact.
 *
 * Two things the competing tables get wrong and this one does not: the "ideal
 * para" column (theirs list only the specialty, which is what the agency says
 * about itself, not what the reader is scanning for) and the disclosure mark
 * on the affiliated entry, so the bias is visible inside the table rather than
 * buried in a paragraph above it.
 *
 * On mobile the table becomes a stack of cards: a five-column table at 375px
 * either scrolls sideways or shrinks below a readable size, and both lose
 * readers on the block that is supposed to sell the article.
 */
export function RankingTable({ entries }: { entries: RankingEntry[] }) {
  if (!entries.length) return null;

  return (
    <section aria-labelledby="ranking-resumen" className="mt-12">
      <h2
        id="ranking-resumen"
        className="font-display text-2xl font-extrabold text-ink"
      >
        El ranking, de un vistazo
      </h2>

      {/* Desktop: a real table, so it can be parsed and quoted as one. */}
      <div className="mt-6 hidden overflow-hidden rounded-[var(--radius-card)] border-2 border-light-grey sm:block">
        <table className="w-full border-collapse text-left">
          <caption className="sr-only">
            Resumen del ranking: posición, agencia, especialidad y perfil de
            cliente al que encaja cada una.
          </caption>
          <thead className="bg-light-grey">
            <tr>
              <th
                scope="col"
                className="w-16 px-4 py-3 font-display text-xs font-extrabold uppercase tracking-[0.1em] text-ink"
              >
                #
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-display text-xs font-extrabold uppercase tracking-[0.1em] text-ink"
              >
                Agencia
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-display text-xs font-extrabold uppercase tracking-[0.1em] text-ink"
              >
                Especialidad
              </th>
              <th
                scope="col"
                className="px-4 py-3 font-display text-xs font-extrabold uppercase tracking-[0.1em] text-ink"
              >
                Ideal para
              </th>
            </tr>
          </thead>
          <tbody>
            {entries.map((entry) => (
              <tr
                key={entry.position}
                className="border-t border-light-grey align-top"
              >
                <td className="px-4 py-4 font-display text-lg font-extrabold tabular-nums text-purple">
                  {String(entry.position).padStart(2, "0")}
                </td>
                <td className="px-4 py-4">
                  <a
                    href={`#${entry.anchor}`}
                    className="font-semibold text-ink underline decoration-purple/30 underline-offset-4 transition-colors hover:text-purple"
                  >
                    {entry.name}
                  </a>
                  {entry.disclosed ? (
                    <span className="ml-2 whitespace-nowrap rounded bg-purple/10 px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-purple">
                      Trabajo aquí
                    </span>
                  ) : null}
                </td>
                <td className="px-4 py-4 text-base leading-relaxed text-ink-soft">
                  {entry.specialty}
                </td>
                <td className="px-4 py-4 text-base leading-relaxed text-ink-soft">
                  {entry.bestFor}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile: same data, stacked. */}
      <ol className="mt-6 space-y-3 sm:hidden">
        {entries.map((entry) => (
          <li
            key={entry.position}
            className="rounded-[var(--radius-card)] border-2 border-light-grey p-4"
          >
            <div className="flex items-baseline gap-3">
              <span className="font-display text-lg font-extrabold tabular-nums text-purple">
                {String(entry.position).padStart(2, "0")}
              </span>
              <a
                href={`#${entry.anchor}`}
                className="font-semibold text-ink underline decoration-purple/30 underline-offset-4"
              >
                {entry.name}
              </a>
            </div>
            {entry.disclosed ? (
              <p className="mt-2 inline-block rounded bg-purple/10 px-2 py-0.5 text-[0.7rem] font-semibold uppercase tracking-wide text-purple">
                Trabajo aquí
              </p>
            ) : null}
            <p className="mt-2 text-base leading-relaxed text-ink-soft">
              {entry.specialty}
            </p>
            <p className="mt-2 text-base leading-relaxed text-ink-soft">
              <span className="font-semibold text-ink">Ideal para:</span>{" "}
              {entry.bestFor}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
