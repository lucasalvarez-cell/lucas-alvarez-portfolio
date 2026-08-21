import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { FaqSection } from "@/components/blog/FaqSection";
import { JsonLd } from "@/components/seo/JsonLd";
import { CONTACT, SOCIALS, contactServiceOptions } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema, contactPageSchema, faqSchema } from "@/lib/schema";
import { SITE_URL } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Contacto | Social media manager en Barcelona",
  description:
    "Hablemos de tu cuenta: gestión de redes sociales, estrategia de contenido, SEO o desarrollo web en Barcelona. Respondo personalmente en menos de 24 h laborables.",
  path: "/contacto",
});

const detailLabel =
  "font-display text-sm font-extrabold uppercase tracking-[0.2em] text-purple";
const detailLink =
  "text-lg text-ink transition-colors hover:text-purple";

const FAQ = [
  {
    question: "¿En cuánto tiempo respondes?",
    answer:
      "En menos de 24 horas laborables, y respondo yo. Al enviar el formulario recibes al instante un acuse de recibo automático con una copia de lo que has escrito, y después mi respuesta real. No hay un formulario que entra en un CRM ni una secuencia automática de correos comerciales: lees mi respuesta directamente, con lo que veo en tu caso.",
  },
  {
    question: "¿La primera conversación tiene coste?",
    answer:
      "No. La primera llamada es para entender qué está pasando y decirte qué haría yo, y de ahí sale un presupuesto concreto o la recomendación de que no me contrates. Las dos cosas pasan con frecuencia parecida.",
  },
  {
    question: "¿Qué información te conviene que te dé?",
    answer:
      "El enlace a tu perfil o a tu web, qué estás publicando ahora, qué resultados estás teniendo y a dónde quieres llegar. Con eso puedo darte una respuesta útil en el primer mensaje en vez de pedirte una reunión para averiguarlo.",
  },
  {
    question: "¿Trabajas con negocios fuera de Barcelona?",
    answer:
      "Sí. Trabajo en toda Cataluña y en remoto para el resto de España, sin cambio de precio. Tres de las cuentas que gestiono están fuera del área metropolitana y una de ellas en Valencia.",
  },
  {
    question: "¿En qué idiomas trabajas?",
    answer:
      "Castellano, catalán e inglés. El contenido se puede producir en los tres, aunque añadir un idioma para público internacional cambia el guion y no solo la traducción del pie de foto.",
  },
  {
    question: "¿Qué pasa si lo que necesito no es ninguno de tus servicios?",
    answer:
      "Te lo digo y, si conozco a alguien que sí lo haga bien, te lo paso. Prefiero eso a venderte un servicio que no va a resolver tu problema, entre otras cosas porque a los tres meses acabaríamos igual pero con menos dinero por tu parte.",
  },
];

export default function ContactoPage() {
  return (
    <>
      <JsonLd data={contactPageSchema()} />
      <JsonLd data={faqSchema(FAQ, `${SITE_URL}/contacto`)!} />
      <JsonLd
        data={breadcrumbSchema([{ name: "Contacto", path: "/contacto" }])}
      />

      <Section tone="gradient" padding="large">
        <Reveal immediate>
          <SectionHeading
            kicker="Contacto"
            title="Contacta con un social media manager en Barcelona"
            subtitle="Cuéntame qué está fallando: qué publicas, qué resultados estás teniendo y a dónde quieres llegar. Te respondo personalmente con lo que veo, sin cuestionarios ni embudos de por medio, en menos de 24 horas laborables."
            tone="dark"
            as="h1"
          />
        </Reveal>
      </Section>

      <Section containerClassName="grid gap-16 lg:grid-cols-2">
        <Reveal>
          <ul className="space-y-8">
          <li>
            <span className={detailLabel}>Email</span>
            <a
              href={`mailto:${CONTACT.email}`}
              className={`mt-2 block ${detailLink}`}
            >
              {CONTACT.email}
            </a>
          </li>
          <li>
            <span className={detailLabel}>WhatsApp</span>
            <a
              href={CONTACT.whatsappHref}
              target="_blank"
              rel="noreferrer noopener"
              className={`mt-2 block ${detailLink}`}
            >
              {CONTACT.phoneDisplay}
            </a>
          </li>
          <li>
            <span className={detailLabel}>Redes</span>
            <p className="mt-2 flex flex-wrap items-center gap-3">
              <a
                href={SOCIALS.instagram.href}
                target="_blank"
                rel="noreferrer noopener me"
                className={detailLink}
              >
                Instagram
              </a>
              {SOCIALS.linkedin.href ? (
                <>
                  <span aria-hidden className="text-ink-soft">
                    ·
                  </span>
                  <a
                    href={SOCIALS.linkedin.href}
                    target="_blank"
                    rel="noreferrer noopener me"
                    className={detailLink}
                  >
                    LinkedIn
                  </a>
                </>
              ) : null}
            </p>
          </li>
          <li>
            <span className={detailLabel}>Ubicación</span>
            <p className="mt-2 text-lg text-ink">
              Barcelona, España. Trabajo también en remoto
            </p>
          </li>
          </ul>
        </Reveal>

        <Reveal delay={150}>
          <ContactForm services={contactServiceOptions()} />
        </Reveal>
      </Section>

      <Section padding="large" tone="grey">
        <div className="max-w-3xl">
          <FaqSection items={FAQ} title="Antes de escribirme" />
        </div>
      </Section>
    </>
  );
}
