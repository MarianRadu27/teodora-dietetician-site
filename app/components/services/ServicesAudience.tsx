import Link from "next/link";

import {
  servicesAudienceGroups,
  servicesExclusions,
} from "../../../config/nutritionServices";
import { RevealOnScroll } from "../RevealOnScroll";

export function ServicesAudience() {
  return (
    <section className="section about-band services-audience-section">
      <div className="container">
        <RevealOnScroll>
          <div className="section-heading services-audience-heading">
            <p className="lead">
              Serviciile sunt gândite pentru persoane aflate în etape diferite,
              cu obiective și nevoi nutriționale variate.
            </p>
          </div>
        </RevealOnScroll>

        <div className="services-audience-grid">
          {servicesAudienceGroups.audiences.map((item, index) => (
            <div
              className="services-audience-slot"
              key={item.title}
              style={{ gridColumn: 1, gridRow: index + 1 }}
            >
              <RevealOnScroll delay={index * 50}>
                <article className="services-audience-card">
                  <h3 className="h3">{item.title}</h3>
                  <p className="services-audience-description">
                    <span
                      aria-hidden="true"
                      className="services-audience-line"
                    />
                    <span>{item.description}</span>
                  </p>
                </article>
              </RevealOnScroll>
            </div>
          ))}

          {servicesAudienceGroups.goals.map((item, index) => (
            <div
              className="services-audience-slot"
              key={item.title}
              style={{ gridColumn: 2, gridRow: index + 1 }}
            >
              <RevealOnScroll delay={(index + 4) * 50}>
                <article className="services-audience-card">
                  <h3 className="h3">{item.title}</h3>
                  <p className="services-audience-description">
                    <span
                      aria-hidden="true"
                      className="services-audience-line"
                    />
                    <span>{item.description}</span>
                  </p>
                </article>
              </RevealOnScroll>
            </div>
          ))}
        </div>

        <RevealOnScroll>
          <div className="services-note-stack">
            <p className="services-exclusion-note">
              <span aria-hidden="true" className="services-note-line" />
              <span>{servicesExclusions}</span>
            </p>
            <Link
              className="button button-primary services-audience-secondary-cta"
              href="#traseu"
            >
              Descoperă cum decurge colaborarea
            </Link>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
