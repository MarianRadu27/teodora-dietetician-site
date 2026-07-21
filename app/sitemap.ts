import type { MetadataRoute } from "next";

const siteUrl = "https://dieteticianteodora.ro";

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

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.7,
  }));
}
