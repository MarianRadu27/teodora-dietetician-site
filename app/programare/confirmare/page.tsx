import type { Metadata } from "next";

import { BookingConfirmation } from "../../components/custom-booking/BookingConfirmation";

export const metadata: Metadata = {
  title: "Confirmare programare",
  description: "Confirmarea adresei de email pentru cererea de programare.",
  referrer: "no-referrer",
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

export default function BookingConfirmationPage() {
  return (
    <main className="booking-confirmation-page">
      <div className="container">
        <BookingConfirmation />
      </div>
    </main>
  );
}
