/**
 * Thin outline icon per service, keyed by slug. Hand-rolled so the set stays
 * visually consistent without pulling in an icon library.
 */
const PATHS: Record<string, React.ReactNode> = {
  // Redes sociales — play button inside a frame
  "gestion-redes-sociales": (
    <>
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
      <path d="M10.25 9.5v5l4.25-2.5-4.25-2.5Z" strokeLinejoin="round" />
    </>
  ),
  // Estrategia de contenido — rising bars with trend arrow
  "estrategia-contenido-crecimiento-organico": (
    <>
      <path d="M3.25 20.25h17.5" strokeLinecap="round" />
      <path d="M6.5 20.25v-5" strokeLinecap="round" />
      <path d="M11.25 20.25v-9" strokeLinecap="round" />
      <path d="M16 20.25V7.5" strokeLinecap="round" />
      <path d="M14.5 4.75h4.75V9.5" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // SEO — magnifying glass
  seo: (
    <>
      <circle cx="10.75" cy="10.75" r="6" />
      <path d="m15.25 15.25 5 5" strokeLinecap="round" />
    </>
  ),
  // Desarrollo web — browser window with code brackets
  "desarrollo-web": (
    <>
      <rect x="2.75" y="4.25" width="18.5" height="15.5" rx="2.5" />
      <path d="M2.75 8.75h18.5" />
      <path d="m10 12.5-1.75 1.75L10 16" strokeLinecap="round" strokeLinejoin="round" />
      <path d="m14 12.5 1.75 1.75L14 16" strokeLinecap="round" strokeLinejoin="round" />
    </>
  ),
  // Consultoría — clipboard with checks
  "auditoria-consultoria-digital": (
    <>
      <path d="M9 4.75H6.75a2 2 0 0 0-2 2v12.5a2 2 0 0 0 2 2h10.5a2 2 0 0 0 2-2V6.75a2 2 0 0 0-2-2H15" />
      <rect x="9" y="2.75" width="6" height="4" rx="1.25" />
      <path d="m8.75 12.5 1.5 1.5 3-3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8.75 17.25h6.5" strokeLinecap="round" />
    </>
  ),
};

export function ServiceIcon({
  slug,
  className,
}: {
  slug: string;
  className?: string;
}) {
  const paths = PATHS[slug];
  if (!paths) return null;

  return (
    <svg
      viewBox="0 0 24 24"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      {paths}
    </svg>
  );
}
