import type {
  BookingMode,
  BookingService,
} from "../../../config/bookingServices";
import {
  bookingModeContent,
  formatBookingDuration,
  formatBookingPrice,
} from "../../../config/bookingServices";

type BookingServiceCardProps = {
  mode: BookingMode;
  onSelectService: (serviceId: string) => void;
  service: BookingService;
};

export function BookingServiceCard({
  mode,
  onSelectService,
  service,
}: BookingServiceCardProps) {
  return (
    <article className="soft-card booking-service-card">
      <div>
        <h3 className="h3">{service.title}</h3>
        <p className="body-text">{service.shortDescription}</p>
      </div>
      <dl className="booking-service-meta">
        <div>
          <dt>Durată</dt>
          <dd>{formatBookingDuration(service.durationMinutes)}</dd>
        </div>
        <div>
          <dt>Preț</dt>
          <dd>{formatBookingPrice(service.priceLei)}</dd>
        </div>
        <div>
          <dt>Modalitate</dt>
          <dd>{bookingModeContent[mode].summaryLabel}</dd>
        </div>
      </dl>
      <button
        className="button button-primary"
        onClick={() => onSelectService(service.id)}
        type="button"
      >
        Alege acest serviciu
      </button>
    </article>
  );
}
