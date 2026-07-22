import { AdditionalServiceCard } from "../components/services/AdditionalServiceCard";
import { CollaborationPathsSection } from "../components/services/CollaborationPathsSection";
import { CollaborationSteps } from "../components/services/CollaborationSteps";
import { FollowUpSection } from "../components/services/FollowUpSection";
import { InitialConsultationSection } from "../components/services/InitialConsultationSection";
import { ServicesAudience } from "../components/services/ServicesAudience";
import { ServicesFinalCta } from "../components/services/ServicesFinalCta";
import { ServicesHero } from "../components/services/ServicesHero";
import { ServicesPricingGrid } from "../components/services/ServicesPricingGrid";

export const metadata = {
  title: "Servicii de nutriție și dietetică | Teodora Pălii",
  description:
    "Descoperă serviciile de nutriție și dietetică oferite de Teodora Pălii: consultație inițială, planuri nutriționale, consiliere, monitorizare și analiză corporală.",
};

export default function ServicesPage() {
  return (
    <main>
      <ServicesHero />
      <ServicesAudience />
      <ServicesPricingGrid />
      <CollaborationSteps />
      <InitialConsultationSection />
      <CollaborationPathsSection />
      <FollowUpSection />
      <AdditionalServiceCard />
      <ServicesFinalCta />
    </main>
  );
}
