import { Container } from "@/components/ui/Container";
import { LogoTile } from "@/components/ui/LogoTile";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { CASE_STUDIES } from "@/content/casos-de-exito";
import { filled } from "@/lib/content";

/**
 * Alternating full-width feature rows. Titles use a fluid size so they read as
 * display type on desktop without overflowing longer Spanish client names.
 */
export function FeaturedWork() {
  const featured = CASE_STUDIES.filter((c) => !c.isPlaceholder);

  if (featured.length === 0) return null;

  return (
    <section className="bg-white py-24 text-ink">
      <Container>
        <Reveal className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            kicker="Resultados"
            title="Lo que ha pasado con cuentas reales"
          />
          <Button href="/casos-de-exito" variant="outlineDark">
            Ver todos los casos
          </Button>
        </Reveal>
      </Container>

      <div className="mt-16 space-y-20">
        {featured.map((caseStudy, index) => {
          const summary =
            filled(caseStudy.result) ??
            filled(caseStudy.challenge) ??
            filled(caseStudy.whatWeDid);
          const sector = filled(caseStudy.sector);
          const reversed = index % 2 === 1;

          return (
            <Container key={caseStudy.slug}>
              <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
                <Reveal
                  className={`flex flex-1 flex-col justify-center gap-4 ${
                    reversed ? "lg:order-2" : ""
                  }`}
                >
                  {sector ? (
                    <p className="text-sm font-semibold uppercase tracking-[0.2em] text-purple">
                      {sector}
                    </p>
                  ) : null}

                  <h2 className="text-[clamp(2rem,4.5vw,4rem)] leading-tight">
                    {caseStudy.client}
                  </h2>

                  {summary ? (
                    <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
                      {summary}
                    </p>
                  ) : null}

                  <div className="mt-4">
                    <Button href={`/casos-de-exito/${caseStudy.slug}`} variant="black">
                      Ver el caso
                    </Button>
                  </div>
                </Reveal>

                <Reveal
                  delay={150}
                  className={`w-full lg:w-1/2 ${reversed ? "lg:order-1" : ""}`}
                >
                  <LogoTile
                    logo={caseStudy.logo}
                    logoBg={caseStudy.logoBg}
                    client={caseStudy.client}
                    aspect="6.16/6"
                    bordered
                    padding="p-12 sm:p-20"
                    sizes="(min-width: 1024px) 45vw, 90vw"
                  />
                </Reveal>
              </div>
            </Container>
          );
        })}
      </div>
    </section>
  );
}
