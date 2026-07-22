import Link from "next/link";

import { RevealOnScroll } from "../RevealOnScroll";

const steps = [
  {
    number: "1",
    title: "Consultație inițială",
    href: "#consultatie-initiala",
  },
  {
    number: "2",
    title: "Alegerea modalității",
    href: "#modalitati-de-colaborare",
  },
  {
    number: "3",
    title: "Monitorizare",
    href: "#monitorizare",
  },
];

export function CollaborationSteps() {
  return (
    <section className="section services-route-section" id="traseu">
      <div className="container">
        <RevealOnScroll>
          <div className="services-section-heading-row">
            <div>
              <p className="eyebrow">Traseul colaborării</p>
              <h2 className="h2">Cum funcționează colaborarea?</h2>
            </div>
            <p className="lead">
              Colaborarea începe, de regulă, cu o consultație nutrițională
              inițială. Ulterior, alegem împreună direcția potrivită și stabilim
              modul de monitorizare.
            </p>
          </div>
        </RevealOnScroll>

        <div className="services-route">
          {steps.map((step, index) => (
            <RevealOnScroll delay={index * 80} key={step.href}>
              <Link className="services-route-step" href={step.href}>
                <span className="services-route-number">{step.number}</span>
                <span>{step.title}</span>
              </Link>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
