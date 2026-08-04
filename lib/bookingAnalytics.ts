import type { BookingMode } from "../config/bookingServices";

export type BookingAnalyticsEvent =
  | "booking_mode_selected"
  | "booking_service_selected"
  | "booking_calendar_opened"
  | "booking_completed"
  | "booking_error";

export type BookingAnalyticsPayload = {
  mode?: BookingMode;
  serviceId?: string;
};

export type BookingAnalyticsEventDetail = {
  name: BookingAnalyticsEvent;
  payload: BookingAnalyticsPayload;
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
