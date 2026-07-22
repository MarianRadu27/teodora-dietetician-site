import Link from "next/link";

export function ServicesFinalCta() {
  return (
    <section className="section final-cta">
      <div className="container">
        <div className="section-heading center" style={{ marginBottom: 24 }}>
          <h2 className="h2">Nu știi ce variantă ți se potrivește?</h2>
          <p className="lead">
            Nu este necesar să alegi singur modalitatea de colaborare. Prima
            etapă este consultația inițială, în cadrul căreia vom analiza
            situația ta și vom stabili împreună direcția potrivită.
          </p>
        </div>
        <div className="button-row" style={{ justifyContent: "center" }}>
          <Link
            className="button button-secondary"
            href="/programare?serviciu=consultatie-initiala"
          >
            Programează consultația inițială
          </Link>
          <Link className="button button-secondary" href="/contact">
            Ai o întrebare? Contactează-mă
          </Link>
        </div>
        <p className="services-final-legal">
          Poți consulta și pagina <Link href="/despre">Despre mine</Link>,{" "}
          <Link href="/politica-de-confidentialitate">
            politica de confidențialitate
          </Link>{" "}
          și <Link href="/termeni-si-conditii">termenii și condițiile</Link>.
        </p>
      </div>
    </section>
  );
}
