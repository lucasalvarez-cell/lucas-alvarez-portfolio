import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, caseStudiesGraph } from "@/lib/schema";
import {
  CASE_STUDIES,
  getPublishedCaseStudies,
} from "@/content/casos-de-exito";

export const metadata: Metadata = buildMetadata({
  title: "Casos de éxito en redes sociales y contenido",
  description:
    "Resultados reales: +250 % de visualizaciones para Camping Collvert, +62 % para Camping Puzol, x6 para Camping Victòria y 2,6 M de visualizaciones para Reino Selva.",
  path: "/casos-de-exito",
});

export default function CasosDeExitoPage() {
  return (
    <>
      <JsonLd data={caseStudiesGraph(getPublishedCaseStudies())} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Casos de éxito", path: "/casos-de-exito" },
        ])}
      />

      <Section tone="gradient" padding="huge">
        <Reveal immediate>
          <SectionHeading
            kicker="Resultados"
            title="Cuentas que estaban paradas"
            subtitle="Cuatro cuentas reales, con las cifras que dio cada una en su primer mes de trabajo. Sin publicidad de pago detrás."
            tone="dark"
            as="h1"
          />
        </Reveal>

        <div className="mt-16 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {CASE_STUDIES.map((caseStudy, index) => (
            <Reveal key={caseStudy.slug} delay={index * 60}>
              <CaseStudyCard caseStudy={caseStudy} />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="¿Tu cuenta se parece a alguna de estas?"
        subtitle="Escríbeme con el enlace a tu perfil y te digo qué veo y qué cambiaría primero."
      />
    </>
  );
}
