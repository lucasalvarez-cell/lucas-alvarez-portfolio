import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CaseStudyCard } from "@/components/CaseStudyCard";
import { CTASection } from "@/components/sections/CTASection";
import { QuickAnswer } from "@/components/blog/QuickAnswer";
import { FaqSection } from "@/components/blog/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, caseStudiesGraph, faqSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";
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

const QUICK_ANSWER =
  "Cinco cuentas reales con las cifras de su primer mes de trabajo, todas orgánicas y sin publicidad de pago: +250 % de visualizaciones en Camping Collvert, x6 en Camping Victòria, +62 % en Camping Puzol, 2,6 millones de visualizaciones en Reino Selva y 14.500 en 28 días en el canal de Zernio. En los cinco casos el cambio fue de formato, no de frecuencia.";

const FAQ = [
  {
    question: "¿Estas cifras son con publicidad de pago?",
    answer:
      "No, ninguna. Los cinco casos son crecimiento orgánico: el cambio vino del formato, del guion y del orden del calendario. Cuando en alguna cuenta se ha invertido en publicidad, ha sido después y para amplificar lo que ya funcionaba sin pagar.",
  },
  {
    question: "¿Por qué las cifras son del primer mes y no de un año?",
    answer:
      "Porque el primer mes es el que demuestra que el diagnóstico era correcto, y es el dato que puedo enseñar de todas las cuentas por igual. Enseñar solo el acumulado de un año permite esconder que el crecimiento vino de otra cosa.",
  },
  {
    question: "¿Qué tienen en común los cinco casos?",
    answer:
      "En los cinco, la cuenta ya publicaba con constancia y no se movía. Ninguno tenía un problema de volumen: tenían un problema de formato. En los cinco, la frecuencia se tocó al final o no se tocó en absoluto.",
  },
  {
    question: "¿Puedo hablar con alguno de estos clientes?",
    answer:
      "Sí. En una conversación avanzada te pongo en contacto con el cliente que más se parezca a tu caso para que te lo cuente sin mí delante. Es la comprobación más barata que puedes hacer antes de contratar a nadie.",
  },
  {
    question: "¿Trabajas solo con turismo y campings?",
    answer:
      "Es donde más cuentas he llevado, pero no solo. La lista incluye impresión industrial, una marca de café, hostelería y dos canales de YouTube de naturaleza. Los pilares de contenido cambian por completo entre sectores; el método de encontrarlos no.",
  },
];

export default function CasosDeExitoPage() {
  return (
    <>
      <JsonLd data={caseStudiesGraph(getPublishedCaseStudies())} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Casos de éxito", path: "/casos-de-exito" },
        ])}
      />
      <JsonLd data={faqSchema(FAQ, `${SITE_URL}/casos-de-exito`)!} />

      <Section tone="gradient" padding="huge">
        <Reveal immediate>
          <SectionHeading
            kicker="Resultados"
            title="Casos de éxito en redes sociales y contenido"
            subtitle="Cinco cuentas que estaban paradas, con las cifras que dio cada una en su primer mes de trabajo. Todo orgánico: sin publicidad de pago detrás."
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

      <Section>
        <div className="max-w-3xl">
          <QuickAnswer
            question="¿Qué resultados consigue Lucas Álvarez en redes sociales?"
            answer={QUICK_ANSWER}
            label="En corto"
            id="en-corto"
          />

          <section aria-labelledby="que-tienen-en-comun" className="mt-16">
            <h2
              id="que-tienen-en-comun"
              className="scroll-mt-28 text-[clamp(1.75rem,3vw,2.5rem)] normal-case leading-tight tracking-[-0.01em] text-ink"
            >
              Qué tienen en común estos cinco casos
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-ink-body">
              Ninguna de estas cuentas publicaba poco. Las cinco llevaban meses
              siendo constantes y las cinco estaban planas, que es exactamente el
              punto en el que un negocio concluye que las redes sociales no
              funcionan para su sector.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink-body">
              En los cinco casos el diagnóstico dijo lo mismo: el problema no era
              el volumen, era el formato. Se estaba hablando a una audiencia
              distinta de la que había al otro lado, o en un formato que esa
              audiencia concreta no consume. Producir más contenido con ese
              diagnóstico sin resolver solo multiplica el mismo error.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-ink-body">
              Por eso la frecuencia se tocó al final o no se tocó. Camping
              Victòria multiplicó por seis pasando de uno a dos posts semanales,
              pero solo después de saber cuál de sus formatos aguantaba la
              retención. Duplicar el contenido equivocado no habría cambiado
              nada.
            </p>
          </section>

          <FaqSection
            items={FAQ}
            title="Preguntas frecuentes sobre estos resultados"
          />
        </div>
      </Section>

      <CTASection
        title="¿Tu cuenta se parece a alguna de estas?"
        subtitle="Escríbeme con el enlace a tu perfil y te digo qué veo y qué cambiaría primero."
      />
    </>
  );
}
