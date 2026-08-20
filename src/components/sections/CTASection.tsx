import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function CTASection({
  title = "¿Tu cuenta lleva meses sin moverse?",
  subtitle = "Cuéntame qué estás publicando y qué resultados estás teniendo. Te digo si el problema es de formato, de frecuencia o de enfoque, y qué haría yo. Respondo personalmente.",
  ctaLabel = "Escríbeme",
}: {
  title?: string;
  subtitle?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-white">
      <Image
        src="/images/placeholders/cta-image.jpg"
        alt=""
        aria-hidden
        fill
        sizes="100vw"
        className="object-cover opacity-30"
      />
      <div aria-hidden className="absolute inset-0 bg-ink/85" />

      <Container className="relative py-24 sm:py-28">
        <Reveal className="max-w-xl">
          <h2>{title}</h2>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-white/75">
            {subtitle}
          </p>
          <div className="mt-10">
            <Button href="/contacto" variant="primary">
              {ctaLabel}
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
