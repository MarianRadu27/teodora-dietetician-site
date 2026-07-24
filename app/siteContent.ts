export const brand = {
  name: "Teodora Pălii",
  role: "Nutriționist-Dietetician autorizat",
  shortRole: "Dietetician autorizat",
  location: "Consultații online sau in Iași",
  email: "dietetician.teodora@gmail.com",
  phoneDisplay: "0778 186 580",
  bookingUrl: "/programare",
  calComUrl: "https://cal.com/teodora-palii",
  whatsappUrl:
    process.env.NEXT_PUBLIC_WHATSAPP_URL ||
    "https://wa.me/40778186580?text=Buna%2C%20as%20vrea%20sa%20programez%20o%20consultatie.",
  instagramUrl: "https://www.instagram.com/dietetician.teodora/?hl=en",
  facebookUrl: "https://www.facebook.com/profile.php?id=61574269958054",
  heroImage: "/images/Teodora-fruit-donut3-transparent.PNG",
  aboutImage: "/images/Teodora-Graduation1.JPEG",
  aboutImage1: "/images/Teodora-cabinet.JPEG",
  aboutHomeImage: "/images/Teodora-lemons.PNG",
  contacImage: "/images/Teodora-fruit-phone.PNG",
};

export const navItems = [
  { label: "Acasă", href: "/" },
  { label: "Despre mine", href: "/despre" },
  { label: "Servicii", href: "/servicii" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
  { label: "Întrebări frecvente", href: "/faq" },
];

export const credentials = [
  "Licență și Master în Nutriție și Dietetică",
  "Membru al Colegiul Dieteticienilor din România",
];

export const patientNeeds = [
  "Îți dorești să îți gestionezi greutatea într-un mod echilibrat, fără diete extreme.",
  "Ai o afecțiune în care alimentația are un rol important și ai nevoie de sprijin nutrițional specializat.",
  "Te confrunți cu probleme digestive care îți afectează confortul și viața de zi cu zi.",
  "Te simți copleșit de informațiile contradictorii despre alimentație și nu mai știi ce să alegi.",
  "Ai urmat mai multe diete, dar rezultatele nu s-au menținut pe termen lung.",
  "Îți dorești să construiești obiceiuri alimentare echilibrate, pe care să le poți menține fără reguli rigide.",
];

export const services = [
  {
    slug: "consultatie-initiala",
    label: "PUNCTUL DE PLECARE",
    title: "Consultație nutrițională inițială",
    description:
      "Evaluăm alimentația, istoricul medical, stilul de viață și obiectivele tale, pentru a stabili direcția potrivită de intervenție.",
    href: "/servicii#consultatie-initiala",
    featured: true,
  },
  {
    slug: "plan-nutritional-personalizat",
    label: "MODALITATE DE COLABORARE",
    title: "Plan nutrițional personalizat",
    description:
      "Primești un plan structurat pe mese, adaptat programului, preferințelor și nevoilor tale nutriționale.",
    href: "/servicii#plan-nutritional-personalizat",
  },
  {
    slug: "consiliere-educatie-nutritionala",
    label: "MODALITATE DE COLABORARE",
    title: "Consiliere și educație nutrițională",
    description:
      "Înveți să îți organizezi singur mesele și să faci alegeri alimentare potrivite, fără să depinzi de un meniu fix.",
    href: "/servicii#consiliere-educatie-nutritionala",
  },
];

export const workProcess = {
  eyebrow: "MODUL DE LUCRU",
  title: "Un proces clar, adaptat nevoilor tale",
  introduction:
    "Trei etape simple, bazate pe personalizare, educație, echilibru și recomandări ușor de aplicat.",
  steps: [
    {
      number: "1",
      principle: "PERSONALIZARE",
      title: "Ne cunoaștem",
      description:
        "Discutăm despre obiectivele tale, starea de sănătate, programul zilnic, preferințele alimentare și dificultățile întâmpinate, pentru a înțelege ce ți se potrivește cu adevărat.",
    },
    {
      number: "2",
      principle: "EDUCAȚIE ȘI ECHILIBRU",
      title: "Stabilim direcția potrivită",
      description:
        "Construim împreună o abordare echilibrată și îți explic motivele din spatele recomandărilor, fără reguli rigide sau împărțirea alimentelor în „bune” și „rele”.",
    },
    {
      number: "3",
      principle: "APLICABILITATE",
      title: "Aplicăm și ajustăm",
      description:
        "Integrăm recomandările treptat în viața ta de zi cu zi, urmărim ce funcționează și facem ajustări realiste, care pot fi menținute pe termen lung.",
    },
  ],
};

export const principles = [
  {
    title: "Personalizare",
    text: "Nu există o soluție identică pentru toate persoanele, de aceea abordarea este adaptată situației tale reale. ",
  },
  {
    title: "Educație",
    text: "Îți explic motivele din spatele recomandărilor. Scopul este să dobândești treptat cunoștințele necesare pentru a lua singur decizii alimentare informate.",
  },
  {
    title: "Echilibru",
    text: "Nu împărțim alimentele în „bune” și „rele”. Construim o alimentație variată și flexibilă, potrivită atât pentru nevoile organismului, cât și pentru preferințe. ",
  },
  {
    title: "Aplicabilitate",
    text: "Recomandările trebuie să fie clare, accesibile și realiste, , pe care să le poți integra în programul și stilul tău de viață, menținute pe termen lung.",
  },
];

export const faqCategories = [
  {
    id: "inainte-de-consultatie",
    title: "Înainte de consultație",
    href: "/faq?categorie=inainte-de-consultatie#inainte-de-consultatie",
    items: [
      {
        question: "Cum se desfășoară prima consultație?",
        answer:
          "Prima consultație începe cu o discuție despre obiectivele tale, stilul de viață, programul zilnic, obiceiurile alimentare și istoricul medical. Vom analiza împreună dificultățile pe care le întâmpini și vom stabili direcțiile potrivite pentru tine. În cazul consultațiilor fizice se face o evaluare rapidă și ușoară a compoziției corporale prin bioimpedanță, de exemplu masa grasă, masa musculară și apa corporală.",
      },
      {
        question: "Cât durează o consultație nutrițională?",
        answer:
          "Prima consultație durează aproximativ 90 de minute, pentru a avea suficient timp să discutăm toate informațiile importante. Consultațiile de monitorizare pot avea o durată mai scurtă, aproximativ 30 de minute, în funcție de nevoile fiecărui pacient.",
      },
      {
        question: "Ce trebuie să aduc la prima consultație?",
        answer:
          "Este util să aduci analizele medicale recente, eventualele scrisori sau recomandări medicale și o listă cu medicamentele și suplimentele pe care le utilizezi. Poți nota și întrebările pe care dorești să le discutăm, astfel încât să nu omiți nimic important.",
      },
      {
        question: "Trebuie să fac analize înainte de consultație?",
        answer:
          "Nu este obligatoriu să efectuezi analize special pentru prima consultație. Dacă ai analize recente, este recomandat să le aduci, deoarece mă ajută să înțeleg mai bine starea ta de sănătate. În cazul în care sunt necesare investigații suplimentare, acestea vor fi recomandate de medicul potrivit.",
      },
      {
        question: "Este necesară o trimitere de la medic?",
        answer:
          "Nu, nu este necesară o trimitere pentru a beneficia de consiliere nutrițională. Dacă ai o afecțiune diagnosticată sau urmezi un tratament, este util să aduci documentele medicale relevante și recomandările primite de la medic.",
      },
      {
        question: "Trebuie să pregătesc un jurnal alimentar înainte de consultație?",
        answer:
          "Jurnalul alimentar nu este obligatoriu, dar poate fi foarte util. Poți nota timp de 2 sau 3 zile alimentele și băuturile consumate, orele meselor și eventualele simptome sau dificultăți observate. Nu trebuie să modifici intenționat modul în care mănânci în perioada respectivă. Mă ajută să înțeleg mai bine programul tău zilnic și obiceiurile alimentare.",
      },
      {
        question: "Este necesar să cunosc exact greutatea și înălțimea mea?",
        answer:
          "Nu este necesar să le cunoști cu exactitate înainte de consultație. În cadrul consultației fizice, acestea pot fi măsurate, cu acordul tău. Pentru consultațiile online, poți comunica valorile cunoscute sau măsurate acasă.",
      },
      {
        question: "Pot veni însoțit la consultație?",
        answer:
          "Da, poți veni însoțit dacă prezența unei persoane apropiate te ajută să te simți mai confortabil sau dacă aceasta participă la cumpărături și la pregătirea meselor. Discuțiile vor avea loc cu respectarea confidențialității și a dorințelor tale.",
      },
    ],
  },
  {
    id: "plan-alimentar",
    title: "Despre planul alimentar",
    href: "/faq?categorie=plan-alimentar#plan-alimentar",
    items: [
      {
        question: "Voi primi planul alimentar în aceeași zi?",
        answer:
          "În timpul primei consultații vei primi recomandările inițiale și vom stabili principalele direcții ale intervenției nutriționale. Planul alimentar detaliat este pregătit ulterior, după analizarea informațiilor discutate, și va fi transmis în termenul comunicat la consultație, de obicei 3-4 zile.",
      },
      {
        question: "Planul alimentar este personalizat?",
        answer:
          "Da. Planul este realizat în funcție de obiectivele tale, starea de sănătate, programul zilnic, preferințele alimentare, nivelul de activitate și posibilitățile tale reale. Nu folosesc aceeași variantă de plan pentru toți pacienții.",
      },
      {
        question: "Ce se întâmplă dacă nu îmi plac anumite alimente?",
        answer:
          "Planul alimentar va ține cont de preferințele și obiceiurile tale. Alimentele care nu îți plac pot fi înlocuite cu alternative potrivite, astfel încât planul să fie realist și să poată fi urmat pe termen lung.",
      },
      {
        question: "Voi fi nevoit să cântăresc toate alimentele și să notez zilnic tot ce mănânc?",
        answer:
          "Nu neapărat. Cântărirea alimentelor sau completarea unui jurnal pot fi recomandate temporar, atunci când ajută la înțelegerea porțiilor și a obiceiurilor alimentare. Scopul nu este să devii dependent de cântar, ci să înveți să faci alegeri potrivite și în mod intuitiv.",
      },
      {
        question: "Planul alimentar conține rețete și alternative?",
        answer:
          "Planul poate include idei de mese, variante de înlocuire și recomandări practice pentru organizarea alimentației. Conținutul acestuia va fi adaptat serviciului ales și nevoilor stabilite în cadrul consultației.",
      },
    ],
  },
  {
    id: "afectiuni-si-tratamente",
    title: "Afecțiuni și tratamente",
    href: "/faq?categorie=afectiuni-si-tratamente#afectiuni-si-tratamente",
    items: [
      {
        question:
          "Pot beneficia de consiliere nutrițională dacă am una sau mai multe afecțiuni medicale?",
        answer:
          "Da, consilierea nutrițională poate fi adaptată persoanelor care au diferite afecțiuni metabolice, digestive, cardiovasculare sau alte probleme de sănătate influențate de alimentație. Recomandările vor fi formulate în limitele competenței profesionale și, atunci când este necesar, în colaborare cu medicul curant.",
      },
      {
        question:
          "Recomandările vor ține cont de diagnosticul, analizele și tratamentul meu?",
        answer:
          "Da. Diagnosticul, rezultatele analizelor, simptomele și tratamentul urmat sunt informații importante pentru adaptarea recomandărilor. De aceea, este necesar să comunici toate datele medicale relevante și eventualele modificări apărute pe parcurs.",
      },
      {
        question:
          "Consilierea nutrițională poate înlocui tratamentul prescris de medic?",
        answer:
          "Nu. Consilierea nutrițională completează îngrijirea medicală, dar nu înlocuiește consultațiile, investigațiile sau tratamentul prescris de medic. Medicația nu trebuie întreruptă sau modificată fără acordul medicului curant.",
      },
    ],
  },
  {
    id: "monitorizare-online",
    title: "Monitorizare și consultații online",
    href: "/faq?categorie=monitorizare-online#monitorizare-online",
    items: [
      {
        question: "Ce fac dacă întâmpin dificultăți între consultații?",
        answer:
          "Este recomandat să notezi dificultățile, întrebările și situațiile în care planul a fost greu de aplicat, pentru a le analiza la următoarea monitorizare. În funcție de serviciul ales, anumite întrebări punctuale pot fi transmise și prin canalul de comunicare stabilit la începutul colaborării.",
      },
      {
        question: "Cât de des sunt recomandate consultațiile de monitorizare?",
        answer:
          "Frecvența consultațiilor este stabilită individual. La început, monitorizările pot avea loc la un interval de aproximativ 2 săptămâni, iar ulterior pot deveni mai rare, în funcție de evoluție, obiective și gradul de autonomie dobândit.",
      },
      {
        question: "Consultațiile se pot desfășura și online?",
        answer:
          "Da. Consultațiile online se desfășoară prin apel video și includ discuția despre obiective, istoricul medical, alimentație și stilul de viață. Documentele și planul alimentar pot fi transmise în format electronic.",
      },
      {
        question: "Pot alterna consultațiile fizice cu cele online?",
        answer:
          "Da, consultațiile fizice și cele online pot fi alternate în funcție de program, locație și nevoile tale. Este important ca monitorizarea să fie realizată cu regularitate, indiferent de modalitatea aleasă.",
      },
    ],
  },
];

export const faqItems = faqCategories.flatMap((category) => category.items);
