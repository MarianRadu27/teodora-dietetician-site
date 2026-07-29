import { LegalValue } from "../../app/components/legal/LegalPlaceholder";
import type { LegalTocItem } from "../../app/components/legal/LegalTableOfContents";
import { legalConfig } from "../../config/legal";
import { getOfficeLocationAddress, officeLocation } from "../../config/officeLocation";

export const termsTocItems: LegalTocItem[] = [
  { id: "furnizor", title: "Identificarea furnizorului" },
  { id: "rol-website", title: "Rolul website-ului" },
  { id: "servicii", title: "Serviciile prezentate" },
  { id: "informatii-publicate", title: "Caracterul informațiilor publicate" },
  { id: "programare", title: "Efectuarea programării" },
  { id: "consultatii-online", title: "Consultațiile online" },
  { id: "consultatii-cabinet", title: "Consultațiile în cabinet" },
  {
    id: "locatia-consultatiilor-fizice",
    title: "Locația consultațiilor fizice",
  },
  { id: "anulare-si-reprogramare", title: "Anularea și reprogramarea" },
  { id: "tarife", title: "Tarife și plată" },
  { id: "obligatii-utilizator", title: "Obligațiile utilizatorului" },
  { id: "rezultate", title: "Rezultatele serviciilor" },
  { id: "proprietate-intelectuala", title: "Proprietatea intelectuală" },
  { id: "servicii-externe", title: "Servicii și linkuri externe" },
  { id: "disponibilitate", title: "Disponibilitatea website-ului" },
  { id: "reclamatii", title: "Reclamații și soluționarea neînțelegerilor" },
  { id: "lege", title: "Legea aplicabilă" },
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
            Cod de identificare fiscală: <LegalValue value={legalConfig.taxId} />
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
            Situație TVA: <LegalValue value={legalConfig.vatStatus} />
          </li>
        </ul>
        <p>În continuare, furnizorul va fi denumit „Prestatorul”.</p>
      </section>

      <section className="legal-section" id="rol-website">
        <h2>Rolul website-ului</h2>
        <p>Website-ul are rolul de a:</p>
        <ul>
          <li>prezenta activitatea și serviciile Prestatorului;</li>
          <li>furniza informații cu caracter general și educațional;</li>
          <li>permite solicitarea programărilor;</li>
          <li>facilita comunicarea cu persoanele interesate.</li>
        </ul>
        <p>
          Utilizarea website-ului presupune consultarea și respectarea
          prezentelor condiții.
        </p>
      </section>

      <section className="legal-section" id="servicii">
        <h2>Serviciile prezentate</h2>
        <p>Serviciile pot include:</p>
        <ul>
          <li>educație nutrițională;</li>
          <li>servicii de nutriție generală;</li>
          <li>consultații nutriționale inițiale;</li>
          <li>consultații de control;</li>
          <li>consultații online;</li>
          <li>consultații în cabinet;</li>
        </ul>
        <p>
          Descrierea, durata, tariful și condițiile specifice fiecărui serviciu
          sunt afișate pe pagina serviciului sau în interfața de programare.
        </p>
        <p>
          Prestatorul poate modifica structura serviciilor, cu respectarea
          programărilor deja confirmate.
        </p>
      </section>

      <section className="legal-section" id="informatii-publicate">
        <h2>Caracterul informațiilor publicate</h2>
        <p>
          Materialele de pe website au caracter general, informativ și
          educațional.
        </p>
        <p>Acestea:</p>
        <ul>
          <li>nu reprezintă un diagnostic;</li>
          <li>nu constituie un plan nutrițional individual;</li>
          <li>nu înlocuiesc evaluarea personalizată;</li>
          <li>
            nu înlocuiesc consultația medicală, investigațiile sau tratamentul
            prescris de medic;
          </li>
          <li>nu sunt destinate gestionării urgențelor medicale.</li>
        </ul>
        <p>
          Pentru o recomandare individuală este necesară evaluarea situației
          concrete în cadrul unei consultații.
        </p>
        <p>
          În caz de urgență medicală, utilizați serviciile medicale de urgență și
          nu formularul de programare, emailul sau WhatsApp.
        </p>
      </section>

      <section className="legal-section" id="programare">
        <h2>Efectuarea programării</h2>
        <p>Programările sunt gestionate prin Cal.com.</p>
        <p>Pentru programare, utilizatorul va putea selecta:</p>
        <ol>
          <li>serviciul;</li>
          <li>modalitatea online sau în cabinet;</li>
          <li>data și ora disponibile;</li>
          <li>datele solicitate pentru confirmare.</li>
        </ol>
        <p>
          Programarea este considerată înregistrată după finalizarea procesului
          și primirea mesajului de confirmare.
        </p>
        <p>
          Utilizatorul este responsabil pentru furnizarea unor date de contact
          corecte.
        </p>
        <p>
          Confirmarea automată nu înlocuiește eventualele informații suplimentare
          privind plata, documentele necesare sau condițiile specifice
          serviciului.
        </p>
      </section>

      <section className="legal-section" id="consultatii-online">
        <h2>Consultațiile online</h2>
        <p>Pentru consultațiile online, utilizatorul este responsabil să dispună de:</p>
        <ul>
          <li>un dispozitiv compatibil;</li>
          <li>conexiune stabilă la internet;</li>
          <li>acces la platforma indicată;</li>
          <li>un spațiu adecvat și suficient de privat.</li>
        </ul>
        <p>
          Linkul consultației va fi transmis prin email.
        </p>
        <p>
          Prestatorul nu răspunde pentru imposibilitatea desfășurării
          consultației cauzată exclusiv de dispozitivul, conexiunea sau setările
          utilizatorului.
        </p>
      </section>

      <section className="legal-section" id="consultatii-cabinet">
        <h2>Consultațiile în cabinet</h2>
        <p>
          Consultațiile fizice se desfășoară la {officeLocation.name}, la adresa{" "}
          {getOfficeLocationAddress()}, comunicată și în confirmarea programării.
        </p>
        <p>
          Utilizatorul trebuie să se prezinte la ora stabilită și să respecte
          regulile comunicate pentru accesul în cabinet.
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
        <p className="eyebrow">Secțiune importantă</p>
        <h2>Anularea și reprogramarea consultațiilor</h2>
        {/*
        <p className="legal-note">
          Această secțiune trebuie afișată vizibil și trebuie confirmate valorile
          dintre paranteze înaintea publicării.
        </p>
        */}
        <h3>Anularea de către client</h3>
        <p>
          Programarea poate fi anulată fără costuri cu cel puțin{" "}
          <strong>{legalConfig.cancellationNoticeHours} de ore</strong> înaintea
          orei stabilite, prin linkul din emailul de confirmare sau prin
          contactarea Prestatorului.
        </p>

        <h3>Reprogramarea</h3>
        <p>
          Consultația poate fi reprogramată cu cel puțin{" "}
          <strong>{legalConfig.cancellationNoticeHours} de ore</strong> înainte,
          în limita intervalelor disponibile.
        </p>
        <p>
          Reprogramările solicitate după acest termen vor fi analizate în funcție
          de situație și de disponibilitate.
        </p>

        <h3>Neprezentarea</h3>
        <p>Dacă persoana nu se prezintă și nu anunță:</p>
        <ul>
          <li>
              Poate fi reprogramată o singură dată;
          </li>
        </ul>

        <h3>Întârzierea</h3>
        <p>
          O întârziere mai mare de{" "}
          <strong>{legalConfig.lateArrivalMinutes} minute</strong> poate conduce
          la:
        </p>
        <ul>
          <li>reducerea duratei consultației;</li>
          <li>reprogramarea acesteia;</li>
          <li>
            imposibilitatea desfășurării consultației, dacă ar afecta
            programările următoare.
          </li>
        </ul>

        <h3>Anularea de către Prestator</h3>
        <p>
          Dacă Prestatorul nu poate desfășura consultația, clientului i se va
          oferi:
        </p>
        <ul>
          <li>reprogramarea într-un interval convenabil;</li>
          <li>
            restituirea integrală a sumei achitate în avans, dacă este cazul.
          </li>
        </ul>
        <p>
          Prestatorul va informa clientul cât mai curând posibil folosind datele
          de contact furnizate.
        </p>

        <h3>Situații excepționale</h3>
        <p>
          În cazuri medicale, familiale sau tehnice neprevăzute, părțile pot
          conveni o soluție diferită de regulile generale, fără ca aceasta să
          creeze obligația aplicării aceleiași excepții în alte situații.
        </p>
      </section>

      <section className="legal-section" id="tarife">
        <h2>Tarife și plată</h2>
        <p>
          Tarifele sunt afișate pe website, în interfața de programare sau sunt
          comunicate înaintea confirmării serviciului.
        </p>
        <p>Tarifele:</p>
        <ul>
          <li>
            Nu includ TVA, prestatorul fiind neplătitor de TVA.
          </li>
        </ul>
        <p>Plata poate fi efectuată prin:</p>
        <ul>
          <li>
            Numerar;
          </li>
          <li>
            Card la cabinet;
          </li>
          <li>
            Transfer bancar;
          </li>
        </ul>
        <p>La momentul publicării:</p>
        <ul>
          <li>
              Website-ul nu colectează plăți online;
          </li>
        </ul>
        <p>
          Prestatorul nu solicită transmiterea datelor cardului prin email,
          WhatsApp sau câmpurile libere ale programării.
        </p>
      </section>

      <section className="legal-section" id="obligatii-utilizator">
        <h2>Obligațiile utilizatorului</h2>
        <p>Utilizatorul se obligă:</p>
        <ul>
          <li>să furnizeze informații corecte;</li>
          <li>să nu folosească website-ul în scopuri ilegale sau abuzive;</li>
          <li>să nu încerce accesarea neautorizată a sistemelor;</li>
          <li>să respecte programarea și regulile comunicate;</li>
          <li>să informeze Prestatorul despre imposibilitatea participării;</li>
          <li>să nu copieze sau distribuie neautorizat materialele primite;</li>
          <li>
            să nu introducă informații medicale detaliate în câmpurile publice de
            programare.
          </li>
        </ul>
      </section>

      <section className="legal-section" id="rezultate">
        <h2>Rezultatele serviciilor</h2>
        <p>
          Rezultatele pot varia în funcție de situația individuală, implicare,
          consecvență, stil de viață, condiții medicale și alți factori.
        </p>
        <p>Prestatorul nu garantează:</p>
        <ul>
          <li>obținerea unei anumite greutăți;</li>
          <li>pierderea unui anumit număr de kilograme;</li>
          <li>obținerea rezultatelor într-un termen fix;</li>
          <li>
            vindecarea sau tratarea unei afecțiuni prin simpla utilizare a
            materialelor website-ului.
          </li>
        </ul>
      </section>

      <section className="legal-section" id="proprietate-intelectuala">
        <h2>Proprietatea intelectuală</h2>
        <p>
          Textele, materialele educaționale, elementele grafice, fotografiile,
          logo-ul și structura website-ului sunt protejate de legislația privind
          drepturile de autor și proprietatea intelectuală.
        </p>
        <p>
          Acestea nu pot fi copiate, reproduse, modificate, publicate,
          distribuite sau utilizate comercial fără acordul titularului
          drepturilor, cu excepțiile permise de lege.
        </p>
      </section>

      <section className="legal-section" id="servicii-externe">
        <h2>Servicii și linkuri externe</h2>
        <p>
          Website-ul poate utiliza sau conține legături către servicii externe,
          precum Cal.com, Google Meet, Google Calendar, WhatsApp, Facebook și
          Instagram.
        </p>
        <p>
          Prestatorul nu controlează integral funcționarea, disponibilitatea și
          politicile acestor servicii.
        </p>
        <p>
          Utilizarea serviciilor externe poate fi supusă propriilor termeni și
          politici.
        </p>
      </section>

      <section className="legal-section" id="disponibilitate">
        <h2>Disponibilitatea website-ului</h2>
        <p>
          Prestatorul urmărește menținerea website-ului funcțional și actualizat,
          dar nu garantează funcționarea neîntreruptă sau lipsa completă a
          erorilor.
        </p>
        <p>
          Website-ul poate fi temporar indisponibil pentru mentenanță,
          actualizări, defecțiuni tehnice sau situații independente de Prestator.
        </p>
      </section>

      <section className="legal-section" id="reclamatii">
        <h2>Reclamații și soluționarea neînțelegerilor</h2>
        <p>Pentru sesizări sau reclamații, ne puteți contacta la:</p>
        <ul>
          <li>Email: {legalConfig.email}</li>
          <li>Telefon: {legalConfig.phone}</li>
        </ul>
        <p>
          Părțile vor încerca soluționarea amiabilă a eventualelor neînțelegeri.
        </p>
        <p>
          În lipsa unei soluții amiabile, se vor aplica dispozițiile legale și
          competența autorităților sau instanțelor stabilite prin lege.
        </p>
      </section>

      <section className="legal-section" id="lege">
        <h2>Legea aplicabilă</h2>
        <p>
          Prezentelor condiții li se aplică legislația din România și legislația
          Uniunii Europene aplicabilă.
        </p>
        <p>
          Nicio prevedere nu limitează drepturile imperative recunoscute
          consumatorilor sau persoanelor vizate prin lege.
        </p>
      </section>

      <section className="legal-section" id="modificare">
        <h2>Modificarea termenilor</h2>
        <p>
          Termenii pot fi actualizați atunci când se modifică serviciile,
          modalitățile de programare, tarifele, furnizorii sau cerințele legale.
        </p>
        <p>
          Versiunea actualizată va fi publicată pe website împreună cu data
          ultimei actualizări.
        </p>
      </section>
    </>
  );
}
