import { clsx } from "clsx";
import { Container } from "./Container";

/**
 * Standard section chrome. The reference site uses exactly two vertical
 * rhythms — 6rem (huge) and 4rem (large) — and alternates full-bleed brand
 * gradient bands with white ones.
 */
export function Section({
  tone = "white",
  padding = "huge",
  container = true,
  className,
  containerClassName,
  children,
  id,
}: {
  tone?: "white" | "gradient" | "grey";
  padding?: "huge" | "large" | "none";
  container?: boolean;
  className?: string;
  containerClassName?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const tones = {
    white: "bg-white text-ink",
    gradient: "bg-brand-gradient text-white",
    grey: "bg-light-grey text-ink",
  };

  const paddings = {
    huge: "py-24",
    large: "py-16",
    none: "",
  };

  return (
    <section
      id={id}
      className={clsx(tones[tone], paddings[padding], className)}
    >
      {container ? (
        <Container className={containerClassName}>{children}</Container>
      ) : (
        children
      )}
    </section>
  );
}
