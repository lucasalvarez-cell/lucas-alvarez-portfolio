import type { Metadata, Viewport } from "next";
import { Karla, Roboto } from "next/font/google";
import { EnHeader } from "@/components/en/EnHeader";
import { EnFooter } from "@/components/en/EnFooter";
import { ROBOTS } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
import { EN_BIO } from "@/content/en/profile";
import "../globals.css";

const karla = Karla({
  variable: "--font-karla",
  subsets: ["latin"],
  weight: ["800"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

/**
 * Root layout of the English section. It exists so /en is served with
 * <html lang="en">: one shared root layout would declare Spanish on every
 * English page, and `lang` is what screen readers and engines read first.
 */
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Head of Marketing`,
    template: `%s | ${SITE_NAME}`,
  },
  description: EN_BIO,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: `${SITE_URL}/en` }],
  creator: SITE_NAME,
  robots: ROBOTS,
  openGraph: { type: "website", locale: "en_US", siteName: SITE_NAME },
  twitter: { card: "summary_large_image" },
  verification: {
    ...(process.env.GOOGLE_SITE_VERIFICATION
      ? { google: process.env.GOOGLE_SITE_VERIFICATION }
      : {}),
    ...(process.env.BING_SITE_VERIFICATION
      ? { other: { "msvalidate.01": process.env.BING_SITE_VERIFICATION } }
      : {}),
  },
};

export const viewport: Viewport = {
  themeColor: "#ffffff",
  colorScheme: "light",
};

export default function EnglishRootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${karla.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1002] focus:rounded-[var(--radius-card)] focus:bg-purple focus:px-4 focus:py-2 focus:text-base focus:text-white"
        >
          Skip to content
        </a>
        <EnHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <EnFooter />
      </body>
    </html>
  );
}
