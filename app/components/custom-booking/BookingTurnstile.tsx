"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState } from "react";

type TurnstileStatus = "checking" | "error" | "verified";

type TurnstileApi = {
  remove: (widgetId: string) => void;
  render: (
    container: HTMLElement,
    options: {
      action: string;
      callback: (token: string) => void;
      "error-callback": () => void;
      "expired-callback": () => void;
      language: string;
      sitekey: string;
      size: "flexible";
      theme: "light";
    },
  ) => string;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

type BookingTurnstileProps = {
  onTokenChange: (token: string) => void;
};

const TURNSTILE_SITE_KEY =
  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ?? "";

export function BookingTurnstile({
  onTokenChange,
}: BookingTurnstileProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [status, setStatus] = useState<TurnstileStatus>("checking");

  const renderWidget = useCallback(() => {
    if (
      !TURNSTILE_SITE_KEY ||
      !containerRef.current ||
      !window.turnstile ||
      widgetIdRef.current
    ) {
      return;
    }

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      action: "booking_request",
      callback: (token) => {
        setStatus("verified");
        onTokenChange(token);
      },
      "error-callback": () => {
        setStatus("error");
        onTokenChange("");
      },
      "expired-callback": () => {
        setStatus("checking");
        onTokenChange("");
      },
      language: "ro",
      sitekey: TURNSTILE_SITE_KEY,
      size: "flexible",
      theme: "light",
    });
  }, [onTokenChange]);

  useEffect(() => {
    renderWidget();

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }

      widgetIdRef.current = null;
      onTokenChange("");
    };
  }, [onTokenChange, renderWidget]);

  if (!TURNSTILE_SITE_KEY) {
    return (
      <div className="custom-booking-turnstile-message" role="alert">
        Verificarea anti-spam nu este configurată pentru acest mediu.
      </div>
    );
  }

  return (
    <div className="custom-booking-turnstile">
      <Script
        id="cloudflare-turnstile-script"
        onReady={renderWidget}
        src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit"
        strategy="afterInteractive"
      />
      <div ref={containerRef} />
      <p aria-live="polite" className="custom-booking-turnstile-status">
        {status === "verified"
          ? "Verificarea anti-spam a fost finalizată."
          : status === "error"
            ? "Verificarea nu a reușit. Reîncarcă pagina și încearcă din nou."
            : "Se verifică dacă formularul este completat de o persoană."}
      </p>
    </div>
  );
}
