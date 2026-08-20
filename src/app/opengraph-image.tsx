import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Palette is duplicated here on purpose: ImageResponse renders outside the
 * document, so it cannot read the CSS variables in globals.css. Keep these in
 * sync with the @theme block.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          background: "linear-gradient(90deg, #6222cc, #310778)",
          color: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            width: 90,
            height: 8,
            background: "#82e5ce",
            marginBottom: 36,
            borderRadius: 4,
          }}
        />
        <div
          style={{
            display: "flex",
            fontSize: 76,
            fontWeight: 800,
            textTransform: "uppercase",
            letterSpacing: "-1px",
          }}
        >
          Lucas Álvarez
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            color: "rgba(255,255,255,0.75)",
            marginTop: 24,
            maxWidth: 820,
          }}
        >
          Estratega digital · Cofundador de Publiqo · Barcelona
        </div>
      </div>
    ),
    { ...size }
  );
}
