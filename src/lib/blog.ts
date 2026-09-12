import fs from "fs";
import path from "path";
import matter from "gray-matter";
import type { Post, PostMeta } from "@/types/blog";

const BLOG_DIR = path.join(process.cwd(), "content", "blog");

function readSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/**
 * Today in Madrid, not in UTC. The site is Spanish and so are its dates: at
 * 01:00 Madrid time it is still yesterday in UTC, and a post dated today would
 * stay hidden for two more hours. Comparing "YYYY-MM-DD" strings
 * lexicographically is correct and drags no timezone along.
 */
function todayInMadrid(): string {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Europe/Madrid",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date());
}

/** A post with tomorrow's date is written but not published. */
export function isPublished(post: { date: string }): boolean {
  return post.date <= todayInMadrid();
}

/**
 * Every published post, newest first.
 *
 * The date gate lives here and nowhere else. This is the one funnel the
 * sitemap, llms.txt, the RSS feed, the index, the topic hubs, the related
 * posts and both `generateStaticParams` all read from, so filtering here is
 * the only way a future-dated post cannot leak through a consumer that forgot
 * to ask. It also keeps the two `generateStaticParams` in step by
 * construction: they cannot disagree about which slugs exist.
 *
 * Because the site is fully prerendered, "today" is resolved at build time.
 * A daily deploy is what actually publishes the post: see vercel.json.
 */
export function getAllPosts(): PostMeta[] {
  return readAllPosts()
    .filter(isPublished)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

/**
 * Every post on disk, published or not, unsorted.
 *
 * Only the build-time validator wants this. Validating just the published ones
 * would let a broken post sit quietly until its own publication day and take
 * the build down then, with no warning in between.
 */
export function readAllPosts(): PostMeta[] {
  return readSlugs().map((slug) => {
    const raw = fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8");
    const { data } = matter(raw);
    return data as PostMeta;
  });
}

/** Slug plus raw body, for the validator. Published or not. */
export function readAllPostSources(): { slug: string; raw: string }[] {
  return readSlugs().map((slug) => ({
    slug,
    raw: fs.readFileSync(path.join(BLOG_DIR, `${slug}.mdx`), "utf8"),
  }));
}

export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(BLOG_DIR, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const meta = data as PostMeta;

  /* `dynamicParams = false` already 404s an unpublished slug, because its
     params never get generated. This is the belt to that pair of braces: if
     that flag ever flips, an unpublished draft still does not render. */
  if (!isPublished(meta)) return null;

  return { ...meta, content };
}
