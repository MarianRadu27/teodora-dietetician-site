import type { Metadata } from "next";

import { CollaborationSteps } from "../components/services/CollaborationSteps";
import { ServicesAudience } from "../components/services/ServicesAudience";
import { ServicesFinalCta } from "../components/services/ServicesFinalCta";
import { ServicesHero } from "../components/services/ServicesHero";
import { ServicesPricingGrid } from "../components/services/ServicesPricingGrid";

export const metadata: Metadata = {
  title: "Servicii de nutriție și dietetică | Teodora Pălii",
  description:
    "Vezi serviciile și tarifele pentru consultații nutriționale, plan alimentar personalizat, monitorizare și analiză corporală.",
  alternates: {
    canonical: "/servicii",
  },
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesAudience />
      <ServicesPricingGrid />
      <CollaborationSteps />
      <ServicesFinalCta />
    </main>
  );
}
