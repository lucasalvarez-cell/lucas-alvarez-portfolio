import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { WorkSlider } from "@/components/sections/WorkSlider";
import { CTASection } from "@/components/sections/CTASection";
import { HomeFaq, HOME_FAQ } from "@/components/sections/HomeFaq";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { homeGraph, faqSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

const TITLE = "Social media manager y estratega de contenido en Barcelona";

export const metadata: Metadata = buildMetadata({
  title: TITLE,
  description:
    "Social media manager en Barcelona. Gestión de redes sociales, contenido y SEO desde 290 €. +250 % de visualizaciones en un mes para Camping Collvert, x6 para Camping Victòria.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <JsonLd data={homeGraph(TITLE)} />
      <JsonLd data={faqSchema(HOME_FAQ, `${SITE_URL}/`)!} />
      <Hero />
      <LogoStrip />
      <ServicesPreview />
      <FeaturedWork />
      <WorkSlider />
      <HomeFaq />
      <CTASection />
    </>
  );
}
