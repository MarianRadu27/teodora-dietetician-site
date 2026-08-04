"use client";

import type {
  BookingMode,
  BookingService,
} from "../../../config/bookingServices";
import {
  bookingModeContent,
  formatBookingDuration,
  formatBookingPrice,
} from "../../../config/bookingServices";
import {
  getOfficeLocationAddress,
  officeLocation,
} from "../../../config/officeLocation";
import type { BookingContactData } from "./BookingContactFormDemo";
import { BookingTurnstile } from "./BookingTurnstile";

type BookingReviewDemoProps = {
  contactData: BookingContactData;
  isSubmitting: boolean;
  mode: BookingMode;
  onBack: () => void;
  onSubmit: () => void;
  onTurnstileTokenChange: (token: string) => void;
  selectedDateLabel: string;
  selectedService: BookingService;
  selectedTime: string;
  submissionMessage: string;
  submissionStatus: "idle" | "error" | "success";
  turnstileAttempt: number;
  turnstileToken: string;
};

export function BookingReviewDemo({
  contactData,
  isSubmitting,
  mode,
  onBack,
  onSubmit,
  onTurnstileTokenChange,
  selectedDateLabel,
  selectedService,
  selectedTime,
  submissionMessage,
  submissionStatus,
  turnstileAttempt,
  turnstileToken,
}: BookingReviewDemoProps) {
  const locationName =
    mode === "office" ? officeLocation.name : "Consultație online";
  const locationDetails =
    mode === "office"
      ? getOfficeLocationAddress()
      : "Linkul consultației va fi transmis prin email după confirmare.";

  return (
    <div className="custom-booking-form custom-booking-review">
      <div className="custom-booking-form-heading">
        <div>
          <p className="eyebrow">Pasul 5</p>
          <h2
            className="h2 title-left"
            id="custom-booking-review-title"
          >
            Verifică programarea
          </h2>
          <p className="lead">
            Asigură-te că informațiile de mai jos sunt corecte înainte de
            trimiterea cererii.
          </p>
        </div>
        {submissionStatus !== "success" ? (
          <button
            className="booking-back-button"
            disabled={isSubmitting}
            onClick={onBack}
            type="button"
          >
            ← Înapoi și modifică datele
          </button>
        ) : null}
      </div>

      <section
        aria-labelledby="booking-review-appointment-title"
        className="custom-booking-review-section"
      >
        <h3 id="booking-review-appointment-title">
          Detaliile consultației
        </h3>
        <dl className="custom-booking-review-grid">
          <div className="custom-booking-review-wide">
            <dt>Serviciu</dt>
            <dd>{selectedService.title}</dd>
          </div>
          <div>
            <dt>Modalitate</dt>
            <dd>{bookingModeContent[mode].summaryLabel}</dd>
          </div>
          <div>
            <dt>Data și ora</dt>
            <dd>
              {selectedDateLabel}, {selectedTime}
            </dd>
          </div>
          <div>
            <dt>Durată</dt>
            <dd>{formatBookingDuration(selectedService.durationMinutes)}</dd>
          </div>
          <div>
            <dt>Preț</dt>
            <dd>{formatBookingPrice(selectedService.priceLei)}</dd>
          </div>
          <div className="custom-booking-review-wide">
            <dt>Locație</dt>
            <dd>
              <span>{locationName}</span>
              <small>{locationDetails}</small>
            </dd>
          </div>
        </dl>
      </section>

      <section
        aria-labelledby="booking-review-contact-title"
        className="custom-booking-review-section"
      >
        <h3 id="booking-review-contact-title">Datele tale</h3>
        <dl className="custom-booking-review-grid">
          <div>
            <dt>Nume și prenume</dt>
            <dd>{contactData.fullName}</dd>
          </div>
          <div>
            <dt>Email</dt>
            <dd>{contactData.email}</dd>
          </div>
          <div>
            <dt>Telefon</dt>
            <dd>{contactData.phone.trim() || "Necompletat"}</dd>
          </div>
          <div className="custom-booking-review-wide">
            <dt>Obiectiv general</dt>
            <dd>{contactData.objective.trim() || "Necompletat"}</dd>
          </div>
        </dl>
      </section>

      <section
        aria-labelledby="booking-review-security-title"
        className="custom-booking-review-section"
      >
        <h3 id="booking-review-security-title">Verificare anti-spam</h3>
        {submissionStatus === "success" ? (
          <p className="custom-booking-security-complete">
            Verificarea anti-spam a fost finalizată.
          </p>
        ) : (
          <BookingTurnstile
            key={turnstileAttempt}
            onTokenChange={onTurnstileTokenChange}
          />
        )}
      </section>

      <div className="custom-booking-submit custom-booking-review-submit">
        <button
          aria-describedby="booking-review-submit-note"
          className="button button-primary"
          disabled={
            !turnstileToken ||
            isSubmitting ||
            submissionStatus === "success"
          }
          onClick={onSubmit}
          type="button"
        >
          {isSubmitting
            ? "Se trimite cererea..."
            : submissionStatus === "success"
              ? "Cerere trimisă"
              : "Confirmă și trimite cererea"}
        </button>
        <p id="booking-review-submit-note">
          {submissionStatus === "success"
            ? "Intervalul este rezervat temporar timp de 30 de minute. Verifică emailul și folosește linkul primit pentru confirmare."
            : turnstileToken
              ? "Verificarea anti-spam este pregătită. Poți trimite cererea de test."
              : "Finalizează verificarea anti-spam pentru a putea trimite cererea."}
        </p>
      </div>

      {submissionMessage ? (
        <div
          aria-live="polite"
          className={`custom-booking-submission-message is-${submissionStatus}`}
          role={submissionStatus === "error" ? "alert" : "status"}
        >
          <strong>
            {submissionStatus === "success"
              ? "Cererea a fost salvată"
              : "Cererea nu a putut fi trimisă"}
          </strong>
          <p>{submissionMessage}</p>
        </div>
      ) : null}
    </div>
  );
}
