import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import type { ReactNode } from "react";

import { SiteFooter } from "./components/SiteFooter";
import { SiteHeader } from "./components/SiteHeader";
import { brand } from "./siteContent";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
});

const fraunces = Fraunces({
  subsets: ["latin", "latin-ext"],
  variable: "--font-fraunces",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://dieteticianteodora.ro"),
  title: "Nutriționist-Dietetician autorizat în Iași și online | Teodora Pălii",
  description:
    "Consultații nutriționale personalizate pentru scădere în greutate, afecțiuni metabolice și digestive și o relație echilibrată cu alimentația.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Teodora Pălii | Nutriționist-Dietetician autorizat",
    description:
      "Nutriție personalizată, fără diete rigide, în Iași și online.",
    type: "website",
    locale: "ro_RO",
    url: "/",
    images: [
      {
        url: "/images/teodora-approach.jpg",
        width: 900,
        height: 1200,
        alt: "Teodora Pălii, nutriționist-dietetician autorizat",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Teodora Pălii | Nutriționist-Dietetician autorizat",
    description:
      "Consultații nutriționale personalizate în Iași și online.",
    images: ["/images/teodora-approach.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    name: brand.name,
    description:
      "Consultații nutriționale personalizate pentru scădere în greutate, afecțiuni metabolice și digestive și o relație echilibrată cu alimentația.",
    url: "https://dieteticianteodora.ro",
    image: "https://dieteticianteodora.ro/images/teodora-approach.jpg",
    email: brand.email,
    telephone: "+40778186580",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Iași",
      addressCountry: "RO",
    },
    areaServed: ["Iași", "România", "Online"],
    sameAs: [brand.instagramUrl, brand.facebookUrl],
    founder: {
      "@type": "Person",
      name: brand.name,
      jobTitle: brand.role,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Servicii nutriționale",
      itemListElement: [
        "Consultație nutrițională inițială",
        "Monitorizare nutrițională",
        "Pachet nutrițional personalizat",
      ].map((name) => ({
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name,
        },
      })),
    },
  };

  return (
    <html lang="ro">
      <body className={`${inter.variable} ${fraunces.variable}`}>
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
          type="application/ld+json"
        />
        <div className="site-shell">
          <SiteHeader />
          {children}
          <SiteFooter />
        </div>
      </body>
    </html>
  );
}
