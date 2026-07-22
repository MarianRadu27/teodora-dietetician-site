import type { Metadata } from "next";

import { LegalPageLayout } from "../components/legal/LegalPageLayout";
import {
  PrivacyContent,
  privacyTocItems,
} from "../../content/legal/privacy";
import { legalConfig } from "../../config/legal";

export const metadata: Metadata = {
  title: "Politica de confidențialitate | Teodora Pălii",
  description:
    "Informații despre modul în care sunt colectate, utilizate și protejate datele personale.",
  alternates: {
    canonical: "/politica-de-confidentialitate",
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPageLayout
      description="Informații despre modul în care sunt colectate, utilizate și protejate datele personale pe website."
      lastUpdated={legalConfig.privacyLastUpdated}
      title="Politica de confidențialitate"
      tocItems={privacyTocItems}
    >
      <PrivacyContent />
    </LegalPageLayout>
  );
}
