import Link from "next/link";
import { CONTACT, PUBLIQO_URL, RESUME_PDF, SOCIALS } from "@/lib/constants";
import { Container } from "@/components/ui/Container";

export function EnFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-brand-gradient text-white">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-end">
          <div className="max-w-md">
            <p className="font-display text-2xl font-extrabold uppercase tracking-[0.06em]">
              Lucas Álvarez
            </p>
            <p className="mt-4 text-base leading-relaxed text-white/70">
              Marketing lead in Barcelona, co-founder of{" "}
              <a
                href={PUBLIQO_URL}
                target="_blank"
                rel="noreferrer noopener"
                className="font-semibold text-turquoise hover:opacity-70"
              >
                Publiqo
              </a>
              . Remote, on US Eastern hours.
            </p>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-5 inline-block text-base font-semibold hover:opacity-70"
            >
              {CONTACT.email}
            </a>
          </div>

          <ul className="flex flex-wrap gap-x-6 gap-y-3 text-base font-semibold text-white/80">
            {SOCIALS.linkedin.href ? (
              <li>
                <a href={SOCIALS.linkedin.href} target="_blank" rel="noreferrer noopener me" className="hover:text-white">
                  LinkedIn
                </a>
              </li>
            ) : null}
            <li>
              <a href={SOCIALS.instagram.href} target="_blank" rel="noreferrer noopener me" className="hover:text-white">
                Instagram
              </a>
            </li>
            <li>
              <a href={RESUME_PDF} className="hover:text-white">
                Resume (PDF)
              </a>
            </li>
            <li>
              <Link href="/en/case-studies" className="hover:text-white">
                Case studies
              </Link>
            </li>
            <li>
              <Link href="/" hrefLang="es" lang="es" className="hover:text-white">
                Español
              </Link>
            </li>
          </ul>
        </div>
        <p className="mt-10 border-t border-white/15 pt-6 text-sm text-white/50">
          © {year} Lucas Álvarez Blanco
        </p>
      </Container>
    </footer>
  );
}
