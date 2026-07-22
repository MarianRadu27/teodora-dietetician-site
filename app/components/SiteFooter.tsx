import Link from "next/link";

import { CookieSettingsButton } from "./cookies/CookieSettingsButton";
import { SocialIcon } from "./SocialIcon";
import { brand } from "../siteContent";
import {
  getOfficeLocationAddress,
  hasOfficeLocationMapUrl,
  officeLocation,
} from "../../config/officeLocation";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <h2 className="h3" style={{ color: "#ffffff", marginBottom: 10 }}>
            {brand.name}
          </h2>
          <p className="body-text" style={{ color: "rgba(255,255,255,0.78)" }}>
            {brand.role}
          </p>
          <p
            className="body-text"
            style={{ color: "rgba(255,255,255,0.78)", marginTop: 8 }}
          >
            {brand.location}
          </p>
          <div className="footer-location">
            <h3>Locația consultațiilor fizice</h3>
            <p>
              <strong>{officeLocation.name}</strong>
              <br />
              {getOfficeLocationAddress()}
            </p>
            {hasOfficeLocationMapUrl() ? (
              <a
                href={officeLocation.mapUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                Vezi pe hartă
              </a>
            ) : null}
          </div>
        </div>

        <div>
          <h3 className="h3" style={{ color: "#ffffff", fontSize: "1rem" }}>
            Contact
          </h3>
          <div className="footer-link-list" style={{ marginTop: 14 }}>
            <a href={`mailto:${brand.email}`}>{brand.email}</a>
            <a href="tel:+40778186580">{brand.phoneDisplay}</a>
          </div>
          <div className="social-links" aria-label="Rețele sociale">
            <a
              aria-label="Deschide WhatsApp pentru Teodora Pălii"
              className="social-link"
              href={brand.whatsappUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <SocialIcon name="whatsapp" />
            </a>
            <a
              aria-label="Deschide pagina de Instagram Dietetician Teodora"
              className="social-link"
              href={brand.instagramUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <SocialIcon name="instagram" />
            </a>
            <a
              aria-label="Deschide pagina de Facebook Dietetician Teodora"
              className="social-link"
              href={brand.facebookUrl}
              rel="noopener noreferrer"
              target="_blank"
            >
              <SocialIcon name="facebook" />
            </a>
          </div>
        </div>

        <div>
          <h3 className="h3" style={{ color: "#ffffff", fontSize: "1rem" }}>
            Navigare
          </h3>
          <div className="footer-link-list" style={{ marginTop: 14 }}>
            <Link href="/despre">Despre mine</Link>
            <Link href="/servicii">Servicii</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">Întrebări frecvente</Link>
          </div>
        </div>

        <div>
          <h3 className="h3" style={{ color: "#ffffff", fontSize: "1rem" }}>
            Legal
          </h3>
          <div className="footer-link-list" style={{ marginTop: 14 }}>
            <Link href="/politica-de-confidentialitate">
              Politica de confidențialitate
            </Link>
            <Link href="/politica-de-cookies">Politica de cookies</Link>
            <Link href="/termeni-si-conditii">Termeni și condiții</Link>
            <CookieSettingsButton />
          </div>
        </div>
      </div>
    </footer>
  );
}
