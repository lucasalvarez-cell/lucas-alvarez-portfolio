import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export default function Image() {
  return ogImage({
    kicker: "Servicios",
    title: "Redes sociales, contenido, SEO, web y consultoría en Barcelona",
  });
}
