import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { NAV_LINKS } from "@/lib/constants";

/**
 * A 404 still gets crawled, so it says `noindex` explicitly rather than relying
 * on the status code alone, and it keeps the site's links reachable so a stale
 * inbound link does not become a dead end.
 */
export const metadata: Metadata = {
  title: "Página no encontrada",
  description:
    "La página que buscas no existe o ha cambiado de dirección. Estas son las secciones del sitio.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <Section tone="gradient" padding="large">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-turquoise">
        Error 404
      </p>

      <h1 className="mt-3 max-w-3xl text-white">Esta página no existe</h1>

      <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
        El enlace que has seguido está roto o la página ha cambiado de
        dirección. Puedes volver al inicio o ir directamente a lo que buscabas.
      </p>

      <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
        {NAV_LINKS.map((link) => (
          <li key={link.href}>
            <Link
              href={link.href}
              className="text-base font-semibold text-white/80 underline decoration-white/30 underline-offset-4 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="mt-10">
        <Button href="/" variant="light">
          Volver al inicio
        </Button>
      </div>
    </Section>
  );
}
