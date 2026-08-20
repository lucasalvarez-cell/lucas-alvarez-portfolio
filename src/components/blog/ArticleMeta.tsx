import Image from "next/image";
import Link from "next/link";

function formatDate(value: string): string {
  return new Date(value).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * The byline row every reference in the sector shows above the fold: face,
 * name, publication date, last update and reading time.
 *
 * The update date is not decoration. On "mejores agencias de 2026" queries the
 * reader's first question is whether the list is still true, and a visible
 * "Actualizado el…" answers it before they scroll — which is exactly why the
 * pages that rank put a year in the title and a date under it.
 */
export function ArticleMeta({
  published,
  updated,
  minutes,
}: {
  published: string;
  updated?: string;
  minutes: number;
}) {
  const wasUpdated = Boolean(updated && updated !== published);

  return (
    <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-3 text-base text-ink-soft">
      <Link href="/sobre-mi" rel="author" className="group flex items-center gap-3">
        <Image
          src="/images/lucas-alvarez.jpg"
          alt=""
          width={40}
          height={40}
          sizes="40px"
          className="h-10 w-10 rounded-full object-cover"
        />
        <span className="font-semibold text-ink transition-colors group-hover:text-purple">
          Lucas Álvarez
        </span>
      </Link>

      <span aria-hidden className="text-ink-soft/40">
        ·
      </span>

      {wasUpdated ? (
        <span>
          Actualizado el{" "}
          <time dateTime={updated}>{formatDate(updated as string)}</time>
        </span>
      ) : (
        <time dateTime={published}>{formatDate(published)}</time>
      )}

      <span aria-hidden className="text-ink-soft/40">
        ·
      </span>

      <span>{minutes} min de lectura</span>

      {wasUpdated ? (
        <span className="text-sm text-ink-soft/70">
          (publicado el {formatDate(published)})
        </span>
      ) : null}
    </div>
  );
}
