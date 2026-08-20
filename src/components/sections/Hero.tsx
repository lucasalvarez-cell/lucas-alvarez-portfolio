import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";

export function Hero() {
  return (
    <section className="bg-brand-gradient text-white">
      <Container className="py-20 sm:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <Reveal immediate>
            <p className="mb-5 text-sm font-semibold uppercase tracking-[0.2em] text-turquoise">
              Estratega de contenido y social media manager · Barcelona
            </p>
            {/* Sized for the half-width column, not the full viewport */}
            <h1 className="text-[clamp(2rem,4.4vw,3.75rem)]">
              +250 % de visualizaciones en un mes. Sin gastar un euro en
              publicidad.
            </h1>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-white/75">
              Soy Lucas Álvarez, estratega de contenido en Barcelona y
              cofundador de Publiqo. Gestiono las redes sociales y la estrategia
              de contenido de marcas que estaban estancadas: campings, industria
              y canales de YouTube que hoy crecen todos los meses.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Button href="/casos-de-exito" variant="light">
                Ver cómo trabajo
              </Button>
              <Button href="/servicios" variant="outline">
                Servicios
              </Button>
            </div>
          </Reveal>

          <Reveal
            immediate
            className="relative mx-auto w-full max-w-md lg:max-w-none"
          >
            <div className="relative aspect-4/5 overflow-hidden rounded-[var(--radius-card)]">
              <Image
                src="/images/lucas-alvarez.jpg"
                alt="Lucas Álvarez, estratega de contenido y social media manager en Barcelona"
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 90vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
