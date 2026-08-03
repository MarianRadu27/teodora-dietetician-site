import { Suspense } from "react";

import { BookingFlow } from "../components/booking/BookingFlow";
import { createPageMetadata } from "../../lib/pageMetadata";

export const metadata = createPageMetadata({
  title: "Programare nutrițională | Teodora Pălii",
  description:
    "Programează o consultație nutrițională online sau în cabinet, în Iași, cu Teodora Pălii, nutriționist-dietetician autorizat.",
  canonical: "/programare",
});

export default function BookingPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-heading center booking-page-heading">
            <h1 className="h1">Programează o consultație nutrițională</h1>
            <p className="lead">
              Alege cum dorești să se desfășoare consultația, apoi selectează
              serviciul și intervalul potrivit.
            </p>
          </div>

          <Suspense
            fallback={
              <div className="booking-frame-loading" role="status">
                Se pregătește formularul de programare…
              </div>
            }
          >
            <BookingFlow />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
