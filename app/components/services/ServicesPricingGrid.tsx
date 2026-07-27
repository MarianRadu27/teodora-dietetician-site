import { servicesPricingCards } from "../../../config/nutritionServices";
import { RevealOnScroll } from "../RevealOnScroll";
import { CompactServiceCard } from "./CompactServiceCard";

const [featuredService, ...secondaryServices] = servicesPricingCards;

export function ServicesPricingGrid() {
  return (
    <section className="section services-pricing-section">
      <div className="container">
        <RevealOnScroll>
          <div className="section-heading center services-pricing-heading">
            <p className="eyebrow">SERVICII</p>
            <h2 className="h2">Servicii și tarife</h2>
            <p className="lead">
              Fiecare persoană are nevoi și obiective diferite. De aceea, îți
              ofer servicii personalizate, bazate pe știință și adaptate
              stilului tău de viață, pentru rezultate reale și sustenabile.
            </p>
          </div>
        </RevealOnScroll>

        <div className="compact-services-stack">
          <RevealOnScroll>
            <CompactServiceCard service={featuredService} />
          </RevealOnScroll>

          <div className="compact-services-grid">
            {secondaryServices.map((service, index) => (
              <RevealOnScroll delay={(index + 1) * 50} key={service.id}>
                <CompactServiceCard service={service} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
