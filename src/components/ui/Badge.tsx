import { clsx } from "clsx";

export function Badge({
  children,
  variant = "soft",
  className,
}: {
  children: React.ReactNode;
  variant?: "soft" | "outline" | "onDark";
  className?: string;
}) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-[var(--radius-card)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]",
        variant === "soft" && "bg-purple/10 text-purple",
        variant === "outline" && "border border-ink/20 text-ink-soft",
        variant === "onDark" && "bg-white/15 text-white",
        className
      )}
    >
      {children}
    </span>
  );
}
