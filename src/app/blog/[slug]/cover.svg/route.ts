import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { buildCoverSvg } from "@/lib/cover-svg";

/**
 * Serves each post's cover as a real `image/svg+xml` file.
 *
 * The point is that it is a file. Inline SVG renders identically but has no
 * URL, so there is nothing for image search to index and nothing to point
 * `ImageObject` at. This route costs one small, immutable asset per post.
 */
export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(buildCoverSvg(post.cover, post.slug), {
    headers: {
      "Content-Type": "image/svg+xml; charset=utf-8",
      /* The drawing is derived from the post's frontmatter and changes only
         when the post does, which ships a new build anyway. */
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
