"use client";

import Link from "next/link";
import { useRef, useState } from "react";

import {
  collaborationPaths,
  formatServiceDuration,
  formatServicePrice,
  getNutritionService,
  initialConsultationModeNotes,
} from "../../../config/nutritionServices";
import { RevealOnScroll } from "../RevealOnScroll";
import { CollaborationPathCard } from "./CollaborationPathCard";
import { FollowUpServiceCard } from "./FollowUpServiceCard";
import { ServicesAccordion } from "./ServicesAccordion";

const consultation = getNutritionService("consultatie-initiala");
const planFollowUp = getNutritionService("monitorizare-plan");
const educationFollowUp = getNutritionService("consiliere-nutritionala");

const steps = [
  {
    number: "1",
    title: "Consultație nutrițională inițială",
  },
  {
    number: "2",
    title: "Alegerea modalității de colaborare",
  },
  {
    number: "3",
    title: "Monitorizarea în funcție de modalitatea aleasă",
  },
];

export function CollaborationSteps() {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<Array<HTMLDivElement | null>>([]);

  const activateStep = (index: number) => {
    setActiveStep(index);

    window.requestAnimationFrame(() => {
      stepRefs.current[index]?.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
  };

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

        <RevealOnScroll>
          <div aria-label="Pașii colaborării" className="services-stepper">
            <div className="services-stepper-list">
              {steps.map((step, index) => {
                const isActive = activeStep === index;

                return (
                  <div
                    className={`services-stepper-item ${
                      isActive ? "is-active" : ""
                    }`.trim()}
                    key={step.number}
                    ref={(element) => {
                      stepRefs.current[index] = element;
                    }}
                  >
                    <button
                      aria-controls={`services-step-panel-${index}`}
                      aria-expanded={isActive}
                      className="services-stepper-tab"
                      id={`services-step-trigger-${index}`}
                      onClick={() => activateStep(index)}
                      type="button"
                    >
                      <span className="services-stepper-number">
                        {step.number}
                      </span>
                      <span>
                        <strong>{step.title}</strong>
                      </span>
                    </button>

                    <div
                      aria-labelledby={`services-step-trigger-${index}`}
                      className="services-stepper-panel"
                      hidden={!isActive}
                      id={`services-step-panel-${index}`}
                      role="region"
                    >
                      {index === 0 ? <InitialConsultationPanel /> : null}
                      {index === 1 ? <CollaborationPathsPanel /> : null}
                      {index === 2 ? <FollowUpPanel /> : null}

                      <div className="services-stepper-actions">
                        {index > 0 ? (
                          <button
                            className="button button-secondary"
                            onClick={() => activateStep(index - 1)}
                            type="button"
                          >
                            Înapoi
                          </button>
                        ) : null}
                        {index < steps.length - 1 ? (
                          <button
                            className="button button-primary"
                            onClick={() => activateStep(index + 1)}
                            type="button"
                          >
                            Înainte
                          </button>
                        ) : null}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

function InitialConsultationPanel() {
  return (
    <article className="services-stepper-card services-anchor" id="consultatie-initiala">
      <div className="services-section-grid">
        <div>
          <p className="eyebrow">Pasul 1</p>
          <h3 className="h2">{consultation.title}</h3>
          <div className="services-badge-row">
            <span className="services-badge">
              Durată: {formatServiceDuration(consultation.durationMinutes)}
            </span>
            <span className="services-badge">
              Preț: {formatServicePrice(consultation.priceLei)}
            </span>
          </div>
          <p className="body-text">{consultation.description}</p>
        </div>

        <div className="services-card-stack">
          <div className="services-callout">
            Planul nutrițional personalizat nu este inclus în prețul
            consultației inițiale și poate fi solicitat separat.
          </div>
        </div>
      </div>

      <ServicesAccordion buttonLabel="Ce include consultația?">
        <ul className="services-check-list">
          {consultation.features.map((feature) => (
            <li key={feature}>{feature}</li>
          ))}
        </ul>
      </ServicesAccordion>

      <div className="services-mode-note-grid">
        <Link
          className="services-mode-link-card"
          href="/programare?modalitate=cabinet&serviciu=consultatie-initiala"
        >
          <h4 className="h3">Consultație în cabinet</h4>
          <p className="body-text">{initialConsultationModeNotes.office}</p>
          <span>Programează consultația în cabinet</span>
        </Link>
        <Link
          className="services-mode-link-card"
          href="/programare?modalitate=online&serviciu=consultatie-initiala"
        >
          <h4 className="h3">Consultație online</h4>
          <p className="body-text">{initialConsultationModeNotes.online}</p>
          <span>Programează consultația online</span>
        </Link>
      </div>
    </article>
  );
}

function CollaborationPathsPanel() {
  return (
    <div className="collaboration-path-grid">
      {collaborationPaths.map((path) => (
        <CollaborationPathCard key={path.id} path={path} />
      ))}
    </div>
  );
}

function FollowUpPanel() {
  return (
    <div className="follow-up-grid">
      <FollowUpServiceCard
        association="Pentru modalitatea „Plan nutrițional personalizat”"
        ctaLabel="Programează monitorizarea"
        featureLabel="Ce include ședința?"
        recommendation="la aproximativ 2-3 săptămâni"
        service={planFollowUp}
      />
      <FollowUpServiceCard
        association="Pentru modalitatea „Consiliere și educație nutrițională”"
        ctaLabel="Programează o ședință de consiliere"
        featureLabel="Ce putem aborda în cadrul ședințelor?"
        recommendation="la aproximativ 2-4 săptămâni"
        service={educationFollowUp}
      />
    </div>
  );
}
