import type { Metadata } from "next";

import { brand } from "../app/siteContent";

type PageMetadataOptions = {
  title: string;
  description: string;
  canonical: string;
};

export function createPageMetadata({
  title,
  description,
  canonical,
}: PageMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: "Dietetician Teodora Pălii",
      type: "website",
      locale: "ro_RO",
      images: [
        {
          url: brand.socialImage,
          width: 1200,
          height: 630,
          alt: "Teodora Pălii, nutriționist-dietetician autorizat",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [brand.socialImage],
    },
  };
}
