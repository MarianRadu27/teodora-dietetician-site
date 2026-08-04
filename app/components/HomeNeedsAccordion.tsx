"use client";

import { useState } from "react";

import { RevealOnScroll } from "./RevealOnScroll";

type PatientNeed = {
  description: string;
  keyword: string;
};

type HomeNeedsAccordionProps = {
  items: PatientNeed[];
};

export function HomeNeedsAccordion({
  items,
}: HomeNeedsAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <>
      <div className="card-grid grid-3 needs-grid">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `home-need-panel-${index}`;

          return (
            <RevealOnScroll delay={index * 70} key={item.keyword}>
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className={`need-card${isOpen ? " is-open" : ""}`}
                onClick={() =>
                  setOpenIndex((current) => (current === index ? null : index))
                }
                type="button"
              >
                <span className="need-card-header">
                  <span className="need-card-keyword">{item.keyword}</span>
                  <svg
                    aria-hidden="true"
                    className="need-card-chevron"
                    fill="none"
                    focusable="false"
                    viewBox="0 0 24 24"
                  >
                    <path
                      d="m6 9 6 6 6-6"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.8"
                    />
                  </svg>
                </span>

                <span
                  aria-hidden={!isOpen}
                  className="need-card-panel"
                  id={panelId}
                >
                  <span className="need-card-panel-inner">
                    <span className="body-text need-card-copy">
                      {item.description}
                    </span>
                  </span>
                </span>
              </button>
            </RevealOnScroll>
          );
        })}
      </div>

      <RevealOnScroll>
        <p className="needs-callout">
          Fiecare persoană are nevoi diferite, iar sprijinul nutrițional
          potrivit poate face diferența.
        </p>
      </RevealOnScroll>
    </>
  );
}
