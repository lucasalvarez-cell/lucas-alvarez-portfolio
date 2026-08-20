import type { FaqItem } from "@/types/blog";

/**
 * Native details/summary accordion — no client JS, works without hydration and
 * stays open for in-page search (Ctrl+F) in browsers that support it.
 */
export function FaqSection({ items }: { items: FaqItem[] }) {
  if (!items.length) return null;

  return (
    <section className="mt-16">
      <h2 className="text-3xl text-ink">Preguntas frecuentes</h2>

      <div className="mt-8 space-y-3">
        {items.map((item) => (
          <details
            key={item.question}
            className="group rounded-[var(--radius-card)] border-2 border-light-grey bg-white p-5 open:border-purple/40 sm:p-6"
          >
            <summary className="flex cursor-pointer list-none items-start justify-between gap-4 text-lg font-semibold text-ink marker:content-none">
              {item.question}
              <span
                aria-hidden
                className="mt-1 shrink-0 text-purple transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="mt-4 text-lg leading-relaxed text-ink-soft">
              {item.answer}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
