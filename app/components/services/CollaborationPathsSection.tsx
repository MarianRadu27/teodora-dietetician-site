import { collaborationPaths } from "../../../config/nutritionServices";
import { RevealOnScroll } from "../RevealOnScroll";
import { CollaborationPathCard } from "./CollaborationPathCard";

export function CollaborationPathsSection() {
  return (
    <section
      aria-labelledby="modalitati-colaborare-title"
      className="section services-anchor about-band"
      id="modalitati-de-colaborare"
    >
      <div className="container">
        <RevealOnScroll>
          <div className="services-section-heading-row">
            <div>
              <p className="eyebrow">Pasul 2</p>
              <h2 className="h2" id="modalitati-colaborare-title">
                Alegerea modalității de colaborare
              </h2>
            </div>
            <p className="lead">
              După consultația inițială, putem continua colaborarea în funcție
              de nivelul de structură și de sprijin de care ai nevoie.
            </p>
          </div>
        </RevealOnScroll>

        <div className="collaboration-path-grid">
          {collaborationPaths.map((path, index) => (
            <RevealOnScroll delay={index * 80} key={path.id}>
              <CollaborationPathCard path={path} />
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
