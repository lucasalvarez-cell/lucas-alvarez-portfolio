import type { MethodologyItem } from "@/types/blog";

/**
 * "Cómo hemos valorado este ranking".
 *
 * GMEDIA and iSocialWeb both open their rankings with a declared-criteria
 * section, and it is the one thing that makes a self-favouring list readable
 * as journalism instead of as an ad. Two of the pages I studied put their own
 * agency at number one with no stated method at all; stating the method costs
 * nothing and is the difference between "my list" and "my opinion".
 */
export function Methodology({
  items,
  disclosure,
}: {
  items: MethodologyItem[];
  disclosure?: string;
}) {
  if (!items.length) return null;

  return (
    <section
      aria-labelledby="metodologia"
      className="mt-12 rounded-[var(--radius-card)] border-2 border-light-grey p-6 sm:p-8"
    >
      <h2
        id="metodologia"
        className="font-display text-2xl font-extrabold text-ink"
      >
        Cómo he montado esta lista
      </h2>

      <dl className="mt-6 space-y-4">
        {items.map((item) => (
          <div key={item.name} className="sm:flex sm:gap-6">
            <dt className="font-display text-base font-extrabold text-ink sm:w-52 sm:shrink-0">
              {item.name}
            </dt>
            <dd className="mt-1 text-base leading-relaxed text-ink-soft sm:mt-0">
              {item.detail}
            </dd>
          </div>
        ))}
      </dl>

      {disclosure ? (
        <p className="mt-6 border-t-2 border-light-grey pt-5 text-base leading-relaxed text-ink">
          <span className="font-display font-extrabold uppercase tracking-[0.1em] text-purple">
            Conflicto de interés:
          </span>{" "}
          {disclosure}
        </p>
      ) : null}
    </section>
  );
}
