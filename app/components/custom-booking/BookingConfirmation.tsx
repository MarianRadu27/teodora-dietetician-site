"use client";

import Link from "next/link";
import { useLayoutEffect, useState } from "react";

type ConfirmationState =
  | "reading"
  | "ready"
  | "submitting"
  | "success"
  | "error";

type ConfirmationResponse = {
  message?: string;
  status?: string;
};

export function BookingConfirmation() {
  const [confirmationState, setConfirmationState] =
    useState<ConfirmationState>("reading");
  const [message, setMessage] = useState(
    "Se verifică linkul de confirmare.",
  );
  const [token, setToken] = useState("");

  useLayoutEffect(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const confirmationToken = fragment.get("token")?.trim() ?? "";

    window.history.replaceState(
      null,
      "",
      `${window.location.pathname}${window.location.search}`,
    );

    if (!confirmationToken) {
      setMessage(
        "Linkul de confirmare este incomplet sau nu mai este disponibil.",
      );
      setConfirmationState("error");
      return;
    }

    setToken(confirmationToken);
    setMessage(
      "Apasă butonul de mai jos pentru a confirma adresa de email și programarea.",
    );
    setConfirmationState("ready");
  }, []);

  async function confirmBooking() {
    if (!token || confirmationState === "submitting") {
      return;
    }

    setConfirmationState("submitting");
    setMessage("Confirmăm programarea…");

    try {
      const response = await fetch("/api/bookings/confirm", {
        body: JSON.stringify({ token }),
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
      });
      const result = (await response.json().catch(() => null)) as
        | ConfirmationResponse
        | null;

      if (!response.ok) {
        throw new Error(
          result?.message ??
            "Programarea nu a putut fi confirmată. Încearcă din nou.",
        );
      }

      setToken("");
      setMessage(
        result?.status === "already_confirmed"
          ? "Programarea ta era deja confirmată."
          : "Programarea ta a fost confirmată.",
      );
      setConfirmationState("success");
    } catch (error) {
      setMessage(
        error instanceof Error
          ? error.message
          : "Programarea nu a putut fi confirmată. Încearcă din nou.",
      );
      setConfirmationState("error");
    }
  }

  const isSuccess = confirmationState === "success";
  const isError = confirmationState === "error";

  return (
    <section
      aria-labelledby="booking-confirmation-title"
      className="booking-confirmation-card"
    >
      <p className="eyebrow">Confirmare programare</p>
      <h1 className="h1" id="booking-confirmation-title">
        {isSuccess ? "Programare confirmată" : "Confirmă programarea"}
      </h1>
      <p
        aria-live="polite"
        className={`booking-confirmation-message${
          isError ? " is-error" : ""
        }${isSuccess ? " is-success" : ""}`}
        role={isError ? "alert" : "status"}
      >
        {message}
      </p>

      <div className="booking-confirmation-actions">
        {confirmationState === "ready" ||
        confirmationState === "submitting" ? (
          <button
            className="button button-primary"
            disabled={confirmationState === "submitting"}
            onClick={confirmBooking}
            type="button"
          >
            {confirmationState === "submitting"
              ? "Se confirmă…"
              : "Confirmă programarea"}
          </button>
        ) : null}

        {isSuccess ? (
          <Link className="button button-secondary" href="/">
            Înapoi la pagina principală
          </Link>
        ) : null}

        {isError ? (
          <Link
            className="button button-secondary"
            href="/programare"
          >
            Trimite o cerere nouă
          </Link>
        ) : null}
      </div>
    </section>
  );
}
