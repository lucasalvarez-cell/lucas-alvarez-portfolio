import Link from "next/link";
import { getAllPosts } from "@/lib/blog";

/**
 * The pillar's links down to its cluster, resolved at build time.
 *
 * Every other internal link in these articles points backwards, at a post that
 * was already published when this one went out. A pillar cannot do that: its
 * children were written afterwards on purpose, so that they could link up to
 * it. A hand-written link from the pillar to a child dated three months later
 * is a 404 for those three months, which is why the validator rejects one.
 *
 * So the pillar declares the whole cluster and this filters it through the same
 * date gate the rest of the site uses. On the day the pillar goes out the list
 * holds whatever exists; the daily rebuild adds each child on its own morning.
 * Titles come from the frontmatter rather than being retyped here, so renaming
 * a post cannot leave a stale label behind.
 *
 * An unknown slug is a build error, not a silently dropped row: see
 * `blog-validate.ts`.
 */
export function Serie({
  title = "El resto de esta serie",
  slugs,
}: {
  title?: string;
  slugs: string;
}) {
  const wanted = slugs
    .split(",")
    .map((slug) => slug.trim())
    .filter(Boolean);

  const bySlug = new Map(getAllPosts().map((post) => [post.slug, post]));
  const published = wanted
    .map((slug) => bySlug.get(slug))
    .filter((post): post is NonNullable<typeof post> => Boolean(post));

  /* Before the first child publishes there is nothing to show, and an empty
     box with a heading reads as a bug. */
  if (!published.length) return null;

  return (
    <aside className="not-prose my-10 border-y-2 border-light-grey py-7">
      <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-purple">
        {title}
      </h2>

      <ul className="mt-5 space-y-4">
        {published.map((post) => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className="font-display font-extrabold leading-snug text-ink underline decoration-purple/30 underline-offset-4 transition-colors hover:text-purple"
            >
              {post.title}
            </Link>
            <p className="mt-1 text-base leading-relaxed text-ink-soft">
              {post.description}
            </p>
          </li>
        ))}
      </ul>
    </aside>
  );
}
