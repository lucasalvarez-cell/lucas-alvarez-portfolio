import Image from "next/image";
import { clsx } from "clsx";

/**
 * Branded logo-on-colour tile, shared by the portfolio grid and the featured
 * rows so both stay in sync.
 *
 * `bordered` is for tiles sitting on the white canvas: most brands use a white
 * `logoBg`, which would otherwise dissolve into the page.
 */
export function LogoTile({
  logo,
  logoBg,
  client,
  aspect = "4/3",
  bordered = false,
  padding = "p-10",
  sizes = "(min-width: 1024px) 30vw, 90vw",
}: {
  logo?: string;
  logoBg?: string;
  client: string;
  aspect?: string;
  bordered?: boolean;
  padding?: string;
  sizes?: string;
}) {
  return (
    <div
      className={clsx(
        "relative overflow-hidden rounded-[var(--radius-card)]",
        bordered && "border-2 border-light-grey"
      )}
      style={{
        backgroundColor: logoBg ?? "#ffffff",
        aspectRatio: aspect,
      }}
    >
      {logo ? (
        <Image
          src={logo}
          alt={`Logo de ${client}`}
          fill
          sizes={sizes}
          className={clsx("object-contain", padding)}
        />
      ) : null}
    </div>
  );
}
