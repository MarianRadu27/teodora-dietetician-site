import { analyticsConfig } from "../config/analytics";

type GoogleTagCommand = [command: string, ...parameters: unknown[]];

declare global {
  interface Window {
    dataLayer?: GoogleTagCommand[];
    gtag?: (...args: GoogleTagCommand) => void;
  }
}

const campaignParameters = [
  "utm_id",
  "utm_source",
  "utm_medium",
  "utm_campaign",
  "utm_term",
  "utm_content",
] as const;

export function initializeGoogleTagQueue() {
  if (typeof window === "undefined") {
    return;
  }

  window.dataLayer = window.dataLayer ?? [];
  window.gtag =
    window.gtag ??
    ((...args: GoogleTagCommand) => {
      window.dataLayer?.push(args);
    });
}

export function setGoogleAnalyticsConsent(
  isGranted: boolean,
  command: "default" | "update",
) {
  initializeGoogleTagQueue();

  window.gtag?.("consent", command, {
    ad_personalization: "denied",
    ad_storage: "denied",
    ad_user_data: "denied",
    analytics_storage: isGranted ? "granted" : "denied",
  });
}

export function configureGoogleAnalytics() {
  initializeGoogleTagQueue();

  window.gtag?.("js", new Date());
  window.gtag?.("config", analyticsConfig.measurementId, {
    allow_ad_personalization_signals: false,
    allow_google_signals: false,
    page_location: getSanitizedPageLocation(),
    send_page_view: false,
  });
}

export function sendGoogleAnalyticsPageView() {
  if (typeof window === "undefined") {
    return;
  }

  window.gtag?.("event", "page_view", {
    page_location: getSanitizedPageLocation(),
    page_path: window.location.pathname,
    page_title: document.title,
  });
}

export function sendGoogleAnalyticsEvent(name: string) {
  window.gtag?.("event", name);
}

export function isGoogleAnalyticsProductionHost() {
  return (
    typeof window !== "undefined" &&
    analyticsConfig.productionHosts.includes(window.location.hostname)
  );
}

export function clearGoogleAnalyticsCookies() {
  if (typeof document === "undefined") {
    return;
  }

  const measurementCookieSuffix = analyticsConfig.measurementId.replace(
    /^G-/,
    "",
  );
  const cookieNames = ["_ga", `_ga_${measurementCookieSuffix}`];
  const hostname = window.location.hostname;
  const rootDomain = hostname.replace(/^www\./, "");
  const domains = [hostname, `.${rootDomain}`];

  for (const cookieName of cookieNames) {
    document.cookie = `${cookieName}=; Max-Age=0; Path=/; SameSite=Lax`;

    for (const domain of domains) {
      document.cookie = `${cookieName}=; Max-Age=0; Path=/; Domain=${domain}; SameSite=Lax`;
    }
  }
}

function getSanitizedPageLocation() {
  if (typeof window === "undefined") {
    return "";
  }

  const sourceUrl = new URL(window.location.href);
  const sanitizedUrl = new URL(sourceUrl.pathname, sourceUrl.origin);

  for (const parameter of campaignParameters) {
    const value = sourceUrl.searchParams.get(parameter);

    if (!value) {
      continue;
    }

    const sanitizedValue = value
      .replace(/[^a-zA-Z0-9._-]/g, "")
      .slice(0, 80);

    if (sanitizedValue) {
      sanitizedUrl.searchParams.set(parameter, sanitizedValue);
    }
  }

  return sanitizedUrl.toString();
}
