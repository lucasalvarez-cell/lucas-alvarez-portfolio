import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    kicker: "Recursos",
    title: "Blog: cómo elegir agencia de marketing digital, SEO o redes sociales",
  });
}
