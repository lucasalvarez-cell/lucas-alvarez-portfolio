import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { CLIENT_LOGOS } from "@/lib/constants";

/** White spacer band between the two gradient sections, logos in real color. */
export function LogoStrip() {
  return (
    <section className="bg-white py-24 text-ink">
      <Container>
        <Reveal>
          <p className="mb-10 text-sm font-semibold uppercase tracking-[0.2em] text-ink-soft">
            Marcas que han confiado en mí
          </p>
        </Reveal>

        <div className="grid grid-cols-2 items-center gap-x-10 gap-y-14 sm:grid-cols-3 lg:grid-cols-4">
          {CLIENT_LOGOS.map((logo, index) => (
            <Reveal
              key={logo.slug}
              delay={index * 60}
              className="relative h-20 w-full"
            >
              <Image
                src={`/images/logos/${logo.file}.png`}
                alt={logo.name}
                fill
                sizes="(min-width: 1024px) 220px, (min-width: 640px) 30vw, 40vw"
                className="object-contain object-left"
              />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
