"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { CONTACT, NAV_LINKS, SERVICES } from "@/lib/constants";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  const closeMenu = () => {
    setOpen(false);
    setServicesOpen(false);
  };

  // Lock body scroll and close on Escape while the panel is open.
  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        type="button"
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={open}
        onClick={() => (open ? closeMenu() : setOpen(true))}
        className="flex h-10 w-10 flex-col items-center justify-center gap-1.5"
      >
        <span
          className={`h-0.5 w-6 bg-ink transition-transform ${
            open ? "translate-y-2 rotate-45" : ""
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-ink transition-opacity ${
            open ? "opacity-0" : "opacity-100"
          }`}
        />
        <span
          className={`h-0.5 w-6 bg-ink transition-transform ${
            open ? "-translate-y-2 -rotate-45" : ""
          }`}
        />
      </button>

      {open ? (
        <nav className="absolute inset-x-0 top-full bg-brand-gradient px-6 pb-10 pt-4 shadow-[0_24px_48px_rgba(11,11,31,0.35)]">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) =>
              link.href === "/servicios" ? (
                <li key={link.href} className="border-b border-white/15">
                  <button
                    type="button"
                    aria-expanded={servicesOpen}
                    onClick={() => setServicesOpen((value) => !value)}
                    className="flex w-full items-center justify-between py-4 font-display text-2xl font-extrabold uppercase text-white"
                  >
                    {link.label}
                    <svg
                      aria-hidden
                      viewBox="0 0 12 8"
                      className={`h-3 w-3 shrink-0 fill-none stroke-current stroke-2 transition-transform ${
                        servicesOpen ? "rotate-180" : ""
                      }`}
                    >
                      <path
                        d="M1 1.5 6 6.5 11 1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  {servicesOpen ? (
                    <ul className="flex flex-col gap-1 pb-4">
                      <li>
                        <Link
                          href="/servicios"
                          onClick={closeMenu}
                          className="block py-2 text-base font-semibold text-white/90 transition-colors hover:text-white"
                        >
                          Todos los servicios
                        </Link>
                      </li>
                      {SERVICES.map((service) => (
                        <li key={service.slug}>
                          <Link
                            href={`/servicios/${service.slug}`}
                            onClick={closeMenu}
                            className="block py-2 text-base text-white/70 transition-colors hover:text-white"
                          >
                            {service.shortTitle}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </li>
              ) : (
                <li key={link.href} className="border-b border-white/15">
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="block py-4 font-display text-2xl font-extrabold uppercase text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
          <a
            href={`mailto:${CONTACT.email}`}
            className="mt-6 inline-block text-base text-white/75 transition-colors hover:text-white"
          >
            {CONTACT.email}
          </a>
        </nav>
      ) : null}
    </div>
  );
}
