import Link from "next/link";
import { CONTACT } from "@/lib/constants";

/**
 * The one conversion element inside the article column's sightline.
 *
 * Every ranking I studied puts its offer at the bottom, after 3.000 words —
 * which only reaches the readers who finish. This sits in the sticky rail
 * next to the index and asks for the smallest possible commitment: a link,
 * not a budget.
 */
export function SidebarCta() {
  return (
    <div className="rounded-[var(--radius-card)] bg-brand-gradient p-6 text-white">
      <p className="font-display text-lg font-extrabold leading-snug">
        ¿Te digo qué cambiaría en tu caso?
      </p>
      <p className="mt-3 text-base leading-relaxed text-white/75">
        Mándame el enlace a tu web o a tu perfil. Te respondo yo, con lo que
        veo y por dónde empezaría.
      </p>

      <Link
        href="/contacto"
        className="mt-5 inline-flex w-full items-center justify-center rounded-[var(--radius-card)] bg-white px-4 py-2.5 text-base font-semibold text-purple transition-colors hover:bg-turquoise hover:text-ink"
      >
        Escríbeme
      </Link>

      <a
        href={CONTACT.whatsappHref}
        target="_blank"
        rel="noreferrer noopener"
        className="mt-3 block text-center text-sm text-white/70 underline underline-offset-4 transition-colors hover:text-white"
      >
        o por WhatsApp
      </a>
    </div>
  );
}
