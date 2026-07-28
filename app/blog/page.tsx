import Link from "next/link";
import Image from "next/image";

import { client } from "../../sanity/client";
import { urlFor } from "../../sanity/image";
import { BLOG_ARTICLES_QUERY } from "../../sanity/queries";
import type { BlogArticleCard } from "../../sanity/types";

export const metadata = {
  title: "Blog nutriție | Teodora Pălii",
  description:
    "Articole educative despre nutriție, alimentație echilibrată și obiceiuri sustenabile.",
};

export const revalidate = 3600;

const dateFormatter = new Intl.DateTimeFormat("ro-RO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

async function getBlogArticles() {
  try {
    return await client.fetch<BlogArticleCard[]>(BLOG_ARTICLES_QUERY);
  } catch (error) {
    console.error("Nu am putut prelua articolele din Sanity.", error);
    return [];
  }
}

export default async function BlogPage() {
  const articles = await getBlogArticles();

  return (
    <main>
      <section className="section">
        <div className="container">
          <div className="section-heading center blog-page-heading">
            <h1 className="h1">Articole educative despre nutriție</h1>
          </div>

          {articles.length > 0 ? (
            <div className="card-grid grid-3">
              {articles.map((article) => {
                const imageUrl = article.mainImage?.asset
                  ? urlFor(article.mainImage).width(900).height(620).fit("crop").url()
                  : null;
                const imageAlt = article.mainImage?.alt ?? "";
                const publishedDate = article.publishedAt
                  ? dateFormatter.format(new Date(article.publishedAt))
                  : null;
                const articleHref = article.slug ? `/blog/${article.slug}` : "/blog";

                return (
                  <Link
                    aria-label={`Citește articolul ${article.title ?? ""}`}
                    className="blog-card-link"
                    href={articleHref}
                    key={article._id}
                  >
                    <article className="soft-card blog-card">
                      {imageUrl ? (
                        <Image
                          className="blog-card-image"
                          src={imageUrl}
                          alt={imageAlt}
                          width={900}
                          height={620}
                          placeholder={
                            article.mainImage?.asset?.metadata?.lqip ? "blur" : "empty"
                          }
                          blurDataURL={article.mainImage?.asset?.metadata?.lqip}
                        />
                      ) : null}

                      <div className="blog-card-meta">
                        <p className="eyebrow">{article.category?.title ?? "Articol"}</p>
                        {publishedDate ? (
                          <time dateTime={article.publishedAt}>{publishedDate}</time>
                        ) : null}
                      </div>

                      <h2 className="h3">{article.title}</h2>
                      {article.excerpt ? (
                        <p className="blog-card-excerpt">{article.excerpt}</p>
                      ) : null}
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <article className="soft-card blog-empty-state">
              <p>Nu există încă articole publicate.</p>
            </article>
          )}

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
