import { getAllPosts } from "@/lib/blog";
import { SITE_LANG, SITE_NAME, SITE_URL } from "@/lib/constants";

/**
 * Feed RSS del blog.
 *
 * No existía ninguno, y un feed hace dos cosas que el sitemap no hace: es la
 * vía por la que los agregadores descubren contenido nuevo sin recorrer el
 * sitio entero, y es un documento que reúne en un solo sitio los sesenta
 * caracteres más citables de cada artículo.
 *
 * `content:encoded` NO intenta renderizar el MDX. Los cuerpos usan <Stats>,
 * <Bars>, <Ficha> y <Callout>, que solo existen dentro del árbol de React, y
 * `next-mdx-remote/rsc` es un componente de servidor, no un renderizador a
 * cadena. Se compone con `quickAnswer` y `keyTakeaways`, que ya son el mejor
 * resumen autocontenido de cada pieza y están en el frontmatter.
 */
export const dynamic = "force-static";

/** Escapa los cinco caracteres que XML no admite en texto ni en atributos. */
function xml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

/** RSS exige RFC-822, no ISO-8601. */
function rfc822(date: string): string {
  return new Date(date).toUTCString();
}

export function GET(): Response {
  const posts = getAllPosts();
  const updated = posts[0]?.updated ?? posts[0]?.date ?? new Date().toISOString();

  const items = posts
    .map((post) => {
      const url = `${SITE_URL}/blog/${post.slug}`;
      const takeaways = (post.keyTakeaways ?? [])
        .map((item) => `<li>${xml(item)}</li>`)
        .join("");

      const body = [
        `<p>${xml(post.quickAnswer ?? post.description)}</p>`,
        takeaways ? `<ul>${takeaways}</ul>` : "",
        `<p><a href="${url}">Leer el artículo completo</a></p>`,
      ].join("");

      return `    <item>
      <title>${xml(post.metaTitle ?? post.title)}</title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <pubDate>${rfc822(post.updated ?? post.date)}</pubDate>
      <description>${xml(post.description)}</description>
${(post.tags ?? []).map((tag) => `      <category>${xml(tag)}</category>`).join("\n")}
      <content:encoded><![CDATA[${body}]]></content:encoded>
    </item>`;
    })
    .join("\n");

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:content="http://purl.org/rss/1.0/modules/content/">
  <channel>
    <title>Blog de ${xml(SITE_NAME)}</title>
    <link>${SITE_URL}/blog</link>
    <description>Marketing digital, SEO y redes sociales, con cifras de cuentas reales.</description>
    <language>${SITE_LANG}</language>
    <lastBuildDate>${rfc822(updated)}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;

  return new Response(feed, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
