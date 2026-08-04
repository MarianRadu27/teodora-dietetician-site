"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { type MouseEvent, useState } from "react";

import { brand, navItems } from "../siteContent";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  const handleHomeLink = (event: MouseEvent<HTMLAnchorElement>) => {
    setOpen(false);

    if (pathname !== "/") {
      return;
    }

    event.preventDefault();
    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.scrollTo({
      behavior: reduceMotion ? "auto" : "smooth",
      top: 0,
    });
  };

  return (
    <header className="site-header">
      <nav aria-label="Navigație principală" className="container site-nav">
        <Link className="brand-mark" href="/" onClick={handleHomeLink}>
          <strong>{brand.name}</strong>
          <span>{brand.role}</span>
        </Link>

        <button
          aria-controls="main-navigation"
          aria-expanded={open}
          className="mobile-menu-button"
          onClick={() => setOpen((current) => !current)}
          type="button"
        >
          Meniu
        </button>

        <div
          className={`nav-links ${open ? "is-open" : ""}`}
          id="main-navigation"
        >
          {navItems.map((item) => (
            <Link
              className="nav-link"
              href={item.href}
              key={item.href}
              onClick={
                item.href === "/" ? handleHomeLink : () => setOpen(false)
              }
            >
              {item.label}
            </Link>
          ))}
          <a
            className="nav-link nav-cta"
            href={brand.bookingUrl}
            onClick={() => setOpen(false)}
          >
            Programează-te
          </a>
        </div>
      </nav>
    </header>
  );
}
