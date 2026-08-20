import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LogoTile } from "@/components/ui/LogoTile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { CASE_STUDIES } from "@/content/casos-de-exito";

/**
 * Continuous left-scrolling marquee of every real case.
 *
 * The animation is pure CSS, so this stays a server component — no carousel
 * library and nothing added to the client bundle. It pauses on hover and stops
 * entirely under prefers-reduced-motion (see globals.css).
 */
export function WorkSlider() {
  const cases = CASE_STUDIES.filter((c) => !c.isPlaceholder);
  if (cases.length === 0) return null;

  // One copy has to be at least a viewport wide or the loop shows a gap.
  // Slides are 30vw on desktop, so repeat until there are at least four.
  let half = cases;
  while (half.length < 4) half = [...half, ...cases];

  // Exactly two copies — the animation translates the track by -50%.
  const track = [...half, ...half];

  return (
    <section className="bg-white py-24 text-ink">
      <Container>
        <Reveal>
          <SectionHeading kicker="Portfolio" title="Contenido que he producido" />
        </Reveal>
      </Container>

      <Reveal className="marquee-viewport mt-14 overflow-hidden">
        <div className="marquee-track flex w-max">
          {track.map((caseStudy, index) => {
            // The second copy is decorative duplication; hide it from
            // screen readers and keep it out of the tab order.
            const isDuplicate = index >= half.length;

            return (
              <Link
                key={`${caseStudy.slug}-${index}`}
                href={`/casos-de-exito/${caseStudy.slug}`}
                aria-hidden={isDuplicate}
                tabIndex={isDuplicate ? -1 : undefined}
                className="card-hover mr-6 block w-[80vw] shrink-0 sm:w-[45vw] lg:w-[30vw]"
              >
                <LogoTile
                  logo={caseStudy.logo}
                  logoBg={caseStudy.logoBg}
                  client={caseStudy.client}
                  aspect="6.16/6"
                  bordered
                  padding="p-10 sm:p-14"
                  sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 80vw"
                />
              </Link>
            );
          })}
        </div>
      </Reveal>
    </section>
  );
}
