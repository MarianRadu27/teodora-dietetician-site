import type { Metadata } from "next";

import { LegalPageLayout } from "../components/legal/LegalPageLayout";
import {
  CookiesContent,
  cookiesTocItems,
} from "../../content/legal/cookies";
import { legalConfig } from "../../config/legal";

export const metadata: Metadata = {
  title: "Politica de cookies | Teodora Pălii",
  description: "Informații despre cookies și tehnologiile utilizate pe website.",
  alternates: {
    canonical: "/politica-de-cookies",
  },
};

export default function CookiePolicyPage() {
  return (
    <LegalPageLayout
      description="Informații despre cookies, tehnologii similare și preferințele care vor putea fi gestionate în viitor."
      lastUpdated={legalConfig.cookiesLastUpdated}
      title="Politica de cookies"
      tocItems={cookiesTocItems}
    >
      <CookiesContent />
    </LegalPageLayout>
  );
}
