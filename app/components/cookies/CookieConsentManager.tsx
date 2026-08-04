"use client";

import Link from "next/link";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

import type {
  BookingAnalyticsEvent,
  BookingAnalyticsEventDetail,
} from "../../../lib/bookingAnalytics";
import { analyticsConfig } from "../../../config/analytics";
import {
  clearGoogleAnalyticsCookies,
  configureGoogleAnalytics,
  initializeGoogleTagQueue,
  isGoogleAnalyticsProductionHost,
  sendGoogleAnalyticsEvent,
  sendGoogleAnalyticsPageView,
  setGoogleAnalyticsConsent,
} from "../../../lib/googleAnalytics";

type ConsentChoice = "accepted" | "rejected";

type StoredConsent = {
  choice: ConsentChoice;
  expiresAt: number;
};

const trackedBookingEvents = new Set<BookingAnalyticsEvent>([
  "booking_mode_selected",
  "booking_service_selected",
  "booking_calendar_opened",
]);

export function CookieConsentManager() {
  const pathname = usePathname();
  const [analyticsReady, setAnalyticsReady] = useState(false);
  const [choice, setChoice] = useState<ConsentChoice | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isProductionHost, setIsProductionHost] = useState(false);

  useEffect(() => {
    initializeGoogleTagQueue();
    setGoogleAnalyticsConsent(false, "default");

    const storedConsent = readStoredConsent();
    const productionHost = isGoogleAnalyticsProductionHost();

    setIsProductionHost(productionHost);
    setChoice(storedConsent);
    setIsOpen(storedConsent === null);
    setIsInitialized(true);

    if (storedConsent === "accepted") {
      setGoogleAnalyticsConsent(true, "update");
    }

    function openPreferences() {
      setIsOpen(true);
    }

    window.addEventListener("open-cookie-preferences", openPreferences);

    return () => {
      window.removeEventListener("open-cookie-preferences", openPreferences);
    };
  }, []);

  const handleAnalyticsReady = useCallback(() => {
    configureGoogleAnalytics();
    setAnalyticsReady(true);
  }, []);

  useEffect(() => {
    if (choice !== "accepted" || !analyticsReady) {
      return;
    }

    const frame = window.requestAnimationFrame(() => {
      sendGoogleAnalyticsPageView();
    });

    return () => window.cancelAnimationFrame(frame);
  }, [analyticsReady, choice, pathname]);

  useEffect(() => {
    if (choice !== "accepted" || !analyticsReady) {
      return;
    }

    function trackBookingStep(event: Event) {
      const detail = (event as CustomEvent<BookingAnalyticsEventDetail>).detail;

      if (detail && trackedBookingEvents.has(detail.name)) {
        sendGoogleAnalyticsEvent(detail.name);
      }
    }

    window.addEventListener("booking_analytics_event", trackBookingStep);

    return () => {
      window.removeEventListener("booking_analytics_event", trackBookingStep);
    };
  }, [analyticsReady, choice]);

  function saveChoice(nextChoice: ConsentChoice) {
    const storedConsent: StoredConsent = {
      choice: nextChoice,
      expiresAt: Date.now() + analyticsConfig.consentDurationMs,
    };

    try {
      window.localStorage.setItem(
        analyticsConfig.consentStorageKey,
        JSON.stringify(storedConsent),
      );
    } catch {
      // The choice still applies to the current page when storage is blocked.
    }
  }

  function acceptAnalytics() {
    saveChoice("accepted");
    setGoogleAnalyticsConsent(true, "update");
    setChoice("accepted");
    setIsOpen(false);
  }

  function rejectAnalytics() {
    const analyticsWasLoaded =
      choice === "accepted" && analyticsReady && isProductionHost;

    saveChoice("rejected");
    setGoogleAnalyticsConsent(false, "update");
    clearGoogleAnalyticsCookies();
    setChoice("rejected");
    setAnalyticsReady(false);
    setIsOpen(false);

    if (analyticsWasLoaded) {
      window.location.reload();
    }
  }

  const consentStatus =
    choice === "accepted"
      ? {
          className: "cookie-consent-status-accepted",
          label: "Cookie-urile Analytics sunt activate",
        }
      : choice === "rejected"
        ? {
            className: "cookie-consent-status-rejected",
            label: "Cookie-urile Analytics sunt dezactivate",
          }
        : {
            className: "cookie-consent-status-unset",
            label: "Nicio preferință selectată",
          };

  return (
    <>
      {isInitialized && choice === "accepted" && isProductionHost ? (
        <Script
          id="google-analytics-library"
          onReady={handleAnalyticsReady}
          src={`https://www.googletagmanager.com/gtag/js?id=${analyticsConfig.measurementId}`}
          strategy="afterInteractive"
        />
      ) : null}

      {isInitialized && isOpen ? (
        <div className="cookie-consent-shell">
          <section
            aria-describedby="cookie-consent-description"
            aria-labelledby="cookie-consent-title"
            className="cookie-consent-panel"
            role="dialog"
          >
            <div className="cookie-consent-copy">
              <p className="cookie-consent-label">Preferințe de confidențialitate</p>
              <h2 id="cookie-consent-title">Ne ajuți să înțelegem utilizarea site-ului?</h2>
              <p id="cookie-consent-description">
                Google Analytics este activat numai cu acordul tău. Ne arată
                statistici generale despre paginile vizitate și accesarea
                programărilor, fără a primi datele introduse în Cal.com. Poți
                modifica oricând alegerea din footer.{" "}
                <Link href="/politica-de-cookies">Citește politica de cookies</Link>.
              </p>
            </div>
            <div className="cookie-consent-controls">
              <p
                aria-live="polite"
                className={`cookie-consent-status ${consentStatus.className}`}
              >
                <span aria-hidden="true" className="cookie-consent-status-dot" />
                {consentStatus.label}
              </p>
              <div className="cookie-consent-actions">
                <button
                  aria-pressed={choice === "rejected"}
                  className="cookie-consent-button cookie-consent-button-secondary"
                  onClick={rejectAnalytics}
                  type="button"
                >
                  Refuză
                </button>
                <button
                  aria-pressed={choice === "accepted"}
                  className="cookie-consent-button cookie-consent-button-primary"
                  onClick={acceptAnalytics}
                  type="button"
                >
                  Acceptă Analytics
                </button>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}

function readStoredConsent(): ConsentChoice | null {
  try {
    const storedValue = window.localStorage.getItem(
      analyticsConfig.consentStorageKey,
    );

    if (!storedValue) {
      return null;
    }

    const storedConsent = JSON.parse(storedValue) as Partial<StoredConsent>;
    const storedChoice = storedConsent.choice;
    const hasValidChoice =
      storedChoice === "accepted" || storedChoice === "rejected";
    const hasValidExpiry =
      typeof storedConsent.expiresAt === "number" &&
      storedConsent.expiresAt > Date.now();

    if (hasValidChoice && hasValidExpiry) {
      return storedChoice;
    }

    window.localStorage.removeItem(analyticsConfig.consentStorageKey);
  } catch {
    return null;
  }

  return null;
}
