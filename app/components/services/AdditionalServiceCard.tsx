import Link from "next/link";

import {
  formatServiceDuration,
  formatServicePrice,
  getNutritionService,
} from "../../../config/nutritionServices";
import { RevealOnScroll } from "../RevealOnScroll";

const analysisService = getNutritionService("analiza-compozitie-corporala");

export function AdditionalServiceCard() {
  return (
    <section
      className="section section-tight services-additional-section services-anchor"
      id={analysisService.detailsAnchor}
    >
      <div className="container">
        <RevealOnScroll>
          <div className="services-section-heading-row">
            <div>
              <p className="eyebrow">Separat de traseul principal</p>
              <h2 className="h2">Servicii suplimentare</h2>
            </div>
            <p className="lead">
              Analiza compoziției corporale poate fi solicitată separat și este
              disponibilă numai în cabinet.
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <article className="soft-card additional-service-card">
            <div>
              <p className="services-path-tag">Disponibilă numai în cabinet</p>
              <h3 className="h3">{analysisService.title}</h3>
              <p className="body-text">{analysisService.description}</p>
            </div>
            <dl className="services-meta-list">
              <div>
                <dt>Durată</dt>
                <dd>{formatServiceDuration(analysisService.durationMinutes)}</dd>
              </div>
              <div>
                <dt>Preț</dt>
                <dd>{formatServicePrice(analysisService.priceLei)}</dd>
              </div>
              <div>
                <dt>Modalitate</dt>
                <dd>numai în cabinet</dd>
              </div>
            </dl>
            <p className="services-callout">
              Rezultatele sunt explicate în cadrul ședinței și pot fi utilizate
              pentru evaluarea inițială sau pentru urmărirea evoluției.
            </p>
            <Link
              className="button button-primary"
              href={analysisService.bookingQuery ?? "/programare"}
            >
              Programează analiza corporală
            </Link>
          </article>
        </RevealOnScroll>
      </div>
    </section>
  );
}
