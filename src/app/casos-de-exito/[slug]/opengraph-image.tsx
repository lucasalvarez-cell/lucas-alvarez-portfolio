import { OG_CONTENT_TYPE, OG_SIZE, ogImage } from "@/lib/og";

export const size = OG_SIZE;
export const contentType = OG_CONTENT_TYPE;

import { notFound } from "next/navigation";
import { getPublishedCaseStudies, getCaseStudyBySlug } from "@/content/casos-de-exito";

export function generateStaticParams() {
  return getPublishedCaseStudies().map((caseStudy) => ({ slug: caseStudy.slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const caseStudy = getCaseStudyBySlug(slug);
  if (!caseStudy) notFound();

  return ogImage({
    kicker: "Caso de éxito",
    title: `${caseStudy.client}: ${caseStudy.headline}`,
  });
}
