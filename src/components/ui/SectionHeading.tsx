import { clsx } from "clsx";

/**
 * `tone` describes the background the heading sits on: "dark" means a brand
 * gradient band (white text), "light" means the white canvas (ink text).
 */
export function SectionHeading({
  kicker,
  title,
  subtitle,
  align = "left",
  tone = "light",
  as: Heading = "h2",
  className,
}: {
  kicker?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "light" | "dark";
  as?: "h1" | "h2" | "h3";
  className?: string;
}) {
  const onDark = tone === "dark";

  return (
    <div
      className={clsx(
        "max-w-3xl",
        align === "center" && "mx-auto text-center",
        className
      )}
    >
      {kicker ? (
        <p
          className={clsx(
            "mb-3 text-sm font-semibold uppercase tracking-[0.2em]",
            onDark ? "text-turquoise" : "text-purple"
          )}
        >
          {kicker}
        </p>
      ) : null}
      <Heading className={onDark ? "text-white" : "text-ink"}>{title}</Heading>
      {subtitle ? (
        <p
          className={clsx(
            "mt-5 text-lg leading-relaxed",
            onDark ? "text-white/75" : "text-ink-soft"
          )}
        >
          {subtitle}
        </p>
      ) : null}
    </div>
  );
}
