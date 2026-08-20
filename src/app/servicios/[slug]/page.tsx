import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceCrossSell } from "@/components/sections/ServiceCrossSell";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { serviceSchema } from "@/lib/schema";
import { SERVICES, getServiceBySlug } from "@/lib/constants";

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) return {};

  return buildMetadata({
    title: service.title,
    description: service.metaDescription,
    path: `/servicios/${service.slug}`,
  });
}

export default async function ServicioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getServiceBySlug(slug);
  if (!service) notFound();

  return (
    <>
      <JsonLd data={serviceSchema(service)} />

      {/* Hero — service name on the brand gradient */}
      <Section tone="gradient" padding="large">
        <Link
          href="/servicios"
          className="inline-flex items-center gap-2 text-base font-semibold text-turquoise transition-opacity hover:opacity-70"
        >
          <span aria-hidden>←</span> Todos los servicios
        </Link>

        <h1 className="mt-8 max-w-4xl text-white">{service.title}</h1>

        <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/75">
          {service.intro}
        </p>
      </Section>

      {/* Alternating text / image blocks */}
      <section className="bg-white py-24 text-ink">
        <div className="space-y-20">
          {service.sections.map((block, index) => {
            const reversed = index % 2 === 1;

            return (
              <Container key={block.title}>
                <div className="flex flex-col gap-10 lg:flex-row lg:items-center lg:gap-16">
                  <div
                    className={`flex flex-1 flex-col justify-center gap-6 ${
                      reversed ? "lg:order-2" : ""
                    }`}
                  >
                    <h2 className="text-[clamp(1.75rem,3.5vw,3rem)] leading-tight">
                      {block.title}
                    </h2>
                    <p className="max-w-xl text-lg leading-relaxed text-ink-soft">
                      {block.body}
                    </p>
                  </div>

                  <div
                    className={`w-full lg:w-1/2 ${reversed ? "lg:order-1" : ""}`}
                  >
                    <div className="relative aspect-[6.16/6] overflow-hidden rounded-[var(--radius-card)] bg-light-grey">
                      <Image
                        src={block.image}
                        alt={block.imageAlt}
                        fill
                        sizes="(min-width: 1024px) 45vw, 90vw"
                        className="object-cover"
                      />
                    </div>
                  </div>
                </div>
              </Container>
            );
          })}
        </div>
      </section>

      <CTASection
        title="¿Te encaja este servicio?"
        subtitle={`Cuéntame en qué punto está tu marca y valoramos juntos si ${service.shortTitle.toLowerCase()} es lo que necesitas ahora mismo.`}
      />

      <ServiceCrossSell currentSlug={service.slug} />
    </>
  );
}
