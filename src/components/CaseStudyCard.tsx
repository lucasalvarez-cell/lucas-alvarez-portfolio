import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { LogoTile } from "@/components/ui/LogoTile";
import { filled } from "@/lib/content";
import type { CaseStudy } from "@/types/case-study";

/**
 * Portfolio tile: branded logo-on-color square, kicker + client name below,
 * sitting directly on the gradient background (markbaroth.com/portfolio style).
 */
export function CaseStudyCard({ caseStudy }: { caseStudy: CaseStudy }) {
  const { client, isPlaceholder, logo, logoBg } = caseStudy;
  const sector = filled(caseStudy.sector);

  if (isPlaceholder) {
    return (
      <div className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-[var(--radius-card)] border-2 border-dashed border-white/20 p-6 text-center">
        <Badge variant="onDark">Caso en preparación</Badge>
        <p className="text-base text-white/70">
          Próximamente un nuevo caso de éxito.
        </p>
      </div>
    );
  }

  return (
    <Link href={`/casos-de-exito/${caseStudy.slug}`} className="card-hover block">
      <LogoTile logo={logo} logoBg={logoBg} client={client} />

      {sector ? (
        <p className="mt-5 text-sm font-semibold uppercase tracking-[0.15em] text-white/60">
          {sector}
        </p>
      ) : null}

      <h3 className="mt-1 text-2xl text-white">{client}</h3>
    </Link>
  );
}
