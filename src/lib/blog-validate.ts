import matter from "gray-matter";
import { readAllPostSources } from "@/lib/blog";
import { TAG_LABELS } from "@/lib/topics";
import type { PostFrontmatter } from "@/types/blog";

/**
 * Build-time gate for blog posts, modelled on `assertSectorPages()`.
 *
 * Until now `getAllPosts()` did `matter(raw)` and cast the result to
 * `PostMeta` without checking anything. That was survivable at 38 posts
 * written one at a time. At 138, written in a batch and published on a
 * schedule, a missing field would surface as an opaque TypeError during
 * prerender, on the morning the post was due, with nothing pointing at the
 * file.
 *
 * Every post on disk is checked, including the ones dated in the future. A
 * validator that only looked at published posts would let a broken draft sit
 * quietly for weeks and then take down the deploy that was supposed to
 * publish it.
 *
 * Failing the build is the right response and not an overreaction: these
 * pages are prerendered, so a bad one ships to every crawler at once.
 */

const MIN_BODY_WORDS = 1200;
/**
 * The word floor is not retroactive. 26 of the 38 posts that existed when this
 * validator was written are under 1.200 words, several of them deliberately:
 * `cuantas-publicaciones-a-la-semana` answers its question in 642 words and
 * padding it would make it worse. Rewriting them is a separate decision from
 * setting a standard for what comes next, so the floor applies from the day
 * the rule arrived. Anything written after this date has no excuse.
 */
const WORD_FLOOR_FROM = "2026-09-13";
const DESCRIPTION_MIN = 120;
const DESCRIPTION_MAX = 160;
const QUICK_ANSWER_MIN_WORDS = 40;
const QUICK_ANSWER_MAX_WORDS = 70;

function words(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

function isRealDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const [year, month, day] = value.split("-").map(Number);
  const parsed = new Date(Date.UTC(year, month - 1, day));
  /* `2026-11-31` passes the regex and rolls over to December in the Date
     constructor. Round-tripping is the only way to catch it. */
  return (
    parsed.getUTCFullYear() === year &&
    parsed.getUTCMonth() === month - 1 &&
    parsed.getUTCDate() === day
  );
}

export function assertPosts(): void {
  /* Answer text -> the slug that said it first. Two posts giving the same
     answer to a FAQ is two pages competing to be the one Google quotes. */
  const seenAnswers = new Map<string, string>();

  for (const { slug, raw } of readAllPostSources()) {
    const { data, content } = matter(raw);
    const post = data as Partial<PostFrontmatter>;
    const id = `${slug}.mdx`;

    if (post.slug !== slug) {
      throw new Error(
        `Post ${id}: el campo slug dice "${post.slug}". Tiene que ser "${slug}", igual que el nombre del fichero, o la URL que genera no existe.`,
      );
    }

    for (const field of ["title", "description", "date"] as const) {
      if (!post[field] || String(post[field]).trim() === "") {
        throw new Error(`Post ${id}: falta el campo ${field}.`);
      }
    }

    if (!post.tags?.length) {
      throw new Error(
        `Post ${id}: falta tags. Sin al menos uno, el post no entra en ningún hub ni enlaza a ningún servicio.`,
      );
    }

    if (!isRealDate(post.date!)) {
      throw new Error(
        `Post ${id}: la fecha "${post.date}" no es una fecha real en formato YYYY-MM-DD.`,
      );
    }

    if (post.updated && !isRealDate(post.updated)) {
      throw new Error(
        `Post ${id}: la fecha de updated "${post.updated}" no es una fecha real en formato YYYY-MM-DD.`,
      );
    }

    const descriptionLength = post.description!.length;
    if (
      descriptionLength < DESCRIPTION_MIN ||
      descriptionLength > DESCRIPTION_MAX
    ) {
      throw new Error(
        `Post ${id}: la description mide ${descriptionLength} caracteres. Tiene que estar entre ${DESCRIPTION_MIN} y ${DESCRIPTION_MAX}: por debajo desaprovecha el espacio del resultado, por encima Google la corta.`,
      );
    }

    for (const tag of post.tags) {
      if (!TAG_LABELS[tag]) {
        throw new Error(
          `Post ${id}: el tag "${tag}" no está en TAG_LABELS (src/lib/topics.ts). Sin entrada se renderiza en minúsculas y sin acentos.`,
        );
      }
    }

    if (post.quickAnswer) {
      const count = words(post.quickAnswer);
      if (count < QUICK_ANSWER_MIN_WORDS || count > QUICK_ANSWER_MAX_WORDS) {
        throw new Error(
          `Post ${id}: quickAnswer tiene ${count} palabras. El rango es ${QUICK_ANSWER_MIN_WORDS}-${QUICK_ANSWER_MAX_WORDS}: es el bloque que levantan las respuestas generativas y fuera de ahí deja de servir para eso.`,
        );
      }
    }

    if (post.keyTakeaways && (post.keyTakeaways.length < 3 || post.keyTakeaways.length > 5)) {
      throw new Error(
        `Post ${id}: keyTakeaways tiene ${post.keyTakeaways.length} elementos. Van entre 3 y 5.`,
      );
    }

    /* The em dash rule from commit be4ccf7, enforced instead of remembered.
       Code comments are stripped from the bundle and may keep theirs; an MDX
       file is all reader-facing text. */
    if (raw.includes("—")) {
      const line = raw.split("\n").findIndex((l) => l.includes("—")) + 1;
      throw new Error(
        `Post ${id}: hay un guión largo en la línea ${line}. Glosa o enumeración van entre paréntesis, un inciso corto entre comas, y un separador es un punto medio.`,
      );
    }

    for (const item of post.faq ?? []) {
      const key = item.answer.trim();
      const first = seenAnswers.get(key);
      if (first) {
        throw new Error(
          `Post ${id}: la respuesta de "${item.question}" es idéntica a una de ${first}.mdx. Dos páginas con la misma respuesta compiten por ser la que se cita.`,
        );
      }
      seenAnswers.set(key, slug);
    }

    const bodyWords = words(content);
    if (post.date! >= WORD_FLOOR_FROM && bodyWords < MIN_BODY_WORDS) {
      throw new Error(
        `Post ${id}: ${bodyWords} palabras de cuerpo. El mínimo son ${MIN_BODY_WORDS}: por debajo de eso no responde mejor que las diez páginas que ya rankean.`,
      );
    }
  }
}
