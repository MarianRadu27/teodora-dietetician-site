import Link from "next/link";

import { LegalValue } from "../../app/components/legal/LegalPlaceholder";
import type { LegalTocItem } from "../../app/components/legal/LegalTableOfContents";
import { legalConfig } from "../../config/legal";

// DE CLARIFICAT: rolul DietON în gestionarea programărilor,
// fișelor pacienților, plăților și datelor personale.

export const privacyTocItems: LegalTocItem[] = [
  { id: "operator", title: "Cine prelucrează datele personale" },
  { id: "aplicare", title: "Cui i se aplică această politică" },
  { id: "date-colectate", title: "Ce date putem colecta" },
  { id: "scopuri", title: "În ce scopuri folosim datele" },
  { id: "temeiuri", title: "Temeiurile prelucrării" },
  { id: "date-sanatate", title: "Date privind sănătatea" },
  { id: "furnizori", title: "Furnizori și destinatari ai datelor" },
  { id: "transferuri", title: "Transferuri în afara SEE" },
  { id: "pastrare", title: "Cât timp păstrăm datele" },
  { id: "drepturi", title: "Drepturile persoanelor" },
  { id: "securitate", title: "Securitatea datelor" },
  { id: "minori", title: "Datele minorilor" },
  { id: "linkuri-externe", title: "Linkuri și servicii externe" },
  { id: "modificare", title: "Modificarea politicii" },
];

export function PrivacyContent() {
  return (
    <>
      <section className="legal-section" id="operator">
        <h2>Cine prelucrează datele personale</h2>
        <p>Operatorul datelor cu caracter personal este:</p>
        <p>
          <strong>
            <LegalValue value={legalConfig.businessName} />
          </strong>
          , forma de exercitare a activității profesionale deținută de{" "}
          {legalConfig.ownerName}, {legalConfig.professionalTitle}, denumită în
          continuare „Operatorul”.
        </p>

        <h3>Date de identificare</h3>
        <ul>
          <li>
            Denumire: <LegalValue value={legalConfig.businessName} />
          </li>
          <li>Titular: {legalConfig.ownerName}</li>
          <li>
            Cod de identificare fiscală: <LegalValue value={legalConfig.taxId} />
          </li>
          <li>
            Sediu profesional:{" "}
            <LegalValue value={legalConfig.professionalAddress} />
          </li>
          <li>Adresa de email: {legalConfig.email}</li>
          <li>Număr de telefon: {legalConfig.phone}</li>
          <li>
            Organism profesional:{" "}
            <LegalValue value={legalConfig.professionalBody} />
          </li>
          <li>
            Cod/număr de membru: <LegalValue value={legalConfig.memberCode} />
          </li>
          <li>Website: {legalConfig.domain}</li>
        </ul>
        <p>
          Pentru întrebări privind prelucrarea datelor personale sau pentru
          exercitarea drepturilor, ne puteți contacta la adresa{" "}
          <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a>.
        </p>
      </section>

      <section className="legal-section" id="aplicare">
        <h2>Cui i se aplică această politică</h2>
        <p>Prezenta politică se aplică persoanelor care:</p>
        <ul>
          <li>vizitează website-ul;</li>
          <li>solicită sau efectuează o programare;</li>
          <li>contactează Operatorul prin email, telefon sau WhatsApp;</li>
          <li>
            beneficiază sau intenționează să beneficieze de serviciile prezentate
            pe website.
          </li>
        </ul>
      </section>

      <section className="legal-section" id="date-colectate">
        <h2>Ce date putem colecta</h2>

        <h3>Date furnizate pentru programare</h3>
        <p>Programările sunt gestionate prin intermediul serviciului Cal.com.</p>
        <p>
          În funcție de câmpurile configurate în formularul de programare, pot fi
          colectate:
        </p>
        <ul>
          <li>numele și prenumele;</li>
          <li>adresa de email;</li>
          <li>numărul de telefon, dacă acest câmp este activat;</li>
          <li>serviciul selectat;</li>
          <li>modalitatea consultației: online sau în cabinet;</li>
          <li>data și ora programării;</li>
          <li>fusul orar;</li>
          <li>răspunsurile la întrebările din formular;</li>
          <li>observațiile introduse voluntar;</li>
          <li>informații privind anularea sau reprogramarea.</li>
        </ul>
        <p className="legal-note">
          Vă rugăm să nu introduceți în formularul de programare diagnostice,
          rezultate ale analizelor, tratamente, documente medicale sau alte
          informații detaliate privind starea de sănătate.
        </p>

        <h3>Date furnizate prin comunicare directă</h3>
        <p>
          Atunci când ne contactați prin email, telefon sau WhatsApp, putem
          prelucra:
        </p>
        <ul>
          <li>numele;</li>
          <li>datele de contact;</li>
          <li>conținutul mesajului;</li>
          <li>data și ora comunicării;</li>
          <li>informațiile transmise voluntar.</li>
        </ul>

        <h3>Date tehnice</h3>
        <p>
          Atunci când utilizați website-ul, pot fi prelucrate automat anumite
          informații tehnice, precum:
        </p>
        <ul>
          <li>adresa IP;</li>
          <li>tipul browserului;</li>
          <li>tipul dispozitivului;</li>
          <li>sistemul de operare;</li>
          <li>data și ora accesării;</li>
          <li>paginile accesate;</li>
          <li>
            informații necesare pentru securitatea și funcționarea website-ului.
          </li>
        </ul>
        <p>
          Lista exactă a tehnologiilor utilizate este prezentată în{" "}
          <Link href="/politica-de-cookies">Politica de cookies</Link>.
        </p>
      </section>

      <section className="legal-section" id="scopuri">
        <h2>În ce scopuri folosim datele</h2>
        <p>Datele pot fi prelucrate pentru:</p>
        <ul>
          <li>înregistrarea și administrarea programărilor;</li>
          <li>confirmarea, anularea sau reprogramarea consultațiilor;</li>
          <li>
            comunicarea informațiilor necesare desfășurării serviciului;
          </li>
          <li>organizarea consultațiilor online sau în cabinet;</li>
          <li>răspunsul la solicitările transmise;</li>
          <li>îndeplinirea obligațiilor profesionale, fiscale și legale;</li>
          <li>protejarea securității website-ului;</li>
          <li>prevenirea utilizării abuzive sau frauduloase;</li>
          <li>apărarea unor drepturi sau interese legitime.</li>
        </ul>
        <p>
          În viitor, dacă vor fi introduse Google Analytics, newslettere sau
          comunicări comerciale, această politică va fi actualizată înaintea
          activării lor.
        </p>
      </section>

      <section className="legal-section" id="temeiuri">
        <h2>Temeiurile prelucrării</h2>
        <p>În funcție de situație, datele sunt prelucrate în baza:</p>
        <ul>
          <li>
            efectuării demersurilor solicitate înaintea încheierii unui contract
            și executării serviciului solicitat;
          </li>
          <li>îndeplinirii unei obligații legale;</li>
          <li>
            interesului legitim privind funcționarea, securitatea și protejarea
            website-ului și a activității profesionale;
          </li>
          <li>
            consimțământului, atunci când acesta este necesar, de exemplu pentru
            newsletter, analiză opțională sau comunicări comerciale.
          </li>
        </ul>
        <p>
          Furnizarea datelor necesare programării este voluntară, însă fără
          acestea programarea nu poate fi administrată.
        </p>
      </section>

      <section className="legal-section" id="date-sanatate">
        <h2>Date privind sănătatea</h2>
        <p>
          Datele privind sănătatea reprezintă o categorie specială de date și
          beneficiază de protecție suplimentară.
        </p>
        <p>
          Formularul public de programare nu este destinat colectării unui
          istoric medical detaliat. Eventualele informații necesare evaluării
          nutriționale vor fi solicitate separat, prin mijloace și proceduri
          adecvate activității profesionale.
        </p>
        <p>
          Dacă o persoană introduce din proprie inițiativă informații medicale în
          câmpurile libere ale formularului, acestea vor fi prelucrate numai în
          măsura necesară administrării solicitării și conform obligațiilor
          legale și profesionale aplicabile.
        </p>
      </section>

      <section className="legal-section" id="furnizori">
        <h2>Furnizori și destinatari ai datelor</h2>
        <p>
          Pentru funcționarea website-ului și gestionarea serviciilor putem
          utiliza furnizori precum:
        </p>
        <ul>
          <li>
            <strong>Cal.com</strong>, pentru gestionarea programărilor;
          </li>
          <li>
            <strong>Google Calendar</strong>, dacă este utilizat pentru
            verificarea disponibilității și înregistrarea programărilor;
          </li>
          <li>
            <strong>Google Meet</strong>, dacă este folosit pentru consultații
            online;
          </li>
          <li>
            <LegalValue value={legalConfig.hostingProvider} />, pentru găzduirea
            website-ului;
          </li>
          <li>
            <LegalValue value={legalConfig.emailProvider} />, pentru comunicările
            prin email;
          </li>
          <li>
            <strong>Cloudflare</strong>, dacă este utilizat pentru găzduire,
            livrare sau protecție;
          </li>
          <li>furnizori de servicii IT și mentenanță;</li>
          <li>
            contabilul sau alți colaboratori profesioniști, atunci când este
            necesar;
          </li>
          <li>
            autorități publice, atunci când comunicarea datelor este impusă de
            lege.
          </li>
        </ul>
        <p>
          Furnizorii primesc numai datele necesare îndeplinirii serviciilor
          pentru care au fost contractați.
        </p>
        <p>
          Utilizarea Cal.com este supusă și propriei politici de confidențialitate
          a acestui furnizor, disponibilă la{" "}
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

      <section className="legal-section" id="transferuri">
        <h2>Transferuri în afara Spațiului Economic European</h2>
        <p>
          Unii furnizori utilizați pot fi stabiliți sau pot utiliza infrastructura
          situată în afara Spațiului Economic European.
        </p>
        <p>
          În astfel de situații, transferul datelor va fi realizat în
          conformitate cu legislația aplicabilă privind protecția datelor și pe
          baza unor mecanisme legale adecvate, precum o decizie de adecvare sau
          clauze contractuale standard, după caz.
        </p>
        <p>
          Informații suplimentare privind transferurile efectuate de Cal.com sunt
          disponibile în politica proprie de confidențialitate a furnizorului.
        </p>
      </section>

      <section className="legal-section" id="pastrare">
        <h2>Cât timp păstrăm datele</h2>
        <p>
          Datele sunt păstrate numai pentru perioada necesară scopurilor pentru
          care au fost colectate și pentru respectarea obligațiilor legale sau
          profesionale.
        </p>
        <p>Perioadele orientative de păstrare sunt:</p>
        <ul>
          <li>
            solicitări fără programare: maximum 6 luni de la ultima comunicare sau de la soluționarea solicitării.
          </li>
          <li>
            programări anulate: maximum 6 luni de la anulare, cu excepția informațiilor care trebuie păstrate pentru îndeplinirea obligațiilor fiscale, soluționarea reclamațiilor sau apărarea unor drepturi.
          </li>
          <li>
            informații administrative privind consultațiile: pe durata colaborării și maximum 3 ani de la ultima consultație sau de la încetarea colaborării, în măsura în care sunt necesare pentru soluționarea reclamațiilor ori apărarea drepturilor.
          </li>
          <li>
            comunicări prin email sau WhatsApp: maximum 6 luni de la ultima comunicare. Informațiile relevante pentru desfășurarea consultației, evidența profesională, îndeplinirea obligațiilor legale ori apărarea drepturilor pot fi extrase și păstrate pentru perioada aplicabilă categoriei respective.
          </li>
          <li>
            documente fiscale și contabile: 5 ani, calculați de la data de 1 iulie a anului următor celui încheierii exercițiului financiar în care au fost întocmite, sau pentru o altă perioadă prevăzută de legislația aplicabilă.
          </li>
          <li>
            loguri tehnice și de securitate: de regulă, maximum 6 luni, în funcție de natura logului, scopul de securitate și perioadele aplicate de furnizorii tehnici utilizați.
          </li>
          <li>
            consimțăminte pentru newsletter sau marketing, dacă vor fi introduse: până la retragerea consimțământului. După retragere, dovada consimțământului, data retragerii și informațiile minime necesare pentru respectarea opțiunii de dezabonare pot fi păstrate maximum 3 ani.
          </li>
        </ul>
        <p>
          După expirarea perioadei aplicabile, datele vor fi șterse, anonimizate
          sau arhivate, dacă există o obligație legală în acest sens.
        </p>
      </section>

      <section className="legal-section" id="drepturi">
        <h2>Drepturile persoanelor</h2>
        <p>În condițiile prevăzute de lege, aveți dreptul:</p>
        <ul>
          <li>să solicitați accesul la date;</li>
          <li>să solicitați rectificarea datelor inexacte;</li>
          <li>să solicitați ștergerea datelor;</li>
          <li>să solicitați restricționarea prelucrării;</li>
          <li>să vă opuneți anumitor prelucrări;</li>
          <li>să solicitați portabilitatea datelor, unde este aplicabilă;</li>
          <li>
            să retrageți consimțământul, fără a afecta legalitatea prelucrării
            anterioare;
          </li>
          <li>
            să depuneți o plângere la Autoritatea Națională de Supraveghere a
            Prelucrării Datelor cu Caracter Personal;
          </li>
          <li>să vă adresați instanțelor competente.</li>
        </ul>
        <p>
          Solicitările pot fi trimise la{" "}
          <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a>.
        </p>
        <p>
          Pentru protejarea datelor, putem solicita informații suplimentare
          necesare confirmării identității solicitantului.
        </p>
      </section>

      <section className="legal-section" id="securitate">
        <h2>Securitatea datelor</h2>
        <p>
          Aplicăm măsuri tehnice și organizatorice rezonabile pentru protejarea
          datelor împotriva accesului neautorizat, pierderii, modificării,
          divulgării sau distrugerii.
        </p>
        <p>
          Totuși, nicio metodă de transmitere sau stocare electronică nu poate
          garanta securitate absolută.
        </p>
      </section>

      <section className="legal-section" id="minori">
        <h2>Datele minorilor</h2>
        <p>
          Serviciile pentru persoane minore vor fi furnizate numai cu implicarea
          și acordul reprezentantului legal, în conformitate cu regulile
          profesionale și legale aplicabile.
        </p>
        <p>
          Programările pentru minori trebuie realizate de părinte sau
          reprezentantul legal.
        </p>
      </section>

      <section className="legal-section" id="linkuri-externe">
        <h2>Linkuri și servicii externe</h2>
        <p>
          Website-ul poate conține legături sau componente furnizate de terți,
          precum Cal.com, Google, WhatsApp, Facebook sau Instagram.
        </p>
        <p>
          Aceste servicii pot prelucra date conform propriilor politici.
          Recomandăm consultarea politicilor furnizorilor respectivi înaintea
          utilizării serviciilor.
        </p>
      </section>

      <section className="legal-section" id="modificare">
        <h2>Modificarea politicii</h2>
        <p>
          Prezenta politică poate fi actualizată atunci când se modifică
          serviciile, furnizorii, funcționalitățile website-ului sau cerințele
          legale.
        </p>
        <p>
          Versiunea actualizată va fi publicată pe această pagină, împreună cu
          data ultimei actualizări.
        </p>
      </section>
    </>
  );
}
