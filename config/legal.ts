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
  hostingProvider: "[FURNIZORUL DE GĂZDUIRE]",
  emailProvider: "Google, prin serviciul Gmail",
  calPrivacyUrl: "https://cal.com/privacy",
  cancellationNoticeHours: 24,
  lateArrivalMinutes: 15,
  privacyLastUpdated: "21.07.2026",
  cookiesLastUpdated: "21.07.2026",
  termsLastUpdated: "21.07.2026",
};

export type CookieInventoryItem = {
  name: string;
  provider: string;
  purpose: string;
  category: string;
  duration: string;
};

export const cookieInventory: CookieInventoryItem[] = [];

export const COOKIE_CONSENT_ENABLED = false;
