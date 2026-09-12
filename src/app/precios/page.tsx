import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CTASection } from "@/components/sections/CTASection";
import { QuickAnswer } from "@/components/blog/QuickAnswer";
import { FaqSection } from "@/components/blog/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, faqSchema, pricingGraph } from "@/lib/schema";
import { SERVICES, SITE_URL, formatEuros } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Precios de community manager 2026: desde 290 €",
  description:
    "Cuánto cuesta un community manager en 2026: tarifas reales de freelance, agencia y plantilla, qué incluye cada banda y mis precios desde 290 €. Sin permanencia.",
  path: "/precios",
});

/**
 * Opens with the definition and the number, in that order, and says everything
 * it needs to say without the rest of the page. That is the shape a featured
 * snippet takes and the shape a generative engine quotes.
 */
const QUICK_ANSWER =
  "Un community manager cuesta entre 250 y 1.200 € al mes si es freelance y entre 500 y 3.000 € si es una agencia; por horas, la tarifa habitual en España va de 35 a 60 € la hora. Mis servicios empiezan en 490 € al mes la gestión de redes sociales, 390 € el SEO, 350 € las campañas, 290 € una auditoría y 1.190 € una web. Sin permanencia y sin porcentaje sobre la inversión publicitaria.";

/**
 * Market bands, not my prices. The six pages that rank for "precio community
 * manager" all publish a table like this one and it is the block this page was
 * missing; without it the page answers what I cobro but not what la gente
 * pregunta, which is cuánto cuesta esto en general.
 */
const MARKET_RATES = [
  {
    modality: "Freelance junior",
    band: "250 – 400 € / mes",
    buys:
      "Publicación de contenido que tú ya has producido, respuesta a comentarios y un informe de métricas descargado de la propia plataforma.",
  },
  {
    modality: "Freelance con criterio",
    band: "450 – 900 € / mes",
    buys:
      "Estrategia, línea editorial, guion y producción propia. La misma persona que te lo explica es la que lo hace. Aquí es donde estoy yo.",
  },
  {
    modality: "Agencia pequeña",
    band: "500 – 1.200 € / mes",
    buys:
      "Equipo con roles separados y capacidad de absorber un pico de trabajo. Quien te vende la cuenta rara vez es quien la lleva después.",
  },
  {
    modality: "Agencia grande",
    band: "1.200 – 3.000 € / mes",
    buys:
      "Estructura, varios canales a la vez y departamento de paid. Tiene sentido con un volumen de contenido diario y un presupuesto de medios detrás.",
  },
  {
    modality: "En plantilla",
    band: "24.000 – 33.000 € / año",
    buys:
      "Jornada completa, más seguridad social, equipo y el tiempo de alguien que sepa dirigirle. Sale a cuenta cuando el contenido es diario y hay criterio interno.",
  },
];

/**
 * What actually moves a quote up. Published because the alternative — "precio a
 * medida" — makes the visitor guess, and the ones who guess high leave.
 */
const DRIVERS = [
  {
    title: "Cuántas plataformas",
    detail:
      "Instagram y Facebook comparten la misma pieza, así que la segunda casi no suma. TikTok y YouTube piden montaje distinto y sí suman.",
  },
  {
    title: "Cuánto material tienes ya",
    detail:
      "Si tu negocio genera imagen propia de forma natural, la producción es barata. Si hay que crear todo desde cero cada mes, es el factor que más pesa.",
  },
  {
    title: "Con qué frecuencia publicas",
    detail:
      "De 6 a 8 piezas al mes es la banda de entrada. Subir a 12 o a 20 no dobla el precio, pero sí lo mueve, y casi nunca lo recomiendo antes de tener el formato validado.",
  },
  {
    title: "Si hay que producir en tu sitio",
    detail:
      "Una sesión de grabación mensual dentro del área de Barcelona entra. Fuera de ella, el desplazamiento se acuerda aparte y depende de la distancia.",
  },
  {
    title: "Cuántos idiomas",
    detail:
      "Castellano y catalán no cambian el precio. Añadir inglés para público internacional, que en turismo es habitual, sí lo hace.",
  },
];

const FAQ = [
  {
    question: "¿Cuánto cuesta un community manager en España?",
    answer:
      "Entre 250 y 1.200 € al mes si es freelance, y entre 500 y 3.000 € si es una agencia. La banda es tan ancha porque incluye desde alguien que solo publica lo que le pasas hasta quien diseña la estrategia, produce el contenido y responde de los resultados. Mi servicio empieza en 490 € al mes y es lo segundo.",
  },
  {
    question: "¿Cuánto cobra un community manager por horas?",
    answer:
      "Entre 35 y 60 € la hora en España, según experiencia y sector. Es la referencia más útil para auditar un presupuesto cerrado: divide la cuota mensual entre las horas que implica el alcance que te han descrito. Si sale por debajo de 20 € la hora, o el alcance está inflado o el trabajo lo va a hacer otra persona más barata.",
  },
  {
    question:
      "¿Qué diferencia hay entre un community manager y un social media manager?",
    answer:
      "Community manager es el término con el que casi todo el mundo busca, y describe a quien gestiona la comunidad: publica, responde y modera. Social media manager describe a quien además decide la estrategia: qué se publica, por qué y con qué objetivo medible. En un negocio pequeño suele ser la misma persona, y lo que cambia el precio no es el título sino cuál de los dos trabajos estás comprando.",
  },
  {
    question: "¿Cuánto cuesta un community manager en Barcelona?",
    answer:
      "Lo mismo que en el resto de España: entre 250 y 1.200 € al mes en freelance y entre 500 y 3.000 € en agencia. Barcelona no encarece la cuota, encarece la producción presencial: si hay que grabar en tu local cada mes, eso es lo que se acuerda aparte. Yo trabajo desde Barcelona y una sesión mensual dentro del área metropolitana ya va incluida.",
  },
  {
    question: "¿Por qué no eres el más barato?",
    answer:
      "Porque no vendo el mismo servicio. Por 300 € al mes se compra ejecución de calendario: alguien sube lo que tú produces. Lo que hago yo incluye el diagnóstico, el guion, la producción y la decisión de qué escalar cada mes. Si lo que necesitas es lo primero, te lo diré y te ahorrarás dinero.",
  },
  {
    question: "¿Hay permanencia o contrato mínimo?",
    answer:
      "No hay permanencia en ningún servicio. En SEO sí te pediré honestidad: por debajo de seis meses no se puede juzgar el trabajo, así que si no puedes comprometerte a ese horizonte, prefiero que empieces por otra cosa.",
  },
  {
    question: "¿Cobras un porcentaje de la inversión publicitaria?",
    answer:
      "No, nunca. Ese modelo premia que gastes más, no que vendas más. La gestión es una cuota fija y la inversión va directa a la plataforma con tu tarjeta, en una cuenta a tu nombre.",
  },
  {
    question: "¿Se puede contratar solo la auditoría?",
    answer:
      "Sí, desde 290 €, y está pensada para que no tengas que contratar nada después: el plan de acción está escrito para que lo ejecute tu equipo o cualquier otro proveedor. Si acabas contratándome, el importe se descuenta del primer mes.",
  },
  {
    question: "¿Qué formas de pago aceptas?",
    answer:
      "Transferencia, con factura y con IVA. Las cuotas mensuales se facturan a mes vencido; los proyectos cerrados, la mitad al empezar y la mitad a la entrega.",
  },
  {
    question: "¿Trabajas fuera de Barcelona?",
    answer:
      "Sí, en toda Cataluña y en remoto para el resto de España, sin cambio de precio. Lo único que varía es el desplazamiento cuando hay que grabar en tu sitio y estás lejos del área de Barcelona.",
  },
];

export default function PreciosPage() {
  return (
    <>
      <JsonLd data={pricingGraph()} />
      <JsonLd data={breadcrumbSchema([{ name: "Precios", path: "/precios" }])} />
      {/* Same array that <FaqSection> renders below — one source, never two. */}
      <JsonLd data={faqSchema(FAQ, `${SITE_URL}/precios`)!} />

      <Section tone="gradient" padding="large">
        <Reveal immediate>
          <SectionHeading
            kicker="Precios"
            title="Cuánto cuesta un community manager en 2026"
            subtitle="Las tarifas de mercado y las mías, publicadas, porque tú también las buscarías antes de escribir a nadie. Son suelos reales: lo que cuesta empezar, con lo que entra y lo que no."
            tone="dark"
            as="h1"
          />
        </Reveal>
      </Section>

      <Section>
        <div className="max-w-4xl">
          <QuickAnswer
            question="¿Cuánto cuesta un community manager?"
            answer={QUICK_ANSWER}
            label="En corto"
            id="en-corto"
          />

          <section aria-labelledby="tarifas-mercado" className="mt-20">
            <h2
              id="tarifas-mercado"
              className="scroll-mt-28 text-[clamp(1.75rem,3vw,2.5rem)] normal-case leading-tight tracking-[-0.01em] text-ink"
            >
              Tarifas de community manager en España 2026
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-body">
              Antes de mis precios, los del mercado. La banda es ancha porque
              bajo el mismo nombre se venden dos trabajos distintos: ejecutar un
              calendario que alguien ya ha pensado, y pensarlo. Esto es lo que
              se paga en España en 2026.
            </p>

            <div className="mt-8 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[36rem] border-collapse text-left">
                <caption className="sr-only">
                  Bandas de precio de un community manager en España en 2026
                  según la modalidad de contratación
                </caption>
                <thead>
                  <tr className="border-b-2 border-ink/15">
                    <th className="py-4 pr-6 font-display text-sm font-extrabold uppercase tracking-[0.15em] text-ink">
                      Modalidad
                    </th>
                    <th className="py-4 pr-6 font-display text-sm font-extrabold uppercase tracking-[0.15em] text-ink">
                      Precio
                    </th>
                    <th className="py-4 font-display text-sm font-extrabold uppercase tracking-[0.15em] text-ink">
                      Qué compra esa banda
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {MARKET_RATES.map((rate) => (
                    <tr
                      key={rate.modality}
                      className="border-b border-light-grey align-top"
                    >
                      <td className="py-5 pr-6 text-lg font-semibold text-ink">
                        {rate.modality}
                      </td>
                      <td className="py-5 pr-6 whitespace-nowrap font-display text-lg font-extrabold text-purple">
                        {rate.band}
                      </td>
                      <td className="py-5 text-base leading-relaxed text-ink-body">
                        {rate.buys}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              Por horas, la tarifa habitual de un community manager autónomo en
              España va de 35 a 60 € la hora. Es un buen contraste: si un
              presupuesto de 300 € al mes implica veinte horas de trabajo, los
              números no salen y algo del alcance es mentira.
            </p>
          </section>

          <section aria-labelledby="tabla" className="mt-20">
            <h2
              id="tabla"
              className="scroll-mt-28 text-[clamp(1.75rem,3vw,2.5rem)] normal-case leading-tight tracking-[-0.01em] text-ink"
            >
              Mis precios por servicio
            </h2>

            <div className="mt-8 -mx-6 overflow-x-auto px-6 sm:mx-0 sm:px-0">
              <table className="w-full min-w-[36rem] border-collapse text-left">
                <caption className="sr-only">
                  Precio de partida de cada servicio, con lo que incluye
                </caption>
                <thead>
                  <tr className="border-b-2 border-ink/15">
                    <th className="py-4 pr-6 font-display text-sm font-extrabold uppercase tracking-[0.15em] text-ink">
                      Servicio
                    </th>
                    <th className="py-4 pr-6 font-display text-sm font-extrabold uppercase tracking-[0.15em] text-ink">
                      Desde
                    </th>
                    <th className="py-4 font-display text-sm font-extrabold uppercase tracking-[0.15em] text-ink">
                      Qué compra ese suelo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SERVICES.map((service) => (
                    <tr
                      key={service.slug}
                      className="border-b border-light-grey align-top"
                    >
                      <td className="py-5 pr-6">
                        <Link
                          href={`/servicios/${service.slug}`}
                          className="text-lg font-semibold text-ink hover:text-purple"
                        >
                          {service.title}
                        </Link>
                      </td>
                      <td className="py-5 pr-6 whitespace-nowrap font-display text-lg font-extrabold text-purple">
                        {formatEuros(service.pricing.from)} €
                        {service.pricing.per ? " / mes" : ""}
                      </td>
                      <td className="py-5 text-base leading-relaxed text-ink-body">
                        {service.pricing.includes[0]}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-6 text-base leading-relaxed text-ink-soft">
              Todos los importes son sin IVA y son suelos, no tarifas cerradas.
              Lo que los mueve está justo debajo.
            </p>
          </section>

          <section aria-labelledby="que-mueve" className="mt-20">
            <h2
              id="que-mueve"
              className="scroll-mt-28 text-[clamp(1.75rem,3vw,2.5rem)] normal-case leading-tight tracking-[-0.01em] text-ink"
            >
              Qué hace que un presupuesto suba
            </h2>

            <dl className="mt-8 space-y-7">
              {DRIVERS.map((driver) => (
                <div key={driver.title}>
                  <dt className="text-lg font-semibold text-ink">
                    {driver.title}
                  </dt>
                  <dd className="mt-2 max-w-3xl text-lg leading-relaxed text-ink-body">
                    {driver.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </section>

          <section aria-labelledby="comparativa" className="mt-20">
            <h2
              id="comparativa"
              className="scroll-mt-28 text-[clamp(1.75rem,3vw,2.5rem)] normal-case leading-tight tracking-[-0.01em] text-ink"
            >
              Freelance, agencia o contratar en plantilla
            </h2>

            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-ink-body">
              Un community manager en plantilla cuesta entre 24.000 y 33.000 €
              al año en España, más seguridad social, equipo y el tiempo de
              alguien que lo dirija. Sale a cuenta cuando el volumen de contenido
              es diario y hay quien sepa marcarle el criterio. Una agencia te da
              estructura y aguanta un pico de trabajo, y te cuesta que la persona
              que te vendió la cuenta rara vez sea la que la lleva.
            </p>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-ink-body">
              Un freelance con criterio está en medio: cuesta menos que una
              agencia, hace el trabajo la misma persona que te lo explicó y el
              techo es su capacidad. Si necesitas cinco canales activos a diario
              en cuatro idiomas, no soy tu opción y te lo diré en la primera
              llamada.
            </p>
          </section>

          <FaqSection
            items={FAQ}
            title="Preguntas frecuentes sobre precios"
            id="preguntas-frecuentes"
          />
        </div>
      </Section>

      <CTASection
        title="¿Cuál de estos encaja con lo que necesitas?"
        subtitle="Cuéntame en qué punto está tu marca y te digo qué haría yo y cuánto costaría, con una cifra concreta. Si lo que necesitas cuesta menos de lo que cobro, también te lo diré."
      />
    </>
  );
}
