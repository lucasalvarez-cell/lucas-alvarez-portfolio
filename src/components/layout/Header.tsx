import Link from "next/link";
import { NAV_LINKS } from "@/lib/constants";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { MobileNav } from "./MobileNav";
import { ServicesDropdown } from "./ServicesDropdown";

export function Header() {
  return (
    <header className="sticky top-0 z-[1001] border-b border-ink/10 bg-white">
      <Container className="relative flex items-center justify-between py-5">
        <Link
          href="/"
          className="font-display text-lg font-extrabold uppercase tracking-[0.08em] text-ink"
        >
          Lucas Álvarez
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.filter((link) => link.href !== "/").map((link) =>
            link.href === "/servicios" ? (
              <ServicesDropdown key={link.href} />
            ) : (
              <Link
                key={link.href}
                href={link.href}
                className="text-base font-semibold text-ink/70 transition-colors hover:text-ink"
              >
                {link.label}
              </Link>
            )
          )}
        </nav>

        <div className="ml-4 hidden md:block">
          <Button href="/contacto" variant="primary" size="sm">
            Hablemos
          </Button>
        </div>

        <MobileNav />
      </Container>
    </header>
  );
}
