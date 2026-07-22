import { getNutritionService } from "../../../config/nutritionServices";
import { RevealOnScroll } from "../RevealOnScroll";
import { CompactServiceCard } from "./CompactServiceCard";

const compactServices = [
  getNutritionService("consultatie-initiala"),
  getNutritionService("plan-nutritional-personalizat"),
  getNutritionService("monitorizare-plan"),
  getNutritionService("consiliere-nutritionala"),
  getNutritionService("analiza-compozitie-corporala"),
];

export function ServicesPricingGrid() {
  return (
    <section className="section services-pricing-section">
      <div className="container">
        <RevealOnScroll>
          <div className="services-section-heading-row">
            <div>
              <p className="eyebrow">Servicii</p>
              <h2 className="h2">Servicii și tarife</h2>
            </div>
            <p className="lead">
              Vezi rapid serviciile disponibile, durata și tariful fiecăruia.
              Pentru mai multe informații, poți deschide secțiunea detaliată
              corespunzătoare.
            </p>
          </div>
        </RevealOnScroll>

        <div className="compact-services-grid">
          {compactServices.map((service, index) => (
            <RevealOnScroll delay={index * 50} key={service.id}>
              <CompactServiceCard
                highlight={service.id === "consultatie-initiala"}
                service={service}
              />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
