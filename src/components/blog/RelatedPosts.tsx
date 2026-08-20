import Link from "next/link";
import type { PostMeta } from "@/types/blog";

/** Ranks by shared tags, falling back to most recent so the block is never empty. */
export function pickRelated(
  current: PostMeta,
  all: PostMeta[],
  limit = 3,
): PostMeta[] {
  const others = all.filter((post) => post.slug !== current.slug);
  const tags = new Set(current.tags ?? []);

  return others
    .map((post) => ({
      post,
      shared: (post.tags ?? []).filter((tag) => tags.has(tag)).length,
    }))
    .sort((a, b) => {
      if (b.shared !== a.shared) return b.shared - a.shared;
      return a.post.date < b.post.date ? 1 : -1;
    })
    .slice(0, limit)
    .map((entry) => entry.post);
}

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null;

  return (
    <section className="mt-16 border-t-2 border-light-grey pt-12">
      <h2 className="text-3xl text-ink">Seguir leyendo</h2>

      <ul className="mt-8 space-y-6">
        {posts.map((post) => (
          <li key={post.slug}>
            <Link href={`/blog/${post.slug}`} className="group block">
              <h3 className="text-xl leading-snug text-ink transition-colors group-hover:text-purple">
                {post.title}
              </h3>
              <p className="mt-2 text-base leading-relaxed text-ink-soft">
                {post.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
