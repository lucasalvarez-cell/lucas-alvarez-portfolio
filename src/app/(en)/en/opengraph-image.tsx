import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Lucas Álvarez, Marketing Lead";

export default function Image() {
  return ogImage({
    kicker: "Marketing Lead · Remote, US Eastern hours",
    title: "Lucas Álvarez: growth, content and paid media, run end to end",
    footer: "lucasalvarez.info/en",
  });
}
