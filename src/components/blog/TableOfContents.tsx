import GithubSlugger from "github-slugger";

type Heading = { level: 2 | 3; text: string; id: string };

/**
 * Builds the index from the raw MDX source rather than from the rendered tree:
 * the ids have to match what rehype-slug generates, so both sides run the same
 * slugger over the same strings.
 */
export function getHeadings(source: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];
  let inCodeFence = false;

  for (const line of source.split("\n")) {
    if (line.startsWith("```")) {
      inCodeFence = !inCodeFence;
      continue;
    }
    if (inCodeFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*$/.exec(line);
    if (!match) continue;

    // Strip the inline markdown that would otherwise end up in the link text.
    const text = match[2]
      .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();

    headings.push({
      level: match[1].length === 2 ? 2 : 3,
      text,
      id: slugger.slug(text),
    });
  }

  return headings;
}

export function TableOfContents({ headings }: { headings: Heading[] }) {
  if (headings.length < 3) return null;

  return (
    <nav
      aria-label="Índice del artículo"
      className="mt-12 rounded-[var(--radius-card)] border-2 border-light-grey bg-light-grey/40 p-6 sm:p-8"
    >
      <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-purple">
        En este artículo
      </p>

      <ol className="mt-5 space-y-2.5">
        {headings.map((heading) => (
          <li
            key={heading.id}
            className={heading.level === 3 ? "pl-5" : undefined}
          >
            <a
              href={`#${heading.id}`}
              className={`text-base leading-snug transition-colors hover:text-purple ${
                heading.level === 2
                  ? "font-semibold text-ink"
                  : "text-ink-soft"
              }`}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
