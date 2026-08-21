import type { PostCover } from "@/types/blog";

/**
 * Cover art, as an SVG string.
 *
 * This used to be a React component rendering inline SVG. Inline SVG is
 * invisible to image search — there is no file to index — and it left the
 * articles with zero crawlable images in the body, which is both an
 * accessibility gap and the weakest signal in the whole blog.
 *
 * Building the markup as a string lets one route serve it as a real
 * `image/svg+xml` file, so the same drawing becomes a cacheable asset with
 * alt text and a URL. The design is unchanged.
 *
 * One accent colour (turquoise) runs across the whole blog for brand
 * consistency; the surface and the motif carry the variety.
 */

const ACCENT = "#82e5ce";
const ACCENT_SOFT = "rgba(130,229,206,0.35)";

/** Which ground the motif sits on. Keeps the index grid from looking uniform. */
const SURFACE: Record<PostCover["theme"], "gradient" | "ink" | "deep"> = {
  seo: "ink",
  local: "ink",
  ads: "ink",
  social: "gradient",
  content: "gradient",
  web: "deep",
  audit: "deep",
};

/**
 * Stable per-slug pseudo-random. Two posts of the same kind need to look like
 * siblings, not clones, and the output has to be identical on every build.
 */
function seedFrom(seed: string): () => number {
  let hash = 2166136261;
  for (let i = 0; i < seed.length; i += 1) {
    hash ^= seed.charCodeAt(i);
    hash = Math.imul(hash, 16777619);
  }
  return () => {
    hash += 0x6d2b79f5;
    let t = hash;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** SVG is XML: an unescaped & or < in a label would break the whole file. */
function esc(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function ground(surface: string, id: string): string {
  if (surface === "gradient") {
    return `<linearGradient id="${id}-bg" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stop-color="#6222cc"/><stop offset="100%" stop-color="#310778"/></linearGradient>`;
  }
  if (surface === "deep") {
    return `<linearGradient id="${id}-bg" x1="0" y1="0" x2="0.8" y2="1"><stop offset="0%" stop-color="#310778"/><stop offset="100%" stop-color="#0b0b1f"/></linearGradient>`;
  }
  return `<radialGradient id="${id}-bg" cx="0.78" cy="0.15" r="0.9"><stop offset="0%" stop-color="#4b18a8"/><stop offset="70%" stop-color="#14102e"/><stop offset="100%" stop-color="#0b0b1f"/></radialGradient>`;
}

/** Rising area chart. The shape varies per slug but always ends up and right. */
function growthChart(rand: () => number, id: string): string {
  const points: [number, number][] = [];
  let value = 0.12 + rand() * 0.1;

  for (let i = 0; i <= 7; i += 1) {
    const x = 660 + (i / 7) * 460;
    // Monotonic-ish climb with a small wobble, so it reads as real data.
    value += 0.06 + rand() * 0.12;
    points.push([x, 560 - Math.min(value, 1) * 330]);
  }

  const line = points
    .map(([x, y], i) => `${i === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`)
    .join(" ");
  const [lastX, lastY] = points[points.length - 1];

  return `<path d="${line} L1120 560 L660 560 Z" fill="url(#${id}-fill)"/>
<path d="${line}" fill="none" stroke="${ACCENT}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>
<circle cx="${lastX.toFixed(1)}" cy="${lastY.toFixed(1)}" r="13" fill="${ACCENT}"/>
<circle cx="${lastX.toFixed(1)}" cy="${lastY.toFixed(1)}" r="26" fill="none" stroke="${ACCENT_SOFT}" stroke-width="4"/>`;
}

/** Numbered bars, longest first: the shape of a ranking, before you read it. */
function rankBars(rand: () => number): string {
  return [0, 1, 2, 3, 4]
    .map((row) => {
      const y = 210 + row * 78;
      const width = Math.max(620 - row * 92 - rand() * 40, 120);
      const lead = row === 0;
      return `<text x="660" y="${y + 34}" font-family="Karla, sans-serif" font-size="30" font-weight="800" fill="${lead ? ACCENT : "rgba(255,255,255,0.45)"}">${String(row + 1).padStart(2, "0")}</text>
<rect x="720" y="${y}" width="${width.toFixed(0)}" height="44" rx="8" fill="${lead ? ACCENT : "rgba(255,255,255,0.16)"}"/>`;
    })
    .join("\n");
}

/** Checklist rows — the visual grammar of a "how to choose" guide. */
function checklist(rand: () => number): string {
  return [0, 1, 2, 3]
    .map((row) => {
      const y = 205 + row * 92;
      const done = row < 3;
      const tick = done
        ? `<path d="M674 ${y + 29} l11 11 l19 -21" fill="none" stroke="#0b0b1f" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"/>`
        : "";
      return `<rect x="660" y="${y}" width="56" height="56" rx="12" fill="${done ? ACCENT : "none"}" ${done ? "" : 'stroke="rgba(255,255,255,0.35)" stroke-width="4"'}/>
${tick}
<rect x="748" y="${y + 16}" width="${(300 + rand() * 160).toFixed(0)}" height="24" rx="6" fill="${done ? "rgba(255,255,255,0.34)" : "rgba(255,255,255,0.16)"}"/>`;
    })
    .join("\n");
}

/** Two stacks side by side: one option against the other. */
function compareColumns(rand: () => number): string {
  return [
    { x: 660, accent: true },
    { x: 918, accent: false },
  ]
    .map((column) => {
      const rows = [0, 1, 2, 3]
        .map(
          (row) =>
            `<rect x="${column.x + 28}" y="${214 + row * 84}" width="${(110 + rand() * 60).toFixed(0)}" height="20" rx="5" fill="${column.accent ? "rgba(130,229,206,0.75)" : "rgba(255,255,255,0.28)"}"/>`,
        )
        .join("\n");
      return `<rect x="${column.x}" y="170" width="222" height="390" rx="14" fill="${column.accent ? "rgba(130,229,206,0.16)" : "rgba(255,255,255,0.07)"}" stroke="${column.accent ? ACCENT : "rgba(255,255,255,0.2)"}" stroke-width="3"/>
${rows}`;
    })
    .join("\n");
}

/** Alt text has to describe the figure, not the decoration. */
export function coverAlt(cover: PostCover): string {
  const subject = cover.kicker ?? "Marketing digital";

  if (cover.kind === "metric" && cover.metric) {
    return `${subject}: ${cover.metric}${
      cover.metricLabel ? ` (${cover.metricLabel})` : ""
    }, sobre una gráfica de crecimiento`;
  }
  if (cover.kind === "rank") {
    return `${subject}: ranking de agencias representado con barras numeradas`;
  }
  if (cover.kind === "guide") {
    return `${subject}: lista de comprobación para elegir proveedor`;
  }
  return `${subject}: comparación de dos opciones enfrentadas`;
}

export function buildCoverSvg(cover: PostCover, slug: string): string {
  const rand = seedFrom(slug);
  const id = `c${slug.replace(/[^a-z0-9]/g, "")}`;
  const surface = SURFACE[cover.theme] ?? "ink";

  const motif =
    cover.kind === "metric"
      ? growthChart(rand, id)
      : cover.kind === "rank"
        ? rankBars(rand)
        : cover.kind === "guide"
          ? checklist(rand)
          : compareColumns(rand);

  const kicker = cover.kicker
    ? `<text x="80" y="164" font-family="Karla, sans-serif" font-size="26" font-weight="800" letter-spacing="4" fill="${ACCENT}">${esc(cover.kicker.toUpperCase())}</text>`
    : "";

  const metric = cover.metric
    ? `<text x="80" y="392" font-family="Karla, sans-serif" font-size="${cover.metric.length > 5 ? 128 : 168}" font-weight="800" fill="#ffffff">${esc(cover.metric)}</text>`
    : "";

  const label = cover.metricLabel
    ? `<text x="82" y="${cover.metric ? 452 : 300}" font-family="Roboto, sans-serif" font-size="30" fill="rgba(255,255,255,0.72)">${esc(cover.metricLabel)}</text>`
    : "";

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 675" width="1200" height="675" role="img" aria-label="${esc(coverAlt(cover))}">
<title>${esc(coverAlt(cover))}</title>
<defs>
${ground(surface, id)}
<pattern id="${id}-dots" width="32" height="32" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.5" fill="rgba(255,255,255,0.13)"/></pattern>
<linearGradient id="${id}-fill" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stop-color="${ACCENT}" stop-opacity="0.42"/><stop offset="100%" stop-color="${ACCENT}" stop-opacity="0"/></linearGradient>
</defs>
<rect width="1200" height="675" fill="url(#${id}-bg)"/>
<rect width="1200" height="675" fill="url(#${id}-dots)"/>
<rect x="80" y="96" width="88" height="8" rx="4" fill="${ACCENT}"/>
${kicker}
${metric}
${label}
${motif}
</svg>`;
}

/** The public URL of a post's cover file. */
export function coverUrl(slug: string): string {
  return `/blog/${slug}/cover.svg`;
}
