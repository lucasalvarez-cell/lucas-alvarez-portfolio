import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ServiceCard } from "@/components/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { servicesGraph } from "@/lib/schema";
import { SERVICES } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Servicios",
  description:
    "Gestión de redes sociales, estrategia de contenido, SEO, desarrollo web y consultoría digital en Barcelona. Contratables por separado o como sistema completo.",
  path: "/servicios",
});

export default function ServiciosPage() {
  return (
    <>
      <JsonLd data={servicesGraph()} />

      <Section tone="gradient" padding="large">
        <Reveal>
          <SectionHeading
            kicker="Servicios"
            title="Gestión de redes sociales, contenido y SEO en Barcelona"
            subtitle="Cinco servicios que puedes contratar por separado. Funcionan mejor juntos: el contenido trae audiencia, el SEO la captura cuando ya te busca, y la web convierte a las dos."
            tone="dark"
            as="h1"
          />
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={index * 60}>
              <ServiceCard service={service} detailed />
            </Reveal>
          ))}
        </div>
      </Section>

      <CTASection
        title="¿Cuál de estos necesitas ahora mismo?"
        subtitle="Cuéntame en qué punto está tu marca y te digo por dónde empezaría yo. Si lo que necesitas no es ninguno de estos cinco, también te lo diré."
      />
    </>
  );
}
