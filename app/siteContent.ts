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
  heroImage: "/images/teodora-approach.jpg",
  aboutImage: "/images/teodora-approach.jpg",
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
  "Licență în Nutriție și Dietetică",
  "Master în Nutriție și Dietetică",
  "Membru al Colegiului Dieteticienilor din România",
];

export const patientNeeds = [
  "Vrei să scazi în greutate fără diete extreme.",
  "Ai nevoie de sprijin în gestionarea unei afecțiuni metabolice.",
  "Te confrunți cu probleme digestive.",
  "Nu mai știi ce informații despre alimentație să crezi.",
  "Ai încercat mai multe diete, dar rezultatele nu s-au menținut.",
  "Vrei o relație mai echilibrată cu alimentația.",
];

export const services = [
  {
    slug: "consultatie-initiala",
    title: "Consultație nutrițională inițială",
    description:
      "Evaluarea alimentației, obiectivelor, stilului de viață și istoricului relevant.",
    buttonLabel: "Vezi consultația inițială",
  },
  {
    slug: "monitorizare",
    title: "Monitorizare nutrițională",
    description:
      "Urmărirea progresului, ajustarea recomandărilor și sprijin pentru aplicarea lor în viața de zi cu zi.",
    buttonLabel: "Vezi monitorizarea",
  },
  {
    slug: "pachet-personalizat",
    title: "Pachet nutrițional personalizat",
    description:
      "Un proces structurat pentru persoanele care au nevoie de evaluare, planificare și monitorizare pe o perioadă mai lungă.",
    buttonLabel: "Vezi pachetul",
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
