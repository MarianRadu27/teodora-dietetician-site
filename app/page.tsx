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
          <div className="hero-copy">
            <h1 className="h1">Nutriție personalizată, fără diete rigide</h1>
            <p className="lead">
              Te ajut să construiești o alimentație echilibrată și realistă,
              adaptată obiectivelor, stării tale de sănătate și stilului tău de
              viață.
            </p>
            <div className="button-row">
              <Link className="button button-primary" href={brand.bookingUrl}>
                Programează o consultație
              </Link>
              <Link className="button button-secondary" href="/#cum-lucram">
                Vezi cum putem lucra împreună
              </Link>
            </div>
            <p className="hero-meta">
              <span>{brand.role}</span>
              <span>{brand.location}</span>
            </p>
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
            <div className="approach-note">
              <p className="eyebrow">La ce să te aștepți</p>
              <h2 className="h3">Recommandări clare, adaptate vieții tale.</h2>
              <p className="body-text" style={{ marginTop: 8 }}>
                Stabilim pași realiști, explicăm motivele din spatele recomandărilor și ajustăm planul pe parcurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="credibility-strip section-tight">
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
            <div className="section-heading center">
              <p className="eyebrow">Nevoi și obiective</p>
              <h2 className="h2">Te pot ajuta dacă…</h2>
            </div>
          </RevealOnScroll>

          <div className="card-grid grid-3">
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
            <div className="section-heading">
              <p className="eyebrow">Servicii</p>
              <h2 className="h2">Cum putem lucra împreună</h2>
              <p className="lead">
                Alege forma de colaborare potrivită nevoilor și obiectivelor
                tale.
              </p>
            </div>
          </RevealOnScroll>

          <div className="card-grid grid-3">
            {services.map((service, index) => (
              <RevealOnScroll delay={index * 80} key={service.slug}>
                <article className="soft-card service-card">
                  <h3 className="h3">{service.title}</h3>
                  <p className="body-text">{service.description}</p>
                  <Link
                    className="button button-secondary"
                    href={`/servicii#${service.slug}`}
                  >
                    {service.buttonLabel}
                  </Link>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="cum-lucram">
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
