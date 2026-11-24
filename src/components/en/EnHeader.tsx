import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { RESUME_PDF } from "@/lib/constants";

const LINKS = [
  { label: "About", href: "/en#about" },
  { label: "Experience", href: "/en#experience" },
  { label: "Case studies", href: "/en/case-studies" },
  { label: "Contact", href: "/en#contact" },
];

export function EnHeader() {
  return (
    <header className="sticky top-0 z-[1001] border-b border-ink/10 bg-white">
      <Container className="flex items-center justify-between gap-4 py-5">
        <Link
          href="/en"
          className="font-display text-lg font-extrabold uppercase tracking-[0.08em] text-ink"
        >
          Lucas Álvarez
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-8 md:flex">
          {LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-base font-semibold text-ink/70 transition-colors hover:text-ink"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-5">
          {/* Spanish has its own root layout, so Next does a full page load. */}
          <Link
            href="/"
            hrefLang="es"
            lang="es"
            aria-label="Versión en español"
            className="text-sm font-semibold uppercase tracking-[0.1em] text-ink/60 transition-colors hover:text-ink"
          >
            ES
          </Link>
          <Button href={RESUME_PDF} variant="primary" size="sm">
            Resume
          </Button>
        </div>
      </Container>
    </header>
  );
}
