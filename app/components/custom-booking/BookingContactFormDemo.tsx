"use client";

import type {
  BookingMode,
  BookingService,
} from "../../../config/bookingServices";
import {
  bookingModeContent,
  bookingServices,
  formatBookingDuration,
} from "../../../config/bookingServices";

export type BookingContactData = {
  email: string;
  fullName: string;
  objective: string;
  phone: string;
  privacyAcknowledged: boolean;
};

type BookingContactFormDemoProps = {
  contactData: BookingContactData;
  mode: BookingMode;
  onBack: () => void;
  onContactDataChange: (value: BookingContactData) => void;
  onContinue: () => void;
  onModeChange: (mode: BookingMode) => void;
  onServiceChange: (serviceId: string) => void;
  selectedDateLabel: string;
  selectedService: BookingService;
  selectedTime: string;
};

export function BookingContactFormDemo({
  contactData,
  mode,
  onBack,
  onContactDataChange,
  onContinue,
  onModeChange,
  onServiceChange,
  selectedDateLabel,
  selectedService,
  selectedTime,
}: BookingContactFormDemoProps) {
  return (
    <form
      className="custom-booking-form"
      onSubmit={(event) => {
        event.preventDefault();
        onContinue();
      }}
    >
      <div className="custom-booking-form-heading">
        <div>
          <p className="eyebrow">Pasul 4</p>
          <h2
            className="h2 title-left"
            id="custom-booking-contact-title"
          >
            Datele pentru programare
          </h2>
        </div>
        <button
          className="booking-back-button"
          onClick={onBack}
          type="button"
        >
          ← Modifică data și ora
        </button>
      </div>

      <fieldset className="custom-booking-fieldset">
        <legend>Consultația aleasă</legend>
        <div className="custom-booking-form-grid">
          <div className="custom-booking-field custom-booking-field-wide">
            <label htmlFor="booking-demo-service">Serviciu</label>
            <select
              id="booking-demo-service"
              onChange={(event) => onServiceChange(event.target.value)}
              value={selectedService.id}
            >
              {bookingServices.map((service) => (
                <option key={service.id} value={service.id}>
                  {service.title} · {formatBookingDuration(service.durationMinutes)}
                </option>
              ))}
            </select>
          </div>

          <div className="custom-booking-field">
            <label htmlFor="booking-demo-mode">Modalitate</label>
            <select
              id="booking-demo-mode"
              onChange={(event) =>
                onModeChange(event.target.value as BookingMode)
              }
              value={mode}
            >
              <option
                disabled={!selectedService.availableOnline}
                value="online"
              >
                Online
              </option>
              <option
                disabled={!selectedService.availableInOffice}
                value="office"
              >
                În cabinet
              </option>
            </select>
          </div>

          <div className="custom-booking-field">
            <span className="custom-booking-static-label">Data și ora</span>
            <strong className="custom-booking-static-value">
              {selectedDateLabel}, {selectedTime}
            </strong>
          </div>
        </div>
      </fieldset>

      <fieldset className="custom-booking-fieldset">
        <legend>Date de contact</legend>
        <div className="custom-booking-form-grid">
          <div className="custom-booking-field custom-booking-field-wide">
            <label htmlFor="booking-demo-name">Nume și prenume</label>
            <input
              autoComplete="name"
              id="booking-demo-name"
              name="name"
              onChange={(event) =>
                onContactDataChange({
                  ...contactData,
                  fullName: event.target.value,
                })
              }
              placeholder="Numele complet"
              required
              type="text"
              value={contactData.fullName}
            />
          </div>

          <div className="custom-booking-field">
            <label htmlFor="booking-demo-email">Email</label>
            <input
              autoComplete="email"
              id="booking-demo-email"
              name="email"
              onChange={(event) =>
                onContactDataChange({
                  ...contactData,
                  email: event.target.value,
                })
              }
              placeholder="nume@exemplu.ro"
              required
              type="email"
              value={contactData.email}
            />
            <small>Adresa va fi confirmată înaintea programării.</small>
          </div>

          <div className="custom-booking-field">
            <label htmlFor="booking-demo-phone">
              Telefon <span>(opțional)</span>
            </label>
            <input
              autoComplete="tel"
              id="booking-demo-phone"
              inputMode="tel"
              name="phone"
              onChange={(event) =>
                onContactDataChange({
                  ...contactData,
                  phone: event.target.value,
                })
              }
              placeholder="07xx xxx xxx"
              type="tel"
              value={contactData.phone}
            />
          </div>

          <div className="custom-booking-field custom-booking-field-wide">
            <label htmlFor="booking-demo-objective">
              Obiectiv general <span>(opțional)</span>
            </label>
            <textarea
              id="booking-demo-objective"
              maxLength={500}
              name="objective"
              onChange={(event) =>
                onContactDataChange({
                  ...contactData,
                  objective: event.target.value,
                })
              }
              placeholder="Descrie pe scurt obiectivul principal."
              rows={4}
              value={contactData.objective}
            />
            <small>
              Nu include diagnostice, rezultate ale analizelor sau alte
              informații medicale detaliate.
            </small>
          </div>
        </div>
      </fieldset>

      <div className="custom-booking-consent">
        <label>
          <input
            checked={contactData.privacyAcknowledged}
            name="privacyAcknowledged"
            onChange={(event) =>
              onContactDataChange({
                ...contactData,
                privacyAcknowledged: event.target.checked,
              })
            }
            required
            type="checkbox"
          />
          <span>
            Am citit Politica de confidențialitate și înțeleg cum sunt
            prelucrate datele necesare programării.
          </span>
        </label>
      </div>

      <div className="custom-booking-submit">
        <button
          aria-describedby="booking-demo-submit-note"
          className="button button-primary"
          type="submit"
        >
          Continuă la verificarea datelor
        </button>
        <p id="booking-demo-submit-note">
          În pasul următor vei putea verifica toate informațiile înainte de
          trimitere. Selecția curentă: {selectedService.title},{" "}
          {bookingModeContent[mode].summaryLabel.toLowerCase()}.
        </p>
      </div>
    </form>
  );
}
