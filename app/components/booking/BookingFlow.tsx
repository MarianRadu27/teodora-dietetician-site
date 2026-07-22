"use client";

import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";

import type { BookingMode } from "../../../config/bookingServices";
import {
  bookingModeContent,
  getBookingServiceById,
  getBookingServiceForMode,
  normalizeBookingServiceId,
} from "../../../config/bookingServices";
import {
  buildBookingQuery,
  parseBookingMode,
} from "../../../lib/bookingQueryParams";
import { trackBookingEvent } from "../../../lib/bookingAnalytics";
import { brand } from "../../siteContent";
import { BookingLegalNotice } from "./BookingLegalNotice";
import { BookingModeSelector } from "./BookingModeSelector";
import { BookingServiceList } from "./BookingServiceList";
import { BookingSteps } from "./BookingSteps";
import { BookingSummary } from "./BookingSummary";

const CalBookingEmbed = dynamic(() => import("./CalBookingEmbed"), {
  loading: () => (
    <div className="booking-frame-wrap" aria-live="polite">
      <div className="booking-frame-loading" role="status">
        Se încarcă intervalele disponibile…
      </div>
    </div>
  ),
  ssr: false,
});

type FocusTarget = "mode" | "service" | "calendar" | null;

export function BookingFlow() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const focusTargetRef = useRef<FocusTarget>(null);
  const modeSectionRef = useRef<HTMLDivElement>(null);
  const serviceSectionRef = useRef<HTMLDivElement>(null);
  const calendarSectionRef = useRef<HTMLDivElement>(null);

  const mode = parseBookingMode(searchParams.get("modalitate"));
  const requestedServiceId = normalizeBookingServiceId(searchParams.get("serviciu"));
  const requestedService = getBookingServiceById(requestedServiceId);
  const inferredMode =
    !mode &&
    requestedService &&
    !requestedService.availableOnline &&
    requestedService.availableInOffice
      ? "office"
      : null;
  const selectedMode = mode ?? inferredMode;
  const selectedService = getBookingServiceForMode(
    requestedServiceId,
    selectedMode,
  );

  const currentStep = !selectedMode ? 1 : !selectedService ? 2 : 3;

  const selectedModeLabel = useMemo(() => {
    if (!selectedMode) {
      return null;
    }

    return bookingModeContent[selectedMode].summaryLabel;
  }, [selectedMode]);

  function goTo(modeValue: BookingMode | null, serviceId?: string | null) {
    router.push(`${pathname}${buildBookingQuery(modeValue, serviceId)}`, {
      scroll: false,
    });
  }

  function selectMode(nextMode: BookingMode) {
    focusTargetRef.current = "service";
    trackBookingEvent("booking_mode_selected", { mode: nextMode });
    const serviceForMode = getBookingServiceForMode(requestedServiceId, nextMode);
    goTo(nextMode, serviceForMode?.id ?? null);
  }

  function selectService(serviceId: string) {
    if (!selectedMode) {
      return;
    }

    focusTargetRef.current = "calendar";
    trackBookingEvent("booking_service_selected", {
      mode: selectedMode,
      serviceId,
    });
    trackBookingEvent("booking_calendar_opened", {
      mode: selectedMode,
      serviceId,
    });
    goTo(selectedMode, serviceId);
  }

  function changeService() {
    if (!selectedMode) {
      goTo(null);
      return;
    }

    focusTargetRef.current = "service";
    goTo(selectedMode);
  }

  function changeMode() {
    focusTargetRef.current = "mode";
    goTo(null);
  }

  useEffect(() => {
    const target = focusTargetRef.current;

    if (!target) {
      return;
    }

    const node =
      target === "calendar"
        ? calendarSectionRef.current
        : target === "service"
          ? serviceSectionRef.current
          : modeSectionRef.current;

    if (!node) {
      return;
    }

    window.requestAnimationFrame(() => {
      node.focus();
      node.scrollIntoView({ block: "start", behavior: "smooth" });
      focusTargetRef.current = null;
    });
  }, [currentStep]);

  return (
    <div className="booking-flow">
      <BookingSteps currentStep={currentStep} />

      {!selectedMode ? (
        <section
          aria-labelledby="booking-mode-title"
          className="booking-panel"
          ref={modeSectionRef}
          tabIndex={-1}
        >
          <div className="section-heading center">
            <p className="eyebrow">Pasul 1</p>
            <h2 className="h2" id="booking-mode-title">
              Alege modalitatea consultației
            </h2>
          </div>
          <BookingModeSelector onSelectMode={selectMode} />
        </section>
      ) : null}

      {selectedMode && !selectedService ? (
        <section
          aria-labelledby="booking-service-title"
          ref={serviceSectionRef}
          tabIndex={-1}
        >
          <BookingServiceList
            mode={selectedMode}
            onBackToMode={changeMode}
            onSelectService={selectService}
          />
        </section>
      ) : null}

      {selectedMode && selectedService ? (
        <section
          aria-labelledby="booking-calendar-title"
          className="booking-calendar-panel"
          ref={calendarSectionRef}
          tabIndex={-1}
        >
          <button
            className="booking-back-button"
            onClick={changeService}
            type="button"
          >
            ← Înapoi la servicii
          </button>
          <div className="booking-calendar-grid">
            <div>
              <div className="section-heading">
                <p className="eyebrow">Pasul 3</p>
                <h2 className="h2" id="booking-calendar-title">
                  Alege data și ora
                </h2>
                <p className="lead">
                  Modalitate selectată: <strong>{selectedModeLabel}</strong>.
                </p>
              </div>
              <BookingLegalNotice />
              <CalBookingEmbed mode={selectedMode} service={selectedService} />
            </div>
            <BookingSummary
              mode={selectedMode}
              onChangeMode={changeMode}
              onChangeService={changeService}
              service={selectedService}
            />
          </div>
        </section>
      ) : null}

      <aside className="booking-whatsapp soft-card">
        <p className="h3">Ai nevoie de ajutor pentru programare?</p>
        <p className="body-text">Scrie-ne pe WhatsApp.</p>
        <a
          className="button button-secondary"
          href={brand.whatsappUrl}
          rel="noopener noreferrer"
          target="_blank"
        >
          Deschide WhatsApp
        </a>
        <p className="body-text">
          Poți folosi și pagina de <Link href="/contact">contact</Link>.
        </p>
      </aside>
    </div>
  );
}
