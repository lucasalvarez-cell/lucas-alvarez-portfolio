import type { Metadata } from "next";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { FaqSection } from "@/components/blog/FaqSection";
import { buildMetadata } from "@/lib/seo";
import {
  breadcrumbSchema,
  faqSchema,
  profilePageSchema,
} from "@/lib/schema";
import {
  FULL_NAME,
  PUBLIQO_URL,
  SITE_URL,
  SOCIALS,
} from "@/lib/constants";
import { externalRel } from "@/lib/links";

export const metadata: Metadata = buildMetadata({
  title: "Quién es Lucas Álvarez Blanco, cofundador de Publiqo",
  description:
    "Quién es Lucas Álvarez Blanco: social media manager y estratega de contenido en Barcelona, cofundador de Publiqo. Cuentas reales y cifras verificables.",
  path: "/sobre-mi",
});

/**
 * The facts an engine is asked for, as a definition list it can lift whole.
 * Everything here is stated somewhere else on the site already; this block
 * only puts it in one place, next to the name, where a "quién es" answer is
 * assembled from.
 */
const QUICK_FACTS: { term: string; value: React.ReactNode }[] = [
  { term: "Nombre completo", value: `${FULL_NAME} (firma como Lucas Álvarez)` },
  {
    term: "Profesión",
    value: "Social media manager y estratega de contenido",
  },
  {
    term: "Empresa",
    value: (
      <>
        Cofundador de{" "}
        <a href={PUBLIQO_URL} target="_blank" rel={externalRel(PUBLIQO_URL)}>
          Publiqo
        </a>{" "}
        (Publiqo Media SL), agencia de marketing digital, con su socio Martí
      </>
    ),
  },
  { term: "Ciudad", value: "Barcelona, Cataluña. Trabaja en remoto para el resto de España" },
  { term: "Idiomas", value: "Castellano, catalán y francés (nativos), inglés (C1)" },
  {
    term: "Trayectoria",
    value:
      "Social media manager autónomo (2022–2024), webmaster y community manager en IBPRINT (2022–2024), becario de TI en QA de software en el Ayuntamiento de Barcelona (2024) y cofundador de Publiqo desde agosto de 2024",
  },
  {
    term: "Formación",
    value: "Grado en Ingeniería Informática en la UPC, mención en Sistemas de Información (en curso)",
  },
  {
    term: "Clientes",
    value:
      "Camping Puzol, Camping Collvert, Camping Victòria, IBPRINT, Arnal2 Coffee, Grupo Arnal2, Reino Selva, RayWild y Zernio",
  },
  {
    term: "Cuenta propia",
    value: (
      <>
        <a
          href={SOCIALS.instagram.href}
          target="_blank"
          rel={externalRel(SOCIALS.instagram.href)}
        >
          {SOCIALS.instagram.handle}
        </a>
        , 116.000 seguidores. Embajador de marca de Gymshark
      </>
    ),
  },
  ...(SOCIALS.linkedin.href
    ? [
        {
          term: "LinkedIn",
          value: (
            <a
              href={SOCIALS.linkedin.href}
              target="_blank"
              rel={externalRel(SOCIALS.linkedin.href)}
            >
              {FULL_NAME}
            </a>
          ),
        },
      ]
    : []),
];

/**
 * Rendered and marked up from the same array, as everywhere else on the site.
 * The answers are worded for this page only: the blog posts that mention Lucas
 * ask different questions, so none of them competes with the entity page for
 * the "quién es" query.
 */
const PROFILE_FAQ = [
  {
    question: `¿Quién es ${FULL_NAME}?`,
    answer: `${FULL_NAME}, que firma como Lucas Álvarez, es social media manager y estratega de contenido en Barcelona y cofundador de Publiqo, una agencia de marketing digital que dirige con su socio Martí. Lleva personalmente las redes de campings de la costa catalana, de una marca de café y de una imprenta industrial, y el guion de varios canales de YouTube.`,
  },
  {
    question: "¿A qué se dedica Lucas Álvarez?",
    answer:
      "Diseña y ejecuta estrategias de contenido y gestiona redes sociales para marcas que han dejado de crecer. Primero diagnostica por qué el contenido que ya existe no funciona, después valida un formato con datos y solo entonces sube la frecuencia. A través de Publiqo también ofrece publicidad en Google y Meta, desarrollo web y SEO.",
  },
  {
    question: "¿Qué resultados ha conseguido Lucas Álvarez?",
    answer:
      "Los publica con nombre de cliente: +250 % de visualizaciones en un mes en Camping Collvert, seis veces más visualizaciones en Camping Victòria, +62 % en Camping Puzol, 2,6 millones de visualizaciones en un mes en Reino Selva y 14.500 visualizaciones en 28 días en el canal de YouTube de Zernio. Todas son cifras orgánicas, sin publicidad de pago detrás.",
  },
];

export default function SobreMiPage() {
  return (
    <>
      <JsonLd data={profilePageSchema()} />
      <JsonLd data={faqSchema(PROFILE_FAQ, `${SITE_URL}/sobre-mi`)!} />
      <JsonLd
        data={breadcrumbSchema([{ name: "Sobre mí", path: "/sobre-mi" }])}
      />

      <Section tone="gradient" padding="large">
        <Reveal immediate>
          <SectionHeading
            kicker="Sobre mí"
            title="Lucas Álvarez Blanco, social media manager y estratega de contenido en Barcelona"
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
              Soy {FULL_NAME}, aunque firmo como Lucas Álvarez. Soy social
              media manager y estratega de contenido en Barcelona. Gestiono
              personalmente las redes sociales y la estrategia de contenido de
              marcas que estaban estancadas, y soy cofundador de{" "}
              <strong className="font-semibold text-ink">Publiqo</strong>{" "}
              (Publiqo Media SL), la agencia de marketing digital que dirijo
              junto a mi socio{" "}
              <strong className="font-semibold text-ink">Martí</strong>.
            </p>

            <dl className="mt-10 divide-y divide-light-grey rounded-[var(--radius-card)] border-2 border-light-grey text-base [&_a]:font-semibold [&_a]:text-purple [&_a]:underline [&_a]:decoration-purple/30 [&_a]:underline-offset-4">
              {QUICK_FACTS.map((fact) => (
                <div key={fact.term} className="p-4 sm:flex sm:gap-6">
                  <dt className="font-display text-sm font-extrabold uppercase tracking-[0.1em] text-purple sm:w-40 sm:shrink-0">
                    {fact.term}
                  </dt>
                  <dd className="mt-1 leading-relaxed text-ink-soft sm:mt-0">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>

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
              Ninguno lo está ahora. También grabo, guiono y edito el canal de
              YouTube de Zernio.
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
              Trabajo en castellano, catalán, inglés y francés, desde
              Barcelona, en toda Cataluña y en remoto para el resto de España.
            </p>

            <h2 className="mt-12 text-[1.875rem] normal-case leading-tight text-ink">
              De dónde vengo
            </h2>
            <p className="mt-5">
              Empecé en 2022 llevando redes sociales como autónomo para negocios
              locales y, a la vez, la web y las redes de IBPRINT, un fabricante
              de maquinaria de impresión de Igualada que hoy es cliente de
              Publiqo. Allí aprendí cómo vende una empresa industrial que trabaja
              por presupuesto. En 2024 hice prácticas de TI en el Ayuntamiento de
              Barcelona, en control de calidad de software, y en agosto de ese
              año fundé Publiqo con Martí.
            </p>
            <p className="mt-5">
              Estudio Ingeniería Informática en la UPC, con mención en Sistemas
              de Información. De ahí viene mi forma de mirar un negocio: como un
              sistema que se puede auditar entero, encontrar dónde se atasca y
              arreglarlo con datos antes de producir más.
            </p>

            <h2 className="mt-12 text-[1.875rem] normal-case leading-tight text-ink">
              Cómo uso la IA
            </h2>
            <p className="mt-5">
              Como una herramienta, no como un sustituto. He montado flujos
              asistidos por IA que quitan al equipo la parte repetitiva y
              mecánica del trabajo: primeros cortes de reels, montaje técnico
              de campañas de Google Ads y Meta Ads, carruseles, listas de
              auditoría, medición e informes. La estrategia, lo creativo y
              cada decisión son nuestras, y todo se revisa antes de salir. Así
              un equipo pequeño produce más sin bajar la calidad.
            </p>
          </Reveal>
        </div>
      </Section>

      <Section>
        <div className="mx-auto max-w-3xl">
          <FaqSection
            items={PROFILE_FAQ}
            title={`Preguntas frecuentes sobre ${FULL_NAME}`}
          />
        </div>
      </Section>

      <CTASection
        title="¿Quieres saber qué haría yo con tu cuenta?"
        subtitle="Trabajo con marcas que quieren externalizar su presencia digital completa y con empresas que solo necesitan un diagnóstico y un plan. Dime en qué caso estás."
      />
    </>
  );
}
