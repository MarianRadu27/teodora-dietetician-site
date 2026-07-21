"use client";

import Link from "next/link";
import { useState } from "react";

import { brand, navItems } from "../siteContent";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header">
      <nav aria-label="Navigație principală" className="container site-nav">
        <Link className="brand-mark" href="/" onClick={() => setOpen(false)}>
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
              onClick={() => setOpen(false)}
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
