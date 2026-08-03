import { CollaborationSteps } from "../components/services/CollaborationSteps";
import { ServicesAudience } from "../components/services/ServicesAudience";
import { ServicesFinalCta } from "../components/services/ServicesFinalCta";
import { ServicesHero } from "../components/services/ServicesHero";
import { ServicesPricingGrid } from "../components/services/ServicesPricingGrid";
import { createPageMetadata } from "../../lib/pageMetadata";

export const metadata = createPageMetadata({
  title: "Servicii de nutriție în Iași și online | Teodora Pălii",
  description:
    "Descoperă serviciile și tarifele pentru consultația inițială, plan nutrițional personalizat, consiliere, monitorizare și analiza compoziției corporale.",
  canonical: "/servicii",
});

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
