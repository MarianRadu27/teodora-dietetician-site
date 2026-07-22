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

type BookingSummaryProps = {
  mode: BookingMode;
  onChangeMode: () => void;
  onChangeService: () => void;
  service: BookingService;
};

export function BookingSummary({
  mode,
  onChangeMode,
  onChangeService,
  service,
}: BookingSummaryProps) {
  return (
    <aside className="soft-card booking-summary" aria-label="Programarea ta">
      <p className="eyebrow">Programarea ta</p>
      <h2 className="h3">{service.title}</h2>
      <dl className="booking-summary-list">
        <div>
          <dt>Modalitate</dt>
          <dd>{bookingModeContent[mode].summaryLabel}</dd>
        </div>
        {mode === "office" ? (
          <div>
            <dt>Locație</dt>
            <dd>
              <span>{officeLocation.name}</span>
              <span className="booking-summary-address">
                {getOfficeLocationAddress()}
              </span>
            </dd>
          </div>
        ) : null}
        <div>
          <dt>Durată</dt>
          <dd>{formatBookingDuration(service.durationMinutes)}</dd>
        </div>
        <div>
          <dt>Preț</dt>
          <dd>{formatBookingPrice(service.priceLei)}</dd>
        </div>
      </dl>
      <div className="booking-summary-actions">
        <button onClick={onChangeService} type="button">
          Schimbă serviciul
        </button>
        <button onClick={onChangeMode} type="button">
          Schimbă modalitatea
        </button>
      </div>
    </aside>
  );
}
