import { hashBookingToken } from "../../_shared/bookingTokens";

type ConfirmationEnvironment = {
  BOOKINGS_DB?: D1Database;
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
  token_expires_at: string;
  token_id: string;
  used_at: string | null;
};

const MAX_REQUEST_BYTES = 5_000;
const MIN_TOKEN_LENGTH = 20;
const MAX_TOKEN_LENGTH = 2_048;

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
          bookings.expires_at AS booking_expires_at
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
      return jsonResponse({
        message: "Programarea era deja confirmată.",
        status: "already_confirmed",
      });
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
      return jsonResponse({
        message: "Programarea a fost confirmată.",
        status: "confirmed",
      });
    }

    const currentBooking = await env.BOOKINGS_DB.prepare(
      "SELECT status FROM bookings WHERE id = ? LIMIT 1",
    )
      .bind(confirmation.booking_id)
      .first<{ status: string }>();

    if (currentBooking?.status === "confirmed") {
      return jsonResponse({
        message: "Programarea era deja confirmată.",
        status: "already_confirmed",
      });
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
