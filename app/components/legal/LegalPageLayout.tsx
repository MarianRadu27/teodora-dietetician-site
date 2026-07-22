import Link from "next/link";
import type { ReactNode } from "react";

import { LegalTableOfContents, type LegalTocItem } from "./LegalTableOfContents";

type LegalPageLayoutProps = {
  children: ReactNode;
  description: string;
  lastUpdated: string;
  title: string;
  tocItems: LegalTocItem[];
};

export function LegalPageLayout({
  children,
  description,
  lastUpdated,
  title,
  tocItems,
}: LegalPageLayoutProps) {
  return (
    <main className="section legal-page">
      <div className="container legal-container">
        <nav aria-label="Breadcrumb" className="breadcrumb">
          <Link href="/">Acasă</Link>
          <span aria-hidden="true">/</span>
          <span>Legal</span>
        </nav>

        <article className="legal-article">
          <header className="legal-header">
            <p className="eyebrow">Legal</p>
            <h1 className="h1">{title}</h1>
            <p className="lead">{description}</p>
            <p className="legal-updated">
              Ultima actualizare: <strong>{lastUpdated}</strong>
            </p>
          </header>

          <LegalTableOfContents items={tocItems} />

          <div className="legal-content">{children}</div>

          <div className="legal-return">
            <Link className="button button-secondary" href="/">
              Revino la pagina principala
            </Link>
          </div>
        </article>
      </div>
    </main>
  );
}
