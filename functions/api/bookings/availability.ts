import {
  getBookingServiceById,
  type BookingMode,
} from "../../../config/bookingServices";

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

const TIME_ZONE = "Europe/Bucharest";
const BOOKING_WINDOW_DAYS = 30;
const OPENING_MINUTES = 9 * 60;
const CLOSING_MINUTES = 20 * 60;
const MINIMUM_NOTICE_MINUTES = 6 * 60;
const SLOT_STEP_MINUTES = 10;
const MILLISECONDS_PER_MINUTE = 60_000;
const MILLISECONDS_PER_DAY = 24 * 60 * MILLISECONDS_PER_MINUTE;

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

function parseDateValue(value: string | null) {
  if (!value || !/^\d{4}-\d{2}-\d{2}$/.test(value)) {
    return null;
  }

  const [year, month, day] = value.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day, 12));

  if (
    date.getUTCFullYear() !== year ||
    date.getUTCMonth() !== month - 1 ||
    date.getUTCDate() !== day
  ) {
    return null;
  }

  return { date, day, month, year };
}

function formatDateValue(date: Date) {
  return [
    date.getUTCFullYear(),
    String(date.getUTCMonth() + 1).padStart(2, "0"),
    String(date.getUTCDate()).padStart(2, "0"),
  ].join("-");
}

function getBucharestParts(date: Date) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
    minute: "2-digit",
    month: "2-digit",
    second: "2-digit",
    timeZone: TIME_ZONE,
    year: "numeric",
  }).formatToParts(date);

  return Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  ) as Record<
    "year" | "month" | "day" | "hour" | "minute" | "second",
    number
  >;
}

function getTimeZoneOffset(date: Date) {
  const parts = getBucharestParts(date);
  const representedAsUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute,
    parts.second,
  );

  return representedAsUtc - date.getTime();
}

function bucharestDateTimeToUtc(
  dateValue: string,
  totalMinutes: number,
) {
  const [year, month, day] = dateValue.split("-").map(Number);
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;
  const localTimeAsUtc = Date.UTC(year, month - 1, day, hour, minute);
  const firstOffset = getTimeZoneOffset(new Date(localTimeAsUtc));
  let utcTime = localTimeAsUtc - firstOffset;
  const correctedOffset = getTimeZoneOffset(new Date(utcTime));

  if (correctedOffset !== firstOffset) {
    utcTime = localTimeAsUtc - correctedOffset;
  }

  return new Date(utcTime);
}

function formatTime(totalMinutes: number) {
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
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

function isDateInsideBookingWindow(selectedDate: Date, now: Date) {
  const nowParts = getBucharestParts(now);
  const today = Date.UTC(nowParts.year, nowParts.month - 1, nowParts.day, 12);
  const selected = Date.UTC(
    selectedDate.getUTCFullYear(),
    selectedDate.getUTCMonth(),
    selectedDate.getUTCDate(),
    12,
  );
  const differenceInDays = Math.round(
    (selected - today) / MILLISECONDS_PER_DAY,
  );

  return differenceInDays >= 0 && differenceInDays < BOOKING_WINDOW_DAYS;
}

function createCandidateSlots(
  dateValue: string,
  durationMinutes: number,
  occupiedSlotStarts: Set<number>,
  now: Date,
) {
  const availableTimes: string[] = [];
  const latestStart = CLOSING_MINUTES - durationMinutes;
  const earliestAllowedStart =
    now.getTime() + MINIMUM_NOTICE_MINUTES * MILLISECONDS_PER_MINUTE;

  for (
    let startMinutes = OPENING_MINUTES;
    startMinutes <= latestStart;
    startMinutes += SLOT_STEP_MINUTES
  ) {
    const startsAt = bucharestDateTimeToUtc(dateValue, startMinutes);

    if (startsAt.getTime() < earliestAllowedStart) {
      continue;
    }

    const endsAtMinutes = startMinutes + durationMinutes;
    const occupiedUntilMinutes =
      endsAtMinutes === CLOSING_MINUTES
        ? endsAtMinutes
        : endsAtMinutes + SLOT_STEP_MINUTES;
    let isAvailable = true;

    for (
      let slotMinutes = startMinutes;
      slotMinutes < occupiedUntilMinutes;
      slotMinutes += SLOT_STEP_MINUTES
    ) {
      const slotStart = bucharestDateTimeToUtc(
        dateValue,
        slotMinutes,
      ).getTime();

      if (occupiedSlotStarts.has(slotStart)) {
        isAvailable = false;
        break;
      }
    }

    if (isAvailable) {
      availableTimes.push(formatTime(startMinutes));
    }
  }

  return availableTimes;
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
