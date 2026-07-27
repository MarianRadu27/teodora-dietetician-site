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
            <div className="button-row">
              <Link
                className="button button-primary"
                href="/programare?serviciu=consultatie-initiala"
              >
                Programează consultația inițială
              </Link>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
