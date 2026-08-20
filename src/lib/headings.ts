import GithubSlugger from "github-slugger";

export type Heading = { level: 2 | 3; text: string; id: string };

/**
 * Builds the index from the raw MDX source rather than from the rendered tree:
 * the ids have to match what rehype-slug generates, so both sides run the same
 * slugger over the same strings.
 *
 * Lives in lib/ rather than in the component because the index now also has to
 * account for sections the page injects around the MDX (the quick answer, the
 * ranking table, the method, the FAQ). Those are real H2s in the document, so
 * leaving them out of the index would make it lie.
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
