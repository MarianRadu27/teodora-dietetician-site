"use client";

import Link from "next/link";
import { useState, type MouseEvent } from "react";

import type { ServicePricingCard } from "../../../config/nutritionServices";

type CompactServiceCardProps = {
  service: ServicePricingCard;
};

const stepperDetailTargets = new Set([
  "consultatie-initiala",
  "plan-nutritional-personalizat",
  "consiliere-educatie-nutritionala",
  "monitorizare-plan",
  "consiliere-nutritionala",
]);

export function CompactServiceCard({ service }: CompactServiceCardProps) {
  const [detailsOpen, setDetailsOpen] = useState(false);
  const inlineDetails = service.detailsAction.content ?? [];
  const hasInlineDetails = inlineDetails.length > 0;
  const detailsPanelId = `${service.id}-details`;
  const primaryButtonClass =
    service.primaryAction.variant === "secondary"
      ? "button button-secondary compact-service-button"
      : "button button-primary compact-service-button";

  const handleDetailsClick = (event: MouseEvent<HTMLAnchorElement>) => {
    const targetId = service.detailsAction.href?.split("#")[1];

    if (
      !targetId ||
      !stepperDetailTargets.has(targetId) ||
      window.location.pathname !== "/servicii"
    ) {
      return;
    }

    event.preventDefault();
    window.history.pushState(null, "", `/servicii#${targetId}`);
    window.dispatchEvent(
      new CustomEvent("services-detail-target", {
        detail: { targetId },
      }),
    );
  };

  return (
    <article
      className={`compact-service-card ${
        service.featured ? "compact-service-card-featured" : ""
      }`.trim()}
    >
      <div className="compact-service-copy">
        {service.badge ? (
          <p className="services-path-tag">{service.badge}</p>
        ) : null}
        <h3 className="h3">{service.title}</h3>
        <p className="compact-service-meta-line">{service.meta}</p>
        {service.note ? (
          <p className="compact-service-note">{service.note}</p>
        ) : null}
        <p className="compact-service-description">{service.description}</p>
      </div>

      <div className="compact-service-actions">
        <Link className={primaryButtonClass} href={service.primaryAction.href}>
          {service.primaryAction.label}
        </Link>
        {hasInlineDetails ? (
          <button
            aria-controls={detailsPanelId}
            aria-expanded={detailsOpen}
            className="button button-secondary compact-service-button"
            onClick={() => setDetailsOpen((isOpen) => !isOpen)}
            type="button"
          >
            {service.detailsAction.label}
          </button>
        ) : (
          <Link
            className="button button-secondary compact-service-button"
            href={service.detailsAction.href ?? "#"}
            onClick={handleDetailsClick}
          >
            {service.detailsAction.label}
          </Link>
        )}
      </div>

      {hasInlineDetails && detailsOpen ? (
        <div className="compact-service-inline-details" id={detailsPanelId}>
          {inlineDetails.map((detail) => (
            <p key={detail}>{detail}</p>
          ))}
        </div>
      ) : null}
    </article>
  );
}
