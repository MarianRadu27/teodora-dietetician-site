import Link from "next/link";

export function BookingLegalNotice() {
  return (
    <div className="booking-legal-notice">
      <p>
        Programările sunt gestionate prin Cal.com. Prin continuarea programării,
        confirmi că ai consultat{" "}
        <Link href="/politica-de-confidentialitate">
          Politica de confidențialitate
        </Link>
        .
      </p>
      <p>
        Te rugăm să nu introduci în formular diagnostice, analize sau alte
        informații medicale detaliate.
      </p>
      <p>
        Înainte de confirmare, consultă{" "}
        <Link href="/termeni-si-conditii#anulare-si-reprogramare">
          regulile de anulare și reprogramare
        </Link>
        .
      </p>
    </div>
  );
}
