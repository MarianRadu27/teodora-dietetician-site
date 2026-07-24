import Link from "next/link";
import Image from "next/image";

import { RevealOnScroll } from "./components/RevealOnScroll";
import {
  brand,
  credentials,
  faqCategories,
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
            <div className="section-heading working-method-heading">
              <p className="eyebrow">MODUL DE LUCRU</p>
              <h2 className="h2">
                Un mod de lucru clar, construit în jurul nevoilor tale
              </h2>
              <p className="lead">
                Colaborarea noastră începe cu o evaluare atentă, continuă cu
                recomandări adaptate ție și se dezvoltă treptat, prin pași
                realiști și susținere pe parcurs.
              </p>
            </div>
          </RevealOnScroll>

          <div className="process-grid work-steps-grid">
            {processSteps.map((step, index) => (
              <RevealOnScroll delay={index * 90} key={step.title}>
                <article className="soft-card work-step-card">
                  <div className="work-step-header">
                    <span className="process-step-number">{index + 1}</span>
                    <h3 className="h3">{step.title}</h3>
                  </div>
                  <p className="body-text">{step.text}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>

          <RevealOnScroll delay={290}>
            <p className="body-text work-transition">
              Fiecare etapă a colaborării este ghidată de câteva principii
              simple, menite să facă recomandările{" "}
              <strong>mai clare, mai realiste și mai ușor de aplicat</strong>.
            </p>
          </RevealOnScroll>

          <div className="card-grid grid-4 principles-grid">
            {principles.map((item, index) => (
              <RevealOnScroll delay={index * 70} key={item.title}>
                <article className="soft-card principle-card work-principle-card">
                  <h3 className="h3">{item.title}</h3>
                  <p className="body-text">{item.text}</p>
                </article>
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>

      <section className="section about-band" id="despre">
        <div className="container about-grid">
          <RevealOnScroll className="home-about-heading-item">
            <div className="section-heading home-about-heading">
              <p className="eyebrow">
                Cunoaște specialistul din spatele recomandărilor
              </p>
              <h2 className="h2">Bună, sunt Teodora Pălii.</h2>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="home-about-media" delay={70}>
            <img
              alt="Teodora Pălii, nutriționist-dietetician autorizat"
              className="about-photo home-about-photo"
              height={1200}
              src={brand.aboutImage}
              width={900}
            />
          </RevealOnScroll>

          <RevealOnScroll className="home-about-copy" delay={120}>
            <div className="home-about-copy-stack">
              <p className="body-text">
                Sunt <strong>nutriționist-dietetician autorizat</strong>,
                membră a Colegiului Dieteticienilor din România, cu studii de
                licență și master în nutriție și dietetică absolvite în cadrul
                Universității de Medicină și Farmacie ”Grigore T. Popa” din
                Iași.
              </p>
              <p className="body-text">
                În cadrul consultațiilor, îmi propun să înțeleg nu doar
                obiectivele tale, ci și programul zilnic, obiceiurile
                alimentare, preferințele și dificultățile pe care le întâmpini.
                Consider că recomandările sunt cu adevărat utile doar atunci
                când pot fi aplicate în viața reală.
              </p>
              <p className="body-text">
                Pun accent pe <strong>comunicare deschisă</strong>,{" "}
                <strong>explicații clare</strong> și{" "}
                <strong>recomandări realiste</strong>, adaptate stării tale de
                sănătate și stilului tău de viață. Scopul meu este să înțelegi
                schimbările propuse și să dobândești treptat încrederea necesară
                pentru a face alegeri alimentare potrivite pe termen lung.
              </p>
              <Link className="button button-secondary" href="/despre">
                Află mai multe despre mine
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
            <div className="section-heading home-faq-heading">
              <p className="eyebrow">Întrebări frecvente</p>
              <h2 className="h2">Întrebări firești, răspunsuri clare</h2>
              <p className="lead">
                Alege categoria care te interesează și găsește rapid
                informațiile de care ai nevoie despre consultații și colaborare.
              </p>
            </div>
          </RevealOnScroll>

          <div className="faq-category-grid">
            {faqCategories.map((category, index) => (
              <RevealOnScroll delay={index * 70} key={category.id}>
                <Link className="faq-category-card" href={category.href}>
                  <span>{category.title}</span>
                </Link>
              </RevealOnScroll>
            ))}
          </div>
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
