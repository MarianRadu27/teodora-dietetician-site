import { getNutritionService } from "../../../config/nutritionServices";
import { RevealOnScroll } from "../RevealOnScroll";
import { FollowUpServiceCard } from "./FollowUpServiceCard";

const planFollowUp = getNutritionService("monitorizare-plan");
const educationFollowUp = getNutritionService("consiliere-nutritionala");

export function FollowUpSection() {
  return (
    <section
      aria-labelledby="monitorizare-title"
      className="section services-anchor"
      id="monitorizare"
    >
      <div className="container">
        <RevealOnScroll>
          <div className="services-section-heading-row">
            <div>
              <p className="eyebrow">Pasul 3</p>
              <h2 className="h2" id="monitorizare-title">
                Monitorizarea în funcție de modalitatea aleasă
              </h2>
            </div>
            <p className="lead">
              Tipul și frecvența ședințelor ulterioare sunt stabilite în
              funcție de direcția de lucru, obiective și evoluție.
            </p>
          </div>
        </RevealOnScroll>

        <div className="follow-up-grid">
          <RevealOnScroll>
            <FollowUpServiceCard
              association="Pentru modalitatea „Plan nutrițional personalizat”"
              ctaLabel="Programează monitorizarea"
              featureLabel="Ce include ședința?"
              recommendation="la aproximativ 2-3 săptămâni"
              service={planFollowUp}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={80}>
            <FollowUpServiceCard
              association="Pentru modalitatea „Consiliere și educație nutrițională”"
              ctaLabel="Programează o ședință de consiliere"
              featureLabel="Ce putem aborda în cadrul ședințelor?"
              recommendation="la aproximativ 2-4 săptămâni"
              service={educationFollowUp}
            />
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
