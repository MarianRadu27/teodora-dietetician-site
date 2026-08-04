import type { Metadata } from "next";
import { Suspense } from "react";

import { CustomBookingFlow } from "../components/custom-booking/CustomBookingFlow";

export const metadata: Metadata = {
  title: "Programare nouă - interfață în test",
  description:
    "Interfață demonstrativă pentru viitorul sistem propriu de programări.",
  robots: {
    index: false,
    follow: false,
    noarchive: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function NewBookingPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-heading center booking-page-heading">
            <p className="eyebrow">Interfață în test</p>
            <h1 className="h1">Programează o consultație nutrițională</h1>
            <p className="lead">
              Alege modalitatea, serviciul și intervalul potrivit, apoi
              completează datele necesare programării.
            </p>
          </div>

          <div className="custom-booking-demo-notice" role="note">
            <strong>Acesta este un mediu de test.</strong>
            <span>
              Folosește date fictive și o adresă de email de test la care ai
              acces. Cererile sunt salvate numai în baza de date Preview.
            </span>
          </div>

          <Suspense
            fallback={
              <div className="booking-frame-loading" role="status">
                Se pregătește noul formular de programare…
              </div>
            }
          >
            <CustomBookingFlow />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
