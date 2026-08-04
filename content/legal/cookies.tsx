import type { LegalTocItem } from "../../app/components/legal/LegalTableOfContents";
import { cookieInventory } from "../../config/legal";

export const cookiesTocItems: LegalTocItem[] = [
  { id: "ce-sunt-cookies", title: "Ce sunt cookies" },
  { id: "tehnologii", title: "Ce tehnologii utilizează website-ul" },
  { id: "categorii", title: "Categorii de cookies" },
  { id: "turnstile", title: "Cloudflare Turnstile" },
  { id: "lista-cookies", title: "Lista cookies utilizate" },
  { id: "preferinte", title: "Alegerea și modificarea preferințelor" },
  { id: "browser", title: "Setările browserului" },
  { id: "actualizare", title: "Actualizarea politicii" },
];

export function CookiesContent() {
  return (
    <>
      <section className="legal-section" id="ce-sunt-cookies">
        <h2>Ce sunt cookies</h2>
        <p>
          Cookies sunt fișiere de mici dimensiuni sau tehnologii similare care
          pot fi stocate sau accesate pe dispozitivul utilizatorului atunci când
          acesta vizitează un website.
        </p>
        <p>
          Acestea pot fi utilizate pentru funcționarea tehnică a website-ului,
          memorarea preferințelor, securitate, analiză sau marketing.
        </p>
      </section>

      <section className="legal-section" id="tehnologii">
        <h2>Ce tehnologii utilizează website-ul</h2>
        <p>
          Website-ul utilizează Google Analytics 4 pentru statistici generale
          privind utilizarea paginilor. Google Analytics este încărcat numai
          după ce utilizatorul acceptă categoria de analiză.
        </p>
        <p>Website-ul utilizează sau poate utiliza tehnologii necesare pentru:</p>
        <ul>
          <li>funcționarea, livrarea și securitatea website-ului;</li>
          <li>protecția și performanța oferite de platforma de găzduire;</li>
          <li>memorarea opțiunii privind Google Analytics;</li>
          <li>
            verificarea anti-spam a formularului de programare prin Cloudflare
            Turnstile.
          </li>
        </ul>
        <p>
          Funcțiile Google destinate publicității, personalizării reclamelor și
          Google Signals sunt dezactivate în implementarea website-ului.
        </p>
      </section>

      <section className="legal-section" id="categorii">
        <h2>Categorii de cookies</h2>
        <h3>Cookies strict necesare</h3>
        <p>
          Acestea sunt necesare pentru funcționarea website-ului, securitate sau
          furnizarea unei funcții solicitate de utilizator.
        </p>
        <p>
          În mod obișnuit, nu pot fi dezactivate din panoul website-ului, dar pot
          fi blocate din browser. Blocarea lor poate afecta funcționarea anumitor
          componente.
        </p>

        <h3>Cookies de preferințe</h3>
        <p>
          Acestea pot memora alegeri precum preferințele privind cookies sau
          anumite setări ale interfeței.
        </p>

        <h3>Cookies de analiză</h3>
        <p>
          Acestea ajută la înțelegerea modului în care este utilizat website-ul.
        </p>
        <p>
          Website-ul folosește Google Analytics 4 numai după acordul
          utilizatorului. Dacă utilizatorul refuză, eticheta Google Analytics nu
          este încărcată și nu transmite date către Google.
        </p>

        <h3>Cookies de marketing</h3>
        <p>
          Acestea pot fi utilizate pentru publicitate, măsurarea campaniilor sau
          urmărirea utilizatorului pe mai multe website-uri.
        </p>
        <p>
          La momentul publicării acestei versiuni, website-ul nu utilizează în
          mod intenționat cookies de marketing.
        </p>
      </section>

      <section className="legal-section" id="turnstile">
        <h2>Cloudflare Turnstile</h2>
        <p>
          Formularul de programare utilizează Cloudflare Turnstile pentru a
          diferenția utilizatorii legitimi de trimiterile automate sau abuzive.
        </p>
        <p>
          În acest scop, Cloudflare poate prelucra informații tehnice și poate
          folosi cookies sau tehnologii similare strict necesare verificării de
          securitate. Aceste mecanisme nu sunt folosite de website pentru
          publicitate și nu depind de acceptarea categoriei de analiză.
        </p>
        <p>
          Informații suplimentare sunt disponibile în{" "}
          <a
            href="https://www.cloudflare.com/privacypolicy/"
            rel="noopener noreferrer"
            target="_blank"
          >
            Politica de confidențialitate Cloudflare
          </a>
          .
        </p>
      </section>

      <section className="legal-section" id="lista-cookies">
        <h2>Lista cookies utilizate</h2>
        <div className="legal-table-wrap">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Denumire</th>
                <th>Furnizor</th>
                <th>Scop</th>
                <th>Categorie</th>
                <th>Durată</th>
              </tr>
            </thead>
            <tbody>
              {cookieInventory.map((cookie) => (
                <tr key={`${cookie.provider}-${cookie.name}`}>
                  <td>{cookie.name}</td>
                  <td>{cookie.provider}</td>
                  <td>{cookie.purpose}</td>
                  <td>{cookie.category}</td>
                  <td>{cookie.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p>
          Duratele indicate pentru cookies Google Analytics sunt duratele
          implicite comunicate de Google. Aceste cookies apar numai după
          acceptarea categoriei de analiză.
        </p>
      </section>

      <section className="legal-section" id="preferinte">
        <h2>Alegerea și modificarea preferințelor</h2>
        <p>
          La prima vizită, utilizatorul poate:
        </p>
        <ul>
          <li>accepta utilizarea Google Analytics;</li>
          <li>refuza utilizarea Google Analytics;</li>
          <li>modifica ulterior alegerea.</li>
        </ul>
        <p>
          Opțiunea este păstrată timp de 12 luni în spațiul local al browserului.
          După expirare, website-ul va solicita din nou alegerea.
        </p>
        <p>
          Preferințele pot fi redeschise prin butonul „Setări cookies” din
          footer. Refuzarea ulterioară oprește măsurarea și șterge cookies Google
          Analytics accesibile website-ului.
        </p>
      </section>

      <section className="legal-section" id="browser">
        <h2>Setările browserului</h2>
        <p>
          Majoritatea browserelor permit vizualizarea, blocarea sau ștergerea
          cookies.
        </p>
        <p>
          Blocarea tuturor cookies poate afecta funcționarea website-ului sau a
          formularului de programare.
        </p>
      </section>

      <section className="legal-section" id="actualizare">
        <h2>Actualizarea politicii</h2>
        <p>
          Politica va fi actualizată atunci când se modifică tehnologiile,
          furnizorii sau scopurile pentru care sunt utilizate cookies.
        </p>
      </section>
    </>
  );
}
