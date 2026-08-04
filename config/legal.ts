export const legalConfig = {
  businessName: "PĂLII E. TEODORA-DIETETICIAN",
  ownerName: "Teodora Pălii",
  professionalTitle: "nutriționist-dietetician autorizat",
  taxId: "54811265",
  professionalAddress: "JUDEȚUL IAȘI, MUNICIPIUL IAȘI, STRADA RAMPEI 5A BL.C1 SC.A ",
  email: "dietetician.teodora@gmail.com",
  phone: "0778 186 580",
  phoneHref: "+40778186580",
  professionalBody: "COLEGIUL DIETETICIENILOR DIN ROMÂNIA (CDR)",
  memberCode: "110825",
  domain: "dieteticianteodora.ro",
  vatStatus: "NEPLĂTITOR TVA",
  hostingProvider: "Cloudflare Pages",
  emailProvider: "Google, prin serviciul Gmail",
  cancellationNoticeHours: 24,
  lateArrivalMinutes: 15,
  privacyLastUpdated: "04.08.2026",
  cookiesLastUpdated: "04.08.2026",
  termsLastUpdated: "04.08.2026",
};

export type CookieInventoryItem = {
  name: string;
  provider: string;
  purpose: string;
  category: string;
  duration: string;
};

export const cookieInventory: CookieInventoryItem[] = [
  {
    name: "teodora_cookie_consent_v1",
    provider: "dieteticianteodora.ro (localStorage)",
    purpose: "Memorează opțiunea privind utilizarea Google Analytics.",
    category: "Strict necesară / preferințe",
    duration: "12 luni",
  },
  {
    name: "_ga",
    provider: "Google Analytics",
    purpose: "Ajută la distingerea utilizatorilor în statisticile website-ului.",
    category: "Analiză",
    duration: "2 ani",
  },
  {
    name: "_ga_YNP54GMPWM",
    provider: "Google Analytics",
    purpose: "Păstrează starea sesiunii de analiză.",
    category: "Analiză",
    duration: "2 ani",
  },
];

export const COOKIE_CONSENT_ENABLED = true;
