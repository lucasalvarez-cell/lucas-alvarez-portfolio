/**
 * JSON-LD in a script tag.
 *
 * `JSON.stringify` does not escape `<`, so a `</script>` inside any string in
 * the graph would close the block early and drop the rest of the page into the
 * document as markup. All the content here is authored in this repo, so it is
 * not an active vulnerability, but the escape costs nothing and the day someone
 * pastes a snippet into a frontmatter description is the day it would have
 * mattered.
 *
 * Note the doubled backslashes. The replacement has to be the literal
 * six-character sequence, not the character it denotes: a single backslash
 * would make the string *be* `<`, and every character would be replaced by
 * itself. A JSON parser decodes the sequence back to `<`, so what the crawler
 * reads is unchanged; only the HTML tokenizer sees a difference.
 */
const ESCAPES: Record<string, string> = {
  "<": "\\u003c",
  ">": "\\u003e",
  "&": "\\u0026",
};

export function JsonLd({ data }: { data: object }) {
  const json = JSON.stringify(data).replace(
    /[<>&]/g,
    (character) => ESCAPES[character],
  );

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />
  );
}
