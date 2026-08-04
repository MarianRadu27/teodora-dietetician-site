"use client";

import { useEffect, useMemo, useState } from "react";

import type {
  BookingMode,
  BookingService,
} from "../../../config/bookingServices";

type BookingDateTimeDemoProps = {
  onContinue: () => void;
  onDateChange: (value: string) => void;
  onTimeChange: (value: string) => void;
  selectedDate: string;
  selectedMode: BookingMode;
  selectedService: BookingService;
  selectedTime: string;
};

type DateOption = {
  label: string;
  value: string;
};

type CalendarDay = {
  date: Date;
  inCurrentMonth: boolean;
  value: string;
};

type AvailabilityResponse = {
  availableTimes?: unknown;
  message?: string;
};

type AvailabilityStatus = "idle" | "loading" | "success" | "error";

const BUCHAREST_TIME_ZONE = "Europe/Bucharest";
const BOOKING_WINDOW_DAYS = 30;
const WEEKDAY_LABELS = ["Lu", "Ma", "Mi", "Jo", "Vi", "Sâ", "Du"];

function formatDateValue(date: Date) {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}

function getBucharestNow() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    day: "2-digit",
    hour: "2-digit",
    hourCycle: "h23",
    minute: "2-digit",
    month: "2-digit",
    timeZone: BUCHAREST_TIME_ZONE,
    year: "numeric",
  }).formatToParts(new Date());

  return Object.fromEntries(
    parts
      .filter((part) => part.type !== "literal")
      .map((part) => [part.type, Number(part.value)]),
  ) as Record<"year" | "month" | "day" | "hour" | "minute", number>;
}

function createDateOptions(): DateOption[] {
  const now = getBucharestNow();
  const firstDate = new Date(Date.UTC(now.year, now.month - 1, now.day, 12));
  const formatter = new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    weekday: "long",
  });
  const options: DateOption[] = [];

  for (let offset = 0; offset < BOOKING_WINDOW_DAYS; offset += 1) {
    const date = new Date(firstDate);
    date.setUTCDate(firstDate.getUTCDate() + offset);
    const weekday = date.getUTCDay();

    if (weekday === 0 || weekday === 6) {
      continue;
    }

    options.push({
      label: formatter.format(date),
      value: formatDateValue(date),
    });
  }

  return options;
}

function createCalendarDays(monthValue: string): CalendarDay[] {
  if (!monthValue) {
    return [];
  }

  const [year, month] = monthValue.split("-").map(Number);
  const firstOfMonth = new Date(Date.UTC(year, month - 1, 1, 12));
  const mondayBasedOffset = (firstOfMonth.getUTCDay() + 6) % 7;
  const firstCalendarDay = new Date(firstOfMonth);
  firstCalendarDay.setUTCDate(firstOfMonth.getUTCDate() - mondayBasedOffset);

  return Array.from({ length: 42 }, (_, index) => {
    const date = new Date(firstCalendarDay);
    date.setUTCDate(firstCalendarDay.getUTCDate() + index);

    return {
      date,
      inCurrentMonth: date.getUTCMonth() === month - 1,
      value: formatDateValue(date),
    };
  });
}

function formatMonthTitle(monthValue: string) {
  if (!monthValue) {
    return "";
  }

  const [year, month] = monthValue.split("-").map(Number);
  const value = new Intl.DateTimeFormat("ro-RO", {
    month: "long",
    timeZone: "UTC",
    year: "numeric",
  }).format(new Date(Date.UTC(year, month - 1, 1, 12)));

  return value.charAt(0).toUpperCase() + value.slice(1);
}

function formatAccessibleDate(date: Date) {
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
    weekday: "long",
    year: "numeric",
  }).format(date);
}

function formatSelectedDate(value: string) {
  if (!value) {
    return "Alege mai întâi data";
  }

  const [year, month, day] = value.split("-").map(Number);
  return new Intl.DateTimeFormat("ro-RO", {
    day: "numeric",
    month: "long",
    timeZone: "UTC",
  }).format(new Date(Date.UTC(year, month - 1, day, 12)));
}

function shiftMonth(monthValue: string, offset: number) {
  const [year, month] = monthValue.split("-").map(Number);
  const nextMonth = new Date(Date.UTC(year, month - 1 + offset, 1, 12));

  return `${nextMonth.getUTCFullYear()}-${String(
    nextMonth.getUTCMonth() + 1,
  ).padStart(2, "0")}`;
}

export function BookingDateTimeDemo({
  onContinue,
  onDateChange,
  onTimeChange,
  selectedDate,
  selectedMode,
  selectedService,
  selectedTime,
}: BookingDateTimeDemoProps) {
  const [dateOptions, setDateOptions] = useState<DateOption[]>([]);
  const [visibleMonth, setVisibleMonth] = useState("");
  const [timeOptions, setTimeOptions] = useState<string[]>([]);
  const [availabilityStatus, setAvailabilityStatus] =
    useState<AvailabilityStatus>("idle");
  const [availabilityError, setAvailabilityError] = useState("");
  const [retryRequest, setRetryRequest] = useState(0);
  const availableDates = useMemo(
    () => new Set(dateOptions.map((option) => option.value)),
    [dateOptions],
  );
  const calendarDays = useMemo(
    () => createCalendarDays(visibleMonth),
    [visibleMonth],
  );
  const firstAvailableMonth = dateOptions[0]?.value.slice(0, 7) ?? "";
  const lastAvailableMonth =
    dateOptions.at(-1)?.value.slice(0, 7) ?? firstAvailableMonth;

  useEffect(() => {
    const options = createDateOptions();
    setDateOptions(options);
    setVisibleMonth(
      selectedDate.slice(0, 7) || options[0]?.value.slice(0, 7) || "",
    );
  }, [selectedDate]);

  useEffect(() => {
    if (!selectedDate) {
      setAvailabilityError("");
      setAvailabilityStatus("idle");
      setTimeOptions([]);
      return;
    }

    const controller = new AbortController();

    async function loadAvailability() {
      setAvailabilityError("");
      setAvailabilityStatus("loading");
      setTimeOptions([]);

      const params = new URLSearchParams({
        date: selectedDate,
        mode: selectedMode,
        service: selectedService.id,
      });

      try {
        const response = await fetch(
          `/api/bookings/availability?${params.toString()}`,
          {
            headers: {
              Accept: "application/json",
            },
            signal: controller.signal,
          },
        );
        const body = (await response.json()) as AvailabilityResponse;

        if (!response.ok) {
          throw new Error(
            body.message || "Disponibilitatea nu a putut fi verificată.",
          );
        }

        if (
          !Array.isArray(body.availableTimes) ||
          !body.availableTimes.every((time) => typeof time === "string")
        ) {
          throw new Error("Răspunsul primit pentru disponibilitate este invalid.");
        }

        setTimeOptions(body.availableTimes);
        setAvailabilityStatus("success");
      } catch (error) {
        if (controller.signal.aborted) {
          return;
        }

        setAvailabilityError(
          error instanceof Error
            ? error.message
            : "Disponibilitatea nu a putut fi verificată.",
        );
        setAvailabilityStatus("error");
      }
    }

    void loadAvailability();

    return () => controller.abort();
  }, [
    retryRequest,
    selectedDate,
    selectedMode,
    selectedService.id,
  ]);

  useEffect(() => {
    if (selectedTime && !timeOptions.includes(selectedTime)) {
      onTimeChange("");
    }
  }, [onTimeChange, selectedTime, timeOptions]);

  const canContinue = Boolean(
    selectedDate &&
      selectedTime &&
      availabilityStatus === "success",
  );

  return (
    <div className="custom-booking-date-time">
      <div className="custom-booking-picker">
        <section
          aria-labelledby="booking-calendar-title"
          className="custom-booking-calendar"
        >
          <div className="custom-booking-calendar-header">
            <button
              aria-label="Luna anterioară"
              className="custom-booking-calendar-nav"
              disabled={
                !visibleMonth ||
                !firstAvailableMonth ||
                visibleMonth <= firstAvailableMonth
              }
              onClick={() =>
                setVisibleMonth((current) => shiftMonth(current, -1))
              }
              type="button"
            >
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="m15 18-6-6 6-6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
            <h2 id="booking-calendar-title">
              {formatMonthTitle(visibleMonth)}
            </h2>
            <button
              aria-label="Luna următoare"
              className="custom-booking-calendar-nav"
              disabled={
                !visibleMonth ||
                !lastAvailableMonth ||
                visibleMonth >= lastAvailableMonth
              }
              onClick={() =>
                setVisibleMonth((current) => shiftMonth(current, 1))
              }
              type="button"
            >
              <svg
                aria-hidden="true"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  d="m9 18 6-6-6-6"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                />
              </svg>
            </button>
          </div>

          <div
            aria-hidden="true"
            className="custom-booking-calendar-weekdays"
          >
            {WEEKDAY_LABELS.map((weekday) => (
              <span key={weekday}>{weekday}</span>
            ))}
          </div>

          <div
            aria-label="Alege data consultației"
            className="custom-booking-calendar-grid"
            role="group"
          >
            {calendarDays.map((day) => {
              const isAvailable = availableDates.has(day.value);
              const isSelected = selectedDate === day.value;

              return (
                <button
                  aria-label={formatAccessibleDate(day.date)}
                  aria-pressed={isSelected}
                  className={[
                    "custom-booking-calendar-day",
                    day.inCurrentMonth ? "" : "is-outside-month",
                    isSelected ? "is-selected" : "",
                  ]
                    .filter(Boolean)
                    .join(" ")}
                  disabled={!isAvailable}
                  key={day.value}
                  onClick={() => {
                    onDateChange(day.value);
                    onTimeChange("");
                  }}
                  type="button"
                >
                  {day.date.getUTCDate()}
                </button>
              );
            })}
          </div>

          <p className="custom-booking-calendar-help">
            Poți alege o zi lucrătoare din următoarele 30 de zile.
          </p>
        </section>

        <section
          aria-labelledby="booking-time-title"
          className="custom-booking-times"
        >
          <div className="custom-booking-times-header">
            <h2 id="booking-time-title">Ora consultației</h2>
            <span>{formatSelectedDate(selectedDate)}</span>
          </div>

          <div aria-live="polite">
            {!selectedDate ? (
              <p className="custom-booking-times-empty">
                Selectează o zi din calendar pentru a vedea orele disponibile.
              </p>
            ) : availabilityStatus === "loading" ? (
              <p className="custom-booking-times-empty">
                Se verifică orele disponibile...
              </p>
            ) : availabilityStatus === "error" ? (
              <div className="custom-booking-times-error" role="alert">
                <p>{availabilityError}</p>
                <button
                  className="button button-secondary"
                  onClick={() => setRetryRequest((current) => current + 1)}
                  type="button"
                >
                  Încearcă din nou
                </button>
              </div>
            ) : timeOptions.length ? (
              <div
                aria-label="Alege ora consultației"
                className="custom-booking-time-list"
                role="group"
              >
                {timeOptions.map((time) => (
                  <button
                    aria-pressed={selectedTime === time}
                    className={`custom-booking-time-option ${
                      selectedTime === time ? "is-selected" : ""
                    }`}
                    key={time}
                    onClick={() => onTimeChange(time)}
                    type="button"
                  >
                    {time}
                  </button>
                ))}
              </div>
            ) : (
              <p className="custom-booking-times-empty">
                Nu mai sunt ore disponibile în această zi.
              </p>
            )}
          </div>

          <small>Orele sunt afișate pentru fusul Europe/Bucharest.</small>
        </section>
      </div>

      <div className="custom-booking-schedule-note" role="note">
        <strong>Disponibilitate actualizată</strong>
        <span>
          Luni–vineri, 09:00–20:00, cu minimum 6 ore înainte și o pauză de
          10 minute între consultații.
        </span>
      </div>

      <button
        className="button button-primary"
        disabled={!canContinue}
        onClick={onContinue}
        type="button"
      >
        Continuă cu datele de contact
      </button>
    </div>
  );
}
