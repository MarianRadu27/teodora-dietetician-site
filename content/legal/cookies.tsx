import { LegalPlaceholder } from "../../app/components/legal/LegalPlaceholder";
import type { LegalTocItem } from "../../app/components/legal/LegalTableOfContents";
import { cookieInventory, legalConfig } from "../../config/legal";

export const cookiesTocItems: LegalTocItem[] = [
  { id: "ce-sunt-cookies", title: "Ce sunt cookies" },
  { id: "tehnologii", title: "Ce tehnologii utilizeaza website-ul" },
  { id: "categorii", title: "Categorii de cookies" },
  { id: "cal-com", title: "Cal.com" },
  { id: "lista-cookies", title: "Lista cookies utilizate" },
  { id: "preferinte", title: "Alegerea si modificarea preferintelor" },
  { id: "browser", title: "Setarile browserului" },
  { id: "actualizare", title: "Actualizarea politicii" },
];

export function CookiesContent() {
  return (
    <>
      <section className="legal-section" id="ce-sunt-cookies">
        <h2>Ce sunt cookies</h2>
        <p>
          Cookies sunt fisiere de mici dimensiuni sau tehnologii similare care
          pot fi stocate sau accesate pe dispozitivul utilizatorului atunci cand
          acesta viziteaza un website.
        </p>
        <p>
          Acestea pot fi utilizate pentru functionarea tehnica a website-ului,
          memorarea preferintelor, securitate, analiza sau marketing.
        </p>
      </section>

      <section className="legal-section" id="tehnologii">
        <h2>Ce tehnologii utilizeaza website-ul</h2>
        <p>
          La data ultimei actualizari, website-ul nu utilizeaza in mod
          intentionat cookies de analiza sau marketing proprii.
        </p>
        <p>Website-ul poate utiliza:</p>
        <ul>
          <li>tehnologii strict necesare functionarii si securitatii;</li>
          <li>
            tehnologii necesare memorarii preferintelor privind cookies, daca va
            fi activat un manager de consimtamant;
          </li>
          <li>tehnologii asociate integrarii serviciului Cal.com;</li>
          <li>
            tehnologii furnizate de platforma de gazduire sau de securitate.
          </li>
        </ul>
        <p>
          Lista exacta trebuie actualizata dupa scanarea versiunii finale a
          website-ului.
        </p>
      </section>

      <section className="legal-section" id="categorii">
        <h2>Categorii de cookies</h2>
        <h3>Cookies strict necesare</h3>
        <p>
          Acestea sunt necesare pentru functionarea website-ului, securitate sau
          furnizarea unei functii solicitate de utilizator.
        </p>
        <p>
          In mod obisnuit, nu pot fi dezactivate din panoul website-ului, dar pot
          fi blocate din browser. Blocarea lor poate afecta functionarea anumitor
          componente.
        </p>

        <h3>Cookies de preferinte</h3>
        <p>
          Acestea pot memora alegeri precum preferintele privind cookies sau
          anumite setari ale interfetei.
        </p>

        <h3>Cookies de analiza</h3>
        <p>
          Acestea ajuta la intelegerea modului in care este utilizat website-ul.
        </p>
        <p>
          La momentul publicarii acestei versiuni, Google Analytics nu este
          activat.
        </p>
        <p>
          Daca va fi introdus ulterior, cookies de analiza vor fi activate numai
          dupa exprimarea optiunii utilizatorului, iar politica va fi actualizata.
        </p>

        <h3>Cookies de marketing</h3>
        <p>
          Acestea pot fi utilizate pentru publicitate, masurarea campaniilor sau
          urmarirea utilizatorului pe mai multe website-uri.
        </p>
        <p>
          La momentul publicarii acestei versiuni, website-ul nu utilizeaza in
          mod intentionat cookies de marketing.
        </p>
      </section>

      <section className="legal-section" id="cal-com">
        <h2>Cal.com</h2>
        <p>Pagina de programare utilizeaza serviciul extern Cal.com.</p>
        <p>
          Atunci cand componenta Cal.com este incarcata sau utilizata, furnizorul
          poate prelucra informatii tehnice si poate utiliza cookies sau
          tehnologii similare conform propriei politici.
        </p>
        <p>
          Calendarul Cal.com va fi incarcat numai atunci cand utilizatorul
          acceseaza sau solicita functia de programare, in functie de
          implementarea tehnica aleasa.
        </p>
        <p>
          Informatii suplimentare sunt disponibile in politica de
          confidentialitate a Cal.com:{" "}
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
        <p>
          Tabelul urmator trebuie completat dupa scanarea tehnica a website-ului
          publicat.
        </p>
        <div className="legal-table-wrap">
          <table className="legal-table">
            <thead>
              <tr>
                <th>Denumire</th>
                <th>Furnizor</th>
                <th>Scop</th>
                <th>Categorie</th>
                <th>Durata</th>
              </tr>
            </thead>
            <tbody>
              {cookieInventory.length === 0 ? (
                <tr>
                  <td colSpan={5}>
                    Inventarul tehnic va fi actualizat dupa verificarea
                    versiunii finale a website-ului. Acest mesaj trebuie inlocuit
                    inaintea lansarii publice.
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
        <p>
          Cookies detectate, dar care nu mai sunt utilizate, trebuie eliminate
          din tabel.
        </p>
      </section>

      <section className="legal-section" id="preferinte">
        <h2>Alegerea si modificarea preferintelor</h2>
        <p>
          Atunci cand website-ul va utiliza cookies optionale, utilizatorul va
          putea:
        </p>
        <ul>
          <li>accepta toate categoriile optionale;</li>
          <li>refuza toate categoriile optionale;</li>
          <li>selecta individual categoriile;</li>
          <li>modifica ulterior alegerea.</li>
        </ul>
        <p>
          Preferintele vor putea fi redeschise prin butonul{" "}
          <strong>„Setari cookies”</strong> din footer.
        </p>
        <p>
          Butonul „Setari cookies” nu conduce catre o pagina noua. Acesta
          redeschide panoul in care utilizatorul isi poate modifica alegerile.
        </p>
        <p>
          Daca website-ul nu utilizeaza cookies optionale si nu exista un panou
          functional de consimtamant, butonul nu va fi afisat.
        </p>
        <p className="legal-note">
          Momentan managerul de consimtamant este dezactivat in cod prin{" "}
          <LegalPlaceholder>COOKIE_CONSENT_ENABLED = false</LegalPlaceholder>.
        </p>
      </section>

      <section className="legal-section" id="browser">
        <h2>Setarile browserului</h2>
        <p>
          Majoritatea browserelor permit vizualizarea, blocarea sau stergerea
          cookies.
        </p>
        <p>
          Blocarea tuturor cookies poate afecta functionarea website-ului sau a
          calendarului de programari.
        </p>
      </section>

      <section className="legal-section" id="actualizare">
        <h2>Actualizarea politicii</h2>
        <p>
          Politica va fi actualizata atunci cand se modifica tehnologiile,
          furnizorii sau scopurile pentru care sunt utilizate cookies.
        </p>
      </section>
    </>
  );
}
