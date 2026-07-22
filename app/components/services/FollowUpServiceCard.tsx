import Link from "next/link";

import {
  formatServiceDuration,
  formatServicePrice,
  type NutritionService,
} from "../../../config/nutritionServices";
import { ServicesAccordion } from "./ServicesAccordion";

type FollowUpServiceCardProps = {
  association: string;
  ctaLabel: string;
  featureLabel: string;
  recommendation: string;
  service: NutritionService;
};

export function FollowUpServiceCard({
  association,
  ctaLabel,
  featureLabel,
  recommendation,
  service,
}: FollowUpServiceCardProps) {
  return (
    <article className="soft-card follow-up-card services-anchor" id={service.detailsAnchor}>
      <p className="services-path-tag">{association}</p>
      <h3 className="h3">{service.title}</h3>
      <dl className="services-meta-list">
        <div>
          <dt>Frecvență</dt>
          <dd>{recommendation}</dd>
        </div>
        <div>
          <dt>Durată</dt>
          <dd>{formatServiceDuration(service.durationMinutes)}</dd>
        </div>
        <div>
          <dt>Preț</dt>
          <dd>{formatServicePrice(service.priceLei)}</dd>
        </div>
      </dl>
      <ServicesAccordion buttonLabel={featureLabel}>
        <ul className="services-check-list">
          {service.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </ServicesAccordion>
      <p className="services-client-note">
        {service.id === "monitorizare-plan"
          ? "Pentru pacienții care au parcurs consultația inițială"
          : "Pentru persoanele care au parcurs evaluarea inițială"}
      </p>
      <Link
        className="button button-primary"
        href={service.bookingQuery ?? "/programare"}
      >
        {ctaLabel}
      </Link>
    </article>
  );
}
