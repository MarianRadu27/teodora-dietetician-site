import Link from "next/link";
import Image from "next/image";

import { FAQAccordion } from "./components/FAQAccordion";
import { RevealOnScroll } from "./components/RevealOnScroll";
import {
  brand,
  credentials,
  faqItems,
  patientNeeds,
  principles,
  processSteps,
  services,
} from "./siteContent";

const SHOW_TESTIMONIALS = false;

export default function HomePage() {
  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <h1 className="h1 hero-title">
            <span>Nutriție personalizată,</span>
            <span>fără diete extreme.</span>
          </h1>

          <div className="hero-copy">
            <p className="lead">
              Cu răbdare și explicații clare, construim împreună un plan
              realist ușor de integrat în viața de zi cu zi. Nu cred în
              perfecțiune sau restricții inutile, ci în progres, consecvență și
              alegeri potrivite în funcție de obiectivele, nevoile și stilul de
              viață al fiecărui pacient
            </p>
            <div className="button-row">
              <Link className="button button-primary" href={brand.bookingUrl}>
                Programează o consultație
              </Link>
              <Link className="button button-secondary" href="/#modul-de-lucru">
                Cum putem lucra împreună?
              </Link>
            </div>
          </div>

          <div className="hero-photo-wrap">
            <Image
              alt="Teodora Pălii, nutriționist-dietetician autorizat"
              className="hero-photo"
              height={1200}
              priority
              src={brand.heroImage}
              width={900}
            />
          </div>
        </div>
      </section>

      <section className="credibility-strip home-credentials-strip section-tight">
        <div className="container credibility-grid">
          {credentials.map((item, index) => (
            <RevealOnScroll delay={index * 70} key={item}>
              <div className="credential-item">
                <span aria-hidden="true" className="credential-dot" />
                <strong>{item}</strong>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <RevealOnScroll>
            <div className="section-heading needs-heading">
              <p className="eyebrow">CUM TE POT SPRIJINI</p>
              <h2 className="h2">
                Te regăsești în una dintre aceste situații?
              </h2>
            </div>
          </RevealOnScroll>

          <div className="card-grid grid-3 needs-grid">
            {patientNeeds.map((item, index) => (
              <RevealOnScroll delay={index * 70} key={item}>
                <article className="soft-card need-card">
                  <span aria-hidden="true" className="credential-dot" />
                  <p className="body-text">{item}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="servicii">
        <div className="container">
          <RevealOnScroll>
            <div className="section-heading home-services-heading">
              <p className="eyebrow">SERVICII</p>
              <h2 className="h2">Sprijin nutrițional adaptat nevoilor tale</h2>
              <p className="lead">
                Colaborarea începe cu o consultație inițială, în urma căreia
                alegem împreună modalitatea de lucru potrivită obiectivelor,
                stării tale de sănătate și stilului tău de viață.
              </p>
            </div>
          </RevealOnScroll>

          <div className="card-grid grid-3 home-services-grid">
            {services.map((service, index) => (
              <RevealOnScroll delay={index * 80} key={service.slug}>
                <Link
                  className={`soft-card service-card home-service-card ${
                    service.featured ? "home-service-card-featured" : ""
                  }`.trim()}
                  href={service.href}
                >
                  <p className="eyebrow service-card-label">{service.label}</p>
                  <h3 className="h3">{service.title}</h3>
                  <p className="body-text">{service.description}</p>
                </Link>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={320}>
            <div className="home-services-actions">
              <Link className="button button-primary" href="/servicii">
                Vezi toate serviciile și tarifele
              </Link>
              <p>
                Detalii complete despre fiecare serviciu, prețuri și modalități
                de colaborare.
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section" id="modul-de-lucru">
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

      <section className="section">
        <div className="container">
          <RevealOnScroll>
            <div className="section-heading center">
              <p className="eyebrow">Modul meu de lucru</p>
              <h2 className="h2">Principiile care stau la baza colaborării</h2>
            </div>
          </RevealOnScroll>

          <div className="card-grid grid-4">
            {principles.map((item, index) => (
              <RevealOnScroll delay={index * 70} key={item.title}>
                <article className="principle-card">
                  <h3 className="h3">{item.title}</h3>
                  <p className="body-text" style={{ marginTop: 10 }}>
                    {item.text}
                  </p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-band" id="despre">
        <div className="container about-grid">
          <RevealOnScroll>
            <img
              alt="Teodora Pălii"
              className="about-photo"
              height={1200}
              src={brand.aboutImage}
              width={900}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={90}>
            <div className="section-heading" style={{ marginBottom: 0 }}>
              <p className="eyebrow">Despre Teodora</p>
              <h2 className="h2">Bună, sunt Teodora.</h2>
              <p className="lead">
                Sunt nutriționist-dietetician autorizat, cu studii de licență și
                master în Nutriție și Dietetică, absolvite în cadrul
                Universității de Medicină și Farmacie din Iași.
              </p>
              <p className="body-text">
                Pentru mine, nutriția nu înseamnă reguli rigide sau liste
                interminabile de alimente interzise. Înseamnă să înțelegem
                nevoile fiecărei persoane și să construim soluții care pot fi
                aplicate în viața reală.
              </p>
              <Link className="button button-secondary" href="/despre">
                Află mai multe despre Teodora
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      {SHOW_TESTIMONIALS && (
        <section className="section">
          <div className="container">
            <div className="section-heading center">
              <p className="eyebrow">Testimoniale</p>
              <h2 className="h2">
                Experiențele persoanelor cu care am lucrat
              </h2>
            </div>
          </div>
        </section>
      )}

      <section className="section" id="faq">
        <div className="container">
          <RevealOnScroll>
            <div className="section-heading center">
              <p className="eyebrow">Întrebări frecvente</p>
              <h2 className="h2">Răspunsuri pentru prima discuție</h2>
            </div>
          </RevealOnScroll>
          <RevealOnScroll>
            <FAQAccordion items={faqItems} />
          </RevealOnScroll>
        </div>
      </section>

      <section className="section final-cta" id="contact">
        <div className="container">
          <div className="section-heading center" style={{ marginBottom: 24 }}>
            <h2 className="h2">
              Ești pregătit să construiești o alimentație potrivită pentru tine?
            </h2>
            <p className="lead">
              Primul pas este o consultație în care discutăm despre obiectivele
              și nevoile tale.
            </p>
          </div>
          <div className="button-row" style={{ justifyContent: "center" }}>
            <Link className="button button-secondary" href={brand.bookingUrl}>
              Programează consultația inițială
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
