import { clsx } from "clsx";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={clsx("mx-auto w-full max-w-[80rem] px-6 sm:px-8", className)}>
      {children}
    </div>
  );
}
