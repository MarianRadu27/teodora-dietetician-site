export type NutritionServiceCategory =
  | "initial"
  | "collaboration-path"
  | "follow-up";

export type NutritionService = {
  id: string;
  title: string;
  category: NutritionServiceCategory;
  description: string;
  durationMinutes: number | null;
  priceLei: number | null;
  durationLabel?: string;
  priceLabel?: string;
  modalityLabel?: string;
  audienceLabel?: string;
  detailsAnchor: string;
  availableOnline: boolean;
  availableInOffice: boolean;
  existingClientsOnly: boolean;
  bookingEnabled: boolean;
  bookingQuery?: string;
  features: string[];
};

export type NutritionPlanOption = {
  id: string;
  durationMonths: number;
  priceLei: number;
  deliveryDays: number;
};

export type CollaborationPath = {
  id: string;
  detailsAnchor: string;
  title: string;
  summary: string;
  orientationLabel: string;
  suitabilityTitle: string;
  suitability: string[];
  explanation: string;
  ctaLabel: string;
  bookingQuery: string;
};

export type ServicePricingCard = {
  id: string;
  title: string;
  badge?: string;
  meta: string;
  description: string;
  note?: string;
  primaryAction: {
    label: string;
    href: string;
    variant?: "primary" | "secondary";
  };
  detailsAction: {
    label: string;
    href?: string;
    content?: string[];
  };
  featured?: boolean;
};

export const servicesHero = {
  title: "Servicii de nutriție și dietetică",
};

export const initialConsultationModeNotes = {
  office:
    "Consultația în cabinet poate include analiza compoziției corporale prin bioimpedanță.",
  online:
    "În cazul consultației online, analiza compoziției corporale prin bioimpedanță nu poate fi realizată în timpul ședinței și poate fi programată separat, dacă este necesară.",
};

export const nutritionServices: NutritionService[] = [
  {
    id: "consultatie-initiala",
    title: "Consultație nutrițională inițială",
    category: "initial",
    description:
      "Consultația inițială reprezintă prima etapă a colaborării. Aceasta ne ajută să înțelegem situația actuală, nevoile și obiectivele tale și să alegem direcția de lucru potrivită.",
    durationMinutes: 90,
    priceLei: 390,
    durationLabel: "90 de minute",
    priceLabel: "390 de lei",
    modalityLabel: "Online sau în cabinet",
    audienceLabel: "Punctul de început al colaborării",
    detailsAnchor: "consultatie-initiala",
    availableOnline: true,
    availableInOffice: true,
    existingClientsOnly: false,
    bookingEnabled: true,
    bookingQuery: "/programare?serviciu=consultatie-initiala",
    features: [
      "evaluarea statusului nutrițional",
      "analiza istoricului medical și alimentar",
      "analiza documentelor și investigațiilor medicale relevante",
      "analiza compoziției corporale prin bioimpedanță",
      "stabilirea obiectivelor și a direcției intervenției nutriționale",
      "recomandări generale pentru îmbunătățirea stilului de viață",
      "alegerea modalității de colaborare potrivite",
    ],
  },
  {
    id: "plan-nutritional-personalizat",
    title: "Plan nutrițional personalizat",
    category: "collaboration-path",
    description:
      "Un plan structurat pe mese, adaptat programului, preferințelor și obiectivelor tale.",
    durationMinutes: null,
    priceLei: null,
    durationLabel: "1, 2 sau 3 luni",
    priceLabel: "de la 350 de lei",
    modalityLabel: "Disponibil după consultația inițială",
    audienceLabel: "Pentru persoanele care au nevoie de structură",
    detailsAnchor: "plan-nutritional-personalizat",
    availableOnline: true,
    availableInOffice: true,
    existingClientsOnly: true,
    bookingEnabled: false,
    features: [
      "mese organizate clar",
      "adaptare la program și preferințe",
      "direcție concretă de aplicare",
      "posibilitate de ajustare pe parcurs",
    ],
  },
  {
    id: "consiliere-educatie-nutritionala",
    title: "Consiliere și educație nutrițională",
    category: "collaboration-path",
    description:
      "Recomandări și sprijin practic pentru a învăța să îți organizezi singur alimentația, fără un meniu fix.",
    durationMinutes: null,
    priceLei: null,
    durationLabel: "Direcție de lucru continuă",
    priceLabel: "stabilit în funcție de ședințe",
    modalityLabel: "Online sau în cabinet",
    audienceLabel: "Pentru mai multă flexibilitate și autonomie",
    detailsAnchor: "consiliere-educatie-nutritionala",
    availableOnline: true,
    availableInOffice: true,
    existingClientsOnly: true,
    bookingEnabled: false,
    features: [
      "flexibilitate în alegeri",
      "explicații adaptate situației tale",
      "obiceiuri alimentare mai clare",
      "autonomie pe termen lung",
    ],
  },
  {
    id: "monitorizare-plan",
    title: "Monitorizare și ajustare a planului nutrițional",
    category: "follow-up",
    description:
      "Analizăm modul în care a fost aplicat planul, discutăm progresul și ajustăm recomandările.",
    durationMinutes: 30,
    priceLei: 150,
    durationLabel: "30 de minute",
    priceLabel: "150 de lei",
    modalityLabel: "Recomandată la aproximativ 2-3 săptămâni",
    audienceLabel: "Pentru pacienții care urmează un plan nutrițional",
    detailsAnchor: "monitorizare-plan",
    availableOnline: true,
    availableInOffice: true,
    existingClientsOnly: true,
    bookingEnabled: true,
    bookingQuery: "/programare?serviciu=monitorizare-plan",
    features: [
      "analizăm aplicarea planului",
      "discutăm progresul și dificultățile",
      "clarificăm întrebările",
      "ajustăm planul și recomandările",
      "stabilim următorii pași",
    ],
  },
  {
    id: "consiliere-nutritionala",
    title: "Ședință de consiliere și educație nutrițională",
    category: "follow-up",
    description:
      "O ședință dedicată recomandărilor practice, explicațiilor și dezvoltării autonomiei alimentare.",
    durationMinutes: 60,
    priceLei: 200,
    durationLabel: "60 de minute",
    priceLabel: "200 de lei",
    modalityLabel: "Recomandată la aproximativ 2-4 săptămâni",
    audienceLabel: "Pentru persoanele care urmează această direcție de colaborare",
    detailsAnchor: "consiliere-nutritionala",
    availableOnline: true,
    availableInOffice: true,
    existingClientsOnly: true,
    bookingEnabled: true,
    bookingQuery: "/programare?serviciu=consiliere-nutritionala",
    features: [
      "organizarea meselor",
      "alcătuirea unei mese echilibrate",
      "alegerea porțiilor",
      "etichetele alimentare",
      "cumpărăturile",
      "mesele în oraș, la serviciu sau în vacanță",
      "obiceiurile alimentare",
      "adaptarea alimentației la stilul de viață",
      "recomandări adaptate stării de sănătate",
    ],
  },
];

export const nutritionPlanOptions: NutritionPlanOption[] = [
  {
    id: "plan-1-luna",
    durationMonths: 1,
    priceLei: 350,
    deliveryDays: 4,
  },
  {
    id: "plan-2-luni",
    durationMonths: 2,
    priceLei: 600,
    deliveryDays: 7,
  },
  {
    id: "plan-3-luni",
    durationMonths: 3,
    priceLei: 1000,
    deliveryDays: 10,
  },
];

export const collaborationPaths: CollaborationPath[] = [
  {
    id: "plan-personalizat",
    detailsAnchor: "plan-nutritional-personalizat",
    title: "Plan nutrițional personalizat",
    summary:
      "Potrivit dacă îți dorești un plan structurat pe mese, adaptat nevoilor nutriționale, programului zilnic, preferințelor și obiectivelor tale.",
    orientationLabel: "Mai multă structură și claritate",
    suitabilityTitle: "Potrivit dacă:",
    suitability: [
      "îți este dificil să îți organizezi mesele singur",
      "ai nevoie de claritate și structură",
      "preferi un ghid concret, pas cu pas",
      "ai un obiectiv specific și vrei un plan clar",
    ],
    explanation:
      "Planul este realizat după consultația inițială și după evaluarea informațiilor medicale și nutriționale. Poate fi ajustat pe parcurs, în funcție de evoluție și de dificultățile întâmpinate.",
    ctaLabel: "Începe cu o consultație inițială",
    bookingQuery: "/programare?serviciu=consultatie-initiala",
  },
  {
    id: "educatie-nutritionala",
    detailsAnchor: "consiliere-educatie-nutritionala",
    title: "Consiliere și educație nutrițională",
    summary:
      "Potrivită dacă nu îți dorești un meniu fix, ci vrei să înțelegi principiile unei alimentații echilibrate și să înveți să îți organizezi singur mesele.",
    orientationLabel: "Mai multă flexibilitate și autonomie",
    suitabilityTitle: "Potrivit dacă:",
    suitability: [
      "vrei flexibilitate și nu îți place să urmezi un plan exact",
      "vrei să înțelegi „de ce” și „cum”, nu doar „ce să mănânci”",
      "ai deja anumite obiceiuri și vrei să le îmbunătățești",
      "îți dorești autonomie pe termen lung",
    ],
    explanation:
      "În locul unui plan structurat pe zile și mese, vei primi recomandări practice și explicații adaptate situației tale. Vom lucra treptat la dezvoltarea unor obiceiuri pe care să le poți aplica și menține în viața de zi cu zi.",
    ctaLabel: "Începe cu o consultație inițială",
    bookingQuery: "/programare?serviciu=consultatie-initiala",
  },
];

export const servicesPricingCards: ServicePricingCard[] = [
  {
    id: "consultatie-initiala",
    featured: true,
    badge: "Punct de pornire",
    title: "Consultație nutrițională inițială",
    meta: "90 de minute · 390 de lei · Online sau în cabinet",
    description:
      "Evaluare completă a alimentației, istoricului medical, stilului de viață și obiectivelor tale, pentru stabilirea direcției potrivite.",
    primaryAction: {
      label: "Programare",
      href: "/programare?serviciu=consultatie-initiala",
      variant: "primary",
    },
    detailsAction: {
      label: "Detalii",
      href: "/servicii#consultatie-initiala",
    },
  },
  {
    id: "plan-nutritional-personalizat",
    title: "Plan nutrițional personalizat",
    meta: "Disponibil pentru 1, 2 sau 3 luni",
    note: "Prețul și termenul de realizare variază în funcție de perioada aleasă.",
    description:
      "Plan alimentar structurat, adaptat nevoilor, programului și preferințelor tale.",
    primaryAction: {
      label: "Începe cu consultația",
      href: "/programare?serviciu=consultatie-initiala",
      variant: "secondary",
    },
    detailsAction: {
      label: "Detalii",
      href: "/servicii#plan-nutritional-personalizat",
    },
  },
  {
    id: "monitorizare-plan",
    title: "Monitorizare și ajustare a planului nutrițional",
    meta: "30 de minute · 150 de lei",
    description:
      "Analizăm progresul, discutăm dificultățile întâmpinate și ajustăm recomandările în funcție de evoluția ta.",
    note: "Recomandată la aproximativ 2-3 săptămâni.",
    primaryAction: {
      label: "Programare",
      href: "/programare?serviciu=monitorizare-plan",
      variant: "primary",
    },
    detailsAction: {
      label: "Detalii",
      href: "/servicii#monitorizare-plan",
    },
  },
  {
    id: "consiliere-nutritionala",
    title: "Ședință de consiliere și educație nutrițională",
    meta: "60 de minute · 200 de lei",
    description:
      "Înveți să îți organizezi mesele și să faci alegeri potrivite, fără să depinzi de un meniu fix.",
    note: "Recomandată la aproximativ 2-4 săptămâni.",
    primaryAction: {
      label: "Programare",
      href: "/programare?serviciu=consiliere-nutritionala",
      variant: "primary",
    },
    detailsAction: {
      label: "Detalii",
      href: "/servicii#consiliere-nutritionala",
    },
  },
  {
    id: "analiza-compozitie-corporala",
    title: "Analiza compoziției corporale",
    meta: "10 minute · 60 de lei",
    description:
      "Este inclusă doar în consultația nutrițională inițială, pentru celelalte ședințe trebuie solicitată separat.",
    primaryAction: {
      label: "Programare",
      href: "/programare?modalitate=cabinet&serviciu=analiza-compozitie-corporala",
      variant: "primary",
    },
    detailsAction: {
      label: "Detalii",
      content: [
        "Analiza prin bioimpedanță, realizată cu analizorul Seca mBCA 515, oferă informații despre compoziția corporală și poate include parametri precum greutatea, masa musculară, masa de țesut adipos și procentul de apă din organism.",
        "Utilă pentru monitorizarea evoluției.",
        "Disponibilă doar în cabinet.",
      ],
    },
  },
];

export const servicesAudienceGroups = {
  audiences: [
    {
      title: "Copii și adolescenți",
      description: "cu părintele sau reprezentantul legal",
    },
    {
      title: "Adulți",
      description: "pentru obiective nutriționale personale",
    },
    {
      title: "Persoane vârstnice",
      description: "cu nevoi adaptate etapei de viață",
    },
    {
      title: "Suport nutrițional în afecțiuni",
      description: "în context medical și metabolic",
    },
  ],
  goals: [
    {
      title: "Gestionarea greutății",
      description: "cu obiective realiste și monitorizare",
    },
    {
      title: "Stil de viață",
      description: "pentru obiceiuri mai clare și aplicabile",
    },
    {
      title: "Educație nutrițională",
      description: "pentru mai multă autonomie alimentară",
    },
    {
      title: "Obiceiuri alimentare echilibrate",
      description: "ușor de integrat în viața de zi cu zi",
    },
  ],
};

export const servicesExclusions =
  "În prezent, serviciile nu includ nutriția în sarcină și nutriția sportivă.";

export function getNutritionService(id: string): NutritionService {
  const service = nutritionServices.find((item) => item.id === id);

  if (!service) {
    throw new Error(`Serviciul "${id}" nu există în config/nutritionServices.ts.`);
  }

  return service;
}

export function formatServiceDuration(durationMinutes: number | null): string {
  if (durationMinutes === null) {
    return "Se stabilește după evaluare";
  }

  if (durationMinutes === 10) {
    return "10 minute";
  }

  return `${durationMinutes} de minute`;
}

export function formatServicePrice(priceLei: number | null): string {
  if (priceLei === null) {
    return "Se stabilește după evaluare";
  }

  return `${priceLei.toLocaleString("ro-RO")} lei`;
}

export function getServiceDurationLabel(service: NutritionService): string {
  return service.durationLabel ?? formatServiceDuration(service.durationMinutes);
}

export function getServicePriceLabel(service: NutritionService): string {
  return service.priceLabel ?? formatServicePrice(service.priceLei);
}
