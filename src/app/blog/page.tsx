import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogPostCard } from "@/components/BlogPostCard";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { blogGraph, breadcrumbSchema } from "@/lib/schema";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = buildMetadata({
  title: "Blog de marketing digital y SEO en Barcelona",
  description:
    "Cómo elegir agencia de marketing digital, SEO, diseño web o gestión de redes sociales en Barcelona. Criterios y procesos reales, explicados por dentro.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <JsonLd data={blogGraph(posts)} />
      <JsonLd data={breadcrumbSchema([{ name: "Blog", path: "/blog" }])} />

      <Section tone="gradient" padding="large">
        <SectionHeading
          kicker="Recursos"
          title="Marketing digital, SEO y redes sociales en Barcelona"
          subtitle="Cómo elegimos, medimos y ejecutamos en Publiqo. Escrito para que puedas juzgar a cualquier agencia, incluida la mía."
          tone="dark"
          as="h1"
        />
      </Section>

      <Section>
        {/* The list needs its own heading: without it the card titles jump
            straight from the page h1 to h3. */}
        <h2 className="sr-only">Todos los artículos</h2>

        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </>
  );
}
