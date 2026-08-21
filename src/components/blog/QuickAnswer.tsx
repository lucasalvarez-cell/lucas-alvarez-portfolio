/**
 * The block AI search engines lift.
 *
 * Every guide that outranks us opens with one: danielfounder calls it
 * "Respuesta corta", HubSpot calls it "Respuesta rápida". The pattern that
 * gets cited is a self-contained 40–70 word answer to the question in the
 * title, placed before anything else, with an explicit subject in the first
 * sentence so it still makes sense quoted out of context.
 *
 * `<p>` rather than a blockquote on purpose: quoted markup signals "someone
 * else said this", which is the opposite of what we want an extractor to think.
 */
export function QuickAnswer({
  question,
  answer,
  label = "Respuesta rápida",
  id = "respuesta-rapida",
}: {
  question: string;
  answer: string;
  label?: string;
  id?: string;
}) {
  return (
    <section
      aria-labelledby={id}
      className="rounded-[var(--radius-card)] border-2 border-purple/25 bg-purple/[0.04] p-6 sm:p-8"
    >
      <h2
        id={id}
        className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-purple"
      >
        {label}
      </h2>

      <p className="sr-only">{question}</p>

      <p className="mt-4 text-xl leading-relaxed text-ink sm:text-2xl">
        {answer}
      </p>
    </section>
  );
}

/** Three to five conclusions, scannable in ten seconds. */
export function KeyTakeaways({ items }: { items: string[] }) {
  if (!items.length) return null;

  return (
    <section aria-labelledby="lo-esencial" className="mt-8">
      <h2
        id="lo-esencial"
        className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-ink-soft"
      >
        Lo esencial
      </h2>

      <ul className="mt-5 space-y-3.5">
        {items.map((item, index) => (
          <li key={item} className="flex gap-4">
            <span
              aria-hidden
              className="mt-1 shrink-0 font-display text-sm font-extrabold tabular-nums text-purple"
            >
              {String(index + 1).padStart(2, "0")}
            </span>
            <span className="text-lg leading-relaxed text-ink-soft">
              {item}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
