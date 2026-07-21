import Link from "next/link";

import { brand, services } from "../siteContent";

export const metadata = {
  title: "Programare consultație nutriție | Teodora Pălii",
  description:
    "Programează o consultație nutrițională cu Teodora Pălii, în Iași sau online, prin Cal.com.",
};

export default function BookingPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Programare online</p>
            <h1 className="h1">Programează o consultație</h1>
            <p className="lead">
              Alege intervalul potrivit direct în calendar. Confirmarea ajunge pe
              e-mail, iar WhatsApp rămâne disponibil pentru întrebări rapide.
            </p>
          </div>

          <div className="booking-layout">
            <aside className="soft-card booking-help">
              <h2 className="h3">Tipuri de consultații</h2>
              <div className="footer-link-list" style={{ marginTop: 16 }}>
                {services.map((service) => (
                  <span key={service.slug}>{service.title}</span>
                ))}
                <span>Consultație online</span>
                <span>Consultație în cabinet</span>
              </div>
              <p className="body-text" style={{ marginTop: 18 }}>
                În formularul public se solicită doar date de contact și
                obiectivul principal al consultației, nu informații medicale
                detaliate.
              </p>
              <a className="button button-secondary" href={brand.calComUrl}>
                Deschide Cal.com într-un tab nou
              </a>
            </aside>

            <div className="booking-frame-wrap">
              <iframe
                className="booking-frame"
                src={`${brand.calComUrl}?embed=true`}
                title="Programare consultație Teodora Pălii prin Cal.com"
              />
            </div>
          </div>

          <p className="body-text" style={{ marginTop: 24, textAlign: "center" }}>
            Dacă pagina de programare nu se încarcă, poți folosi direct{" "}
            <a href={brand.calComUrl}>linkul Cal.com</a> sau pagina de{" "}
            <Link href="/contact">contact</Link>.
          </p>
        </div>
      </section>
    </main>
  );
}
