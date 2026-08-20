import Link from "next/link";
import { SERVICES } from "@/lib/constants";

/**
 * Desktop-only "Servicios" nav item. Reveals a panel of every individual
 * service page on hover/focus — pure CSS via :hover and :focus-within, no
 * client JS needed.
 */
export function ServicesDropdown() {
  return (
    <div className="group relative">
      <Link
        href="/servicios"
        className="flex items-center gap-1.5 text-base font-semibold text-ink/70 transition-colors hover:text-ink"
      >
        Servicios
        <svg
          aria-hidden
          viewBox="0 0 12 8"
          className="h-2.5 w-2.5 fill-none stroke-current stroke-2 transition-transform duration-150 group-hover:rotate-180 group-focus-within:rotate-180"
        >
          <path
            d="M1 1.5 6 6.5 11 1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      <div
        className="invisible absolute left-1/2 top-full z-10 w-72 origin-top -translate-x-1/2 scale-95 rounded-[var(--radius-card)] border border-ink/10 bg-white p-2 opacity-0 shadow-[0_24px_48px_rgba(11,11,31,0.12)] transition-all duration-150 group-hover:visible group-hover:scale-100 group-hover:opacity-100 group-focus-within:visible group-focus-within:scale-100 group-focus-within:opacity-100"
      >
        {SERVICES.map((service) => (
          <Link
            key={service.slug}
            href={`/servicios/${service.slug}`}
            className="block rounded-[calc(var(--radius-card)-0.25rem)] px-4 py-3 text-sm font-semibold text-ink transition-colors hover:bg-light-grey-2"
          >
            {service.shortTitle}
          </Link>
        ))}
      </div>
    </div>
  );
}
