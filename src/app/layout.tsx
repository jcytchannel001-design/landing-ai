import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ignacio de las Rivas | Fotografía Profesional de Vivienda",
  description:
    "Fotografía profesional de viviendas, inmuebles y espacios interiores en Madrid y toda España. Imágenes de alta calidad para inmobiliarias, promotoras y particulares. Más de 500 proyectos realizados.",
  keywords: [
    "fotografía inmobiliaria",
    "fotografía vivienda Madrid",
    "fotógrafo inmuebles",
    "fotografía profesional casas",
    "fotografía interiores",
    "fotografía arquitectura",
    "fotografía real estate",
    "Ignacio de las Rivas",
    "fotógrafo Madrid",
    "fotografía para inmobiliarias",
  ],
  authors: [{ name: "Ignacio de las Rivas" }],
  creator: "Ignacio de las Rivas",
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: "https://ignaciodelasfotografia.es",
    siteName: "Ignacio de las Rivas Fotografía Profesional",
    title: "Ignacio de las Rivas | Fotografía Profesional de Vivienda",
    description:
      "Fotografía profesional de viviendas e inmuebles. Imágenes que venden más rápido y a mejor precio.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="es">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "Ignacio de las Rivas Fotografía Profesional",
              description:
                "Fotografía profesional de viviendas, inmuebles y espacios interiores en Madrid y toda España.",
              url: "https://ignaciodelasfotografia.es",
              telephone: "+34 600 000 000",
              email: "info@ignaciodelasfotografia.es",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Madrid",
                addressCountry: "ES",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: 40.4168,
                longitude: -3.7038,
              },
              areaServed: [
                { "@type": "City", name: "Madrid" },
                { "@type": "City", name: "Barcelona" },
                { "@type": "Country", name: "España" },
              ],
              serviceType: [
                "Fotografía inmobiliaria",
                "Fotografía de interiores",
                "Fotografía de arquitectura",
                "Fotografía aérea con dron",
              ],
              priceRange: "€€",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.9",
                reviewCount: "127",
              },
            }),
          }}
        />
      </head>
      <body className={`${geist.variable} antialiased`}>{children}</body>
    </html>
  );
}
