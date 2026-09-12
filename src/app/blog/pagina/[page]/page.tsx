import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BlogPostCard } from "@/components/BlogPostCard";
import { Pagination } from "@/components/blog/Pagination";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { getAllPosts, featuredPost } from "@/lib/blog";
import { pageCount, pageSlice, POSTS_PER_PAGE } from "@/lib/pagination";

/**
 * Pages 2 and up of the blog index.
 *
 * Page 1 stays at /blog and is not duplicated here, so there is never a
 * /blog/pagina/1 competing with it. Each of these pages is canonical to
 * itself and indexable: the forty posts that only appear on page 3 are
 * reachable exactly one way, and pointing the canonical back at page 1 would
 * tell Google to ignore them.
 */

type Params = { page: string };

export const dynamicParams = false;

function pagesOf(): { total: number; rest: ReturnType<typeof getAllPosts> } {
  const posts = getAllPosts();
  const featured = featuredPost(posts);
  const rest = posts.filter((post) => post.slug !== featured?.slug);
  return { total: pageCount(rest.length), rest };
}

export function generateStaticParams(): Params[] {
  const { total } = pagesOf();
  /* From 2: page 1 is /blog. */
  return Array.from({ length: Math.max(0, total - 1) }, (_, index) => ({
    page: String(index + 2),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { page } = await params;
  const number = Number(page);
  const { total } = pagesOf();

  return buildMetadata({
    title: `Blog de marketing digital y SEO · página ${number} de ${total}`,
    description: `Artículos ${(number - 1) * POSTS_PER_PAGE + 2} y siguientes sobre marketing digital, SEO, redes sociales y diseño web para negocios en España.`,
    path: `/blog/pagina/${number}`,
  });
}

export default async function BlogPaginaPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { page } = await params;
  const number = Number(page);
  const { total, rest } = pagesOf();

  if (!Number.isInteger(number) || number < 2 || number > total) notFound();

  const posts = pageSlice(rest, number);

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blog" },
          { name: `Página ${number}`, path: `/blog/pagina/${number}` },
        ])}
      />

      <header className="border-b-2 border-light-grey bg-light-grey/30">
        <Container className="py-14 sm:py-20">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-purple">
            Recursos · página {number} de {total}
          </p>

          <h1 className="mt-4 max-w-4xl text-balance text-[clamp(2.25rem,5vw,3.75rem)] normal-case leading-[1.05] tracking-[-0.02em] text-ink">
            Marketing digital, SEO y redes sociales
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-body">
            Seguimos donde lo dejó la{" "}
            <Link
              href="/blog"
              className="underline decoration-purple/40 underline-offset-4 hover:text-purple"
            >
              primera página del blog
            </Link>
            .
          </p>
        </Container>
      </header>

      <Section padding="large">
        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        <Pagination current={number} total={total} />
      </Section>
    </>
  );
}
