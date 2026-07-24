import Link from "next/link";
import Image from "next/image";

import { RevealOnScroll } from "../components/RevealOnScroll";
import { brand } from "../siteContent";
import { aboutIntro, aboutSections } from "../../content/about";

const consultationSectionTitle = "Cum lucrez în consultații";

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
                {aboutSections.map((section) => {
                  const isConsultationSection =
                    section.title === consultationSectionTitle;

                  return (
                    <section
                      className={`about-copy-section ${
                        isConsultationSection
                          ? "about-consultation-section"
                          : ""
                      }`.trim()}
                      key={section.title}
                    >
                      {isConsultationSection ? (
                        <div className="about-consultation-grid">
                          <Image
                            alt="Teodora Pălii în cabinet"
                            className="about-consultation-photo"
                            height={1200}
                            src={brand.aboutImage1}
                            width={900}
                          />
                          <div className="about-consultation-copy">
                            <h2 className="h3">{section.title}</h2>
                            {section.paragraphs.map((paragraph) => (
                              <p className="body-text" key={paragraph}>
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      ) : (
                        <>
                          <h2 className="h3">{section.title}</h2>
                          {section.paragraphs.map((paragraph) => (
                            <p className="body-text" key={paragraph}>
                              {paragraph}
                            </p>
                          ))}
                        </>
                      )}
                    </section>
                  );
                })}
              </div>
              <Link className="button button-primary" href={brand.bookingUrl}>
                Programează o consultație
              </Link>
            </article>
          </RevealOnScroll>
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
