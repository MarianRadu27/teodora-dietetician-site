import Link from "next/link";
import Image from "next/image";

import { RevealOnScroll } from "../components/RevealOnScroll";
import { brand, credentials, principles } from "../siteContent";
import { aboutIntro, aboutSections } from "../../content/about";

export const metadata = {
  title: "Despre Teodora Pălii | Nutriționist-Dietetician",
  description:
    "Află mai multe despre Teodora Pălii, nutriționist-dietetician autorizat în Iași și online.",
};

export default function AboutPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <RevealOnScroll>
            <article className="about-story">
              <p className="eyebrow">Despre mine</p>
              <h1 className="h1 about-title">Bună, sunt Teodora Pălii.</h1>
              <div className="about-float-media">
                <Image
                  alt="Teodora Pălii"
                  className="about-photo"
                  height={1200}
                  src={brand.aboutImage}
                  width={900}
                />
              </div>
              {aboutIntro.map((paragraph) => (
                <p className="lead" key={paragraph}>
                  {paragraph}
                </p>
              ))}
              <div className="about-copy-sections">
                {aboutSections.map((section) => (
                  <section className="about-copy-section" key={section.title}>
                    <h2 className="h3">{section.title}</h2>
                    {section.paragraphs.map((paragraph) => (
                      <p className="body-text" key={paragraph}>
                        {paragraph}
                      </p>
                    ))}
                  </section>
                ))}
              </div>
              <Link className="button button-primary" href={brand.bookingUrl}>
                Programează o consultație
              </Link>
            </article>
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
