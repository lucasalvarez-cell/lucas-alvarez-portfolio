import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    kicker: "Resultados",
    title: "Casos de éxito: +250 %, +62 % y x6 de visualizaciones en un mes",
  });
}
