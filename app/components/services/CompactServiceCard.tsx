import Link from "next/link";

import {
  getServiceDurationLabel,
  getServicePriceLabel,
  nutritionPlanOptions,
  type NutritionService,
} from "../../../config/nutritionServices";

type CompactServiceCardProps = {
  highlight?: boolean;
  service: NutritionService;
};

function getDetailsHref(service: NutritionService) {
  return `/servicii#${service.detailsAnchor}`;
}

function getBookingLabel(service: NutritionService) {
  if (!service.bookingEnabled) {
    return null;
  }

  return "Programează-te";
}

export function CompactServiceCard({
  highlight = false,
  service,
}: CompactServiceCardProps) {
  const bookingLabel = getBookingLabel(service);
  const isPlan = service.id === "plan-nutritional-personalizat";

  return (
    <article
      className={`soft-card compact-service-card ${
        highlight ? "compact-service-card-highlight" : ""
      }`.trim()}
    >
      <div>
        {highlight ? <p className="services-path-tag">Punct de pornire</p> : null}
        <h3 className="h3">{service.title}</h3>
      </div>

      {isPlan ? (
        <ul className="compact-plan-list">
          {nutritionPlanOptions.map((option) => (
            <li key={option.id}>
              {option.durationMonths} {option.durationMonths === 1 ? "lună" : "luni"} –{" "}
              {option.priceLei.toLocaleString("ro-RO")} de lei
            </li>
          ))}
        </ul>
      ) : (
        <dl className="compact-service-meta">
          <div>
            <dt>Durată</dt>
            <dd>{getServiceDurationLabel(service)}</dd>
          </div>
          <div>
            <dt>Preț</dt>
            <dd>{getServicePriceLabel(service)}</dd>
          </div>
        </dl>
      )}

      <div className="compact-service-notes">
        {service.modalityLabel ? <p>{service.modalityLabel}</p> : null}
        {service.audienceLabel ? <p>{service.audienceLabel}</p> : null}
      </div>

      <div className="compact-service-actions">
        {bookingLabel && service.bookingQuery ? (
          <Link className="button button-primary" href={service.bookingQuery}>
            {bookingLabel}
          </Link>
        ) : null}
        {isPlan ? (
          <Link
            className="button button-secondary"
            href="/programare?serviciu=consultatie-initiala"
          >
            Începe cu consultația inițială
          </Link>
        ) : null}
        <Link className="compact-details-link" href={getDetailsHref(service)}>
          {isPlan ? "Vezi variantele planului" : "Vezi detalii"}
        </Link>
      </div>
    </article>
  );
}
