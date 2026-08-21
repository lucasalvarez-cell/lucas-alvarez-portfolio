import { Container } from "@/components/ui/Container";
import { ServiceCard } from "@/components/ServiceCard";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/lib/constants";

export function ServicesPreview() {
  return (
    <section className="bg-brand-gradient py-24 text-white">
      <Container>
        <Reveal>
          <h2 className="text-white">Servicios</h2>
        </Reveal>

        <div className="mt-20 grid gap-x-12 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((service, index) => (
            <Reveal key={service.slug} delay={index * 80}>
              <ServiceCard service={service} tone="dark" />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-20">
          <Button href="/servicios" variant="outline">
            Ver los cinco servicios
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
