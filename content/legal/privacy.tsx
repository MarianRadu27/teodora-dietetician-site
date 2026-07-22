import Link from "next/link";

import { LegalPlaceholder, LegalValue } from "../../app/components/legal/LegalPlaceholder";
import type { LegalTocItem } from "../../app/components/legal/LegalTableOfContents";
import { legalConfig } from "../../config/legal";

// DE CLARIFICAT: rolul DietON în gestionarea programărilor,
// fișelor pacienților, plăților și datelor personale.

export const privacyTocItems: LegalTocItem[] = [
  { id: "operator", title: "Cine prelucreaza datele personale" },
  { id: "aplicare", title: "Cui i se aplica aceasta politica" },
  { id: "date-colectate", title: "Ce date putem colecta" },
  { id: "scopuri", title: "In ce scopuri folosim datele" },
  { id: "temeiuri", title: "Temeiurile prelucrarii" },
  { id: "date-sanatate", title: "Date privind sanatatea" },
  { id: "furnizori", title: "Furnizori si destinatari ai datelor" },
  { id: "transferuri", title: "Transferuri in afara SEE" },
  { id: "pastrare", title: "Cat timp pastram datele" },
  { id: "drepturi", title: "Drepturile persoanelor" },
  { id: "securitate", title: "Securitatea datelor" },
  { id: "minori", title: "Datele minorilor" },
  { id: "linkuri-externe", title: "Linkuri si servicii externe" },
  { id: "modificare", title: "Modificarea politicii" },
];

export function PrivacyContent() {
  return (
    <>
      <section className="legal-section" id="operator">
        <h2>Cine prelucreaza datele personale</h2>
        <p>Operatorul datelor cu caracter personal este:</p>
        <p>
          <strong>
            <LegalValue value={legalConfig.businessName} />
          </strong>
          , forma de exercitare a activitatii profesionale detinuta de{" "}
          {legalConfig.ownerName}, {legalConfig.professionalTitle}, denumita in
          continuare „Operatorul”.
        </p>

        <h3>Date de identificare</h3>
        <ul>
          <li>
            Denumire: <LegalValue value={legalConfig.businessName} />
          </li>
          <li>Titular: {legalConfig.ownerName}</li>
          <li>
            Cod de identificare fiscala: <LegalValue value={legalConfig.taxId} />
          </li>
          <li>
            Sediu profesional:{" "}
            <LegalValue value={legalConfig.professionalAddress} />
          </li>
          <li>Adresa de email: {legalConfig.email}</li>
          <li>Numar de telefon: {legalConfig.phone}</li>
          <li>
            Organism profesional:{" "}
            <LegalValue value={legalConfig.professionalBody} />
          </li>
          <li>
            Cod/numar de membru: <LegalValue value={legalConfig.memberCode} />
          </li>
          <li>Website: {legalConfig.domain}</li>
        </ul>
        <p>
          Pentru intrebari privind prelucrarea datelor personale sau pentru
          exercitarea drepturilor, ne puteti contacta la adresa{" "}
          <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a>.
        </p>
      </section>

      <section className="legal-section" id="aplicare">
        <h2>Cui i se aplica aceasta politica</h2>
        <p>Prezenta politica se aplica persoanelor care:</p>
        <ul>
          <li>viziteaza website-ul;</li>
          <li>solicita sau efectueaza o programare;</li>
          <li>contacteaza Operatorul prin email, telefon sau WhatsApp;</li>
          <li>
            beneficiaza sau intentioneaza sa beneficieze de serviciile prezentate
            pe website.
          </li>
        </ul>
      </section>

      <section className="legal-section" id="date-colectate">
        <h2>Ce date putem colecta</h2>

        <h3>Date furnizate pentru programare</h3>
        <p>Programarile sunt gestionate prin intermediul serviciului Cal.com.</p>
        <p>
          In functie de campurile configurate in formularul de programare, pot fi
          colectate:
        </p>
        <ul>
          <li>numele si prenumele;</li>
          <li>adresa de email;</li>
          <li>numarul de telefon, daca acest camp este activat;</li>
          <li>serviciul selectat;</li>
          <li>modalitatea consultatiei: online sau in cabinet;</li>
          <li>data si ora programarii;</li>
          <li>fusul orar;</li>
          <li>raspunsurile la intrebarile din formular;</li>
          <li>observatiile introduse voluntar;</li>
          <li>informatii privind anularea sau reprogramarea.</li>
        </ul>
        <p className="legal-note">
          Va rugam sa nu introduceti in formularul de programare diagnostice,
          rezultate ale analizelor, tratamente, documente medicale sau alte
          informatii detaliate privind starea de sanatate.
        </p>

        <h3>Date furnizate prin comunicare directa</h3>
        <p>
          Atunci cand ne contactati prin email, telefon sau WhatsApp, putem
          prelucra:
        </p>
        <ul>
          <li>numele;</li>
          <li>datele de contact;</li>
          <li>continutul mesajului;</li>
          <li>data si ora comunicarii;</li>
          <li>informatiile transmise voluntar.</li>
        </ul>

        <h3>Date tehnice</h3>
        <p>
          Atunci cand utilizati website-ul, pot fi prelucrate automat anumite
          informatii tehnice, precum:
        </p>
        <ul>
          <li>adresa IP;</li>
          <li>tipul browserului;</li>
          <li>tipul dispozitivului;</li>
          <li>sistemul de operare;</li>
          <li>data si ora accesarii;</li>
          <li>paginile accesate;</li>
          <li>
            informatii necesare pentru securitatea si functionarea website-ului.
          </li>
        </ul>
        <p>
          Lista exacta a tehnologiilor utilizate este prezentata in{" "}
          <Link href="/politica-de-cookies">Politica de cookies</Link>.
        </p>
      </section>

      <section className="legal-section" id="scopuri">
        <h2>In ce scopuri folosim datele</h2>
        <p>Datele pot fi prelucrate pentru:</p>
        <ul>
          <li>inregistrarea si administrarea programarilor;</li>
          <li>confirmarea, anularea sau reprogramarea consultatiilor;</li>
          <li>
            comunicarea informatiilor necesare desfasurarii serviciului;
          </li>
          <li>organizarea consultatiilor online sau in cabinet;</li>
          <li>raspunsul la solicitarile transmise;</li>
          <li>indeplinirea obligatiilor profesionale, fiscale si legale;</li>
          <li>protejarea securitatii website-ului;</li>
          <li>prevenirea utilizarii abuzive sau frauduloase;</li>
          <li>apararea unor drepturi sau interese legitime.</li>
        </ul>
        <p>
          In viitor, daca vor fi introduse Google Analytics, newslettere sau
          comunicari comerciale, aceasta politica va fi actualizata inaintea
          activarii lor.
        </p>
      </section>

      <section className="legal-section" id="temeiuri">
        <h2>Temeiurile prelucrarii</h2>
        <p>In functie de situatie, datele sunt prelucrate in baza:</p>
        <ul>
          <li>
            efectuarii demersurilor solicitate inaintea incheierii unui contract
            si executarii serviciului solicitat;
          </li>
          <li>indeplinirii unei obligatii legale;</li>
          <li>
            interesului legitim privind functionarea, securitatea si protejarea
            website-ului si a activitatii profesionale;
          </li>
          <li>
            consimtamantului, atunci cand acesta este necesar, de exemplu pentru
            newsletter, analiza optionala sau comunicari comerciale.
          </li>
        </ul>
        <p>
          Furnizarea datelor necesare programarii este voluntara, insa fara
          acestea programarea nu poate fi administrata.
        </p>
      </section>

      <section className="legal-section" id="date-sanatate">
        <h2>Date privind sanatatea</h2>
        <p>
          Datele privind sanatatea reprezinta o categorie speciala de date si
          beneficiaza de protectie suplimentara.
        </p>
        <p>
          Formularul public de programare nu este destinat colectarii unui
          istoric medical detaliat. Eventualele informatii necesare evaluarii
          nutritionale vor fi solicitate separat, prin mijloace si proceduri
          adecvate activitatii profesionale.
        </p>
        <p>
          Daca o persoana introduce din proprie initiativa informatii medicale in
          campurile libere ale formularului, acestea vor fi prelucrate numai in
          masura necesara administrarii solicitarii si conform obligatiilor
          legale si profesionale aplicabile.
        </p>
      </section>

      <section className="legal-section" id="furnizori">
        <h2>Furnizori si destinatari ai datelor</h2>
        <p>
          Pentru functionarea website-ului si gestionarea serviciilor putem
          utiliza furnizori precum:
        </p>
        <ul>
          <li>
            <strong>Cal.com</strong>, pentru gestionarea programarilor;
          </li>
          <li>
            <strong>Google Calendar</strong>, daca este utilizat pentru
            verificarea disponibilitatii si inregistrarea programarilor;
          </li>
          <li>
            <strong>Google Meet</strong>, daca este folosit pentru consultatii
            online;
          </li>
          <li>
            <LegalValue value={legalConfig.hostingProvider} />, pentru gazduirea
            website-ului;
          </li>
          <li>
            <LegalValue value={legalConfig.emailProvider} />, pentru comunicarile
            prin email;
          </li>
          <li>
            <strong>Cloudflare</strong>, daca este utilizat pentru gazduire,
            livrare sau protectie;
          </li>
          <li>furnizori de servicii IT si mentenanta;</li>
          <li>
            contabilul sau alti colaboratori profesionisti, atunci cand este
            necesar;
          </li>
          <li>
            autoritati publice, atunci cand comunicarea datelor este impusa de
            lege.
          </li>
        </ul>
        <p>
          Furnizorii primesc numai datele necesare indeplinirii serviciilor
          pentru care au fost contractati.
        </p>
        <p>
          Utilizarea Cal.com este supusa si propriei politici de confidentialitate
          a acestui furnizor, disponibila la{" "}
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
        <h2>Transferuri in afara Spatiului Economic European</h2>
        <p>
          Unii furnizori utilizati pot fi stabiliti sau pot utiliza infrastructura
          situata in afara Spatiului Economic European.
        </p>
        <p>
          In astfel de situatii, transferul datelor va fi realizat in
          conformitate cu legislatia aplicabila privind protectia datelor si pe
          baza unor mecanisme legale adecvate, precum o decizie de adecvare sau
          clauze contractuale standard, dupa caz.
        </p>
        <p>
          Informatii suplimentare privind transferurile efectuate de Cal.com sunt
          disponibile in politica proprie de confidentialitate a furnizorului.
        </p>
      </section>

      <section className="legal-section" id="pastrare">
        <h2>Cat timp pastram datele</h2>
        <p>
          Datele sunt pastrate numai pentru perioada necesara scopurilor pentru
          care au fost colectate si pentru respectarea obligatiilor legale sau
          profesionale.
        </p>
        <p>Perioadele aplicabile vor fi completate astfel:</p>
        <ul>
          <li>
            solicitari fara programare:{" "}
            <LegalPlaceholder>[DE EXEMPLU, 6 SAU 12 LUNI]</LegalPlaceholder>;
          </li>
          <li>
            programari anulate: <LegalPlaceholder>[PERIOADA]</LegalPlaceholder>;
          </li>
          <li>
            informatii administrative privind consultatiile:{" "}
            <LegalPlaceholder>[PERIOADA]</LegalPlaceholder>;
          </li>
          <li>
            comunicari prin email sau WhatsApp:{" "}
            <LegalPlaceholder>[PERIOADA]</LegalPlaceholder>;
          </li>
          <li>
            documente fiscale si contabile: pe perioada prevazuta de legislatia
            aplicabila;
          </li>
          <li>
            loguri tehnice si de securitate:{" "}
            <LegalPlaceholder>[PERIOADA]</LegalPlaceholder>;
          </li>
          <li>
            consimtaminte pentru newsletter sau marketing, daca vor fi introduse:
            pana la retragerea consimtamantului si ulterior atat cat este necesar
            pentru dovedirea respectarii obligatiilor legale.
          </li>
        </ul>
        <p>
          Dupa expirarea perioadei aplicabile, datele vor fi sterse, anonimizate
          sau arhivate, daca exista o obligatie legala in acest sens.
        </p>
      </section>

      <section className="legal-section" id="drepturi">
        <h2>Drepturile persoanelor</h2>
        <p>In conditiile prevazute de lege, aveti dreptul:</p>
        <ul>
          <li>sa solicitati accesul la date;</li>
          <li>sa solicitati rectificarea datelor inexacte;</li>
          <li>sa solicitati stergerea datelor;</li>
          <li>sa solicitati restrictionarea prelucrarii;</li>
          <li>sa va opuneti anumitor prelucrari;</li>
          <li>sa solicitati portabilitatea datelor, unde este aplicabila;</li>
          <li>
            sa retrageti consimtamantul, fara a afecta legalitatea prelucrarii
            anterioare;
          </li>
          <li>
            sa depuneti o plangere la Autoritatea Nationala de Supraveghere a
            Prelucrarii Datelor cu Caracter Personal;
          </li>
          <li>sa va adresati instantelor competente.</li>
        </ul>
        <p>
          Solicitarile pot fi trimise la{" "}
          <a href={`mailto:${legalConfig.email}`}>{legalConfig.email}</a>.
        </p>
        <p>
          Pentru protejarea datelor, putem solicita informatii suplimentare
          necesare confirmarii identitatii solicitantului.
        </p>
      </section>

      <section className="legal-section" id="securitate">
        <h2>Securitatea datelor</h2>
        <p>
          Aplicam masuri tehnice si organizatorice rezonabile pentru protejarea
          datelor impotriva accesului neautorizat, pierderii, modificarii,
          divulgarii sau distrugerii.
        </p>
        <p>
          Totusi, nicio metoda de transmitere sau stocare electronica nu poate
          garanta securitate absoluta.
        </p>
      </section>

      <section className="legal-section" id="minori">
        <h2>Datele minorilor</h2>
        <p>
          Serviciile pentru persoane minore vor fi furnizate numai cu implicarea
          si acordul reprezentantului legal, in conformitate cu regulile
          profesionale si legale aplicabile.
        </p>
        <p>
          Programarile pentru minori trebuie realizate de parinte sau
          reprezentantul legal.
        </p>
      </section>

      <section className="legal-section" id="linkuri-externe">
        <h2>Linkuri si servicii externe</h2>
        <p>
          Website-ul poate contine legaturi sau componente furnizate de terti,
          precum Cal.com, Google, WhatsApp, Facebook sau Instagram.
        </p>
        <p>
          Aceste servicii pot prelucra date conform propriilor politici.
          Recomandam consultarea politicilor furnizorilor respectivi inaintea
          utilizarii serviciilor.
        </p>
      </section>

      <section className="legal-section" id="modificare">
        <h2>Modificarea politicii</h2>
        <p>
          Prezenta politica poate fi actualizata atunci cand se modifica
          serviciile, furnizorii, functionalitatile website-ului sau cerintele
          legale.
        </p>
        <p>
          Versiunea actualizata va fi publicata pe aceasta pagina, impreuna cu
          data ultimei actualizari.
        </p>
      </section>
    </>
  );
}
