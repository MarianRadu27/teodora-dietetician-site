"use client";

import { useEffect, useMemo, useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

type FAQCategory = {
  id: string;
  items: FAQItem[];
  title: string;
};

type FAQAccordionProps = {
  idPrefix?: string;
  items: FAQItem[];
};

type FAQCategoryAccordionProps = {
  categories: FAQCategory[];
};

function getCategoryIdFromUrl(categoryIds: string[]) {
  const params = new URLSearchParams(window.location.search);
  const requestedCategory = params.get("categorie");
  const hashCategory = window.location.hash.replace("#", "");

  if (requestedCategory && categoryIds.includes(requestedCategory)) {
    return requestedCategory;
  }

  if (categoryIds.includes(hashCategory)) {
    return hashCategory;
  }

  return null;
}

export function FAQCategoryAccordion({ categories }: FAQCategoryAccordionProps) {
  const [openCategories, setOpenCategories] = useState<Set<string>>(
    () => new Set(),
  );
  const categoryIds = useMemo(
    () => categories.map((category) => category.id),
    [categories],
  );

  useEffect(() => {
    function openRequestedCategory() {
      const categoryId = getCategoryIdFromUrl(categoryIds);

      if (!categoryId) {
        return;
      }

      setOpenCategories(new Set([categoryId]));

      const target = document.getElementById(categoryId);

      if (!(target instanceof HTMLElement)) {
        return;
      }

      window.requestAnimationFrame(() => {
        target.scrollIntoView({ block: "start" });
        target.focus({ preventScroll: true });
      });
    }

    openRequestedCategory();
    window.addEventListener("popstate", openRequestedCategory);

    return () => window.removeEventListener("popstate", openRequestedCategory);
  }, [categoryIds]);

  function toggleCategory(categoryId: string) {
    setOpenCategories((current) => {
      const next = new Set(current);

      if (next.has(categoryId)) {
        next.delete(categoryId);
      } else {
        next.add(categoryId);
      }

      return next;
    });
  }

  return (
    <div className="faq-category-stack">
      {categories.map((category) => {
        const isOpen = openCategories.has(category.id);
        const panelId = `faq-category-panel-${category.id}`;

        return (
          <section
            aria-labelledby={category.id}
            className="faq-category-section"
            key={category.id}
          >
            <h2 className="faq-category-title">
              <button
                aria-controls={panelId}
                aria-expanded={isOpen}
                className="faq-category-toggle"
                id={category.id}
                onClick={() => toggleCategory(category.id)}
                type="button"
              >
                <span>{category.title}</span>
                <span aria-hidden="true">{isOpen ? "âˆ’" : "+"}</span>
              </button>
            </h2>
            <div
              aria-labelledby={category.id}
              className="faq-category-panel"
              hidden={!isOpen}
              id={panelId}
              role="region"
            >
              <FAQAccordion
                idPrefix={`faq-${category.id}`}
                items={category.items}
              />
            </div>
          </section>
        );
      })}
    </div>
  );
}

export function FAQAccordion({ idPrefix = "faq", items }: FAQAccordionProps) {
  const [openItems, setOpenItems] = useState<Set<number>>(() => new Set());

  function toggleItem(index: number) {
    setOpenItems((current) => {
      const next = new Set(current);

      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }

      return next;
    });
  }

  return (
    <div className="faq-list">
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        const panelId = `${idPrefix}-panel-${index}`;
        const buttonId = `${idPrefix}-button-${index}`;

        return (
          <section className="faq-item" key={item.question}>
            <button
              aria-controls={panelId}
              aria-expanded={isOpen}
              className="faq-button"
              id={buttonId}
              onClick={() => toggleItem(index)}
              type="button"
            >
              <span>{item.question}</span>
              <span aria-hidden="true">{isOpen ? "−" : "+"}</span>
            </button>
            <div
              aria-labelledby={buttonId}
              className="faq-panel"
              hidden={!isOpen}
              id={panelId}
              role="region"
            >
              {item.answer}
            </div>
          </section>
        );
      })}
    </div>
  );
}
