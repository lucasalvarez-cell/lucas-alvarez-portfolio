import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { SECTOR_PAGES, getSectorPage } from "@/content/sectores";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return SECTOR_PAGES.map((page) => ({
    slug: page.service,
    sector: page.sector,
  }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string; sector: string }>;
}) {
  const { slug, sector } = await params;
  const page = getSectorPage(slug, sector);

  return ogImage({
    kicker: "Sector",
    title: page?.h1 ?? "Servicios",
  });
}
