import Link from "next/link";

import { SocialIcon } from "../components/SocialIcon";
import { brand } from "../siteContent";

export const metadata = {
  title: "Contact | Teodora Pălii Dietetician",
  description:
    "Contact Teodora Pălii, nutriționist-dietetician autorizat în Iași și online.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Contact</p>
            <h1 className="h1">Hai să stabilim primul pas</h1>
            <p className="lead">
              Programarea online este metoda principală de contact. Pentru
              întrebări rapide, poți folosi WhatsApp sau e-mail.
            </p>
          </div>

          <div className="contact-grid">
            <article className="soft-card">
              <h2 className="h3">Programare</h2>
              <p className="body-text" style={{ marginTop: 12 }}>
                Alege ziua și ora disponibile.
              </p>
              <Link
                className="button button-primary"
                href="/programare"
                style={{ marginTop: 18 }}
              >
                Programează-te
              </Link>
            </article>

            <article className="soft-card">
              <h2 className="h3">Date de contact</h2>
              <div className="contact-link-list" style={{ marginTop: 16 }}>
                <a href={`mailto:${brand.email}`}>{brand.email}</a>
                <a href="tel:+40778186580">{brand.phoneDisplay}</a>
                <span>{brand.location}</span>
              </div>
              <div className="social-links" aria-label="Rețele sociale">
                <a
                  aria-label="Deschide WhatsApp pentru Teodora Pălii"
                  className="social-link social-link-light"
                  href={brand.whatsappUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <SocialIcon name="whatsapp" />
                </a>
                <a
                  aria-label="Deschide pagina de Instagram Dietetician Teodora"
                  className="social-link social-link-light"
                  href={brand.instagramUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <SocialIcon name="instagram" />
                </a>
                <a
                  aria-label="Deschide pagina de Facebook Dietetician Teodora"
                  className="social-link social-link-light"
                  href={brand.facebookUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <SocialIcon name="facebook" />
                </a>
              </div>
            </article>
          </div>
        </div>
      </section>
    </main>
  );
}
