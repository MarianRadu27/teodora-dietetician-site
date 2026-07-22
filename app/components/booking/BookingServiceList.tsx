import type { BookingMode } from "../../../config/bookingServices";
import {
  bookingModeContent,
  getVisibleServices,
} from "../../../config/bookingServices";
import { BookingServiceCard } from "./BookingServiceCard";

type BookingServiceListProps = {
  mode: BookingMode;
  onBackToMode: () => void;
  onSelectService: (serviceId: string) => void;
};

export function BookingServiceList({
  mode,
  onBackToMode,
  onSelectService,
}: BookingServiceListProps) {
  const visibleServices = getVisibleServices(mode);

  return (
    <div className="booking-panel">
      <button
        className="booking-back-button"
        onClick={onBackToMode}
        type="button"
      >
        ← Înapoi la alegerea modalității
      </button>
      <div className="section-heading">
        <p className="eyebrow">Pasul 2</p>
        <h2 className="h2">{bookingModeContent[mode].serviceTitle}</h2>
        <p className="lead">{bookingModeContent[mode].serviceSubtitle}</p>
      </div>
      <div className="booking-service-grid">
        {visibleServices.map((service) => (
          <BookingServiceCard
            key={service.id}
            mode={mode}
            onSelectService={onSelectService}
            service={service}
          />
        ))}
      </div>
    </div>
  );
}
