import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SERVICES } from "@/lib/constants";

/**
 * "¿Buscas otra cosa?" — lists every service except the one being viewed.
 */
export function ServiceCrossSell({ currentSlug }: { currentSlug: string }) {
  const others = SERVICES.filter((service) => service.slug !== currentSlug);

  if (others.length === 0) return null;

  return (
    <section className="bg-brand-gradient py-24 text-white">
      <Container>
        <h2 className="text-white">El resto de lo que hago</h2>

        <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {others.map((service) => (
            <Link
              key={service.slug}
              href={`/servicios/${service.slug}`}
              className="group flex flex-col gap-4 border-t-2 border-white/20 pt-6 transition-colors hover:border-white"
            >
              <h3 className="text-xl leading-snug text-white">
                {service.title}
              </h3>
              <p className="text-base leading-relaxed text-white/70">
                {service.shortDescription}
              </p>
              <span className="mt-auto inline-flex items-center gap-2 pt-2 text-base font-semibold text-turquoise transition-opacity group-hover:opacity-70">
                Ver servicio
                <span aria-hidden>→</span>
              </span>
            </Link>
          ))}
        </div>
      </Container>
    </section>
  );
}
