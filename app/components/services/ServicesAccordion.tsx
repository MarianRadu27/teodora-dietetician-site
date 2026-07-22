"use client";

import { ReactNode, useId, useState } from "react";

type ServicesAccordionProps = {
  buttonLabel: string;
  children: ReactNode;
  defaultOpen?: boolean;
};

export function ServicesAccordion({
  buttonLabel,
  children,
  defaultOpen = false,
}: ServicesAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  const panelId = useId();

  return (
    <div className="services-accordion">
      <button
        aria-controls={panelId}
        aria-expanded={isOpen}
        className="services-accordion-button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        type="button"
      >
        <span>{buttonLabel}</span>
        <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
      </button>
      <div
        className="services-accordion-panel"
        hidden={!isOpen}
        id={panelId}
      >
        {children}
      </div>
    </div>
  );
}
