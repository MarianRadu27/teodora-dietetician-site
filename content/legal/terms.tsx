import { LegalPlaceholder, LegalValue } from "../../app/components/legal/LegalPlaceholder";
import type { LegalTocItem } from "../../app/components/legal/LegalTableOfContents";
import { legalConfig } from "../../config/legal";
import { getOfficeLocationAddress, officeLocation } from "../../config/officeLocation";

export const termsTocItems: LegalTocItem[] = [
  { id: "furnizor", title: "Identificarea furnizorului" },
  { id: "rol-website", title: "Rolul website-ului" },
  { id: "servicii", title: "Serviciile prezentate" },
  { id: "informatii-publicate", title: "Caracterul informatiilor publicate" },
  { id: "programare", title: "Efectuarea programarii" },
  { id: "consultatii-online", title: "Consultatiile online" },
  { id: "consultatii-cabinet", title: "Consultatiile in cabinet" },
  {
    id: "locatia-consultatiilor-fizice",
    title: "Locatia consultatiilor fizice",
  },
  { id: "anulare-si-reprogramare", title: "Anularea si reprogramarea" },
  { id: "tarife", title: "Tarife si plata" },
  { id: "obligatii-utilizator", title: "Obligatiile utilizatorului" },
  { id: "rezultate", title: "Rezultatele serviciilor" },
  { id: "proprietate-intelectuala", title: "Proprietatea intelectuala" },
  { id: "servicii-externe", title: "Servicii si linkuri externe" },
  { id: "disponibilitate", title: "Disponibilitatea website-ului" },
  { id: "reclamatii", title: "Reclamatii si solutionarea neintelegerilor" },
  { id: "lege", title: "Legea aplicabila" },
  { id: "modificare", title: "Modificarea termenilor" },
];

export function TermsContent() {
  return (
    <>
      <section className="legal-section" id="furnizor">
        <h2>Identificarea furnizorului</h2>
        <p>Website-ul {legalConfig.domain} este administrat de:</p>
        <ul>
          <li>
            Denumire: <LegalValue value={legalConfig.businessName} />
          </li>
          <li>Titular: {legalConfig.ownerName}</li>
          <li>Profesie: {legalConfig.professionalTitle}</li>
          <li>
            Cod de identificare fiscala: <LegalValue value={legalConfig.taxId} />
          </li>
          <li>
            Sediu profesional:{" "}
            <LegalValue value={legalConfig.professionalAddress} />
          </li>
          <li>Email: {legalConfig.email}</li>
          <li>Telefon: {legalConfig.phone}</li>
          <li>
            Organism profesional:{" "}
            <LegalValue value={legalConfig.professionalBody} />
          </li>
          <li>
            Cod de membru: <LegalValue value={legalConfig.memberCode} />
          </li>
          <li>
            Situatie TVA: <LegalValue value={legalConfig.vatStatus} />
          </li>
        </ul>
        <p>In continuare, furnizorul va fi denumit „Prestatorul”.</p>
      </section>

      <section className="legal-section" id="rol-website">
        <h2>Rolul website-ului</h2>
        <p>Website-ul are rolul de a:</p>
        <ul>
          <li>prezenta activitatea si serviciile Prestatorului;</li>
          <li>furniza informatii cu caracter general si educational;</li>
          <li>permite solicitarea programarilor;</li>
          <li>facilita comunicarea cu persoanele interesate.</li>
        </ul>
        <p>
          Utilizarea website-ului presupune consultarea si respectarea
          prezentelor conditii.
        </p>
      </section>

      <section className="legal-section" id="servicii">
        <h2>Serviciile prezentate</h2>
        <p>Serviciile pot include:</p>
        <ul>
          <li>educatie nutritionala;</li>
          <li>servicii de nutritie generala;</li>
          <li>consultatii nutritionale initiale;</li>
          <li>consultatii de control;</li>
          <li>consultatii online;</li>
          <li>consultatii in cabinet;</li>
          <li>
            <LegalPlaceholder>[ALTE SERVICII CARE VOR FI ADAUGATE]</LegalPlaceholder>.
          </li>
        </ul>
        <p>
          Descrierea, durata, tariful si conditiile specifice fiecarui serviciu
          sunt afisate pe pagina serviciului sau in interfata de programare.
        </p>
        <p>
          Prestatorul poate modifica structura serviciilor, cu respectarea
          programarilor deja confirmate.
        </p>
      </section>

      <section className="legal-section" id="informatii-publicate">
        <h2>Caracterul informatiilor publicate</h2>
        <p>
          Materialele de pe website au caracter general, informativ si
          educational.
        </p>
        <p>Acestea:</p>
        <ul>
          <li>nu reprezinta un diagnostic;</li>
          <li>nu constituie un plan nutritional individual;</li>
          <li>nu inlocuiesc evaluarea personalizata;</li>
          <li>
            nu inlocuiesc consultatia medicala, investigatiile sau tratamentul
            prescris de medic;
          </li>
          <li>nu sunt destinate gestionarii urgentelor medicale.</li>
        </ul>
        <p>
          Pentru o recomandare individuala este necesara evaluarea situatiei
          concrete in cadrul unei consultatii.
        </p>
        <p>
          In caz de urgenta medicala, utilizati serviciile medicale de urgenta si
          nu formularul de programare, emailul sau WhatsApp.
        </p>
      </section>

      <section className="legal-section" id="programare">
        <h2>Efectuarea programarii</h2>
        <p>Programarile sunt gestionate prin Cal.com.</p>
        <p>Pentru programare, utilizatorul va putea selecta:</p>
        <ol>
          <li>serviciul;</li>
          <li>modalitatea online sau in cabinet;</li>
          <li>data si ora disponibile;</li>
          <li>datele solicitate pentru confirmare.</li>
        </ol>
        <p>
          Programarea este considerata inregistrata dupa finalizarea procesului
          si primirea mesajului de confirmare.
        </p>
        <p>
          Utilizatorul este responsabil pentru furnizarea unor date de contact
          corecte.
        </p>
        <p>
          Confirmarea automata nu inlocuieste eventualele informatii suplimentare
          privind plata, documentele necesare sau conditiile specifice
          serviciului.
        </p>
      </section>

      <section className="legal-section" id="consultatii-online">
        <h2>Consultatiile online</h2>
        <p>Pentru consultatiile online, utilizatorul este responsabil sa dispuna de:</p>
        <ul>
          <li>un dispozitiv compatibil;</li>
          <li>conexiune stabila la internet;</li>
          <li>acces la platforma indicata;</li>
          <li>un spatiu adecvat si suficient de privat.</li>
        </ul>
        <p>
          Linkul consultatiei va fi transmis prin{" "}
          <LegalPlaceholder>[EMAIL/GOOGLE MEET/CAL.COM]</LegalPlaceholder>.
        </p>
        <p>
          Prestatorul nu raspunde pentru imposibilitatea desfasurarii
          consultatiei cauzata exclusiv de dispozitivul, conexiunea sau setarile
          utilizatorului.
        </p>
      </section>

      <section className="legal-section" id="consultatii-cabinet">
        <h2>Consultatiile in cabinet</h2>
        <p>
          Consultatiile fizice se desfasoara la {officeLocation.name}, la adresa{" "}
          {getOfficeLocationAddress()}, comunicata si in confirmarea programarii.
        </p>
        <p>
          Utilizatorul trebuie sa se prezinte la ora stabilita si sa respecte
          regulile comunicate pentru accesul in cabinet.
        </p>
      </section>

      <section className="legal-section" id="locatia-consultatiilor-fizice">
        <h2>Locația consultațiilor fizice</h2>
        <p>
          Consultațiile cu prezență fizică se desfășoară în spațiile{" "}
          {officeLocation.name}, la adresa indicată pe website și în confirmarea
          programării, în cadrul colaborării profesionale dintre Prestator și{" "}
          {officeLocation.shortName}.
        </p>
        <p>
          Afișarea numelui și a adresei {officeLocation.shortName} pe website are
          scopul de a informa clientul cu privire la locația în care se
          desfășoară consultația și nu indică faptul că spațiul este deținut sau
          administrat exclusiv de Teodora Pălii.
        </p>
        <p>
          Persoanele care se prezintă la locație trebuie să respecte regulile de
          acces, organizare, siguranță și conduită aplicabile în cadrul{" "}
          {officeLocation.shortName}, în măsura în care acestea le sunt aduse la
          cunoștință.
        </p>
        <p>
          Dacă locația consultației se modifică, clientul va fi informat înaintea
          desfășurării programării.
        </p>
      </section>

      <section
        className="legal-section legal-highlight-section"
        id="anulare-si-reprogramare"
      >
        <p className="eyebrow">Sectiune importanta</p>
        <h2>Anularea si reprogramarea consultatiilor</h2>
        <p className="legal-note">
          Aceasta sectiune trebuie afisata vizibil si trebuie confirmate valorile
          dintre paranteze inaintea publicarii.
        </p>

        <h3>Anularea de catre client</h3>
        <p>
          Programarea poate fi anulata fara costuri cu cel putin{" "}
          <strong>{legalConfig.cancellationNoticeHours} de ore</strong> inaintea
          orei stabilite, prin linkul din emailul de confirmare sau prin
          contactarea Prestatorului.
        </p>
        <p>
          Pentru anularile efectuate cu mai putin de{" "}
          <strong>{legalConfig.cancellationNoticeHours} de ore</strong> inainte:
        </p>
        <ul>
          <li>
            <LegalPlaceholder>[NU SE PERCEPE NICIO TAXA]</LegalPlaceholder>;
          </li>
          <li>
            <LegalPlaceholder>[AVANSUL NU SE RESTITUIE]</LegalPlaceholder>;
          </li>
          <li>
            <LegalPlaceholder>
              [SE ACHITA O TAXA DE ANULARE DE ___ LEI]
            </LegalPlaceholder>
            .
          </li>
        </ul>
        <p>Se va pastra numai varianta aleasa de Prestator.</p>

        <h3>Reprogramarea</h3>
        <p>
          Consultatia poate fi reprogramata cu cel putin{" "}
          <strong>{legalConfig.cancellationNoticeHours} de ore</strong> inainte,
          in limita intervalelor disponibile.
        </p>
        <p>
          Reprogramarile solicitate dupa acest termen vor fi analizate in functie
          de situatie si de disponibilitate.
        </p>

        <h3>Neprezentarea</h3>
        <p>Daca persoana nu se prezinta si nu anunta:</p>
        <ul>
          <li>
            <LegalPlaceholder>
              [PROGRAMAREA SE CONSIDERA EFECTUATA SI AVANSUL NU SE RESTITUIE]
            </LegalPlaceholder>
            ;
          </li>
          <li>
            <LegalPlaceholder>
              [POATE FI REPROGRAMATA O SINGURA DATA]
            </LegalPlaceholder>
            ;
          </li>
          <li>
            <LegalPlaceholder>[NU EXISTA NICIO PENALIZARE]</LegalPlaceholder>.
          </li>
        </ul>
        <p>Se va pastra numai regula aleasa.</p>

        <h3>Intarzierea</h3>
        <p>
          O intarziere mai mare de{" "}
          <strong>{legalConfig.lateArrivalMinutes} minute</strong> poate conduce
          la:
        </p>
        <ul>
          <li>reducerea duratei consultatiei;</li>
          <li>reprogramarea acesteia;</li>
          <li>
            imposibilitatea desfasurarii consultatiei, daca ar afecta
            programarile urmatoare.
          </li>
        </ul>

        <h3>Anularea de catre Prestator</h3>
        <p>
          Daca Prestatorul nu poate desfasura consultatia, clientului i se va
          oferi:
        </p>
        <ul>
          <li>reprogramarea intr-un interval convenabil;</li>
          <li>
            restituirea integrala a sumei achitate in avans, daca este cazul.
          </li>
        </ul>
        <p>
          Prestatorul va informa clientul cat mai curand posibil folosind datele
          de contact furnizate.
        </p>

        <h3>Situatii exceptionale</h3>
        <p>
          In cazuri medicale, familiale sau tehnice neprevazute, partile pot
          conveni o solutie diferita de regulile generale, fara ca aceasta sa
          creeze obligatia aplicarii aceleiasi exceptii in alte situatii.
        </p>
      </section>

      <section className="legal-section" id="tarife">
        <h2>Tarife si plata</h2>
        <p>
          Tarifele sunt afisate pe website, in interfata de programare sau sunt
          comunicate inaintea confirmarii serviciului.
        </p>
        <p>Tarifele:</p>
        <ul>
          <li>
            <LegalPlaceholder>[INCLUD TVA]</LegalPlaceholder>;
          </li>
          <li>
            <LegalPlaceholder>
              [NU INCLUD TVA, PRESTATORUL FIIND NEPLATITOR DE TVA]
            </LegalPlaceholder>
            .
          </li>
        </ul>
        <p>Plata poate fi efectuata prin:</p>
        <ul>
          <li>
            <LegalPlaceholder>[NUMERAR]</LegalPlaceholder>;
          </li>
          <li>
            <LegalPlaceholder>[CARD LA CABINET]</LegalPlaceholder>;
          </li>
          <li>
            <LegalPlaceholder>[TRANSFER BANCAR]</LegalPlaceholder>;
          </li>
          <li>
            <LegalPlaceholder>[LINK DE PLATA]</LegalPlaceholder>;
          </li>
          <li>
            <LegalPlaceholder>[ALTA METODA]</LegalPlaceholder>.
          </li>
        </ul>
        <p>La momentul publicarii:</p>
        <ul>
          <li>
            <LegalPlaceholder>
              [WEBSITE-UL NU COLECTEAZA PLATI ONLINE]
            </LegalPlaceholder>
            ;
          </li>
          <li>
            <LegalPlaceholder>
              [PLATILE ONLINE SUNT PROCESATE PRIN FURNIZORUL ___]
            </LegalPlaceholder>
            .
          </li>
        </ul>
        <p>
          Prestatorul nu solicita transmiterea datelor cardului prin email,
          WhatsApp sau campurile libere ale programarii.
        </p>
      </section>

      <section className="legal-section" id="obligatii-utilizator">
        <h2>Obligatiile utilizatorului</h2>
        <p>Utilizatorul se obliga:</p>
        <ul>
          <li>sa furnizeze informatii corecte;</li>
          <li>sa nu foloseasca website-ul in scopuri ilegale sau abuzive;</li>
          <li>sa nu incerce accesarea neautorizata a sistemelor;</li>
          <li>sa respecte programarea si regulile comunicate;</li>
          <li>sa informeze Prestatorul despre imposibilitatea participarii;</li>
          <li>sa nu copieze sau distribuie neautorizat materialele primite;</li>
          <li>
            sa nu introduca informatii medicale detaliate in campurile publice de
            programare.
          </li>
        </ul>
      </section>

      <section className="legal-section" id="rezultate">
        <h2>Rezultatele serviciilor</h2>
        <p>
          Rezultatele pot varia in functie de situatia individuala, implicare,
          consecventa, stil de viata, conditii medicale si alti factori.
        </p>
        <p>Prestatorul nu garanteaza:</p>
        <ul>
          <li>obtinerea unei anumite greutati;</li>
          <li>pierderea unui anumit numar de kilograme;</li>
          <li>obtinerea rezultatelor intr-un termen fix;</li>
          <li>
            vindecarea sau tratarea unei afectiuni prin simpla utilizare a
            materialelor website-ului.
          </li>
        </ul>
      </section>

      <section className="legal-section" id="proprietate-intelectuala">
        <h2>Proprietatea intelectuala</h2>
        <p>
          Textele, materialele educationale, elementele grafice, fotografiile,
          logo-ul si structura website-ului sunt protejate de legislatia privind
          drepturile de autor si proprietatea intelectuala.
        </p>
        <p>
          Acestea nu pot fi copiate, reproduse, modificate, publicate,
          distribuite sau utilizate comercial fara acordul titularului
          drepturilor, cu exceptiile permise de lege.
        </p>
      </section>

      <section className="legal-section" id="servicii-externe">
        <h2>Servicii si linkuri externe</h2>
        <p>
          Website-ul poate utiliza sau contine legaturi catre servicii externe,
          precum Cal.com, Google Meet, Google Calendar, WhatsApp, Facebook si
          Instagram.
        </p>
        <p>
          Prestatorul nu controleaza integral functionarea, disponibilitatea si
          politicile acestor servicii.
        </p>
        <p>
          Utilizarea serviciilor externe poate fi supusa propriilor termeni si
          politici.
        </p>
      </section>

      <section className="legal-section" id="disponibilitate">
        <h2>Disponibilitatea website-ului</h2>
        <p>
          Prestatorul urmareste mentinerea website-ului functional si actualizat,
          dar nu garanteaza functionarea neintrerupta sau lipsa completa a
          erorilor.
        </p>
        <p>
          Website-ul poate fi temporar indisponibil pentru mentenanta,
          actualizari, defectiuni tehnice sau situatii independente de Prestator.
        </p>
      </section>

      <section className="legal-section" id="reclamatii">
        <h2>Reclamatii si solutionarea neintelegerilor</h2>
        <p>Pentru sesizari sau reclamatii, ne puteti contacta la:</p>
        <ul>
          <li>Email: {legalConfig.email}</li>
          <li>Telefon: {legalConfig.phone}</li>
        </ul>
        <p>
          Partile vor incerca solutionarea amiabila a eventualelor neintelegeri.
        </p>
        <p>
          In lipsa unei solutii amiabile, se vor aplica dispozitiile legale si
          competenta autoritatilor sau instantelor stabilite prin lege.
        </p>
      </section>

      <section className="legal-section" id="lege">
        <h2>Legea aplicabila</h2>
        <p>
          Prezentelor conditii li se aplica legislatia din Romania si legislatia
          Uniunii Europene aplicabila.
        </p>
        <p>
          Nicio prevedere nu limiteaza drepturile imperative recunoscute
          consumatorilor sau persoanelor vizate prin lege.
        </p>
      </section>

      <section className="legal-section" id="modificare">
        <h2>Modificarea termenilor</h2>
        <p>
          Termenii pot fi actualizati atunci cand se modifica serviciile,
          modalitatile de programare, tarifele, furnizorii sau cerintele legale.
        </p>
        <p>
          Versiunea actualizata va fi publicata pe website impreuna cu data
          ultimei actualizari.
        </p>
      </section>
    </>
  );
}
