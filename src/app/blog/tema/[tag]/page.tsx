import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { BlogPostCard } from "@/components/BlogPostCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, topicGraph } from "@/lib/schema";
import { getAllPosts } from "@/lib/blog";
import { activeTopics, getTopic, postsByTopic } from "@/lib/topics";

export function generateStaticParams() {
  return activeTopics(getAllPosts()).map((topic) => ({ tag: topic.tag }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ tag: string }>;
}): Promise<Metadata> {
  const { tag } = await params;
  const topic = getTopic(tag, getAllPosts());
  if (!topic) return {};

  return buildMetadata({
    title: topic.title,
    description: topic.description,
    path: `/blog/tema/${topic.tag}`,
  });
}

/**
 * The hub half of a hub-and-spoke cluster.
 *
 * Three jobs: give a reader who arrived on one article the others on the same
 * subject, give every article an internal link from a page that is about
 * exactly its topic, and — the part that stops this being a thin page — say
 * something the child posts do not. The reading path is the load-bearing
 * element: it frames each article by the decision it resolves, which is what
 * a reader choosing an agency actually needs.
 */
export default async function TopicPage({
  params,
}: {
  params: Promise<{ tag: string }>;
}) {
  const { tag } = await params;
  const posts = getAllPosts();
  const topic = getTopic(tag, posts);
  if (!topic) notFound();

  const topicPosts = postsByTopic(posts, topic.tag);
  const others = activeTopics(posts).filter((other) => other.tag !== topic.tag);

  const pillar = topicPosts.find((post) => post.pillar);
  const rest = topicPosts.filter((post) => post.slug !== pillar?.slug);

  /* The reading path is written ahead of the posts it names, because a cluster
     is planned as a whole. Posts publish one a day, so until a step's article
     is live its link would be a 404. Filtering against the published set lets
     the path fill itself in as the schedule advances. */
  const published = new Set(posts.map((post) => post.slug));
  const path = topic.path.filter((step) => published.has(step.slug));

  return (
    <>
      <JsonLd data={topicGraph(topic, topicPosts)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Blog", path: "/blog" },
          { name: topic.label, path: `/blog/tema/${topic.tag}` },
        ])}
      />

      <header className="border-b-2 border-light-grey bg-light-grey/30">
        <Container className="py-14 sm:py-20">
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
          </nav>

          <h1 className="mt-8 max-w-4xl text-balance text-[clamp(2rem,4.5vw,3.5rem)] normal-case leading-[1.05] tracking-[-0.02em] text-ink">
            {topic.title}
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-ink-body">
            {topic.intro}
          </p>

          <p className="mt-6 text-base text-ink-soft">
            {topicPosts.length} artículos sobre {topic.label.toLowerCase()}.
          </p>
        </Container>
      </header>

      {topic.overview.length ? (
        <Section padding="large">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,34rem)_1fr] lg:gap-16">
            <div>
              <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-purple">
                El estado del tema
              </h2>
              <div className="mt-6 space-y-5">
                {topic.overview.map((paragraph) => (
                  <p
                    key={paragraph.slice(0, 40)}
                    className="text-lg leading-relaxed text-ink-body"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>

            {path.length ? (
              <div>
                <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-ink-soft">
                  Qué leer, y para decidir qué
                </h2>
                <ol className="mt-6 divide-y-2 divide-light-grey border-y-2 border-light-grey">
                  {path.map((step, index) => (
                    <li key={step.slug} className="py-5">
                      <div className="flex gap-4">
                        <span
                          aria-hidden
                          className="mt-1 font-display text-sm font-extrabold tabular-nums text-purple"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                        <div>
                          <p className="text-base leading-snug text-ink-body">
                            {step.decision}
                          </p>
                          <Link
                            href={`/blog/${step.slug}`}
                            className="mt-1.5 inline-block font-display font-extrabold text-ink underline decoration-purple/30 underline-offset-4 transition-colors hover:text-purple"
                          >
                            {step.label}
                          </Link>
                        </div>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>
            ) : null}
          </div>
        </Section>
      ) : null}

      {pillar ? (
        <Section padding="large" className="border-t-2 border-light-grey">
          <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-ink-soft">
            La guía principal
          </h2>
          <div className="mt-8">
            <BlogPostCard post={pillar} size="feature" />
          </div>
        </Section>
      ) : null}

      <Section padding="large" className="border-t-2 border-light-grey">
        <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-ink-soft">
          {pillar ? "Más sobre este tema" : "Artículos"}
        </h2>

        <div className="mt-10 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      </Section>

      {others.length ? (
        <Section tone="grey" padding="large">
          <h2 className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-ink-soft">
            Otros temas
          </h2>
          <ul className="mt-6 flex flex-wrap gap-2.5">
            {others.map((other) => (
              <li key={other.tag}>
                <Link
                  href={`/blog/tema/${other.tag}`}
                  className="inline-flex rounded-[var(--radius-card)] border-2 border-ink/10 bg-white px-4 py-2 text-base font-semibold text-ink transition-colors hover:border-purple hover:text-purple"
                >
                  {other.label}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <CTASection
        title="¿Prefieres que lo mire yo?"
        subtitle="Mándame el enlace a tu web o a tu perfil y te digo qué cambiaría primero. Respondo personalmente."
      />
    </>
  );
}
