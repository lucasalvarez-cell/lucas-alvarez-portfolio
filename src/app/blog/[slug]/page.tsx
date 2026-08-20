import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { mdxComponents } from "@/components/MdxComponents";
import { PostCover } from "@/components/blog/PostCover";
import { ArticleMeta } from "@/components/blog/ArticleMeta";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import {
  TableOfContents,
  TableOfContentsMobile,
} from "@/components/blog/TableOfContents";
import { KeyTakeaways, QuickAnswer } from "@/components/blog/QuickAnswer";
import { RankingTable } from "@/components/blog/RankingTable";
import { Methodology } from "@/components/blog/Methodology";
import { AuthorBox } from "@/components/blog/AuthorBox";
import { FaqSection } from "@/components/blog/FaqSection";
import { RelatedPosts, pickRelated } from "@/components/blog/RelatedPosts";
import { RelatedServices } from "@/components/blog/RelatedServices";
import { SidebarCta } from "@/components/blog/SidebarCta";
import { getHeadings, type Heading } from "@/lib/headings";
import { buildMetadata } from "@/lib/seo";
import {
  blogPostingSchema,
  breadcrumbSchema,
  faqSchema,
  rankingSchema,
} from "@/lib/schema";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { TAG_LABELS, getTopic } from "@/lib/topics";
import type { Post } from "@/types/blog";

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

/**
 * The index has to describe the page the reader is on, not just the MDX file.
 * Four of the sections on a post are rendered by this template rather than
 * written in the body — the quick answer, the ranking table, the method and
 * the FAQ — and they are all real H2s in the output.
 */
function buildIndex(post: Post): Heading[] {
  const before: Heading[] = [];
  const after: Heading[] = [];

  if (post.quickAnswer) {
    before.push({ level: 2, text: "Respuesta rápida", id: "respuesta-rapida" });
  }
  if (post.ranking?.length) {
    before.push({
      level: 2,
      text: "El ranking, de un vistazo",
      id: "ranking-resumen",
    });
  }
  if (post.methodology?.length) {
    before.push({
      level: 2,
      text: "Cómo he montado esta lista",
      id: "metodologia",
    });
  }
  if (post.faq?.length) {
    after.push({
      level: 2,
      text: "Preguntas frecuentes",
      id: "preguntas-frecuentes",
    });
  }

  return [...before, ...getHeadings(post.content), ...after];
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const posts = getAllPosts();
  const words = wordCount(post.content);
  const headings = buildIndex(post);
  const related = pickRelated(post, posts);
  const faq = faqSchema(post.faq);
  const ranking = rankingSchema(post);

  /*
   * Only the tags that actually have a hub page become a breadcrumb step. A
   * two-post topic produces no URL, and a breadcrumb pointing at a 404 is
   * worse than a shorter breadcrumb.
   */
  const primaryTag = post.tags?.find((tag) => getTopic(tag, posts));

  return (
    <article>
      <ReadingProgress />

      <JsonLd data={blogPostingSchema(post, words)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blog" },
          ...(primaryTag
            ? [
                {
                  name: TAG_LABELS[primaryTag] ?? primaryTag,
                  path: `/blog/tema/${primaryTag}`,
                },
              ]
            : []),
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />
      {faq ? <JsonLd data={faq} /> : null}
      {ranking ? <JsonLd data={ranking} /> : null}

      {/*
        A light editorial header instead of the brand gradient band. The
        gradient is right for a landing hero; on an article it puts a full
        screen of purple between the reader and the first sentence, and the
        pages that win these queries all open on the text.
      */}
      <header className="border-b-2 border-light-grey bg-light-grey/30">
        <Container className="max-w-[70rem] py-10 sm:py-14">
          <nav aria-label="Migas de pan" className="text-base text-ink-soft">
            <Link href="/" className="transition-colors hover:text-purple">
              Inicio
            </Link>
            <span aria-hidden className="px-2 text-ink-soft/40">
              /
            </span>
            <Link href="/blog" className="transition-colors hover:text-purple">
              Blog
            </Link>
            {primaryTag ? (
              <>
                <span aria-hidden className="px-2 text-ink-soft/40">
                  /
                </span>
                <Link
                  href={`/blog/tema/${primaryTag}`}
                  className="transition-colors hover:text-purple"
                >
                  {TAG_LABELS[primaryTag] ?? primaryTag.replace(/-/g, " ")}
                </Link>
              </>
            ) : null}
          </nav>

          <div className="mt-8 max-w-4xl">
            <h1 className="text-balance text-[clamp(2rem,4.5vw,3.25rem)] normal-case leading-[1.1] tracking-[-0.02em] text-ink">
              {post.title}
            </h1>

            <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-body">
              {post.description}
            </p>

            <ArticleMeta
              published={post.date}
              updated={post.updated}
              minutes={readingMinutes(words)}
            />
          </div>
        </Container>
      </header>

      <Container className="max-w-[70rem] py-10 sm:py-14">
        <div className="overflow-hidden rounded-[var(--radius-card)]">
          <div className="aspect-[16/9] w-full sm:aspect-[21/9]">
            <PostCover cover={post.cover} slug={post.slug} priority />
          </div>
        </div>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_15rem] lg:gap-14">
          <div className="min-w-0 max-w-[44rem]">
            <TableOfContentsMobile headings={headings} />

            {post.quickAnswer ? (
              <div className="mt-8 lg:mt-0">
                <QuickAnswer
                  question={post.title}
                  answer={post.quickAnswer}
                />
              </div>
            ) : null}

            {post.keyTakeaways?.length ? (
              <KeyTakeaways items={post.keyTakeaways} />
            ) : null}

            {post.ranking?.length ? (
              <RankingTable entries={post.ranking} />
            ) : null}

            {post.methodology?.length ? (
              <Methodology
                items={post.methodology}
                disclosure={post.disclosure}
              />
            ) : null}

            <div className="mt-4">
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

            <AuthorBox />

            <RelatedServices tags={post.tags} />
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <TableOfContents headings={headings} />
              <SidebarCta />
            </div>
          </aside>
        </div>
      </Container>

      <RelatedPosts posts={related} />

      <CTASection
        title="¿Quieres que mire tu caso?"
        subtitle="Mándame el enlace a tu perfil o a tu web y te digo qué veo y qué cambiaría primero. Respondo personalmente."
      />
    </article>
  );
}
