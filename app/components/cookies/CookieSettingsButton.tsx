"use client";

import { COOKIE_CONSENT_ENABLED } from "../../../config/legal";

export function CookieSettingsButton() {
  if (!COOKIE_CONSENT_ENABLED) {
    return null;
  }

  return (
    <button
      className="footer-cookie-button"
      onClick={() => {
        window.dispatchEvent(new CustomEvent("open-cookie-preferences"));
      }}
      type="button"
    >
      Setari cookies
    </button>
  );
}
