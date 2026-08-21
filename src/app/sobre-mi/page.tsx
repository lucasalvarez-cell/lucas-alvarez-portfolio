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
  title: "Lucas Álvarez, social media manager en Barcelona",
  description:
    "Quién es Lucas Álvarez: social media manager y estratega de contenido en Barcelona, cofundador de Publiqo. Cuentas reales, cifras verificables y con quién trabajo.",
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
            title="Lucas Álvarez, social media manager y estratega de contenido en Barcelona"
            subtitle="Estrategia antes que suerte. Gestiono personalmente las cuentas de las que hablo: tres campings de la costa catalana, una marca de café, impresión industrial y dos canales de YouTube."
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
            className="text-lg leading-relaxed text-ink-soft"
          >
            {/*
              Four unbroken paragraphs before: no H2 anywhere on the entity page
              of the site. Split into named sections so a crawler — and an AI
              summarising "quién es Lucas Álvarez" — can find the trajectory,
              the method and the credentials separately.
            */}
            <p>
              Soy Lucas Álvarez, social media manager y estratega de contenido
              en Barcelona. Gestiono personalmente las redes sociales y la
              estrategia de contenido de marcas que estaban estancadas, y soy
              cofundador de{" "}
              <strong className="font-semibold text-ink">Publiqo</strong>, la
              agencia de marketing digital que dirijo junto a mi socio{" "}
              <strong className="font-semibold text-ink">Martí</strong>.
            </p>

            <h2 className="mt-12 text-[1.875rem] normal-case leading-tight text-ink">
              Con qué cuentas trabajo
            </h2>
            <p className="mt-5">
              Mi trabajo del día a día son las cuentas. Gestiono el Instagram y
              la estrategia de contenido de Camping Puzol, Camping Collvert,
              Camping Victòria (Canet de Mar) e IBPRINT, llevo la marca de café
              Arnal2 Coffee y el Grupo Arnal2, y diseño los sistemas de guion,
              títulos y descripciones de dos canales de YouTube de naturaleza y
              documental, Reino Selva y RayWild. Todos empezaron estancados.
              Ninguno lo está ahora.
            </p>
            <p className="mt-5">
              Las cifras que cito en esta web salen de esas cuentas, no de un
              caso de estudio ajeno: +250 % de visualizaciones en un mes en
              Camping Collvert, ×6 en Camping Victòria, +62 % en Camping Puzol y
              2,6 millones de visualizaciones en Reino Selva. Están publicadas
              con nombre de cliente para que se puedan comprobar.
            </p>

            <h2 className="mt-12 text-[1.875rem] normal-case leading-tight text-ink">
              Cómo trabajo
            </h2>
            <p className="mt-5">
              Mi enfoque parte de una idea incómoda: casi ninguna cuenta
              estancada tiene un problema de cantidad. Publican bastante. Lo que
              falla es el formato, el gancho o a quién le están hablando. Por
              eso nunca empiezo produciendo más contenido: empiezo entendiendo
              por qué el que ya existe no funciona.
            </p>
            <p className="mt-5">
              Camping Victòria multiplicó por seis sus visualizaciones
              simplemente pasando de uno a dos posts por semana, porque para
              entonces ya sabíamos qué formato funcionaba. Ese orden (diagnosticar,
              validar el formato y solo después subir la frecuencia) es lo
              único que traslado igual de un sector a otro.
              Los pilares de contenido de un camping y de una imprenta
              industrial no se parecen en nada; la forma de encontrarlos sí.
            </p>

            <h2 className="mt-12 text-[1.875rem] normal-case leading-tight text-ink">
              Por qué me creo lo que digo
            </h2>
            <p className="mt-5">
              Ese mismo criterio lo he aplicado a mi propia cuenta,{" "}
              <strong className="font-semibold text-ink">@lucasalvarez.x</strong>
              , con 116 mil seguidores y un acuerdo de embajador con Gymshark.
              No es el foco de esta web, pero explica de dónde salen los
              métodos: los pruebo en mi contenido antes de aplicarlos al de un
              cliente. Es también la razón por la que no vendo garantías de
              resultado: sé lo suficiente de estas plataformas como para saber
              que nadie puede darlas.
            </p>
            <p className="mt-5">
              Trabajo en castellano, catalán e inglés, desde Barcelona, en toda
              Cataluña y en remoto para el resto de España.
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
