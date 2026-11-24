import type { Metadata } from "next";
import { Karla, Roboto } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import NotFound from "./(es)/not-found";
import "./globals.css";

/**
 * With two root layouts ((es) and (en)) there is no single layout to compose a
 * 404 for unmatched URLs, so Next renders this file instead. It reuses the
 * Spanish 404 body, since Spanish is the default language of the site, and the
 * header carries the switch to /en.
 */
const karla = Karla({ variable: "--font-karla", subsets: ["latin"], weight: ["800"] });
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: "Página no encontrada | Lucas Álvarez",
  description:
    "La página que buscas no existe o ha cambiado de dirección. Estas son las secciones del sitio.",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <html lang="es" className={`${karla.variable} ${roboto.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <Header />
        <main className="flex-1">
          <NotFound />
        </main>
        <Footer />
      </body>
    </html>
  );
}
