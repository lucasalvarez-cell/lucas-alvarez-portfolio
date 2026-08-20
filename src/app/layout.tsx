import type { Metadata, Viewport } from "next";
import { Karla, Roboto } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteGraph } from "@/lib/schema";
import { ROBOTS } from "@/lib/seo";
import {
  SITE_DESCRIPTION,
  SITE_LANG,
  SITE_LOCALE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/constants";
import "./globals.css";

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

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Estratega de contenido en Barcelona`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  authors: [{ name: SITE_NAME, url: SITE_URL }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  category: "Marketing digital",
  alternates: { canonical: "/" },
  robots: ROBOTS,
  openGraph: {
    type: "website",
    locale: SITE_LOCALE,
    siteName: SITE_NAME,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
  /* Google Search Console verification goes here once the property is claimed. */
  // verification: { google: "..." },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0b0b1f" },
  ],
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={SITE_LANG}
      className={`${karla.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={siteGraph()} />
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[1002] focus:rounded-[var(--radius-card)] focus:bg-purple focus:px-4 focus:py-2 focus:text-base focus:text-white"
        >
          Saltar al contenido
        </a>
        <Header />
        <main id="contenido" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
