import {
  servicesAudience,
  servicesExclusions,
  servicesHero,
} from "../../../config/nutritionServices";
import { RevealOnScroll } from "../RevealOnScroll";

export function ServicesAudience() {
  return (
    <section className="section about-band services-audience-section">
      <div className="container">
        <RevealOnScroll>
          <div className="services-section-heading-row">
            <div>
            <p className="eyebrow">Cui se adresează</p>
              <h2 className="h2">Cui se adresează serviciile?</h2>
            </div>
            <p className="lead">
              Serviciile sunt gândite pentru persoane aflate în etape diferite,
              cu obiective și nevoi nutriționale variate.
            </p>
          </div>
        </RevealOnScroll>

        <div className="audience-grid">
          {servicesAudience.map((item, index) => (
            <RevealOnScroll delay={index * 40} key={item.title}>
              <article className="soft-card audience-card">
                <span className="credential-dot" aria-hidden="true" />
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </div>
              </article>
            </RevealOnScroll>
          ))}
        </div>

        <RevealOnScroll>
          <div className="services-note-stack">
            <p className="services-info-note">{servicesHero.minorNotice}</p>
            <p className="services-exclusion-note">{servicesExclusions}</p>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
