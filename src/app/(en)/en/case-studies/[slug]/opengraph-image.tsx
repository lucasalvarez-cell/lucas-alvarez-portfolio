import { notFound } from "next/navigation";
import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";
import { EN_CASE_STUDIES, getEnglishCaseStudy } from "@/content/en/case-studies";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

export function generateStaticParams() {
  return EN_CASE_STUDIES.map((caseStudy) => ({ slug: caseStudy.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getEnglishCaseStudy(slug);
  if (!caseStudy) notFound();

  return ogImage({
    kicker: "Case study",
    title: `${caseStudy.client}: ${caseStudy.headline}`,
    footer: "lucasalvarez.info/en",
  });
}
