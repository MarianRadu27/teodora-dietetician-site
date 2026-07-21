import { RevealOnScroll } from "../components/RevealOnScroll";
import { brand, processSteps, services } from "../siteContent";
import Link from "next/link";

export const metadata = {
  title: "Servicii de nutriție | Teodora Pălii",
  description:
    "Consultație nutrițională inițială, monitorizare nutrițională și pachet nutrițional personalizat.",
};

export default function ServicesPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <RevealOnScroll>
            <div className="section-heading center">
              <p className="eyebrow">Servicii</p>
              <h1 className="h1">Cum putem lucra împreună</h1>
              <p className="lead">
                Alege forma de colaborare potrivită nevoilor și obiectivelor
                tale. Prețurile vor fi completate când pachetele sunt stabilite
                final.
              </p>
            </div>
          </RevealOnScroll>

          <div className="card-grid grid-3">
            {services.map((service, index) => (
              <RevealOnScroll delay={index * 80} key={service.slug}>
                <article className="soft-card service-card" id={service.slug}>
                  <h2 className="h3">{service.title}</h2>
                  <p className="body-text">{service.description}</p>
                  <p className="body-text">
                    Detaliile exacte despre durată, format și pașii de lucru se
                    stabilesc în funcție de obiective.
                  </p>
                  <Link className="button button-primary" href={brand.bookingUrl}>
                    Contactează pentru detalii
                  </Link>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-band">
        <div className="container">
          <RevealOnScroll>
            <div className="section-heading center">
              <p className="eyebrow">Proces</p>
              <h2 className="h2">
                Un proces clar, construit în jurul nevoilor tale
              </h2>
            </div>
          </RevealOnScroll>

          <div className="process-grid">
            {processSteps.map((step, index) => (
              <RevealOnScroll delay={index * 90} key={step.title}>
                <article className="soft-card">
                  <span className="process-step-number">{index + 1}</span>
                  <h3 className="h3" style={{ marginTop: 18 }}>
                    {step.title}
                  </h3>
                  <p className="body-text" style={{ marginTop: 10 }}>
                    {step.text}
                  </p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container">
          <div className="section-heading center" style={{ marginBottom: 24 }}>
            <h2 className="h2">Nu știi ce variantă ți se potrivește?</h2>
            <p className="lead">
              Trimite un mesaj și stabilim împreună direcția potrivită pentru
              tine.
            </p>
          </div>
          <div className="button-row" style={{ justifyContent: "center" }}>
            <Link className="button button-secondary" href={brand.bookingUrl}>
              Programează o consultație
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
