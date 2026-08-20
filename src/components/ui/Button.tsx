import Link from "next/link";
import { clsx } from "clsx";

type ButtonVariant =
  | "primary"
  | "outline"
  | "outlineDark"
  | "black"
  | "light"
  | "white";

type ButtonProps = {
  children: React.ReactNode;
  variant?: ButtonVariant;
  size?: "sm" | "md";
  className?: string;
} & (
  | { href: string; type?: never; disabled?: never }
  | {
      href?: never;
      type?: "button" | "submit";
      disabled?: boolean;
    }
);

const baseStyles =
  "inline-flex items-center justify-center rounded-[var(--radius-card)] transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-turquoise";

const sizes = {
  sm: "px-5 py-2 text-sm",
  md: "px-8 py-3 text-base",
};

/* Outline variants sit on a 2px border, so they lose 2px of padding to keep
   their outer height identical to the solid variants. */
const outlineSizes = {
  sm: "px-[1.1875rem] py-[0.375rem] text-sm",
  md: "px-[1.875rem] py-[0.625rem] text-base",
};

const variants: Record<ButtonVariant, string> = {
  primary: "bg-purple text-white font-normal hover:bg-purple-hover",
  outline:
    "border-2 border-white text-white bg-transparent font-normal hover:bg-purple-hover hover:border-purple-hover",
  outlineDark:
    "border-2 border-ink text-ink bg-transparent font-normal hover:bg-ink hover:text-white",
  black: "bg-ink text-white font-semibold hover:bg-purple",
  light: "bg-light-grey text-ink font-semibold hover:bg-ink hover:text-white",
  white: "bg-white text-purple font-normal hover:bg-light-grey-2",
};

const isOutline = (variant: ButtonVariant) =>
  variant === "outline" || variant === "outlineDark";

export function Button(props: ButtonProps) {
  const { children, variant = "primary", size = "md", className } = props;
  const styles = clsx(
    baseStyles,
    isOutline(variant) ? outlineSizes[size] : sizes[size],
    variants[variant],
    className
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={styles}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={props.type ?? "button"}
      disabled={props.disabled}
      className={styles}
    >
      {children}
    </button>
  );
}
