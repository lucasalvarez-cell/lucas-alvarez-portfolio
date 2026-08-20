import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.join(__dirname),
  },
  images: {
    /* AVIF first, WebP as the fallback: both cut the bytes of the JPG hero and
       card images substantially, which is where LCP is won on mobile. */
    formats: ["image/avif", "image/webp"],
    /* A year of immutable caching on the optimiser output — the URLs are
       content-addressed, so a changed image gets a new URL anyway. */
    minimumCacheTTL: 31536000,
  },
  /* Trailing-slash URLs would otherwise resolve as duplicates of the canonical
     no-slash form. Explicit here so the choice survives a config edit. */
  trailingSlash: false,
  poweredByHeader: false,
};

export default nextConfig;
