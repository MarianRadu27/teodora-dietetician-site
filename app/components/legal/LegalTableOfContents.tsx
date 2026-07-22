import Link from "next/link";

export type LegalTocItem = {
  id: string;
  title: string;
};

type LegalTableOfContentsProps = {
  items: LegalTocItem[];
};

export function LegalTableOfContents({ items }: LegalTableOfContentsProps) {
  return (
    <nav aria-label="Cuprins pagina legala" className="legal-toc">
      <h2 className="h3">Cuprins</h2>
      <ol>
        {items.map((item) => (
          <li key={item.id}>
            <Link href={`#${item.id}`}>{item.title}</Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}
