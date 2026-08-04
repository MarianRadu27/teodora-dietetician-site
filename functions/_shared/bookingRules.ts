const TIME_ZONE = "Europe/Bucharest";
const BOOKING_WINDOW_DAYS = 30;
const OPENING_MINUTES = 9 * 60;
const CLOSING_MINUTES = 20 * 60;
const MINIMUM_NOTICE_MINUTES = 6 * 60;
const SLOT_STEP_MINUTES = 10;
const MILLISECONDS_PER_MINUTE = 60_000;
const MILLISECONDS_PER_DAY = 24 * 60 * MILLISECONDS_PER_MINUTE;

type BookingSlotPlan = {
  endsAt: Date;
  occupiedUntil: Date;
  slotStarts: Date[];
  startsAt: Date;
};

export { SLOT_STEP_MINUTES, TIME_ZONE };
export type { BookingSlotPlan };

export function parseDateValue(value: string | null) {
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

export function formatDateValue(date: Date) {
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

export function bucharestDateTimeToUtc(
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

function parseTimeValue(value: string) {
  if (!/^\d{2}:\d{2}$/.test(value)) {
    return null;
  }

  const [hour, minute] = value.split(":").map(Number);

  if (
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59 ||
    minute % SLOT_STEP_MINUTES !== 0
  ) {
    return null;
  }

  return hour * 60 + minute;
}

export function formatTime(totalMinutes: number) {
  const hour = Math.floor(totalMinutes / 60);
  const minute = totalMinutes % 60;

  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
}

export function isDateInsideBookingWindow(selectedDate: Date, now: Date) {
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

export function createBookingSlotPlan(
  dateValue: string,
  timeValue: string,
  durationMinutes: number,
  now: Date,
): BookingSlotPlan | null {
  const parsedDate = parseDateValue(dateValue);
  const startMinutes = parseTimeValue(timeValue);

  if (
    !parsedDate ||
    startMinutes === null ||
    durationMinutes <= 0 ||
    parsedDate.date.getUTCDay() === 0 ||
    parsedDate.date.getUTCDay() === 6 ||
    !isDateInsideBookingWindow(parsedDate.date, now)
  ) {
    return null;
  }

  const endsAtMinutes = startMinutes + durationMinutes;

  if (
    startMinutes < OPENING_MINUTES ||
    endsAtMinutes > CLOSING_MINUTES
  ) {
    return null;
  }

  const startsAt = bucharestDateTimeToUtc(dateValue, startMinutes);
  const earliestAllowedStart =
    now.getTime() + MINIMUM_NOTICE_MINUTES * MILLISECONDS_PER_MINUTE;

  if (startsAt.getTime() < earliestAllowedStart) {
    return null;
  }

  const occupiedUntilMinutes =
    endsAtMinutes === CLOSING_MINUTES
      ? endsAtMinutes
      : endsAtMinutes + SLOT_STEP_MINUTES;
  const slotStarts: Date[] = [];

  for (
    let slotMinutes = startMinutes;
    slotMinutes < occupiedUntilMinutes;
    slotMinutes += SLOT_STEP_MINUTES
  ) {
    slotStarts.push(bucharestDateTimeToUtc(dateValue, slotMinutes));
  }

  return {
    endsAt: bucharestDateTimeToUtc(dateValue, endsAtMinutes),
    occupiedUntil: bucharestDateTimeToUtc(
      dateValue,
      occupiedUntilMinutes,
    ),
    slotStarts,
    startsAt,
  };
}

export function createCandidateSlots(
  dateValue: string,
  durationMinutes: number,
  occupiedSlotStarts: Set<number>,
  now: Date,
) {
  const availableTimes: string[] = [];
  const latestStart = CLOSING_MINUTES - durationMinutes;

  for (
    let startMinutes = OPENING_MINUTES;
    startMinutes <= latestStart;
    startMinutes += SLOT_STEP_MINUTES
  ) {
    const timeValue = formatTime(startMinutes);
    const plan = createBookingSlotPlan(
      dateValue,
      timeValue,
      durationMinutes,
      now,
    );

    if (
      plan &&
      !plan.slotStarts.some((slot) =>
        occupiedSlotStarts.has(slot.getTime()),
      )
    ) {
      availableTimes.push(timeValue);
    }
  }

  return availableTimes;
}
