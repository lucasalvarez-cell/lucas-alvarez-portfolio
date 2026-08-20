import { ImageResponse } from "next/og";

export const OG_SIZE = { width: 1200, height: 630 };
export const OG_CONTENT_TYPE = "image/png";

/**
 * Palette is duplicated here on purpose: ImageResponse renders outside the
 * document, so it cannot read the CSS variables in globals.css. Keep these in
 * sync with the @theme block.
 */
const PURPLE = "#6222cc";
const PURPLE_DEEP = "#310778";
const TURQUOISE = "#82e5ce";

/** Longer titles step down so a headline never overflows the 1200x630 card. */
function titleSize(title: string): number {
  if (title.length > 110) return 44;
  if (title.length > 80) return 52;
  if (title.length > 55) return 60;
  return 72;
}

/**
 * The shared social card. Every route segment that needs an `og:image` renders
 * this from its own `opengraph-image.tsx`: Next resolves those per segment and
 * does not inherit them, so a segment without one ships no image at all.
 */
export function ogImage({
  title,
  kicker,
  footer = "lucasalvarez.info",
}: {
  title: string;
  kicker?: string;
  footer?: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `linear-gradient(90deg, ${PURPLE}, ${PURPLE_DEEP})`,
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              width: 90,
              height: 8,
              background: TURQUOISE,
              marginBottom: 32,
              borderRadius: 4,
            }}
          />
          {kicker ? (
            <div
              style={{
                display: "flex",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: TURQUOISE,
                marginBottom: 24,
              }}
            >
              {kicker}
            </div>
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: titleSize(title),
              fontWeight: 800,
              lineHeight: 1.15,
              letterSpacing: "-1px",
              maxWidth: 1000,
            }}
          >
            {title}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 26,
            color: "rgba(255,255,255,0.75)",
          }}
        >
          <div style={{ display: "flex" }}>Lucas Álvarez · Publiqo</div>
          <div style={{ display: "flex" }}>{footer}</div>
        </div>
      </div>
    ),
    { ...OG_SIZE }
  );
}
