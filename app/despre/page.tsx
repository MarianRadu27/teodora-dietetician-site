import Link from "next/link";
import Image from "next/image";

import { RevealOnScroll } from "../components/RevealOnScroll";
import { brand, credentials, principles } from "../siteContent";

export const metadata = {
  title: "Despre Teodora Pălii | Nutriționist-Dietetician",
  description:
    "Află mai multe despre Teodora Pălii, nutriționist-dietetician autorizat în Iași și online.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="section">
        <div className="container about-grid">
          <RevealOnScroll>
            <Image
              alt="Teodora Pălii"
              className="about-photo"
              height={1200}
              src={brand.aboutImage}
              width={900}
            />
          </RevealOnScroll>
          <RevealOnScroll delay={90}>
            <div className="section-heading" style={{ marginBottom: 0 }}>
              <p className="eyebrow">Despre mine</p>
              <h1 className="h1">Bună, sunt Teodora.</h1>
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
              <Link className="button button-primary" href={brand.bookingUrl}>
                Programează o consultație
              </Link>
            </div>
          </RevealOnScroll>
        </div>
      </section>

      <section className="section about-band">
        <div className="container">
          <div className="card-grid grid-4">
            {credentials.map((item, index) => (
              <RevealOnScroll delay={index * 70} key={item}>
                <article className="soft-card">
                  <span aria-hidden="true" className="credential-dot" />
                  <p className="body-text" style={{ marginTop: 14 }}>
                    <strong>{item}</strong>
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
              <p className="eyebrow">Principii</p>
              <h2 className="h2">Cum abordez colaborarea</h2>
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

      <section className="section final-cta">
        <div className="container">
          <div className="section-heading center" style={{ marginBottom: 24 }}>
            <h2 className="h2">Vrei să discutăm despre obiectivele tale?</h2>
            <p className="lead">
              Primul pas este o conversație în care vedem ce ai nevoie și cum
              putem lucra împreună.
            </p>
          </div>
          <div className="button-row" style={{ justifyContent: "center" }}>
            <Link className="button button-secondary" href={brand.bookingUrl}>
              Programează o consultație
            </Link>
            <Link className="button button-secondary" href="/servicii">
              Vezi serviciile
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
