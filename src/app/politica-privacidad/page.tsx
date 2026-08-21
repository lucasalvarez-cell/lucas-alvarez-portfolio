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
  title: "Política de privacidad",
  description:
    "Política de privacidad de lucasalvarez.info: qué datos personales se recogen, con qué finalidad, quién los recibe y cómo ejercer tus derechos RGPD.",
  path: "/politica-privacidad",
});

const h2 = "mt-14 text-3xl text-ink font-display uppercase";
const p = "mt-5 text-lg leading-relaxed text-ink-soft";
const ul = "mt-5 list-disc space-y-2 pl-6 text-lg text-ink-soft";
const li = "leading-relaxed";
const link =
  "font-semibold text-purple underline decoration-purple/30 underline-offset-4 transition-colors hover:decoration-purple";

export default function PoliticaPrivacidadPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: "Política de privacidad", path: "/politica-privacidad" },
        ])}
      />

      <Section tone="gradient" padding="large">
        <Reveal immediate>
          <SectionHeading
            kicker="Legal"
            title="Política de privacidad"
            tone="dark"
            as="h1"
          />
        </Reveal>
      </Section>

      <Section>
        <Reveal className="max-w-3xl">
          <p className={p}>
            Última actualización: agosto de 2026. Esta política describe qué
            datos personales se recogen a través de{" "}
            <strong className="font-semibold text-ink">
              lucasalvarez.info
            </strong>
            , con qué finalidad se tratan y qué derechos puedes ejercer sobre
            ellos, conforme al Reglamento (UE) 2016/679 (RGPD) y la Ley
            Orgánica 3/2018 de Protección de Datos y Garantía de los Derechos
            Digitales (LOPDGDD).
          </p>

          <h2 className={h2}>Responsable del tratamiento</h2>
          <p className={p}>
            Lucas Álvarez, titular de este sitio web.
            <br />
            Email de contacto:{" "}
            <a href={`mailto:${CONTACT.email}`} className={link}>
              {CONTACT.email}
            </a>
          </p>

          <h2 className={h2}>Finalidad del tratamiento</h2>
          <p className={p}>
            Los datos que envías a través del formulario de contacto (nombre,
            email y mensaje) se utilizan únicamente para responder a tu
            consulta y, en su caso, prestarte los servicios que solicites. Al
            enviarlo, el sitio comprueba de forma automática y momentánea la
            dirección IP desde la que se envía, con el único fin de evitar el
            envío masivo de formularios: esa comprobación no se guarda en
            ninguna base de datos, no aparece en el correo que recibo y
            desaparece en cuestión de minutos. No se usan para elaborar
            perfiles ni para fines distintos a los indicados.
          </p>

          <h2 className={h2}>Legitimación</h2>
          <p className={p}>
            La base legal para el tratamiento es tu consentimiento, otorgado
            libremente al rellenar y enviar el formulario de contacto (art.
            6.1.a RGPD). La comprobación antispam descrita más arriba se
            ampara en el interés legítimo en mantener la seguridad del sitio
            (art. 6.1.f RGPD).
          </p>

          <h2 className={h2}>Destinatarios</h2>
          <p className={p}>
            El formulario de contacto de este sitio utiliza{" "}
            <strong className="font-semibold text-ink">Resend</strong> (Resend,
            Inc.) como proveedor de envío de correo electrónico, que actúa como
            encargado del tratamiento: es quien entrega tu mensaje a mi buzón y
            quien te envía el acuse de recibo. Tus datos son también accesibles
            para <strong className="font-semibold text-ink">Vercel</strong>, el
            proveedor de alojamiento del sitio, en la medida necesaria para su
            funcionamiento técnico. No se cede ni se vende información a
            terceros con fines comerciales.
          </p>
          <p className={p}>
            Ambos proveedores son sociedades estadounidenses, por lo que el
            envío de tu mensaje implica una transferencia internacional de
            datos. Esa transferencia se realiza al amparo de las cláusulas
            contractuales tipo aprobadas por la Comisión Europea y del Marco de
            Privacidad de Datos UE-EE. UU., al que Resend está adherida. Si
            prefieres que no se produzca esa transferencia, puedes escribirme
            directamente a{" "}
            <a href={`mailto:${CONTACT.email}`} className={link}>
              {CONTACT.email}
            </a>{" "}
            en lugar de usar el formulario.
          </p>

          <h2 className={h2}>Plazo de conservación</h2>
          <p className={p}>
            Los mensajes recibidos se conservan en mi buzón de correo mientras
            exista una relación o intercambio contigo y, en todo caso, hasta
            que solicites su supresión. El proveedor de envío conserva una
            copia técnica del correo durante un periodo limitado con fines de
            diagnóstico de entrega.
          </p>

          <h2 className={h2}>Tus derechos</h2>
          <p className={p}>Tienes derecho a:</p>
          <ul className={ul}>
            <li className={li}>Acceder a tus datos personales.</li>
            <li className={li}>Solicitar su rectificación o supresión.</li>
            <li className={li}>Solicitar la limitación de su tratamiento.</li>
            <li className={li}>Oponerte al tratamiento.</li>
            <li className={li}>Solicitar la portabilidad de tus datos.</li>
          </ul>
          <p className={p}>
            Puedes ejercer estos derechos escribiendo a{" "}
            <a href={`mailto:${CONTACT.email}`} className={link}>
              {CONTACT.email}
            </a>
            . Si consideras que tus datos no se tratan correctamente, también
            puedes presentar una reclamación ante la Agencia Española de
            Protección de Datos (
            <a
              href="https://www.aepd.es"
              target="_blank"
              rel="noreferrer noopener"
              className={link}
            >
              www.aepd.es
            </a>
            ).
          </p>

          <h2 className={h2}>Procedencia de los datos</h2>
          <p className={p}>
            Los únicos datos tratados son los que tú mismo facilitas
            directamente a través del formulario de contacto de este sitio, más
            los datos técnicos que cualquier servidor web registra
            necesariamente al atender una petición (como la dirección IP), que
            no se cruzan con los anteriores ni se utilizan para identificarte.
          </p>

          <h2 className={h2}>Menores de edad</h2>
          <p className={p}>
            Este sitio no está dirigido a menores de 14 años. No se recogen
            de forma consciente datos de menores de esa edad.
          </p>

          <h2 className={h2}>Cambios en esta política</h2>
          <p className={p}>
            Esta política puede actualizarse para adaptarse a novedades
            legislativas o cambios en el funcionamiento del sitio. La versión
            vigente es siempre la publicada en esta misma página.
          </p>

          <p className={p}>
            Consulta también la{" "}
            <Link href="/politica-cookies" className={link}>
              política de cookies
            </Link>
            .
          </p>
        </Reveal>
      </Section>
    </>
  );
}
