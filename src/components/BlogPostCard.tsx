import Link from "next/link";
import { clsx } from "clsx";
import { TAG_LABELS } from "@/lib/topics";
import type { PostMeta } from "@/types/blog";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

/**
 * Card anatomy, in the order the eye takes it: topic, title, promise, date.
 *
 * There is no image. The generated cover art that used to open this card was
 * removed because 19 of 36 posts drew the same four-box checklist, which is
 * exactly what makes a graphic read as machine-made. What replaces it is not
 * another picture but a rule: each card opens with a hairline, so the grid
 * still has edges without pretending to have illustration.
 *
 * `size="feature"` is the pillar treatment on the index: same component, a
 * heavier accent rule and a bigger title, so the hierarchy is real rather than
 * an editor's note.
 */
export function BlogPostCard({
  post,
  size = "default",
}: {
  post: PostMeta;
  size?: "default" | "feature";
}) {
  const feature = size === "feature";
  const topic = post.tags?.[0];

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={clsx(
        "group flex flex-col border-t-2 transition-colors",
        feature
          ? "border-purple pt-6"
          : "flex-1 border-light-grey pt-5 hover:border-purple",
      )}
    >
      <p className="flex flex-wrap items-center gap-x-2 text-sm font-semibold uppercase tracking-[0.15em] text-purple">
        {topic ? <span>{TAG_LABELS[topic] ?? topic.replace(/-/g, " ")}</span> : null}
        {post.pillar ? (
          <>
            <span aria-hidden className="text-purple/40">
              ·
            </span>
            <span className="text-ink-soft">Guía completa</span>
          </>
        ) : null}
      </p>

      <h3
        className={clsx(
          "mt-3 text-balance normal-case leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-purple",
          feature
            ? "text-[2rem] sm:text-[2.5rem] sm:max-w-[22ch]"
            : "text-[1.375rem]",
        )}
      >
        {post.title}
      </h3>

      <p
        className={clsx(
          "mt-3 leading-relaxed text-ink-soft",
          feature ? "max-w-[60ch] text-lg" : "flex-1 text-base",
        )}
      >
        {post.description}
      </p>

      <p className="mt-4 text-sm text-ink-soft/70">
        {post.updated && post.updated !== post.date
          ? `Actualizado el ${formatDate(post.updated)}`
          : formatDate(post.date)}
      </p>
    </Link>
  );
}
