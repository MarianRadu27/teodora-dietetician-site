import {
  getOfficeLocationAddress,
  officeLocation,
} from "../../../config/officeLocation";
import { hashBookingToken } from "../../_shared/bookingTokens";
import { sendResendEmail } from "../../_shared/resend";

type ConfirmationEnvironment = {
  BOOKING_FROM_EMAIL?: string;
  BOOKING_NOTIFICATION_EMAIL?: string;
  BOOKING_REPLY_TO_EMAIL?: string;
  BOOKINGS_DB?: D1Database;
  RESEND_API_KEY?: string;
};

type D1Database = {
  batch(statements: D1PreparedStatement[]): Promise<D1Result[]>;
  prepare(query: string): D1PreparedStatement;
};

type D1PreparedStatement = {
  bind(...values: unknown[]): D1PreparedStatement;
  first<T>(): Promise<T | null>;
};

type D1Result = {
  meta?: {
    changes?: number;
  };
};

type PagesFunctionContext = {
  env: ConfirmationEnvironment;
  request: Request;
};

type ConfirmationRequestBody = {
  token?: unknown;
};

type ConfirmationRow = {
  booking_expires_at: string;
  booking_id: string;
  booking_status: string;
  duration_minutes_snapshot: number;
  email: string;
  full_name: string;
  mode: "online" | "office";
  phone: string | null;
  price_bani_snapshot: number | null;
  service_title_snapshot: string;
  starts_at_utc: string;
  token_expires_at: string;
  token_id: string;
  used_at: string | null;
};

const MAX_REQUEST_BYTES = 5_000;
const MIN_TOKEN_LENGTH = 20;
const MAX_TOKEN_LENGTH = 2_048;
const TIME_ZONE = "Europe/Bucharest";

function jsonResponse(body: unknown, status = 200) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store",
    },
  });
}

function getToken(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const token = value.trim();

  return token.length >= MIN_TOKEN_LENGTH &&
    token.length <= MAX_TOKEN_LENGTH
    ? token
    : null;
}

function getChanges(result: D1Result | undefined) {
  return result?.meta?.changes ?? 0;
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

function formatBookingDetails(booking: ConfirmationRow) {
  const startsAt = new Date(booking.starts_at_utc);
  const date = new Intl.DateTimeFormat("ro-RO", {
    dateStyle: "long",
    timeZone: TIME_ZONE,
  }).format(startsAt);
  const time = new Intl.DateTimeFormat("ro-RO", {
    hour: "2-digit",
    hour12: false,
    minute: "2-digit",
    timeZone: TIME_ZONE,
  }).format(startsAt);
  const mode =
    booking.mode === "office" ? "În cabinet" : "Online";
  const location =
    booking.mode === "office"
      ? `${officeLocation.name}, ${getOfficeLocationAddress()}`
      : "Consultație online. Linkul întâlnirii va fi transmis separat prin email.";
  const price =
    booking.price_bani_snapshot === null
      ? "Prețul va fi comunicat separat"
      : `${booking.price_bani_snapshot / 100} lei`;

  return {
    date,
    duration: `${booking.duration_minutes_snapshot} de minute`,
    location,
    mode,
    price,
    time,
  };
}

function createPatientConfirmationEmail(
  booking: ConfirmationRow,
  from: string,
  replyTo?: string,
) {
  const details = formatBookingDetails(booking);
  const safeName = escapeHtml(booking.full_name);
  const safeService = escapeHtml(booking.service_title_snapshot);
  const safeDate = escapeHtml(details.date);
  const safeTime = escapeHtml(details.time);
  const safeMode = escapeHtml(details.mode);
  const safeDuration = escapeHtml(details.duration);
  const safePrice = escapeHtml(details.price);
  const safeLocation = escapeHtml(details.location);
  const text = [
    `Bună, ${booking.full_name}!`,
    "",
    "Programarea ta a fost confirmată.",
    `Serviciu: ${booking.service_title_snapshot}`,
    `Data: ${details.date}`,
    `Ora: ${details.time}`,
    `Durată: ${details.duration}`,
    `Preț: ${details.price}`,
    `Modalitate: ${details.mode}`,
    `Locație: ${details.location}`,
    "",
    "Pentru întrebări, poți răspunde direct la acest email.",
  ].join("\n");
  const html = `
    <div style="background:#f7f7f2;padding:32px 16px;font-family:Arial,sans-serif;color:#294235">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #dde8de;border-radius:8px;padding:32px">
        <p style="margin:0 0 16px">Bună, ${safeName}!</p>
        <h1 style="margin:0 0 20px;font-size:26px;line-height:1.25;color:#294235">
          Programarea ta a fost confirmată
        </h1>
        <p style="margin:0 0 20px;line-height:1.6">
          Te aștept la consultația programată. Mai jos găsești toate detaliile.
        </p>
        <div style="background:#f2f6f1;border-left:3px solid #4f765a;padding:16px 18px;margin:0 0 24px;line-height:1.7">
          <strong>Serviciu:</strong> ${safeService}<br>
          <strong>Data:</strong> ${safeDate}<br>
          <strong>Ora:</strong> ${safeTime}<br>
          <strong>Durată:</strong> ${safeDuration}<br>
          <strong>Preț:</strong> ${safePrice}<br>
          <strong>Modalitate:</strong> ${safeMode}<br>
          <strong>Locație:</strong> ${safeLocation}
        </div>
        <p style="margin:0;color:#5e665f;font-size:14px;line-height:1.6">
          Pentru întrebări, poți răspunde direct la acest email.
        </p>
      </div>
    </div>
  `;

  return {
    from,
    html,
    replyTo,
    subject: `Programare confirmată – ${details.date}, ${details.time}`,
    text,
    to: booking.email,
  };
}

function createPractitionerNotificationEmail(
  booking: ConfirmationRow,
  from: string,
  to: string,
) {
  const details = formatBookingDetails(booking);
  const safeName = escapeHtml(booking.full_name);
  const safeEmail = escapeHtml(booking.email);
  const safePhone = escapeHtml(booking.phone || "Nu a fost completat");
  const safeService = escapeHtml(booking.service_title_snapshot);
  const safeDate = escapeHtml(details.date);
  const safeTime = escapeHtml(details.time);
  const safeMode = escapeHtml(details.mode);
  const safeDuration = escapeHtml(details.duration);
  const safePrice = escapeHtml(details.price);
  const safeLocation = escapeHtml(details.location);
  const text = [
    "O programare nouă a fost confirmată.",
    "",
    `Pacient: ${booking.full_name}`,
    `Email: ${booking.email}`,
    `Telefon: ${booking.phone || "Nu a fost completat"}`,
    `Serviciu: ${booking.service_title_snapshot}`,
    `Data: ${details.date}`,
    `Ora: ${details.time}`,
    `Durată: ${details.duration}`,
    `Preț: ${details.price}`,
    `Modalitate: ${details.mode}`,
    `Locație: ${details.location}`,
  ].join("\n");
  const html = `
    <div style="background:#f7f7f2;padding:32px 16px;font-family:Arial,sans-serif;color:#294235">
      <div style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #dde8de;border-radius:8px;padding:32px">
        <h1 style="margin:0 0 20px;font-size:26px;line-height:1.25;color:#294235">
          Programare nouă confirmată
        </h1>
        <div style="background:#f2f6f1;border-left:3px solid #4f765a;padding:16px 18px;line-height:1.7">
          <strong>Pacient:</strong> ${safeName}<br>
          <strong>Email:</strong> ${safeEmail}<br>
          <strong>Telefon:</strong> ${safePhone}<br>
          <strong>Serviciu:</strong> ${safeService}<br>
          <strong>Data:</strong> ${safeDate}<br>
          <strong>Ora:</strong> ${safeTime}<br>
          <strong>Durată:</strong> ${safeDuration}<br>
          <strong>Preț:</strong> ${safePrice}<br>
          <strong>Modalitate:</strong> ${safeMode}<br>
          <strong>Locație:</strong> ${safeLocation}
        </div>
      </div>
    </div>
  `;

  return {
    from,
    html,
    replyTo: booking.email,
    subject: `Programare nouă – ${details.date}, ${details.time}`,
    text,
    to,
  };
}

async function sendWithOneRetry(
  apiKey: string,
  email: Parameters<typeof sendResendEmail>[1],
  idempotencyKey: string,
) {
  try {
    await sendResendEmail(apiKey, email, idempotencyKey);
  } catch (firstError) {
    console.error("First transactional email attempt failed.", firstError);
    await sendResendEmail(apiKey, email, idempotencyKey);
  }
}

async function sendFinalBookingEmails(
  env: ConfirmationEnvironment,
  booking: ConfirmationRow,
) {
  if (
    !env.RESEND_API_KEY ||
    !env.BOOKING_FROM_EMAIL ||
    !env.BOOKING_NOTIFICATION_EMAIL
  ) {
    console.error("Final booking emails are not configured.");
    return false;
  }

  const results = await Promise.allSettled([
    sendWithOneRetry(
      env.RESEND_API_KEY,
      createPatientConfirmationEmail(
        booking,
        env.BOOKING_FROM_EMAIL,
        env.BOOKING_REPLY_TO_EMAIL,
      ),
      `booking-confirmed-patient-${booking.booking_id}`,
    ),
    sendWithOneRetry(
      env.RESEND_API_KEY,
      createPractitionerNotificationEmail(
        booking,
        env.BOOKING_FROM_EMAIL,
        env.BOOKING_NOTIFICATION_EMAIL,
      ),
      `booking-confirmed-practitioner-${booking.booking_id}`,
    ),
  ]);
  const failedDeliveries = results.filter(
    (result) => result.status === "rejected",
  );

  for (const failure of failedDeliveries) {
    console.error("Final booking email could not be sent.", failure.reason);
  }

  return failedDeliveries.length === 0;
}

async function confirmedResponse(
  env: ConfirmationEnvironment,
  booking: ConfirmationRow,
  wasAlreadyConfirmed: boolean,
) {
  const emailsSent = await sendFinalBookingEmails(env, booking);

  return jsonResponse({
    emailsSent,
    message: emailsSent
      ? wasAlreadyConfirmed
        ? "Programarea era deja confirmată."
        : "Programarea a fost confirmată."
      : "Programarea este confirmată. Emailul final poate ajunge cu întârziere.",
    status: wasAlreadyConfirmed ? "already_confirmed" : "confirmed",
  });
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

  if (!env.BOOKINGS_DB) {
    return jsonResponse(
      {
        code: "BOOKINGS_UNAVAILABLE",
        message: "Serviciul de programări nu este configurat.",
      },
      503,
    );
  }

  let body: ConfirmationRequestBody;

  try {
    body = (await request.json()) as ConfirmationRequestBody;
  } catch {
    return jsonResponse(
      {
        code: "INVALID_JSON",
        message: "Datele trimise nu au un format valid.",
      },
      400,
    );
  }

  const token = getToken(body.token);

  if (!token) {
    return jsonResponse(
      {
        code: "INVALID_CONFIRMATION_TOKEN",
        message: "Linkul de confirmare nu este valid.",
      },
      400,
    );
  }

  const nowIso = new Date().toISOString();
  const tokenHash = await hashBookingToken(token);

  try {
    const confirmation = await env.BOOKINGS_DB.prepare(
      `
        SELECT
          booking_tokens.id AS token_id,
          booking_tokens.booking_id,
          booking_tokens.expires_at AS token_expires_at,
          booking_tokens.used_at,
          bookings.status AS booking_status,
          bookings.expires_at AS booking_expires_at,
          bookings.service_title_snapshot,
          bookings.duration_minutes_snapshot,
          bookings.price_bani_snapshot,
          bookings.mode,
          bookings.starts_at_utc,
          bookings.full_name,
          bookings.email,
          bookings.phone
        FROM booking_tokens
        INNER JOIN bookings
          ON bookings.id = booking_tokens.booking_id
        WHERE booking_tokens.token_hash = ?
          AND booking_tokens.purpose = 'confirm_email'
        LIMIT 1
      `,
    )
      .bind(tokenHash)
      .first<ConfirmationRow>();

    if (!confirmation) {
      return jsonResponse(
        {
          code: "INVALID_CONFIRMATION_TOKEN",
          message: "Linkul de confirmare nu este valid.",
        },
        400,
      );
    }

    if (confirmation.booking_status === "confirmed") {
      return confirmedResponse(env, confirmation, true);
    }

    const isExpired =
      confirmation.token_expires_at <= nowIso ||
      confirmation.booking_expires_at <= nowIso;

    if (isExpired) {
      await env.BOOKINGS_DB.batch([
        env.BOOKINGS_DB.prepare(
          "DELETE FROM calendar_slots WHERE booking_id = ?",
        ).bind(confirmation.booking_id),
        env.BOOKINGS_DB.prepare(
          `
            UPDATE booking_tokens
            SET used_at = COALESCE(used_at, ?)
            WHERE id = ?
          `,
        ).bind(nowIso, confirmation.token_id),
        env.BOOKINGS_DB.prepare(
          `
            UPDATE bookings
            SET status = 'expired',
                updated_at = ?
            WHERE id = ?
              AND status = 'pending_email_confirmation'
          `,
        ).bind(nowIso, confirmation.booking_id),
      ]);

      return jsonResponse(
        {
          code: "CONFIRMATION_EXPIRED",
          message:
            "Linkul a expirat, iar intervalul a fost eliberat. Trimite o cerere nouă.",
        },
        410,
      );
    }

    if (
      confirmation.used_at ||
      confirmation.booking_status !== "pending_email_confirmation"
    ) {
      return jsonResponse(
        {
          code: "CONFIRMATION_NOT_AVAILABLE",
          message: "Această programare nu mai poate fi confirmată.",
        },
        409,
      );
    }

    const results = await env.BOOKINGS_DB.batch([
      env.BOOKINGS_DB.prepare(
        `
          UPDATE booking_tokens
          SET used_at = ?
          WHERE id = ?
            AND used_at IS NULL
            AND expires_at > ?
        `,
      ).bind(nowIso, confirmation.token_id, nowIso),
      env.BOOKINGS_DB.prepare(
        `
          UPDATE bookings
          SET status = 'confirmed',
              email_confirmed_at = ?,
              confirmed_at = ?,
              updated_at = ?
          WHERE id = ?
            AND status = 'pending_email_confirmation'
            AND expires_at > ?
        `,
      ).bind(
        nowIso,
        nowIso,
        nowIso,
        confirmation.booking_id,
        nowIso,
      ),
    ]);

    if (getChanges(results[0]) === 1 && getChanges(results[1]) === 1) {
      return confirmedResponse(env, confirmation, false);
    }

    const currentBooking = await env.BOOKINGS_DB.prepare(
      "SELECT status FROM bookings WHERE id = ? LIMIT 1",
    )
      .bind(confirmation.booking_id)
      .first<{ status: string }>();

    if (currentBooking?.status === "confirmed") {
      return confirmedResponse(env, confirmation, true);
    }

    return jsonResponse(
      {
        code: "CONFIRMATION_CONFLICT",
        message:
          "Programarea nu a putut fi confirmată. Reîncarcă pagina și încearcă din nou.",
      },
      409,
    );
  } catch (error) {
    console.error("Could not confirm booking.", error);

    return jsonResponse(
      {
        code: "BOOKING_CONFIRMATION_FAILED",
        message:
          "Confirmarea nu a putut fi finalizată momentan. Încearcă din nou.",
      },
      500,
    );
  }
}
