import {
  getBookingServiceById,
  type BookingMode,
} from "../../../config/bookingServices";
import {
  createBookingSlotPlan,
  SLOT_STEP_MINUTES,
  TIME_ZONE,
} from "../../_shared/bookingRules";

type BookingEnvironment = {
  BOOKINGS_DB?: D1Database;
  TURNSTILE_SECRET_KEY?: string;
};

type D1Database = {
  batch(statements: D1PreparedStatement[]): Promise<unknown[]>;
  prepare(query: string): D1PreparedStatement;
};

type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T>(): Promise<T | null>;
  run(): Promise<unknown>;
};

type PagesFunctionContext = {
  env: BookingEnvironment;
  request: Request;
};

type BookingRequestBody = {
  date?: unknown;
  email?: unknown;
  fullName?: unknown;
  mode?: unknown;
  objective?: unknown;
  phone?: unknown;
  privacyAcknowledged?: unknown;
  serviceId?: unknown;
  time?: unknown;
  turnstileToken?: unknown;
};

type EmailBookingSummary = {
  active_pending: number;
  future_bookings: number;
};

type TurnstileResponse = {
  action?: string;
  "error-codes"?: string[];
  hostname?: string;
  success: boolean;
};

const MAX_REQUEST_BYTES = 20_000;
const PENDING_EXPIRATION_MINUTES = 30;
const MAX_FUTURE_BOOKINGS_PER_EMAIL = 2;

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
  LIMIT 1
`;

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function isMode(value: unknown): value is BookingMode {
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

function getRequiredString(
  value: unknown,
  minimumLength: number,
  maximumLength: number,
) {
  if (typeof value !== "string") {
    return null;
  }

  const normalized = value.trim();

  return normalized.length >= minimumLength &&
    normalized.length <= maximumLength
    ? normalized
    : null;
}

function getOptionalString(value: unknown, maximumLength: number) {
  if (value === undefined || value === null || value === "") {
    return null;
  }

  if (typeof value !== "string") {
    return undefined;
  }

  const normalized = value.trim();

  return normalized.length <= maximumLength ? normalized || null : undefined;
}

function isEmail(value: string) {
  return (
    value.length <= 254 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)
  );
}

function isConstraintError(error: unknown, target: string) {
  return (
    error instanceof Error &&
    error.message.includes("UNIQUE constraint failed") &&
    error.message.includes(target)
  );
}

async function verifyTurnstile(
  request: Request,
  secret: string,
  token: string,
) {
  const remoteIp = request.headers.get("CF-Connecting-IP");
  const response = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    {
      body: JSON.stringify({
        remoteip: remoteIp || undefined,
        response: token,
        secret,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      signal: AbortSignal.timeout(7_000),
    },
  );

  if (!response.ok) {
    throw new Error("Turnstile Siteverify is unavailable.");
  }

  const result = (await response.json()) as TurnstileResponse;
  const requestHostname = new URL(request.url).hostname;

  return (
    result.success &&
    result.action === "booking_request" &&
    result.hostname === requestHostname
  );
}

async function expireOldPendingBookings(db: D1Database, nowIso: string) {
  await db.batch([
    db
      .prepare(
        `
          DELETE FROM calendar_slots
          WHERE booking_id IN (
            SELECT id
            FROM bookings
            WHERE status = 'pending_email_confirmation'
              AND expires_at <= ?
          )
        `,
      )
      .bind(nowIso),
    db
      .prepare(
        `
          UPDATE bookings
          SET status = 'expired',
              updated_at = ?
          WHERE status = 'pending_email_confirmation'
            AND expires_at <= ?
        `,
      )
      .bind(nowIso, nowIso),
  ]);
}

export async function onRequestPost({
  env,
  request,
}: PagesFunctionContext) {
  const contentLength = Number(request.headers.get("Content-Length") || 0);

  if (contentLength > MAX_REQUEST_BYTES) {
    return jsonResponse(
      {
        code: "REQUEST_TOO_LARGE",
        message: "Cererea trimisă este prea mare.",
      },
      413,
    );
  }

  let body: BookingRequestBody;

  try {
    body = (await request.json()) as BookingRequestBody;
  } catch {
    return jsonResponse(
      {
        code: "INVALID_JSON",
        message: "Datele trimise nu au un format valid.",
      },
      400,
    );
  }

  const fullName = getRequiredString(body.fullName, 2, 120);
  const email = getRequiredString(body.email, 3, 254);
  const phone = getOptionalString(body.phone, 30);
  const objective = getOptionalString(body.objective, 500);
  const date = getRequiredString(body.date, 10, 10);
  const time = getRequiredString(body.time, 5, 5);
  const serviceId = getRequiredString(body.serviceId, 2, 80);
  const turnstileToken = getRequiredString(
    body.turnstileToken,
    1,
    2_048,
  );
  const service = getBookingServiceById(serviceId);

  if (
    !fullName ||
    !email ||
    !isEmail(email) ||
    phone === undefined ||
    objective === undefined ||
    !date ||
    !time ||
    !service ||
    !isMode(body.mode) ||
    !isServiceAvailableForMode(body.mode, service) ||
    body.privacyAcknowledged !== true ||
    !turnstileToken
  ) {
    return jsonResponse(
      {
        code: "INVALID_BOOKING_DATA",
        message: "Verifică datele completate și încearcă din nou.",
      },
      400,
    );
  }

  if (!env.BOOKINGS_DB || !env.TURNSTILE_SECRET_KEY) {
    return jsonResponse(
      {
        code: "BOOKINGS_UNAVAILABLE",
        message: "Serviciul de programări nu este configurat.",
      },
      503,
    );
  }

  let isHuman = false;

  try {
    isHuman = await verifyTurnstile(
      request,
      env.TURNSTILE_SECRET_KEY,
      turnstileToken,
    );
  } catch (error) {
    console.error("Turnstile verification could not be completed.", error);

    return jsonResponse(
      {
        code: "TURNSTILE_UNAVAILABLE",
        message:
          "Verificarea anti-spam nu este disponibilă momentan. Încearcă din nou.",
      },
      503,
    );
  }

  if (!isHuman) {
    return jsonResponse(
      {
        code: "TURNSTILE_FAILED",
        message: "Verificarea anti-spam nu a reușit. Încearcă din nou.",
      },
      400,
    );
  }

  const now = new Date();
  const nowIso = now.toISOString();
  const slotPlan = createBookingSlotPlan(
    date,
    time,
    service.durationMinutes,
    now,
  );

  if (!slotPlan) {
    return jsonResponse(
      {
        code: "SLOT_NOT_BOOKABLE",
        message:
          "Data sau ora nu mai respectă regulile de programare. Alege alt interval.",
      },
      409,
    );
  }

  const emailNormalized = email.toLocaleLowerCase("ro-RO");
  const expiresAt = new Date(
    now.getTime() + PENDING_EXPIRATION_MINUTES * 60_000,
  );

  try {
    await expireOldPendingBookings(env.BOOKINGS_DB, nowIso);

    const emailSummary = await env.BOOKINGS_DB.prepare(
      `
        SELECT
          SUM(
            CASE
              WHEN status = 'pending_email_confirmation'
                AND expires_at > ?
              THEN 1
              ELSE 0
            END
          ) AS active_pending,
          SUM(
            CASE
              WHEN starts_at_utc > ?
                AND (
                  status = 'confirmed'
                  OR (
                    status = 'pending_email_confirmation'
                    AND expires_at > ?
                  )
                )
              THEN 1
              ELSE 0
            END
          ) AS future_bookings
        FROM bookings
        WHERE email_normalized = ?
      `,
    )
      .bind(nowIso, nowIso, nowIso, emailNormalized)
      .first<EmailBookingSummary>();

    if ((emailSummary?.active_pending ?? 0) > 0) {
      return jsonResponse(
        {
          code: "EMAIL_HAS_PENDING_BOOKING",
          message:
            "Există deja o cerere neconfirmată pentru această adresă de email.",
        },
        409,
      );
    }

    if (
      (emailSummary?.future_bookings ?? 0) >=
      MAX_FUTURE_BOOKINGS_PER_EMAIL
    ) {
      return jsonResponse(
        {
          code: "EMAIL_BOOKING_LIMIT_REACHED",
          message:
            "Această adresă de email are deja numărul maxim de programări viitoare.",
        },
        409,
      );
    }

    const occupiedSlot = await env.BOOKINGS_DB.prepare(
      OCCUPIED_SLOTS_QUERY,
    )
      .bind(
        slotPlan.startsAt.toISOString(),
        slotPlan.occupiedUntil.toISOString(),
        nowIso,
      )
      .first<{ slot_start_utc: string }>();

    if (occupiedSlot) {
      return jsonResponse(
        {
          code: "SLOT_UNAVAILABLE",
          message:
            "Intervalul a fost ocupat între timp. Alege o altă oră.",
        },
        409,
      );
    }

    const bookingId = crypto.randomUUID();
    const bookingStatement = env.BOOKINGS_DB.prepare(
      `
        INSERT INTO bookings (
          id,
          status,
          service_id,
          service_title_snapshot,
          duration_minutes_snapshot,
          price_bani_snapshot,
          mode,
          starts_at_utc,
          ends_at_utc,
          occupied_until_utc,
          timezone,
          full_name,
          email,
          email_normalized,
          phone,
          objective,
          privacy_accepted_at,
          expires_at,
          created_at,
          updated_at
        )
        VALUES (
          ?, 'pending_email_confirmation', ?, ?, ?, ?, ?, ?, ?, ?, ?,
          ?, ?, ?, ?, ?, ?, ?, ?, ?
        )
      `,
    ).bind(
      bookingId,
      service.id,
      service.title,
      service.durationMinutes,
      service.priceLei === null ? null : service.priceLei * 100,
      body.mode,
      slotPlan.startsAt.toISOString(),
      slotPlan.endsAt.toISOString(),
      slotPlan.occupiedUntil.toISOString(),
      TIME_ZONE,
      fullName,
      email,
      emailNormalized,
      phone,
      objective,
      nowIso,
      expiresAt.toISOString(),
      nowIso,
      nowIso,
    );
    const slotStatements = slotPlan.slotStarts.map((slotStart) =>
      env.BOOKINGS_DB!.prepare(
        `
          INSERT INTO calendar_slots (
            slot_start_utc,
            slot_end_utc,
            booking_id
          )
          VALUES (?, ?, ?)
        `,
      ).bind(
        slotStart.toISOString(),
        new Date(
          slotStart.getTime() + SLOT_STEP_MINUTES * 60_000,
        ).toISOString(),
        bookingId,
      ),
    );

    await env.BOOKINGS_DB.batch([
      bookingStatement,
      ...slotStatements,
    ]);

    return jsonResponse(
      {
        bookingId,
        expiresAt: expiresAt.toISOString(),
        message:
          "Cererea de test a fost salvată și intervalul a fost rezervat temporar.",
        status: "pending_email_confirmation",
      },
      201,
    );
  } catch (error) {
    if (
      isConstraintError(
        error,
        "calendar_slots.slot_start_utc",
      )
    ) {
      return jsonResponse(
        {
          code: "SLOT_UNAVAILABLE",
          message:
            "Intervalul a fost ocupat între timp. Alege o altă oră.",
        },
        409,
      );
    }

    if (
      isConstraintError(
        error,
        "bookings.email_normalized",
      )
    ) {
      return jsonResponse(
        {
          code: "EMAIL_HAS_PENDING_BOOKING",
          message:
            "Există deja o cerere neconfirmată pentru această adresă de email.",
        },
        409,
      );
    }

    console.error("Could not create booking request.", error);

    return jsonResponse(
      {
        code: "BOOKING_CREATE_FAILED",
        message:
          "Cererea nu a putut fi salvată. Încearcă din nou.",
      },
      500,
    );
  }
}
