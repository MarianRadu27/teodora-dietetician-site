import Link from "next/link";

export const metadata = {
  title: "Blog nutriție | Teodora Pălii",
  description:
    "Articole educative despre nutriție, alimentație echilibrată și obiceiuri sustenabile.",
};

const futureTopics = [
  "Cum arată un plan alimentar realist",
  "Ce înseamnă alimentație echilibrată",
  "Nutriție pentru scădere în greutate fără diete extreme",
];

export default function BlogPage() {
  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-heading center">
            <p className="eyebrow">Blog</p>
            <h1 className="h1">Articole educative despre nutriție</h1>
            <p className="lead">
              Blogul va include materiale clare și aplicabile despre alimentație,
              obiceiuri zilnice și relația cu mâncarea. Nu publicăm articole
              false doar ca să umplem pagina.
            </p>
          </div>

          <div className="card-grid grid-3">
            {futureTopics.map((topic) => (
              <article className="soft-card" key={topic}>
                <p className="eyebrow">În pregătire</p>
                <h2 className="h3">{topic}</h2>
              </article>
            ))}
          </div>

          <div className="button-row" style={{ justifyContent: "center", marginTop: 34 }}>
            <Link className="button button-primary" href="/programare">
              Programează o consultație
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
