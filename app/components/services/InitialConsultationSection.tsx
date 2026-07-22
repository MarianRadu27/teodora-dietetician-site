import Link from "next/link";

import {
  formatServiceDuration,
  formatServicePrice,
  getNutritionService,
  initialConsultationModeNotes,
} from "../../../config/nutritionServices";
import { RevealOnScroll } from "../RevealOnScroll";
import { ServicesAccordion } from "./ServicesAccordion";

const consultation = getNutritionService("consultatie-initiala");

export function InitialConsultationSection() {
  return (
    <section
      aria-labelledby="consultatie-initiala-title"
      className="section services-anchor"
      id="consultatie-initiala"
    >
      <div className="container">
        <RevealOnScroll>
          <article className="soft-card services-main-card">
            <div className="services-section-grid">
              <div>
                <p className="eyebrow">Pasul 1</p>
                <h2 className="h2" id="consultatie-initiala-title">
                  {consultation.title}
                </h2>
                <div className="services-badge-row">
                  <span className="services-badge">
                    Durată: {formatServiceDuration(consultation.durationMinutes)}
                  </span>
                  <span className="services-badge">
                    Preț: {formatServicePrice(consultation.priceLei)}
                  </span>
                </div>
                <p className="body-text">{consultation.description}</p>
              </div>

              <div className="services-card-stack">
                <div className="services-callout">
                  Planul nutrițional personalizat nu este inclus în prețul
                  consultației inițiale și poate fi solicitat separat.
                </div>
              </div>
            </div>

            <div className="services-feature-preview">
              <ServicesAccordion buttonLabel="Ce include consultația?">
                <ul className="services-check-list">
                  {consultation.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </ServicesAccordion>
            </div>

            <div className="services-mode-note-grid">
              <Link
                className="services-mode-link-card"
                href="/programare?modalitate=cabinet&serviciu=consultatie-initiala"
              >
                <h3 className="h3">Consultație în cabinet</h3>
                <p className="body-text">{initialConsultationModeNotes.office}</p>
                <span>Programează consultația în cabinet</span>
              </Link>
              <Link
                className="services-mode-link-card"
                href="/programare?modalitate=online&serviciu=consultatie-initiala"
              >
                <h3 className="h3">Consultație online</h3>
                <p className="body-text">{initialConsultationModeNotes.online}</p>
                <span>Programează consultația online</span>
              </Link>
            </div>
          </article>
        </RevealOnScroll>
      </div>
    </section>
  );
}
