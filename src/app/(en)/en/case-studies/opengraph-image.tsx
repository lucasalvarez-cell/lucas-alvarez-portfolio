import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;
export const alt = "Case studies by Lucas Álvarez";

export default function Image() {
  return ogImage({
    kicker: "Case studies",
    title: "Organic growth and demand generation, with client names and real figures",
    footer: "lucasalvarez.info/en",
  });
}
