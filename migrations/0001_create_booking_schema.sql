PRAGMA foreign_keys = ON;

CREATE TABLE bookings (
  id TEXT PRIMARY KEY,
  status TEXT NOT NULL DEFAULT 'pending_email_confirmation'
    CHECK (
      status IN (
        'pending_email_confirmation',
        'confirmed',
        'cancelled',
        'expired',
        'rescheduled'
      )
    ),
  service_id TEXT NOT NULL,
  service_title_snapshot TEXT NOT NULL,
  duration_minutes_snapshot INTEGER NOT NULL
    CHECK (duration_minutes_snapshot > 0),
  price_bani_snapshot INTEGER
    CHECK (price_bani_snapshot IS NULL OR price_bani_snapshot >= 0),
  mode TEXT NOT NULL CHECK (mode IN ('online', 'office')),
  starts_at_utc TEXT NOT NULL,
  ends_at_utc TEXT NOT NULL,
  occupied_until_utc TEXT NOT NULL,
  timezone TEXT NOT NULL DEFAULT 'Europe/Bucharest',
  full_name TEXT NOT NULL
    CHECK (length(trim(full_name)) BETWEEN 2 AND 120),
  email TEXT NOT NULL,
  email_normalized TEXT NOT NULL COLLATE NOCASE,
  phone TEXT,
  objective TEXT CHECK (objective IS NULL OR length(objective) <= 500),
  privacy_accepted_at TEXT NOT NULL,
  request_ip_hash TEXT,
  email_confirmed_at TEXT,
  confirmed_at TEXT,
  cancelled_at TEXT,
  expires_at TEXT NOT NULL,
  meeting_url TEXT,
  calendar_event_id TEXT,
  rescheduled_from_booking_id TEXT,
  created_at TEXT NOT NULL
    DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL
    DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  CHECK (ends_at_utc > starts_at_utc),
  CHECK (occupied_until_utc >= ends_at_utc),
  FOREIGN KEY (rescheduled_from_booking_id)
    REFERENCES bookings (id)
    ON DELETE SET NULL
);

CREATE INDEX idx_bookings_email
  ON bookings (email_normalized);

CREATE INDEX idx_bookings_start_status
  ON bookings (starts_at_utc, status);

CREATE INDEX idx_bookings_expiration
  ON bookings (status, expires_at);

CREATE UNIQUE INDEX uq_bookings_pending_email
  ON bookings (email_normalized)
  WHERE status = 'pending_email_confirmation';

CREATE TABLE booking_tokens (
  id TEXT PRIMARY KEY,
  booking_id TEXT NOT NULL,
  purpose TEXT NOT NULL
    CHECK (purpose IN ('confirm_email', 'cancel', 'reschedule')),
  token_hash TEXT NOT NULL UNIQUE,
  expires_at TEXT NOT NULL,
  used_at TEXT,
  created_at TEXT NOT NULL
    DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  FOREIGN KEY (booking_id)
    REFERENCES bookings (id)
    ON DELETE CASCADE
);

CREATE INDEX idx_booking_tokens_booking
  ON booking_tokens (booking_id, purpose);

CREATE INDEX idx_booking_tokens_expiration
  ON booking_tokens (expires_at, used_at);

CREATE UNIQUE INDEX uq_booking_tokens_active_purpose
  ON booking_tokens (booking_id, purpose)
  WHERE used_at IS NULL;

CREATE TABLE blocked_periods (
  id TEXT PRIMARY KEY,
  starts_at_utc TEXT NOT NULL,
  ends_at_utc TEXT NOT NULL,
  reason TEXT,
  is_active INTEGER NOT NULL DEFAULT 1
    CHECK (is_active IN (0, 1)),
  created_at TEXT NOT NULL
    DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  updated_at TEXT NOT NULL
    DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  CHECK (ends_at_utc > starts_at_utc)
);

CREATE INDEX idx_blocked_periods_range
  ON blocked_periods (is_active, starts_at_utc, ends_at_utc);

CREATE TABLE calendar_slots (
  slot_start_utc TEXT PRIMARY KEY,
  slot_end_utc TEXT NOT NULL,
  booking_id TEXT,
  blocked_period_id TEXT,
  created_at TEXT NOT NULL
    DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ', 'now')),
  CHECK (slot_end_utc > slot_start_utc),
  CHECK (
    (
      booking_id IS NOT NULL
      AND blocked_period_id IS NULL
    )
    OR
    (
      booking_id IS NULL
      AND blocked_period_id IS NOT NULL
    )
  ),
  FOREIGN KEY (booking_id)
    REFERENCES bookings (id)
    ON DELETE CASCADE,
  FOREIGN KEY (blocked_period_id)
    REFERENCES blocked_periods (id)
    ON DELETE CASCADE
);

CREATE INDEX idx_calendar_slots_booking
  ON calendar_slots (booking_id);

CREATE INDEX idx_calendar_slots_block
  ON calendar_slots (blocked_period_id);
