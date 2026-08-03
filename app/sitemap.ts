import type { MetadataRoute } from "next";

import { client } from "../sanity/client";
import { BLOG_SITEMAP_QUERY } from "../sanity/queries";
import type { BlogSitemapArticle } from "../sanity/types";

const siteUrl = "https://dieteticianteodora.ro";

export const dynamic = "force-static";

const routes = [
  "",
  "/despre",
  "/servicii",
  "/faq",
  "/blog",
  "/contact",
  "/programare",
  "/politica-de-confidentialitate",
  "/politica-de-cookies",
  "/termeni-si-conditii",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));

  try {
    const articles = await client
      .withConfig({ useCdn: false })
      .fetch<BlogSitemapArticle[]>(BLOG_SITEMAP_QUERY);

    const articlePages: MetadataRoute.Sitemap = articles.map((article) => ({
      url: `${siteUrl}/blog/${article.slug}`,
      lastModified: article.lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    }));

    return [...staticPages, ...articlePages];
  } catch (error) {
    console.error("Nu am putut adăuga articolele Sanity în sitemap.", error);
    return staticPages;
  }
}
