import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { BlogPostCard } from "@/components/BlogPostCard";
import { buildMetadata } from "@/lib/seo";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = buildMetadata({
  title: "Blog",
  description:
    "Cómo elegir agencia de marketing digital, SEO, diseño web o gestión de redes sociales en Barcelona. Criterios y procesos reales, explicados por dentro.",
  path: "/blog",
});

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <>
      <Section tone="gradient" padding="large">
        <SectionHeading
          kicker="Recursos"
          title="Blog"
          subtitle="Cómo elegimos, medimos y ejecutamos en Publiqo. Escrito para que puedas juzgar a cualquier agencia, incluida la mía."
          tone="dark"
          as="h1"
        />
      </Section>

      <Section>
        <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>
    </>
  );
}
