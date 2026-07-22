import Link from "next/link";

import type { CollaborationPath } from "../../../config/nutritionServices";
import { NutritionPlanOptions } from "./NutritionPlanOptions";
import { ServicesAccordion } from "./ServicesAccordion";

type CollaborationPathCardProps = {
  path: CollaborationPath;
};

export function CollaborationPathCard({ path }: CollaborationPathCardProps) {
  const isPlanPath = path.id === "plan-personalizat";

  return (
    <article
      className="soft-card collaboration-path-card services-anchor"
      id={path.detailsAnchor}
    >
      <div>
        <p className="services-path-tag">{path.orientationLabel}</p>
        <h3 className="h3">{path.title}</h3>
        <p className="body-text">{path.summary}</p>
      </div>

      <ServicesAccordion buttonLabel="Cui i se potrivește această variantă?">
        <ul className="services-check-list">
          {path.suitability.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </ServicesAccordion>

      {isPlanPath ? (
        <ServicesAccordion buttonLabel="Vezi variantele planului">
          <NutritionPlanOptions />
        </ServicesAccordion>
      ) : null}

      <p className="body-text">{path.explanation}</p>
      <Link className="button button-secondary" href={path.bookingQuery}>
        {path.ctaLabel}
      </Link>
    </article>
  );
}
