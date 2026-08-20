import type { Metadata } from "next";
import { Karla, Roboto } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { personAndOrganizationGraph } from "@/lib/schema";
import { SITE_NAME, SITE_URL } from "@/lib/constants";
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
  description:
    "Estratega de contenido y social media manager en Barcelona. Cofundador de Publiqo. Gestiono las redes sociales de marcas reales: +250 % de visualizaciones en un mes para Camping Collvert, x6 para Camping Victòria.",
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "es_ES",
    siteName: SITE_NAME,
    url: "/",
  },
  twitter: { card: "summary_large_image" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${karla.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <JsonLd data={personAndOrganizationGraph()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
