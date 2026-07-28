import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import { ArticlePortableText } from "../../components/blog/ArticlePortableText";
import { client } from "../../../sanity/client";
import { urlFor } from "../../../sanity/image";
import {
  BLOG_ARTICLE_BY_SLUG_QUERY,
  BLOG_ARTICLE_SLUGS_QUERY,
} from "../../../sanity/queries";
import type {
  BlogArticle,
  BlogArticleSlug,
  SanityMainImage,
} from "../../../sanity/types";

type BlogArticlePageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export const dynamicParams = false;
export const revalidate = 3600;

const dateFormatter = new Intl.DateTimeFormat("ro-RO", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

function formatDate(date?: string) {
  if (!date) {
    return null;
  }

  return dateFormatter.format(new Date(date));
}

function isDifferentDay(firstDate?: string, secondDate?: string) {
  if (!firstDate || !secondDate) {
    return false;
  }

  return firstDate.slice(0, 10) !== secondDate.slice(0, 10);
}

function imageUrl(image?: SanityMainImage, width = 1200, height = 760) {
  if (!image?.asset) {
    return null;
  }

  return urlFor(image).width(width).height(height).fit("crop").url();
}

function safeJsonLd(data: unknown) {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}

async function getArticleBySlug(slug: string) {
  return client.fetch<BlogArticle | null>(BLOG_ARTICLE_BY_SLUG_QUERY, { slug });
}

export async function generateStaticParams() {
  const slugs = await client
    .withConfig({ useCdn: false })
    .fetch<BlogArticleSlug[]>(BLOG_ARTICLE_SLUGS_QUERY);

  return slugs.map((article) => ({
    slug: article.slug,
  }));
}

export async function generateMetadata({
  params,
}: BlogArticlePageProps): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    return {};
  }

  const title = article.seoTitle || article.title || "Articol nutriție";
  const description = article.seoDescription || article.excerpt || undefined;
  const canonical = `/blog/${article.slug}`;
  const ogImage = imageUrl(article.mainImage);

  return {
    title,
    description,
    alternates: {
      canonical,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      publishedTime: article.publishedAt,
      modifiedTime: article.updatedAt,
      images: ogImage
        ? [
            {
              url: ogImage,
              width: 1200,
              height: 760,
              alt: article.mainImage?.alt || article.title || "",
            },
          ]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
  };
}

export default async function BlogArticlePage({ params }: BlogArticlePageProps) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const publishedDate = formatDate(article.publishedAt);
  const updatedDate = isDifferentDay(article.publishedAt, article.updatedAt)
    ? formatDate(article.updatedAt)
    : null;
  const mainImageUrl = imageUrl(article.mainImage, 1400, 880);
  const articleUrl = `/blog/${article.slug}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.seoDescription || article.excerpt,
    image: mainImageUrl ? [mainImageUrl] : undefined,
    datePublished: article.publishedAt,
    dateModified: article.updatedAt || article.publishedAt,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": articleUrl,
    },
    author: {
      "@type": "Person",
      name: "Teodora Pălii",
    },
  };

  return (
    <main>
      <script
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
        type="application/ld+json"
      />
      <article className="section article-page">
        <div className="container">
          <div className="article-shell">
            <header className="article-header">
              <p className="eyebrow">{article.category?.title ?? "Articol"}</p>
              <h1 className="h1 title-left">{article.title}</h1>
              {article.excerpt ? <p className="lead">{article.excerpt}</p> : null}
              <div className="article-dates">
                {publishedDate ? (
                  <time dateTime={article.publishedAt}>{publishedDate}</time>
                ) : null}
                {updatedDate ? (
                  <time dateTime={article.updatedAt}>Actualizat la {updatedDate}</time>
                ) : null}
              </div>
            </header>

            {mainImageUrl ? (
              <figure className="article-main-image">
                <Image
                  alt={article.mainImage?.alt ?? ""}
                  blurDataURL={article.mainImage?.asset?.metadata?.lqip}
                  height={880}
                  placeholder={
                    article.mainImage?.asset?.metadata?.lqip ? "blur" : "empty"
                  }
                  priority
                  src={mainImageUrl}
                  width={1400}
                />
                {article.mainImage?.caption ? (
                  <figcaption>{article.mainImage.caption}</figcaption>
                ) : null}
              </figure>
            ) : null}

            <ArticlePortableText value={article.body} />
          </div>
        </div>
      </article>
    </main>
  );
}
