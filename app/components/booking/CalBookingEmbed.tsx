"use client";

import { useEffect, useMemo, useRef, useState } from "react";

import type {
  BookingMode,
  BookingService,
} from "../../../config/bookingServices";
import { getBookingServiceCalLink } from "../../../config/bookingServices";
import { buildCalEmbedUrl } from "../../../lib/calLocationConfig";

type CalBookingEmbedProps = {
  mode: BookingMode;
  service: BookingService;
};

function getExternalCalUrl(calLink: string) {
  return `https://cal.com/${calLink}`;
}

export default function CalBookingEmbed({
  mode,
  service,
}: CalBookingEmbedProps) {
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [retryKey, setRetryKey] = useState(0);
  const loadedRef = useRef(false);
  const calLink = getBookingServiceCalLink(service, mode);
  const hasPlaceholderLink = !calLink || calLink.includes("[");

  const embedUrl = useMemo(
    () => (calLink ? buildCalEmbedUrl(calLink, mode, retryKey) : ""),
    [calLink, mode, retryKey],
  );

  useEffect(() => {
    loadedRef.current = false;
    setHasLoaded(false);
    setHasError(false);

    if (hasPlaceholderLink) {
      setHasError(true);
      return;
    }

    const timer = window.setTimeout(() => {
      if (!loadedRef.current) {
        setHasError(true);
      }
    }, 15000);

    return () => window.clearTimeout(timer);
  }, [embedUrl, hasPlaceholderLink]);

  if (hasError) {
    return (
      <div className="booking-frame-fallback" role="alert">
        <p>
          Calendarul nu a putut fi încărcat. Poți încerca din nou sau poți
          deschide pagina de programare Cal.com.
        </p>
        <div className="button-row">
          <button
            className="button button-secondary"
            onClick={() => {
              setHasError(false);
              setHasLoaded(false);
              setRetryKey((currentValue) => currentValue + 1);
            }}
            type="button"
          >
            Încearcă din nou
          </button>
          {calLink && !hasPlaceholderLink ? (
            <a
              className="button button-primary"
              href={getExternalCalUrl(calLink)}
              rel="noopener noreferrer"
              target="_blank"
            >
              Deschide în Cal.com
            </a>
          ) : null}
        </div>
      </div>
    );
  }

  return (
    <div className="booking-frame-wrap" aria-live="polite">
      {!hasLoaded ? (
        <div className="booking-frame-loading" role="status">
          Se încarcă intervalele disponibile…
        </div>
      ) : null}
      <iframe
        className="booking-frame"
        onLoad={() => {
          loadedRef.current = true;
          setHasLoaded(true);
        }}
        src={embedUrl}
        title={`Calendar Cal.com pentru ${service.title}`}
      />
    </div>
  );
}
