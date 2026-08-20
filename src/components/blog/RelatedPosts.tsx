import { Section } from "@/components/ui/Section";
import { BlogPostCard } from "@/components/BlogPostCard";
import type { PostMeta } from "@/types/blog";

/**
 * Ranks by shared tags, then by recency so the block is never empty.
 *
 * Posts inside the same topic hub score higher than posts that merely share a
 * geography tag: "barcelona" is on sixteen of the twenty-eight articles, so
 * without this weighting every post would recommend the same three.
 */
export function pickRelated(
  current: PostMeta,
  all: PostMeta[],
  limit = 3,
): PostMeta[] {
  const others = all.filter((post) => post.slug !== current.slug);
  const tags = current.tags ?? [];
  const primary = tags[0];

  return others
    .map((post) => {
      const shared = (post.tags ?? []).filter((tag) => tags.includes(tag));
      return {
        post,
        score:
          shared.length +
          // Same cluster: worth more than any number of incidental matches.
          (primary && post.tags?.includes(primary) ? 3 : 0),
      };
    })
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.post.date < b.post.date ? 1 : -1;
    })
    .slice(0, limit)
    .map((entry) => entry.post);
}

export function RelatedPosts({ posts }: { posts: PostMeta[] }) {
  if (!posts.length) return null;

  return (
    <Section tone="grey" padding="large">
      <h2 className="text-[1.875rem] normal-case tracking-[-0.01em] text-ink">
        Seguir leyendo
      </h2>

      <div className="mt-10 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
        {posts.map((post) => (
          <BlogPostCard key={post.slug} post={post} />
        ))}
      </div>
    </Section>
  );
}
