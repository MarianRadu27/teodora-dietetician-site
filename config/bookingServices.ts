import { officeLocation } from "./officeLocation";

export type BookingMode = "online" | "office";

export type BookingService = {
  id: string;
  title: string;
  shortDescription: string;
  durationMinutes: number;
  priceLei: number | null;
  calLinks: Record<BookingMode, string | null>;
  availableOnline: boolean;
  availableInOffice: boolean;
};

export const bookingServices: BookingService[] = [
  {
    id: "consultatie-initiala",
    title: "Consultație nutrițională inițială",
    shortDescription:
      "Evaluarea statusului nutrițional, a istoricului relevant și stabilirea obiectivelor nutriționale.",
    durationMinutes: 90,
    priceLei: 390,
    calLinks: {
      online: "teodora-palii/consultatie-nutritionala-initiala-online",
      office: "teodora-palii/consultatie-nutritionala-initiala-cabinet",
    },
    availableOnline: true,
    availableInOffice: true,
  },
  {
    id: "monitorizare-plan",
    title: "Monitorizare și ajustare a planului nutrițional",
    shortDescription:
      "Analizarea modului în care a fost aplicat planul și ajustarea recomandărilor.",
    durationMinutes: 30,
    priceLei: 150,
    calLinks: {
      online: "teodora-palii/[SLUG-CAL-MONITORIZARE-ONLINE]",
      office: "teodora-palii/monitorizare-nutritionala",
    },
    availableOnline: true,
    availableInOffice: true,
  },
  {
    id: "consiliere-nutritionala",
    title: "Ședință de consiliere și educație nutrițională",
    shortDescription:
      "Recomandări practice și explicații adaptate pentru dezvoltarea autonomiei alimentare.",
    durationMinutes: 60,
    priceLei: 200,
    calLinks: {
      online: "teodora-palii/[SLUG-CAL-CONSILIERE-ONLINE]",
      office: "teodora-palii/[SLUG-CAL-CONSILIERE-CABINET]",
    },
    availableOnline: true,
    availableInOffice: true,
  },
  {
    id: "analiza-compozitie-corporala",
    title: "Analiza compoziției corporale",
    shortDescription:
      "Evaluarea compoziției corporale prin bioimpedanță și interpretarea rezultatelor.",
    durationMinutes: 10,
    priceLei: 60,
    calLinks: {
      online: null,
      office: "teodora-palii/[SLUG-CAL-ANALIZA-CORPORALA]",
    },
    availableOnline: false,
    availableInOffice: true,
  },
];

const bookingServiceIdAliases: Record<string, string> = {
  "monitorizare-periodica": "monitorizare-plan",
  "analiza-compozitiei-corporale": "analiza-compozitie-corporala",
};

export function normalizeBookingServiceId(serviceId: string | null): string | null {
  if (!serviceId) {
    return null;
  }

  return bookingServiceIdAliases[serviceId] ?? serviceId;
}

export const bookingModeContent: Record<
  BookingMode,
  {
    label: string;
    summaryLabel: string;
    serviceTitle: string;
    serviceSubtitle: string;
  }
> = {
  online: {
    label: "Online",
    summaryLabel: "Online",
    serviceTitle: "Alege serviciul online",
    serviceSubtitle: "Ai ales o consultație online.",
  },
  office: {
    label: "În cabinet",
    summaryLabel: "În cabinet",
    serviceTitle: "Alege serviciul la cabinet",
    serviceSubtitle: `Ai ales o consultație fizică la ${officeLocation.shortName}.`,
  },
};

export function getVisibleServices(mode: BookingMode): BookingService[] {
  return bookingServices.filter((service) => {
    if (mode === "online") {
      return service.availableOnline;
    }

    return service.availableInOffice;
  });
}

export function getBookingServiceById(
  serviceId: string | null,
): BookingService | null {
  const normalizedServiceId = normalizeBookingServiceId(serviceId);

  if (!normalizedServiceId) {
    return null;
  }

  return (
    bookingServices.find((service) => service.id === normalizedServiceId) ?? null
  );
}

export function getBookingServiceForMode(
  serviceId: string | null,
  mode: BookingMode | null,
): BookingService | null {
  const normalizedServiceId = normalizeBookingServiceId(serviceId);

  if (!normalizedServiceId || !mode) {
    return null;
  }

  return (
    getVisibleServices(mode).find((service) => service.id === normalizedServiceId) ??
    null
  );
}

export function getBookingServiceCalLink(
  service: BookingService,
  mode: BookingMode,
): string | null {
  return service.calLinks[mode];
}

export function formatBookingDuration(durationMinutes: number): string {
  if (durationMinutes <= 0) {
    return "Durată disponibilă în curând";
  }

  return `${durationMinutes} de minute`;
}

export function formatBookingPrice(priceLei: number | null): string {
  if (priceLei === null) {
    return "Preț disponibil în curând";
  }

  return `${priceLei} lei`;
}
