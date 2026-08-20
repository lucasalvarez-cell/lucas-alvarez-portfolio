import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ContactForm } from "@/components/ContactForm";
import { CONTACT, SOCIALS } from "@/lib/constants";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contacto",
  description:
    "Hablemos de tu cuenta: gestión de redes sociales, estrategia de contenido, SEO o desarrollo web en Barcelona. Respondo personalmente en menos de 24 h laborables.",
  path: "/contacto",
});

const detailLabel =
  "font-display text-sm font-extrabold uppercase tracking-[0.2em] text-purple";
const detailLink =
  "text-lg text-ink transition-colors hover:text-purple";

export default function ContactoPage() {
  return (
    <>
      <Section tone="gradient" padding="large">
        <Reveal>
          <SectionHeading
            kicker="Contacto"
            title="Cuéntame qué está fallando"
            subtitle="Dime qué publicas, qué resultados estás teniendo y a dónde quieres llegar. Te respondo personalmente con lo que veo, sin cuestionarios ni embudos de por medio."
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
                href={SOCIALS.linkedin.href}
                target="_blank"
                rel="noreferrer noopener"
                className={detailLink}
              >
                LinkedIn
              </a>
              <span aria-hidden className="text-ink-soft">
                ·
              </span>
              <a
                href={SOCIALS.instagram.href}
                target="_blank"
                rel="noreferrer noopener"
                className={detailLink}
              >
                Instagram
              </a>
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
          <ContactForm />
        </Reveal>
      </Section>
    </>
  );
}
