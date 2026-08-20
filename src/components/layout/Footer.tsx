import Link from "next/link";
import { CONTACT, NAV_LINKS, SERVICES, SOCIALS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-gradient text-white">
      <Container className="py-16">
        <div className="grid gap-10 md:grid-cols-[max-content_auto] md:justify-between">
          {/* Identity + direct contact */}
          <div className="max-w-sm">
            <p className="font-display text-2xl font-extrabold uppercase tracking-[0.06em]">
              Lucas Álvarez
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              Estratega de contenido en Barcelona y cofundador de Publiqo,
              agencia de marketing digital: redes sociales, SEO, desarrollo web,
              Google Ads y Meta Ads.
            </p>

            <a
              href="https://publiqo.es/"
              target="_blank"
              rel="noreferrer noopener"
              className="mt-4 inline-block text-base font-semibold text-turquoise transition-opacity hover:opacity-70"
            >
              Publiqo, publiqo.es
            </a>

            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-6 inline-block text-base font-semibold transition-opacity hover:opacity-70"
            >
              {CONTACT.email}
            </a>

            <div className="mt-6 flex items-center gap-4">
              <a
                href={SOCIALS.instagram.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="Instagram"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/40 transition-colors hover:border-white hover:bg-white hover:text-purple"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                </svg>
              </a>
              <a
                href={SOCIALS.linkedin.href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label="LinkedIn"
                className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white/40 transition-colors hover:border-white hover:bg-white hover:text-purple"
              >
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.83-2.05 3.77-2.05C21.4 8.65 22 10.9 22 14v7h-4v-6.2c0-1.48-.03-3.4-2.07-3.4-2.07 0-2.39 1.62-2.39 3.29V21h-4V9Z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          <div className="grid gap-10 sm:grid-cols-2 md:gap-16">
            <div>
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-white/60">
                Páginas
              </p>
              <ul className="mt-4 space-y-3">
                {NAV_LINKS.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-base text-white/80 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <p className="font-display text-sm font-extrabold uppercase tracking-[0.2em] text-white/60">
                Servicios
              </p>
              <ul className="mt-4 space-y-3">
                {SERVICES.map((service) => (
                  <li key={service.slug}>
                    <Link
                      href="/servicios"
                      className="text-base text-white/80 transition-colors hover:text-white"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <div className="border-t border-white/15 py-6">
        <Container>
          <p className="text-sm text-white/60">
            © {year} Lucas Álvarez · Publiqo
          </p>
        </Container>
      </div>
    </footer>
  );
}
