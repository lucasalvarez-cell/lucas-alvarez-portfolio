import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, profilePageSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  title: "Sobre mí: Lucas Álvarez, estratega digital en Barcelona",
  description:
    "Lucas Álvarez, estratega digital en Barcelona y cofundador de Publiqo junto a Martí. Gestiono redes sociales, estrategia de contenido, SEO y desarrollo web para marcas.",
  path: "/sobre-mi",
});

export default function SobreMiPage() {
  return (
    <>
      <JsonLd data={profilePageSchema()} />
      <JsonLd
        data={breadcrumbSchema([{ name: "Sobre mí", path: "/sobre-mi" }])}
      />

      <Section tone="gradient" padding="large">
        <Reveal immediate>
          <SectionHeading
            kicker="Sobre mí"
            title="Estrategia antes que suerte"
            tone="dark"
            as="h1"
          />
        </Reveal>
      </Section>

      <Section>
        <div className="grid gap-12 lg:grid-cols-[2fr_3fr] lg:gap-16">
          <Reveal className="relative mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none">
            <div className="relative aspect-4/5 overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src="/images/lucas-alvarez.jpg"
                alt="Lucas Álvarez, estratega digital en Barcelona y cofundador de Publiqo"
                fill
                sizes="(min-width: 1024px) 35vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>

          <Reveal
            delay={150}
            className="space-y-6 text-lg leading-relaxed text-ink-soft"
          >
            <p>
              Soy Lucas Álvarez, estratega digital en Barcelona y cofundador de{" "}
              <strong className="font-semibold text-ink">Publiqo</strong>, la
              agencia de marketing digital que dirijo junto a mi socio{" "}
              <strong className="font-semibold text-ink">Martí</strong>. Desde
              Publiqo llevamos la presencia digital completa de nuestros
              clientes: redes sociales, estrategia de contenido, SEO, desarrollo
              web y campañas de Google Ads y Meta Ads.
            </p>
            <p>
              Mi trabajo del día a día son las cuentas. Gestiono el Instagram y
              la estrategia de contenido de Camping Puzol, Camping Collvert,
              Camping Victòria (Canet de Mar) e IBPRINT, y diseño los sistemas
              de guion, títulos y descripciones de dos canales de YouTube de
              naturaleza y documental, Reino Selva y RayWild. Todos empezaron
              estancados. Ninguno lo está ahora.
            </p>
            <p>
              Mi enfoque parte de una idea incómoda: casi ninguna cuenta
              estancada tiene un problema de cantidad. Publican bastante. Lo que
              falla es el formato, el gancho o a quién le están hablando. Por
              eso nunca empiezo produciendo más contenido: empiezo entendiendo
              por qué el que ya existe no funciona. Camping Victòria multiplicó
              por seis sus visualizaciones simplemente pasando de uno a dos
              posts por semana, porque para entonces ya sabíamos qué formato
              funcionaba.
            </p>
            <p>
              Ese mismo criterio lo he aplicado a mi propia cuenta,{" "}
              <strong className="font-semibold text-ink">@lucasalvarez.x</strong>
              , con 116 mil seguidores y un acuerdo de embajador con Gymshark.
              No es el foco de esta web, pero explica de dónde salen los
              métodos: los pruebo en mi contenido antes de aplicarlos al de un
              cliente.
            </p>
          </Reveal>
        </div>
      </Section>

      <CTASection
        title="¿Quieres saber qué haría yo con tu cuenta?"
        subtitle="Trabajo con marcas que quieren externalizar su presencia digital completa y con empresas que solo necesitan un diagnóstico y un plan. Dime en qué caso estás."
      />
    </>
  );
}
