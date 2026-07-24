import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";

import { SocialIcon } from "../components/SocialIcon";
import { brand } from "../siteContent";
import {
  hasOfficeLocationMapUrl,
  isOfficeLocationValueComplete,
  officeLocation,
} from "../../config/officeLocation";

export const metadata: Metadata = {
  title: "Contact și consultații în Iași | Teodora Pălii",
  description:
    "Date de contact și locația consultațiilor nutriționale desfășurate în Iași, la DietON – Centrul de Dietetică și Nutriție.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  const optionalLocationDetails = [
    ["Etaj", officeLocation.floor],
    ["Cabinet", officeLocation.room],
    ["Acces", officeLocation.accessInstructions],
    ["Parcare", officeLocation.parkingInformation],
  ].filter(([, value]) => isOfficeLocationValueComplete(value));

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-heading contact-page-heading">
            <h1 className="h1">Hai să stabilim primul pas</h1>
            <p className="lead">
              Programarea online este metoda principală de contact. Pentru
              întrebări rapide, poți folosi WhatsApp sau e-mail.
            </p>
          </div>

          <div className="contact-grid">
            <div className="contact-card-stack">
              <article className="soft-card contact-info-card">
                <h2 className="h3">Date de contact</h2>
                <div className="contact-link-list" style={{ marginTop: 16 }}>
                  <a href={`mailto:${brand.email}`}>{brand.email}</a>
                  <a href="tel:+40778186580">{brand.phoneDisplay}</a>
                  <span>{brand.location}, numai pe bază de programare</span>
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

              <article className="soft-card contact-location-card">
                <h2 className="h3">Consultații în cabinet</h2>
                <p className="body-text" style={{ marginTop: 12 }}>
                  Consultațiile cu prezență fizică se desfășoară la:
                </p>
                <address className="office-address">
                  <strong>{officeLocation.name}</strong>
                  <span>{officeLocation.address}</span>
                  <span>{officeLocation.city}</span>
                </address>
                {optionalLocationDetails.length > 0 ? (
                  <dl className="office-detail-list">
                    {optionalLocationDetails.map(([label, value]) => (
                      <div key={label}>
                        <dt>{label}</dt>
                        <dd>{value}</dd>
                      </div>
                    ))}
                  </dl>
                ) : null}
                {hasOfficeLocationMapUrl() ? (
                  <a
                    className="button button-secondary"
                    href={officeLocation.mapUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    Deschide în Google Maps
                  </a>
                ) : null}
              </article>
            </div>

            <div className="contact-photo-card">
              <Image
                alt="Teodora Pălii"
                className="contact-photo"
                height={900}
                src={brand.contacImage}
                width={1600}
              />
            </div>
          </div>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container">
          <div className="section-heading center" style={{ marginBottom: 24 }}>
            <h2 className="h2">Vrei să stabilim primul pas?</h2>
            <p className="lead">Alege ziua și ora disponibile.</p>
          </div>
          <div className="button-row" style={{ justifyContent: "center" }}>
            <Link className="button button-secondary" href="/programare">
              Programează-te
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
