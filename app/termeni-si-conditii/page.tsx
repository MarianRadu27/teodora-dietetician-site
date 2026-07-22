import type { Metadata } from "next";

import { LegalPageLayout } from "../components/legal/LegalPageLayout";
import { TermsContent, termsTocItems } from "../../content/legal/terms";
import { legalConfig } from "../../config/legal";

export const metadata: Metadata = {
  title: "Termeni și condiții | Teodora Pălii",
  description:
    "Condițiile de utilizare a website-ului, programare, anulare și reprogramare a consultațiilor.",
  alternates: {
    canonical: "/termeni-si-conditii",
  },
};

export default function TermsPage() {
  return (
    <LegalPageLayout
      description="Condițiile de utilizare a website-ului, regulile de programare și secțiunea de anulare și reprogramare."
      lastUpdated={legalConfig.termsLastUpdated}
      title="Termeni și condiții"
      tocItems={termsTocItems}
    >
      <TermsContent />
    </LegalPageLayout>
  );
}
