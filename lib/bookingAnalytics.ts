import type { BookingMode } from "../config/bookingServices";

type BookingAnalyticsEvent =
  | "booking_mode_selected"
  | "booking_service_selected"
  | "booking_calendar_opened"
  | "booking_completed"
  | "booking_error";

type BookingAnalyticsPayload = {
  mode?: BookingMode;
  serviceId?: string;
};

export function trackBookingEvent(
  name: BookingAnalyticsEvent,
  payload: BookingAnalyticsPayload,
) {
  if (typeof window === "undefined") {
    return;
  }

  window.dispatchEvent(
    new CustomEvent("booking_analytics_event", {
      detail: {
        name,
        payload,
      },
    }),
  );
}
