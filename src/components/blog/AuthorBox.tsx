import Image from "next/image";
import Link from "next/link";
import { CONTACT, PUBLIQO_URL, SOCIALS } from "@/lib/constants";

/**
 * E-E-A-T, made visible.
 *
 * Ahrefs puts the author's face, role, years of agency experience and social
 * profiles at both ends of every article; danielfounder states his age, city
 * and the clients he has moved. This blog was shipping a one-line byline —
 * the same signal a content farm shows. The claims here are specific and
 * checkable on purpose: "three camping accounts" is verifiable, "expert in
 * digital marketing" is not.
 */
export function AuthorBox() {
  return (
    <section
      aria-labelledby="sobre-el-autor"
      className="mt-16 rounded-[var(--radius-card)] border-2 border-light-grey bg-light-grey/30 p-6 sm:p-8"
    >
      <h2
        id="sobre-el-autor"
        className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-purple"
      >
        Quién escribe esto
      </h2>

      <div className="mt-6 flex flex-col gap-6 sm:flex-row">
        <Image
          src="/images/lucas-alvarez.jpg"
          alt="Retrato de Lucas Álvarez, estratega de contenido en Barcelona"
          width={112}
          height={112}
          sizes="112px"
          className="h-28 w-28 shrink-0 rounded-[var(--radius-card)] object-cover"
        />

        <div>
          <p className="font-display text-xl font-extrabold text-ink">
            Lucas Álvarez
          </p>
          <p className="mt-1 text-base text-ink-soft">
            Estratega de contenido y social media manager en Barcelona.
            Cofundador de{" "}
            <a
              href={PUBLIQO_URL}
              target="_blank"
              rel="noreferrer noopener"
              className="font-semibold text-purple underline decoration-purple/30 underline-offset-4"
            >
              Publiqo
            </a>
            .
          </p>

          <p className="mt-4 text-base leading-relaxed text-ink-soft">
            Gestiono personalmente las cuentas de las que hablo en este blog:
            tres campings de la costa catalana, una marca de café, impresión
            industrial y dos canales de YouTube de naturaleza. Las cifras que
            cito (
            <span className="font-semibold text-ink">
              +250 % en Camping Collvert, ×6 en Camping Victòria, 2,6 M de
              visualizaciones en Reino Selva
            </span>
            ) salen de esas cuentas, no de un caso de estudio ajeno.
          </p>

          <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-base">
            <li>
              <Link
                href="/sobre-mi"
                className="font-semibold text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple"
              >
                Sobre mí
              </Link>
            </li>
            <li>
              <Link
                href="/casos-de-exito"
                className="font-semibold text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple"
              >
                Casos de éxito
              </Link>
            </li>
            {SOCIALS.instagram.href ? (
              <li>
                <a
                  href={SOCIALS.instagram.href}
                  target="_blank"
                  rel="noreferrer noopener me"
                  className="font-semibold text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple"
                >
                  {SOCIALS.instagram.handle}
                </a>
              </li>
            ) : null}
            <li>
              <a
                href={CONTACT.whatsappHref}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
