import type { BookingMode } from "../config/bookingServices";

export function parseBookingMode(value: string | null): BookingMode | null {
  if (value === "online") {
    return "online";
  }

  if (value === "cabinet") {
    return "office";
  }

  return null;
}

export function getBookingModeQueryValue(mode: BookingMode): string {
  return mode === "office" ? "cabinet" : "online";
}

export function buildBookingQuery(
  mode: BookingMode | null,
  serviceId?: string | null,
): string {
  const params = new URLSearchParams();

  if (mode) {
    params.set("modalitate", getBookingModeQueryValue(mode));
  }

  if (mode && serviceId) {
    params.set("serviciu", serviceId);
  }

  const query = params.toString();
  return query ? `?${query}` : "";
}
