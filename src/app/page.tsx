import type { Metadata } from "next";
import { Hero } from "@/components/sections/Hero";
import { LogoStrip } from "@/components/sections/LogoStrip";
import { ServicesPreview } from "@/components/sections/ServicesPreview";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { WorkSlider } from "@/components/sections/WorkSlider";
import { CTASection } from "@/components/sections/CTASection";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Estratega de contenido y social media manager en Barcelona",
  description:
    "Estrategia de contenido y gestión de redes sociales en Barcelona. +62 %, +250 % y x6 de visualizaciones en un mes para clientes reales. Cofundador de Publiqo.",
  path: "/",
});

export default function Home() {
  return (
    <>
      <Hero />
      <LogoStrip />
      <ServicesPreview />
      <FeaturedWork />
      <WorkSlider />
      <CTASection />
    </>
  );
}
