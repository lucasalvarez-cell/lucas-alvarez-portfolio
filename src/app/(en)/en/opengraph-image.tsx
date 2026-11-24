import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Lucas Álvarez, Head of Marketing";

export default function Image() {
  return ogImage({
    kicker: "Head of Marketing · Remote, US Eastern hours",
    title: "Lucas Álvarez: growth, content and paid media, run end to end",
    footer: "lucasalvarez.info/en",
  });
}
