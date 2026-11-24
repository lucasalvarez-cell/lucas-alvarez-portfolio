import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { breadcrumbSchema } from "@/lib/schema";
import { CONTACT } from "@/lib/constants";

export const metadata: Metadata = buildMetadata({
  title: "Política de cookies",
  description:
    "Política de cookies de lucasalvarez.info: qué cookies utiliza este sitio, con qué finalidad y cómo puedes gestionarlas desde tu navegador.",
  path: "/politica-cookies",
});

const h2 = "mt-14 text-3xl text-ink font-display uppercase";
const p = "mt-5 text-lg leading-relaxed text-ink-soft";
const ul = "mt-5 list-disc space-y-2 pl-6 text-lg text-ink-soft";
const li = "leading-relaxed";
const link =
  "font-semibold text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple";

export default function PoliticaCookiesPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Política de cookies", path: "/politica-cookies" },
        ])}
      />

      <Section tone="gradient" padding="large">
        <Reveal immediate>
          <SectionHeading
            kicker="Legal"
            title="Política de cookies"
            tone="dark"
            as="h1"
          />
        </Reveal>
      </Section>

      <Section>
        <Reveal className="max-w-3xl">
          <p className={p}>
            Última actualización: agosto de 2026. Esta política explica qué
            son las cookies, cuáles utiliza{" "}
            <strong className="font-semibold text-ink">
              lucasalvarez.info
            </strong>{" "}
            y cómo puedes gestionarlas, conforme a la Ley 34/2002 de
            Servicios de la Sociedad de la Información y de Comercio
            Electrónico (LSSI-CE) y al RGPD.
          </p>

          <h2 className={h2}>Qué es una cookie</h2>
          <p className={p}>
            Una cookie es un pequeño archivo que un sitio web guarda en tu
            navegador para recordar información sobre tu visita, como tus
            preferencias o el funcionamiento técnico de la página.
          </p>

          <h2 className={h2}>Cookies que utiliza este sitio</h2>
          <p className={p}>
            Este sitio{" "}
            <strong className="font-semibold text-ink">
              no utiliza cookies de analítica, publicidad ni de terceros
            </strong>
            . No hay instalado ningún sistema de medición (como Google
            Analytics), píxel publicitario ni cookie de seguimiento. Por eso,
            actualmente no se muestra ningún banner de consentimiento: no se
            usa ninguna cookie que lo requiera.
          </p>
          <p className={p}>
            El sitio podría utilizar, exclusivamente, cookies técnicas
            estrictamente necesarias para su funcionamiento básico (por
            ejemplo, para recordar preferencias de navegación). Este tipo de
            cookies está exento de solicitar consentimiento previo según la
            LSSI-CE, precisamente porque son imprescindibles para prestar el
            servicio solicitado.
          </p>

          <h2 className={h2}>Cómo gestionar o eliminar las cookies</h2>
          <p className={p}>
            Puedes permitir, bloquear o eliminar las cookies instaladas en tu
            equipo mediante la configuración de tu navegador:
          </p>
          <ul className={ul}>
            <li className={li}>Google Chrome: Configuración → Privacidad y seguridad → Cookies.</li>
            <li className={li}>Mozilla Firefox: Ajustes → Privacidad y seguridad → Cookies y datos del sitio.</li>
            <li className={li}>Safari: Preferencias → Privacidad → Gestionar datos de sitios web.</li>
            <li className={li}>Microsoft Edge: Configuración → Privacidad, búsqueda y servicios → Cookies.</li>
          </ul>

          <h2 className={h2}>Cambios en esta política</h2>
          <p className={p}>
            Si en el futuro este sitio incorpora herramientas de analítica u
            otros trazadores, esta política se actualizará para reflejarlo y
            se implementará el correspondiente banner de consentimiento antes
            de instalar cualquier cookie no esencial.
          </p>

          <p className={p}>
            Para más información sobre el tratamiento de tus datos, consulta
            la{" "}
            <Link href="/politica-privacidad" className={link}>
              política de privacidad
            </Link>
            , o escríbenos a{" "}
            <a href={`mailto:${CONTACT.email}`} className={link}>
              {CONTACT.email}
            </a>
            .
          </p>
        </Reveal>
      </Section>
    </>
  );
}
