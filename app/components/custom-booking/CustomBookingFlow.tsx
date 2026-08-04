"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import type { BookingMode } from "../../../config/bookingServices";
import {
  bookingModeContent,
  bookingServices,
  getBookingServiceById,
  getBookingServiceForMode,
  normalizeBookingServiceId,
} from "../../../config/bookingServices";
import {
  buildBookingQuery,
  parseBookingMode,
} from "../../../lib/bookingQueryParams";
import { BookingModeSelector } from "../booking/BookingModeSelector";
import { BookingServiceList } from "../booking/BookingServiceList";
import { BookingSummary } from "../booking/BookingSummary";
import {
  BookingContactFormDemo,
  type BookingContactData,
} from "./BookingContactFormDemo";
import { BookingDateTimeDemo } from "./BookingDateTimeDemo";
import { BookingReviewDemo } from "./BookingReviewDemo";
import { CustomBookingSteps } from "./CustomBookingSteps";

type FocusTarget =
  | "mode"
  | "service"
  | "date"
  | "contact"
  | "review"
  | null;

const INITIAL_CONTACT_DATA: BookingContactData = {
  email: "",
  fullName: "",
  objective: "",
  phone: "",
  privacyAcknowledged: false,
};

function formatSelectedDate(value: string) {
  if (!value) {
    return "";
  }

  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
  }).format(new Date(`${value}T12:00:00Z`));
}

export function CustomBookingFlow() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const focusTargetRef = useRef<FocusTarget>(null);
  const modeSectionRef = useRef<HTMLElement>(null);
  const serviceSectionRef = useRef<HTMLElement>(null);
  const dateSectionRef = useRef<HTMLElement>(null);
  const contactSectionRef = useRef<HTMLElement>(null);
  const reviewSectionRef = useRef<HTMLElement>(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [isContactStep, setIsContactStep] = useState(false);
  const [isReviewStep, setIsReviewStep] = useState(false);
  const [contactData, setContactData] = useState<BookingContactData>(
    INITIAL_CONTACT_DATA,
  );

  const mode = parseBookingMode(searchParams.get("modalitate"));
  const requestedServiceId = normalizeBookingServiceId(
    searchParams.get("serviciu"),
  );
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
  const currentStep = !selectedMode
    ? 1
    : !selectedService
      ? 2
      : isReviewStep
        ? 5
        : isContactStep
          ? 4
          : 3;

  const selectedModeLabel = useMemo(
    () =>
      selectedMode ? bookingModeContent[selectedMode].summaryLabel : null,
    [selectedMode],
  );
  const selectedDateLabel = useMemo(
    () => formatSelectedDate(selectedDate),
    [selectedDate],
  );

  const goTo = useCallback(
    (modeValue: BookingMode | null, serviceId?: string | null) => {
      router.push(`${pathname}${buildBookingQuery(modeValue, serviceId)}`, {
        scroll: false,
      });
    },
    [pathname, router],
  );

  function resetDateAndContact() {
    setSelectedDate("");
    setSelectedTime("");
    setIsContactStep(false);
    setIsReviewStep(false);
  }

  function selectMode(nextMode: BookingMode) {
    resetDateAndContact();
    focusTargetRef.current = "service";
    const serviceForMode = getBookingServiceForMode(
      requestedServiceId,
      nextMode,
    );
    goTo(nextMode, serviceForMode?.id ?? null);
  }

  function selectService(serviceId: string) {
    if (!selectedMode) {
      return;
    }

    resetDateAndContact();
    focusTargetRef.current = "date";
    goTo(selectedMode, serviceId);
  }

  function changeService() {
    if (!selectedMode) {
      goTo(null);
      return;
    }

    resetDateAndContact();
    focusTargetRef.current = "service";
    goTo(selectedMode);
  }

  function changeMode() {
    resetDateAndContact();
    focusTargetRef.current = "mode";
    goTo(null);
  }

  function handleFormServiceChange(serviceId: string) {
    const nextService = bookingServices.find(
      (service) => service.id === serviceId,
    );

    if (!nextService || !selectedMode) {
      return;
    }

    const nextMode =
      selectedMode === "online" && !nextService.availableOnline
        ? "office"
        : selectedMode;

    setSelectedTime("");
    setIsContactStep(false);
    setIsReviewStep(false);
    focusTargetRef.current = "date";
    goTo(nextMode, nextService.id);
  }

  function handleFormModeChange(nextMode: BookingMode) {
    if (!selectedService) {
      return;
    }

    const serviceForMode = getBookingServiceForMode(
      selectedService.id,
      nextMode,
    );

    if (!serviceForMode) {
      return;
    }

    goTo(nextMode, serviceForMode.id);
  }

  useEffect(() => {
    const target = focusTargetRef.current;

    if (!target) {
      return;
    }

    const node =
      target === "review"
        ? reviewSectionRef.current
        : target === "contact"
          ? contactSectionRef.current
          : target === "date"
            ? dateSectionRef.current
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
    <div className="booking-flow custom-booking-flow">
      <CustomBookingSteps currentStep={currentStep} />

      {!selectedMode ? (
        <section
          aria-labelledby="custom-booking-mode-title"
          className="booking-panel"
          ref={modeSectionRef}
          tabIndex={-1}
        >
          <div className="section-heading center">
            <p className="eyebrow">Pasul 1</p>
            <h2 className="h2" id="custom-booking-mode-title">
              Alege modalitatea consultației
            </h2>
          </div>
          <BookingModeSelector onSelectMode={selectMode} />
        </section>
      ) : null}

      {selectedMode && !selectedService ? (
        <section
          aria-labelledby="custom-booking-service-title"
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

      {selectedMode && selectedService && !isContactStep ? (
        <section
          aria-labelledby="custom-booking-date-title"
          className="booking-calendar-panel"
          ref={dateSectionRef}
          tabIndex={-1}
        >
          <button
            className="booking-back-button"
            onClick={changeService}
            type="button"
          >
            ← Înapoi la servicii
          </button>

          <div className="section-heading booking-calendar-heading">
            <p className="eyebrow">Pasul 3</p>
            <h2 className="h2 title-left" id="custom-booking-date-title">
              Alege data și ora
            </h2>
            <p className="lead">
              Modalitate selectată: <strong>{selectedModeLabel}</strong>.
            </p>
          </div>

          <div className="booking-calendar-grid">
            <BookingDateTimeDemo
              onContinue={() => {
                focusTargetRef.current = "contact";
                setIsContactStep(true);
              }}
              onDateChange={setSelectedDate}
              onTimeChange={setSelectedTime}
              selectedDate={selectedDate}
              selectedMode={selectedMode}
              selectedService={selectedService}
              selectedTime={selectedTime}
            />

            <BookingSummary
              mode={selectedMode}
              onChangeMode={changeMode}
              onChangeService={changeService}
              service={selectedService}
            />
          </div>
        </section>
      ) : null}

      {selectedMode &&
      selectedService &&
      isContactStep &&
      !isReviewStep ? (
        <section
          aria-labelledby="custom-booking-contact-title"
          className="booking-calendar-panel"
          ref={contactSectionRef}
          tabIndex={-1}
        >
          <BookingContactFormDemo
            contactData={contactData}
            mode={selectedMode}
            onBack={() => {
              focusTargetRef.current = "date";
              setIsContactStep(false);
            }}
            onContactDataChange={setContactData}
            onContinue={() => {
              focusTargetRef.current = "review";
              setIsReviewStep(true);
            }}
            onModeChange={handleFormModeChange}
            onServiceChange={handleFormServiceChange}
            selectedDateLabel={selectedDateLabel}
            selectedService={selectedService}
            selectedTime={selectedTime}
          />
        </section>
      ) : null}

      {selectedMode && selectedService && isReviewStep ? (
        <section
          aria-labelledby="custom-booking-review-title"
          className="booking-calendar-panel"
          ref={reviewSectionRef}
          tabIndex={-1}
        >
          <BookingReviewDemo
            contactData={contactData}
            mode={selectedMode}
            onBack={() => {
              focusTargetRef.current = "contact";
              setIsReviewStep(false);
            }}
            selectedDateLabel={selectedDateLabel}
            selectedService={selectedService}
            selectedTime={selectedTime}
          />
        </section>
      ) : null}
    </div>
  );
}
