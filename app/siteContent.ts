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
  aboutImage: "/images/Teodora-fruit-donut1.jpeg",
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
  "Îți dorești să îți gestionezi greutatea într-un mod echilibrat, fără diete extreme",
  "Ai o afecțiune în care alimentația are un rol important și ai nevoie de sprijin nutrițional specializat",
  "Te confrunți cu probleme digestive care îți afectează confortul și viața de zi cu zi",
  "Te simți copleșit de informațiile contradictorii despre alimentație și nu mai știi ce să alegi",
  "Ai urmat mai multe diete, dar rezultatele nu s-au menținut pe termen lung",
  "Vrei să îți formezi obiceiuri alimentare mai sănătoase, fără reguli rigide",
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

export const processSteps = [
  {
    title: "Ne cunoaștem",
    text: "Discutăm despre obiective, alimentație, stil de viață, analize și dificultățile pe care le întâmpini.",
  },
  {
    title: "Construim planul",
    text: "Primești recomandări personalizate și explicate clar, nu o listă rigidă de alimente permise și interzise.",
  },
  {
    title: "Urmărim evoluția",
    text: "Evaluăm ce funcționează, rezolvăm dificultățile și adaptăm strategia pe parcurs.",
  },
];

export const principles = [
  {
    title: "Personalizare",
    text: "Nu există o soluție identică pentru toate persoanele.",
  },
  {
    title: "Educație",
    text: "Înțelegi motivele din spatele recomandărilor.",
  },
  {
    title: "Echilibru",
    text: "Nu împărțim alimentele în «bune» și «rele».",
  },
  {
    title: "Aplicabilitate",
    text: "Planul trebuie să funcționeze în programul și viața ta reală.",
  },
];

export const faqItems = [
  {
    question: "Trebuie să fac analize înainte de consultație?",
    answer:
      "Nu este obligatoriu pentru prima discuție, dar analizele recente pot ajuta la o evaluare mai completă.",
  },
  {
    question: "Primesc un plan alimentar?",
    answer:
      "Da, recomandările sunt adaptate obiectivelor, programului și preferințelor tale, acolo unde planul este potrivit.",
  },
  {
    question: "Cât durează consultația?",
    answer:
      "Durata exactă se stabilește în funcție de tipul consultației. În prima versiune vom completa aici intervalele finale.",
  },
  {
    question: "Se pot face ședințe online?",
    answer:
      "Da, colaborarea poate avea loc online sau în Iași, în funcție de disponibilitate.",
  },
  {
    question: "Câte consultații sunt necesare?",
    answer:
      "Depinde de obiective, istoricul alimentar și nivelul de suport necesar. Stabilim împreună pașii potriviți.",
  },
];
