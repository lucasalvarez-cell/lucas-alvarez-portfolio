import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { mdxComponents } from "@/components/MdxComponents";
import {
  TableOfContents,
  getHeadings,
} from "@/components/blog/TableOfContents";
import { FaqSection } from "@/components/blog/FaqSection";
import { RelatedPosts, pickRelated } from "@/components/blog/RelatedPosts";
import { RelatedServices } from "@/components/blog/RelatedServices";
import { buildMetadata } from "@/lib/seo";
import {
  blogPostingSchema,
  breadcrumbSchema,
  faqSchema,
} from "@/lib/schema";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return buildMetadata({
    title: post.metaTitle ?? post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    article: {
      publishedTime: post.date,
      modifiedTime: post.updated ?? post.date,
      section: post.tags?.[0]?.replace(/-/g, " "),
      tags: post.tags,
    },
  });
}

function wordCount(content: string): number {
  return content.trim().split(/\s+/).length;
}

/** ~200 words per minute, rounded up — matches how most readers pace prose. */
function readingMinutes(words: number): number {
  return Math.max(1, Math.round(words / 200));
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const words = wordCount(post.content);
  const published = post.date;
  const modified = post.updated ?? post.date;
  const formatDate = (value: string) =>
    new Date(value).toLocaleDateString("es-ES", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

  const headings = getHeadings(post.content);
  const related = pickRelated(post, getAllPosts());
  const faq = faqSchema(post.faq);

  return (
    <article>
      <JsonLd data={blogPostingSchema(post, words)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      {faq ? <JsonLd data={faq} /> : null}

      <Section tone="gradient" padding="large" containerClassName="max-w-3xl">
        <nav aria-label="Migas de pan" className="text-base text-white/60">
          <Link href="/" className="transition-colors hover:text-white">
            Inicio
          </Link>
          <span aria-hidden className="px-2">
            /
          </span>
          <Link href="/blog" className="transition-colors hover:text-white">
            Blog
          </Link>
        </nav>

        {post.tags?.length ? (
          <p className="mt-8 text-sm font-semibold uppercase tracking-[0.2em] text-white/60">
            {post.tags.join(" · ").replace(/-/g, " ")}
          </p>
        ) : null}

        <h1 className="mt-3 text-white">{post.title}</h1>

        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/75">
          {post.description}
        </p>

        <p className="mt-8 text-base text-white/60">
          Por{" "}
          <Link
            href="/sobre-mi"
            rel="author"
            className="font-semibold text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
          >
            Lucas Álvarez
          </Link>{" "}
          ·{" "}
          <time dateTime={published}>{formatDate(published)}</time> ·{" "}
          {readingMinutes(words)} min de lectura
        </p>

        {modified !== published ? (
          <p className="mt-2 text-sm text-white/50">
            Actualizado el{" "}
            <time dateTime={modified}>{formatDate(modified)}</time>
          </p>
        ) : null}
      </Section>

      <Container className="max-w-3xl py-16">
        <div className="relative aspect-[16/9] w-full overflow-hidden rounded-[var(--radius-card)] bg-light-grey">
          <Image
            src={post.coverImage}
            alt={post.coverImageAlt}
            fill
            sizes="(min-width: 768px) 48rem, 90vw"
            className="object-cover"
            priority
          />
        </div>

        <TableOfContents headings={headings} />

        <div className="mt-12">
          <MDXRemote
            source={post.content}
            components={mdxComponents}
            options={{
              mdxOptions: {
                remarkPlugins: [remarkGfm],
                rehypePlugins: [rehypeSlug],
              },
            }}
          />
        </div>

        {post.faq?.length ? <FaqSection items={post.faq} /> : null}

        <RelatedServices tags={post.tags} />

        <RelatedPosts posts={related} />
      </Container>

      <CTASection
        title="¿Quieres que mire tu caso?"
        subtitle="Mándame el enlace a tu perfil o a tu web y te digo qué veo y qué cambiaría primero. Respondo personalmente."
      />
    </article>
  );
}
