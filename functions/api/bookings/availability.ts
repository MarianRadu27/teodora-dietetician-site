import {
  getBookingServiceById,
  type BookingMode,
} from "../../../config/bookingServices";
import {
  bucharestDateTimeToUtc,
  createCandidateSlots,
  formatDateValue,
  isDateInsideBookingWindow,
  parseDateValue,
  TIME_ZONE,
} from "../../_shared/bookingRules";

type AvailabilityEnvironment = {
  BOOKINGS_DB?: D1Database;
};

type D1Database = {
  prepare(query: string): D1PreparedStatement;
};

type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement;
  all<T>(): Promise<{ results?: T[] }>;
};

type PagesFunctionContext = {
  env: AvailabilityEnvironment;
  request: Request;
};

type OccupiedSlotRow = {
  slot_start_utc: string;
};

const OCCUPIED_SLOTS_QUERY = `
  SELECT calendar_slots.slot_start_utc
  FROM calendar_slots
  LEFT JOIN bookings
    ON bookings.id = calendar_slots.booking_id
  LEFT JOIN blocked_periods
    ON blocked_periods.id = calendar_slots.blocked_period_id
  WHERE calendar_slots.slot_start_utc >= ?
    AND calendar_slots.slot_start_utc < ?
    AND (
      (
        bookings.id IS NOT NULL
        AND (
          bookings.status = 'confirmed'
          OR (
            bookings.status = 'pending_email_confirmation'
            AND bookings.expires_at > ?
          )
        )
      )
      OR (
        blocked_periods.id IS NOT NULL
        AND blocked_periods.is_active = 1
      )
    )
`;

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function isMode(value: string | null): value is BookingMode {
  return value === "online" || value === "office";
}

function isServiceAvailableForMode(
  mode: BookingMode,
  service: NonNullable<ReturnType<typeof getBookingServiceById>>,
) {
  return mode === "online"
    ? service.availableOnline
    : service.availableInOffice;
}

export async function onRequestGet({
  env,
  request,
}: PagesFunctionContext) {
  const url = new URL(request.url);
  const dateValue = url.searchParams.get("date");
  const serviceId = url.searchParams.get("service");
  const mode = url.searchParams.get("mode");
  const parsedDate = parseDateValue(dateValue);
  const service = getBookingServiceById(serviceId);

  if (!parsedDate) {
    return jsonResponse(
      {
        code: "INVALID_DATE",
        message: "Data trebuie sa aiba formatul YYYY-MM-DD.",
      },
      400,
    );
  }

  if (!service) {
    return jsonResponse(
      {
        code: "INVALID_SERVICE",
        message: "Serviciul selectat nu exista.",
      },
      400,
    );
  }

  if (!isMode(mode) || !isServiceAvailableForMode(mode, service)) {
    return jsonResponse(
      {
        code: "INVALID_MODE",
        message: "Modalitatea nu este disponibila pentru acest serviciu.",
      },
      400,
    );
  }

  const weekday = parsedDate.date.getUTCDay();
  const now = new Date();

  if (
    weekday === 0 ||
    weekday === 6 ||
    !isDateInsideBookingWindow(parsedDate.date, now)
  ) {
    return jsonResponse(
      {
        code: "DATE_NOT_BOOKABLE",
        message: "Data nu se afla in intervalul disponibil pentru programari.",
      },
      400,
    );
  }

  if (!env.BOOKINGS_DB) {
    return jsonResponse(
      {
        code: "BOOKINGS_UNAVAILABLE",
        message: "Serviciul de programari nu este configurat.",
      },
      503,
    );
  }

  const nextDate = new Date(parsedDate.date);
  nextDate.setUTCDate(nextDate.getUTCDate() + 1);
  const dayStart = bucharestDateTimeToUtc(dateValue!, 0).toISOString();
  const dayEnd = bucharestDateTimeToUtc(
    formatDateValue(nextDate),
    0,
  ).toISOString();

  try {
    const result = await env.BOOKINGS_DB.prepare(OCCUPIED_SLOTS_QUERY)
      .bind(dayStart, dayEnd, now.toISOString())
      .all<OccupiedSlotRow>();
    const occupiedSlotStarts = new Set(
      (result.results ?? []).map((row) =>
        new Date(row.slot_start_utc).getTime(),
      ),
    );
    const availableTimes = createCandidateSlots(
      dateValue!,
      service.durationMinutes,
      occupiedSlotStarts,
      now,
    );

    return jsonResponse({
      availableTimes,
      date: dateValue,
      durationMinutes: service.durationMinutes,
      generatedAt: now.toISOString(),
      mode,
      serviceId: service.id,
      timeZone: TIME_ZONE,
    });
  } catch (error) {
    console.error("Could not read booking availability.", error);

    return jsonResponse(
      {
        code: "AVAILABILITY_QUERY_FAILED",
        message: "Disponibilitatea nu a putut fi verificata.",
      },
      500,
    );
  }
}
