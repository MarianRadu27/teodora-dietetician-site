import Link from "next/link";

import { servicesHero } from "../../../config/nutritionServices";
import { RevealOnScroll } from "../RevealOnScroll";

export function ServicesHero() {
  return (
    <section className="section services-hero">
      <div className="container">
        <RevealOnScroll>
          <div className="services-hero-copy">
            <h1 className="h1">{servicesHero.title}</h1>
            <p className="lead">{servicesHero.intro}</p>
            <p className="services-info-note">{servicesHero.minorNotice}</p>
            <div className="button-row">
              <Link
                className="button button-primary"
                href="/programare?serviciu=consultatie-initiala"
              >
                Programează consultația inițială
              </Link>
              <Link className="button button-secondary" href="#traseu">
                Descoperă cum decurge colaborarea
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
