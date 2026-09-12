import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BlogPostCard } from "@/components/BlogPostCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { blogGraph, breadcrumbSchema } from "@/lib/schema";
import { getAllPosts } from "@/lib/blog";
import { activeTopics } from "@/lib/topics";
import { pageCount, pageSlice } from "@/lib/pagination";
import { Pagination } from "@/components/blog/Pagination";

export const metadata: Metadata = buildMetadata({
  title: "Blog de marketing digital y SEO en Barcelona",
  description:
    "Cómo elegir agencia de marketing digital, SEO, diseño web o gestión de redes sociales en Barcelona. Criterios y procesos reales, explicados por dentro.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();
  const topics = activeTopics(posts);

  // The pillar is the entry point of the whole blog, so it gets the width and
  // the type size to say so. Everything else keeps the standard card.
  const featured = posts.find((post) => post.pillar) ?? posts[0];
  const rest = posts.filter((post) => post.slug !== featured?.slug);

  /* Page 1 shows the pillar plus the first 24. The rest live under
     /blog/pagina/N, which is a real page with its own canonical, not a
     JavaScript "load more" that a crawler never clicks. */
  const totalPages = pageCount(rest.length);
  const pagePosts = pageSlice(rest, 1);

  return (
    <>
      <JsonLd data={blogGraph(posts)} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", path: "/blog" }])} />

      <header className="border-b-2 border-light-grey bg-light-grey/30">
        <Container className="py-14 sm:py-20">
          <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-purple">
            Recursos
          </p>

          <h1 className="mt-4 max-w-4xl text-balance text-[clamp(2.25rem,5vw,3.75rem)] normal-case leading-[1.05] tracking-[-0.02em] text-ink">
            Marketing digital, SEO y redes sociales en Barcelona
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-body">
            Cómo elegimos, medimos y ejecutamos en Publiqo. Escrito para que
            puedas juzgar a cualquier agencia, incluida la mía.
          </p>

          {/* The way in. A flat list of 28 cards gives a reader no route. */}
          <nav aria-label="Temas del blog" className="mt-10">
            <ul className="flex flex-wrap gap-2.5">
              {topics.map((topic) => (
                <li key={topic.tag}>
                  <Link
                    href={`/blog/tema/${topic.tag}`}
                    className="inline-flex items-center gap-2 rounded-[var(--radius-card)] border-2 border-ink/10 bg-white px-4 py-2 text-base font-semibold text-ink transition-colors hover:border-purple hover:text-purple"
                  >
                    {topic.label}
                    <span className="text-sm font-normal tabular-nums text-ink-soft/70">
                      {topic.count}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </header>

      {featured ? (
        <Section padding="large">
          <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-ink-soft">
            Empieza por aquí
          </h2>
          <div className="mt-8">
            <BlogPostCard post={featured} size="feature" />
          </div>
        </Section>
      ) : null}

      <Section padding="large" className="border-t-2 border-light-grey">
        <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-ink-soft">
          Todos los artículos
        </h2>

        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {pagePosts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>

        <Pagination current={1} total={totalPages} />
      </Section>
    </>
  );
}
