import type { BookingMode } from "../../../config/bookingServices";
import {
  getOfficeLocationAddress,
  officeLocation,
} from "../../../config/officeLocation";

type BookingModeSelectorProps = {
  onSelectMode: (mode: BookingMode) => void;
};

const modeCards: Array<{
  mode: BookingMode;
  title: string;
  description: string;
  location?: {
    name: string;
    address: string;
  };
  secondaryInfo: string;
  buttonLabel: string;
}> = [
  {
    mode: "online",
    title: "Programează-te pentru o sesiune online",
    description:
      "Participă la consultație de oriunde, prin intermediul unei întâlniri video.",
    secondaryInfo:
      "Linkul întâlnirii va fi transmis prin email după confirmarea programării.",
    buttonLabel: "Alege sesiunea online",
  },
  {
    mode: "office",
    title: "Programează-te pentru o sesiune în cabinet",
    description: `Participă fizic la consultație, în cadrul ${officeLocation.name} din Iași.`,
    location: {
      name: officeLocation.name,
      address: getOfficeLocationAddress(),
    },
    secondaryInfo:
      "Adresa și informațiile necesare vor fi incluse și în emailul de confirmare.",
    buttonLabel: "Alege sesiunea în cabinet",
  },
];

export function BookingModeSelector({
  onSelectMode,
}: BookingModeSelectorProps) {
  return (
    <div className="booking-mode-grid">
      {modeCards.map((card) => (
        <article className="soft-card booking-mode-card" key={card.mode}>
          <div>
            <h2 className="h3">{card.title}</h2>
            <p className="body-text">{card.description}</p>
            {card.location ? (
              <address className="booking-mode-location">
                <strong>{card.location.name}</strong>
                <span>{card.location.address}</span>
              </address>
            ) : null}
            <p className="booking-secondary-text">{card.secondaryInfo}</p>
          </div>
          <button
            className="button button-primary"
            onClick={() => onSelectMode(card.mode)}
            type="button"
          >
            {card.buttonLabel}
          </button>
        </article>
      ))}
    </div>
  );
}
