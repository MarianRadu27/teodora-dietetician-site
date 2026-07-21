"use client";

import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: FAQItem[];
};

export function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `faq-panel-${index}`;
        const buttonId = `faq-button-${index}`;

        return (
          <section className="faq-item" key={item.question}>
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className="faq-button"
              id={buttonId}
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              type="button"
            >
              <span>{item.question}</span>
              <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            {isOpen && (
              <div
                aria-labelledby={buttonId}
                className="faq-panel"
                id={panelId}
                role="region"
              >
                {item.answer}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
