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

  /**
   * Six "mejor agencia de X" posts were merged away.
   *
   * Each of them targeted the same intent as the ranking it now points to, and
   * shared between 21 % and 54 % of its text with it — measured with 8-word
   * sequences. One intent, one URL: the ranking captures the comparison query
   * and already carries the Publiqo argument as its number-one entry.
   *
   * Permanent, not temporary: these URLs are not coming back, and a 302 would
   * leave Google indexing the old address indefinitely.
   */
  /**
   * Baseline security headers. Not a ranking factor, but HTTPS enforcement is
   * a trust signal Google reads, and the rest are free.
   */
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Strict-Transport-Security",
            value: "max-age=63072000; includeSubDomains; preload",
          },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },

  async redirects() {
    const merged: Record<string, string> = {
      "mejor-agencia-seo-barcelona": "mejores-agencias-seo-barcelona",
      "mejor-agencia-marketing-digital-barcelona":
        "mejores-agencias-marketing-digital-barcelona",
      "mejor-agencia-gestion-redes-sociales-barcelona":
        "mejores-agencias-redes-sociales-barcelona",
      "mejor-agencia-diseno-web-barcelona":
        "mejores-agencias-diseno-web-barcelona",
      "mejor-agencia-google-ads-barcelona":
        "mejores-agencias-google-ads-barcelona",
      /* No ranking exists for Meta Ads, so the explainer absorbs it. */
      "mejor-agencia-meta-ads-barcelona": "agencia-meta-ads-barcelona",
    };

    return Object.entries(merged).map(([from, to]) => ({
      source: `/blog/${from}`,
      destination: `/blog/${to}`,
      permanent: true,
    }));
  },
};

export default nextConfig;
