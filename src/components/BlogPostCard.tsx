import Link from "next/link";
import { clsx } from "clsx";
import { PostCover } from "@/components/blog/PostCover";
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
 * Card anatomy, in the order the eye takes it: cover, topic, title, promise,
 * date. The cover is generated art rather than a photo — see PostCover.
 *
 * `size="feature"` is the pillar treatment on the index: same component, wider
 * ratio and a bigger title, so the hierarchy is real rather than an editor's
 * note. Before this, 28 posts were rendered identically and nothing signalled
 * which one to read first.
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
        "group flex flex-col",
        feature && "sm:grid sm:grid-cols-2 sm:items-center sm:gap-10",
      )}
    >
      <div
        className={clsx(
          "w-full overflow-hidden rounded-[var(--radius-card)] transition-transform duration-300 group-hover:scale-[1.015]",
          feature ? "aspect-[16/10]" : "aspect-[16/10]",
        )}
      >
        <PostCover cover={post.cover} slug={post.slug} />
      </div>

      <div className={clsx(feature ? "mt-6 sm:mt-0" : "mt-5 flex flex-1 flex-col")}>
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
            "mt-2.5 text-balance normal-case leading-snug tracking-[-0.01em] text-ink transition-colors group-hover:text-purple",
            feature ? "text-[1.75rem] sm:text-[2rem]" : "text-[1.375rem]",
          )}
        >
          {post.title}
        </h3>

        <p
          className={clsx(
            "mt-3 leading-relaxed text-ink-soft",
            feature ? "text-lg" : "flex-1 text-base",
          )}
        >
          {post.description}
        </p>

        <p className="mt-4 text-sm text-ink-soft/70">
          {post.updated && post.updated !== post.date
            ? `Actualizado el ${formatDate(post.updated)}`
            : formatDate(post.date)}
        </p>
      </div>
    </Link>
  );
}
