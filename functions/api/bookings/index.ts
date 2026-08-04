import {
  bookingModeContent,
  getBookingServiceById,
  type BookingMode,
} from "../../../config/bookingServices";
import {
  createBookingSlotPlan,
  SLOT_STEP_MINUTES,
  TIME_ZONE,
} from "../../_shared/bookingRules";
import {
  createBookingToken,
  hashBookingToken,
} from "../../_shared/bookingTokens";
import { sendResendEmail } from "../../_shared/resend";

type BookingEnvironment = {
  BOOKING_FROM_EMAIL?: string;
  BOOKING_REPLY_TO_EMAIL?: string;
  BOOKINGS_DB?: D1Database;
  PUBLIC_SITE_URL?: string;
  RESEND_API_KEY?: string;
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

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#039;",
    };

    return entities[character];
  });
}

function getPublicSiteOrigin(value: string) {
  try {
    const url = new URL(value);

    return url.protocol === "https:" ? url.origin : null;
  } catch {
    return null;
  }
}

function formatBookingDate(date: Date) {
  return new Intl.DateTimeFormat("ro-RO", {
    dateStyle: "long",
    timeZone: TIME_ZONE,
  }).format(date);
}

function createConfirmationEmail({
  confirmationUrl,
  date,
  from,
  fullName,
  mode,
  replyTo,
  serviceTitle,
  time,
  to,
}: {
  confirmationUrl: string;
  date: string;
  from: string;
  fullName: string;
  mode: string;
  replyTo?: string;
  serviceTitle: string;
  time: string;
  to: string;
}) {
  const safeName = escapeHtml(fullName);
  const safeService = escapeHtml(serviceTitle);
  const safeDate = escapeHtml(date);
  const safeTime = escapeHtml(time);
  const safeMode = escapeHtml(mode);
  const safeUrl = escapeHtml(confirmationUrl);
  const text = [
    `Bună, ${fullName}!`,
    "",
    "Am primit cererea ta de programare:",
    `Serviciu: ${serviceTitle}`,
    `Data: ${date}`,
    `Ora: ${time}`,
    `Modalitate: ${mode}`,
    "",
    "Confirmă adresa de email și programarea accesând linkul:",
    confirmationUrl,
    "",
    "Linkul este valabil 30 de minute.",
  ].join("\n");
  const html = `
    <div style="background:#f7f7f2;padding:32px 16px;font-family:Arial,sans-serif;color:#294235">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #dde8de;border-radius:8px;padding:32px">
        <p style="margin:0 0 16px">Bună, ${safeName}!</p>
        <h1 style="margin:0 0 20px;font-size:26px;line-height:1.25;color:#294235">
          Confirmă programarea
        </h1>
        <p style="margin:0 0 20px;line-height:1.6">
          Am primit cererea ta și am rezervat temporar intervalul de mai jos.
        </p>
        <div style="background:#f2f6f1;border-left:3px solid #4f765a;padding:16px 18px;margin:0 0 24px;line-height:1.7">
          <strong>Serviciu:</strong> ${safeService}<br>
          <strong>Data:</strong> ${safeDate}<br>
          <strong>Ora:</strong> ${safeTime}<br>
          <strong>Modalitate:</strong> ${safeMode}
        </div>
        <p style="margin:0 0 24px">
          <a href="${safeUrl}" style="display:inline-block;background:#294235;color:#ffffff;text-decoration:none;border-radius:6px;padding:13px 20px;font-weight:700">
            Confirmă programarea
          </a>
        </p>
        <p style="margin:0;color:#5e665f;font-size:14px;line-height:1.6">
          Linkul este valabil 30 de minute. Dacă nu ai făcut această cerere, poți ignora emailul.
        </p>
      </div>
    </div>
  `;

  return {
    from,
    html,
    replyTo,
    subject: "Confirmă programarea la Dietetician Teodora Pălii",
    text,
    to,
  };
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

async function removeUnsentBooking(
  db: D1Database,
  bookingId: string,
) {
  await db.batch([
    db
      .prepare("DELETE FROM calendar_slots WHERE booking_id = ?")
      .bind(bookingId),
    db
      .prepare("DELETE FROM booking_tokens WHERE booking_id = ?")
      .bind(bookingId),
    db
      .prepare(
        `
          DELETE FROM bookings
          WHERE id = ?
            AND status = 'pending_email_confirmation'
        `,
      )
      .bind(bookingId),
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

  const publicSiteOrigin = env.PUBLIC_SITE_URL
    ? getPublicSiteOrigin(env.PUBLIC_SITE_URL)
    : null;

  if (
    !env.BOOKINGS_DB ||
    !env.TURNSTILE_SECRET_KEY ||
    !env.RESEND_API_KEY ||
    !env.BOOKING_FROM_EMAIL ||
    !publicSiteOrigin
  ) {
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
    const confirmationToken = createBookingToken();
    const confirmationTokenHash = await hashBookingToken(confirmationToken);
    const confirmationTokenId = crypto.randomUUID();
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
    const confirmationTokenStatement = env.BOOKINGS_DB.prepare(
      `
        INSERT INTO booking_tokens (
          id,
          booking_id,
          purpose,
          token_hash,
          expires_at,
          created_at
        )
        VALUES (?, ?, 'confirm_email', ?, ?, ?)
      `,
    ).bind(
      confirmationTokenId,
      bookingId,
      confirmationTokenHash,
      expiresAt.toISOString(),
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
      confirmationTokenStatement,
      ...slotStatements,
    ]);

    const confirmationUrl = new URL(
      "/programare-noua/confirmare",
      publicSiteOrigin,
    );
    confirmationUrl.hash = new URLSearchParams({
      token: confirmationToken,
    }).toString();

    try {
      await sendResendEmail(
        env.RESEND_API_KEY,
        createConfirmationEmail({
          confirmationUrl: confirmationUrl.toString(),
          date: formatBookingDate(slotPlan.startsAt),
          from: env.BOOKING_FROM_EMAIL,
          fullName,
          mode: bookingModeContent[body.mode].summaryLabel,
          replyTo: env.BOOKING_REPLY_TO_EMAIL,
          serviceTitle: service.title,
          time,
          to: email,
        }),
        `booking-confirmation-${bookingId}`,
      );
    } catch (error) {
      console.error("Could not send booking confirmation email.", error);

      try {
        await removeUnsentBooking(env.BOOKINGS_DB, bookingId);
      } catch (cleanupError) {
        console.error(
          "Could not clean up a booking without email.",
          cleanupError,
        );
      }

      return jsonResponse(
        {
          code: "CONFIRMATION_EMAIL_FAILED",
          message:
            "Emailul de confirmare nu a putut fi trimis. Cererea nu a fost păstrată. Încearcă din nou.",
        },
        502,
      );
    }

    return jsonResponse(
      {
        bookingId,
        expiresAt: expiresAt.toISOString(),
        message:
          "Cererea a fost salvată. Verifică emailul și confirmă programarea în maximum 30 de minute.",
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
