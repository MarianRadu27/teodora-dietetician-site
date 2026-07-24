import { FAQCategoryAccordion } from "../components/FAQAccordion";
import { RevealOnScroll } from "../components/RevealOnScroll";
import { brand, faqCategories } from "../siteContent";

export const metadata = {
  title: "Întrebări frecvente | Teodora Pălii",
  description:
    "Răspunsuri despre consultațiile nutriționale, plan alimentar, analize și ședințe online.",
};

export default function FAQPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <RevealOnScroll>
            <div className="section-heading faq-page-heading">
              <h1 className="h1">Întrebări firești, răspunsuri clare</h1>
              <p className="lead">
                Alege categoria care te interesează și găsește rapid informațiile 
                de care ai nevoie despre consultații și colaborare.
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll>
            <FAQCategoryAccordion categories={faqCategories} />
          </RevealOnScroll>
        </div>
      </section>

      <section className="section final-cta">
        <div className="container">
          <div className="section-heading center" style={{ marginBottom: 24 }}>
            <h2 className="h2">Ai o întrebare care nu apare aici?</h2>
            <p className="lead">
              Scrie un mesaj și revenim cu detalii pentru situația ta.
            </p>
          </div>
          <div className="button-row" style={{ justifyContent: "center" }}>
            <a className="button button-secondary" href={brand.whatsappUrl}>
              Scrie pe WhatsApp
            </a>
            <a className="button button-secondary" href={`mailto:${brand.email}`}>
              Trimite e-mail
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
