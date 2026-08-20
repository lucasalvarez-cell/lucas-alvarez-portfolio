import { clsx } from "clsx";
import { Button } from "@/components/ui/Button";
import { ServiceIcon } from "@/components/ui/ServiceIcon";
import type { Service } from "@/lib/constants";

export function ServiceCard({
  service,
  detailed = false,
  tone = "light",
}: {
  service: Service;
  detailed?: boolean;
  tone?: "light" | "dark";
}) {
  const onDark = tone === "dark";

  return (
    <div className="flex h-full flex-col">
      {/* Icon sits inline with the title's first line, as one unit.
          The min-height keeps one- and two-line titles on the same grid so
          every column's body copy starts at the same height. */}
      <div className="flex items-start gap-3 sm:min-h-[3.25rem]">
        <ServiceIcon
          slug={service.slug}
          className={clsx(
            "mt-px h-6 w-6 shrink-0",
            onDark ? "text-white" : "text-purple"
          )}
        />
        <h3
          className={clsx(
            "text-base leading-tight tracking-[0.02em]",
            onDark ? "text-white" : "text-ink"
          )}
        >
          {service.title}
        </h3>
      </div>

      <p
        className={clsx(
          "mt-4 text-base leading-loose",
          onDark ? "text-white/85" : "text-ink-soft"
        )}
      >
        {detailed ? service.description : service.shortDescription}
      </p>

      {/* mt-auto keeps every button on the same baseline across the row */}
      <div className="mt-auto pt-8">
        <Button
          href={`/servicios/${service.slug}`}
          variant={onDark ? "white" : "black"}
          size="sm"
        >
          Saber más
          <span aria-hidden className="ml-2 text-lg leading-none">
            ›
          </span>
        </Button>
      </div>
    </div>
  );
}
