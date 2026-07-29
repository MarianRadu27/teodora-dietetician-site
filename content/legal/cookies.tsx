import type { LegalTocItem } from "../../app/components/legal/LegalTableOfContents";
import { cookieInventory, legalConfig } from "../../config/legal";

export const cookiesTocItems: LegalTocItem[] = [
  { id: "ce-sunt-cookies", title: "Ce sunt cookies" },
  { id: "tehnologii", title: "Ce tehnologii utilizează website-ul" },
  { id: "categorii", title: "Categorii de cookies" },
  { id: "cal-com", title: "Cal.com" },
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
          La data ultimei actualizări, website-ul nu utilizează în mod
          intenționat cookies de analiză sau marketing proprii.
        </p>
        <p>Website-ul poate utiliza doar tehnologii necesare pentru:</p>
        <ul>
          <li>funcționarea, livrarea și securitatea website-ului;</li>
          <li>protecția și performanța oferite de platforma de găzduire;</li>
          <li>
            încărcarea calendarului Cal.com atunci când utilizatorul deschide
            funcția de programare.
          </li>
        </ul>
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
          La momentul publicării acestei versiuni, Google Analytics nu este
          activat.
        </p>
        <p>
          Dacă va fi introdus ulterior, cookies de analiză vor fi activate numai
          după exprimarea opțiunii utilizatorului, iar politica va fi actualizată.
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

      <section className="legal-section" id="cal-com">
        <h2>Cal.com</h2>
        <p>Pagina de programare utilizează serviciul extern Cal.com.</p>
        <p>
          Atunci când componenta Cal.com este încărcată sau utilizată, furnizorul
          poate prelucra informații tehnice și poate utiliza cookies sau
          tehnologii similare conform propriei politici.
        </p>
        <p>
          Calendarul Cal.com va fi încărcat numai atunci când utilizatorul
          accesează sau solicită funcția de programare, în funcție de
          implementarea tehnică aleasă.
        </p>
        <p>
          Informații suplimentare sunt disponibile în politica de
          confidențialitate a Cal.com:{" "}
          <a
            href={legalConfig.calPrivacyUrl}
            rel="noopener noreferrer"
            target="_blank"
          >
            Cal.com Privacy Policy
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
              {cookieInventory.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    La data ultimei actualizări, website-ul nu utilizează în mod
                    intenționat cookies proprii de analiză sau marketing. Dacă vor
                    fi introduse ulterior astfel de tehnologii, această listă va
                    fi actualizată înainte de activarea lor.
                  </td>
                </tr>
              ) : (
                cookieInventory.map((cookie) => (
                  <tr key={`${cookie.provider}-${cookie.name}`}>
                    <td>{cookie.name}</td>
                    <td>{cookie.provider}</td>
                    <td>{cookie.purpose}</td>
                    <td>{cookie.category}</td>
                    <td>{cookie.duration}</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      <section className="legal-section" id="preferinte">
        <h2>Alegerea și modificarea preferințelor</h2>
        <p>
          Atunci când website-ul va utiliza cookies opționale, utilizatorul va
          putea:
        </p>
        <ul>
          <li>accepta toate categoriile opționale;</li>
          <li>refuza toate categoriile opționale;</li>
          <li>selecta individual categoriile;</li>
          <li>modifica ulterior alegerea.</li>
        </ul>
        <p>
          Preferințele vor putea fi redeschise printr-un buton dedicat din
          footer.
        </p>
        <p>
          Acest buton nu conduce către o pagină nouă. El redeschide panoul în care
          utilizatorul își poate modifica alegerile.
        </p>
        <p>
          În prezent, website-ul nu afișează un panou de consimțământ pentru
          cookies opționale, deoarece nu folosește în mod intenționat cookies de
          analiză sau marketing.
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
          calendarului de programări.
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
