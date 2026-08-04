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

type BookingReviewDemoProps = {
  contactData: BookingContactData;
  mode: BookingMode;
  onBack: () => void;
  selectedDateLabel: string;
  selectedService: BookingService;
  selectedTime: string;
};

export function BookingReviewDemo({
  contactData,
  mode,
  onBack,
  selectedDateLabel,
  selectedService,
  selectedTime,
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
        <button
          className="booking-back-button"
          onClick={onBack}
          type="button"
        >
          ← Înapoi și modifică datele
        </button>
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

      <div className="custom-booking-submit custom-booking-review-submit">
        <button
          aria-describedby="booking-review-submit-note"
          className="button button-primary"
          disabled
          type="button"
        >
          Confirmă și trimite cererea
        </button>
        <p id="booking-review-submit-note">
          Trimiterea rămâne dezactivată până la conectarea bazei de date,
          verificării anti-spam și confirmării prin email.
        </p>
      </div>
    </div>
  );
}
