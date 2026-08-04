"use client";

import { useEffect, useState } from "react";

const VISIBILITY_OFFSET = 480;

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setIsVisible(window.scrollY > VISIBILITY_OFFSET);
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });

    return () => window.removeEventListener("scroll", updateVisibility);
  }, []);

  const scrollToTop = () => {
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      behavior: reduceMotion ? "auto" : "smooth",
      top: 0,
    });
  };

  return (
    <button
      aria-hidden={!isVisible}
      aria-label="Înapoi la începutul paginii"
      className={`scroll-to-top-button ${isVisible ? "is-visible" : ""}`}
      onClick={scrollToTop}
      tabIndex={isVisible ? 0 : -1}
      title="Înapoi sus"
      type="button"
    >
      <svg
        aria-hidden="true"
        fill="none"
        focusable="false"
        viewBox="0 0 24 24"
      >
        <path
          d="m6 15 6-6 6 6"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </button>
  );
}
