import Image from "next/image";
import Link from "next/link";
import type { PostMeta } from "@/types/blog";

export function BlogPostCard({ post }: { post: PostMeta }) {
  const formattedDate = new Date(post.date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card-hover group flex flex-col"
    >
      <div className="relative mb-5 aspect-[6.16/6] w-full overflow-hidden rounded-[var(--radius-card)] bg-light-grey">
        <Image
          src={post.coverImage}
          alt={post.coverImageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover"
        />
      </div>

      {post.tags?.length ? (
        <p className="text-sm font-semibold uppercase tracking-[0.15em] text-purple">
          {post.tags.slice(0, 2).join(" · ").replace(/-/g, " ")}
        </p>
      ) : null}

      <h3 className="mt-2 text-2xl leading-snug text-ink">{post.title}</h3>

      <p className="mt-3 flex-1 text-base leading-relaxed text-ink-soft">
        {post.description}
      </p>

      <p className="mt-4 text-sm text-ink-soft/70">{formattedDate}</p>
    </Link>
  );
}
