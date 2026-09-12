import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { getAllPosts } from "@/lib/blog";
import { pageCount } from "@/lib/pagination";

/* Next resolves opengraph-image per segment and does not inherit it, so
   without this file every /blog/pagina/N link would share out with no image. */
export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const dynamicParams = false;

export function generateStaticParams() {
  const posts = getAllPosts();
  const featured = posts.find((post) => post.pillar) ?? posts[0];
  const total = pageCount(posts.filter((p) => p.slug !== featured?.slug).length);
  return Array.from({ length: Math.max(0, total - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ page: string }>;
}) {
  const { page } = await params;
  return ogImage({
    kicker: `Recursos · página ${page}`,
    title: "Blog: marketing digital, SEO y redes sociales",
  });
}
