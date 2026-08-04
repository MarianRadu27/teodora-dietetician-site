export const analyticsConfig = {
  measurementId:
    process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-YNP54GMPWM",
  consentStorageKey: "teodora_cookie_consent_v1",
  consentDurationMs: 365 * 24 * 60 * 60 * 1000,
  productionHosts: ["dieteticianteodora.ro", "www.dieteticianteodora.ro"],
};
