import type { PortableTextBlock, TypedObject } from "@portabletext/types";

export type SanityImageAsset = {
  _id: string;
  url?: string;
  metadata?: {
    lqip?: string;
    dimensions?: {
      width?: number;
      height?: number;
    };
  };
};

export type SanityMainImage = {
  asset?: SanityImageAsset;
  alt?: string;
  caption?: string;
  crop?: unknown;
  hotspot?: unknown;
};

export type BlogCategory = {
  _id: string;
  title?: string;
  slug?: string;
  description?: string;
};

export type BlogArticleCard = {
  _id: string;
  title?: string;
  slug?: string;
  excerpt?: string;
  bodyPlainText?: string;
  publishedAt?: string;
  updatedAt?: string;
  featured?: boolean;
  mainImage?: SanityMainImage;
  category?: BlogCategory;
};

export type BlogArticleSlug = {
  slug: string;
};

export type BlogSitemapArticle = {
  slug: string;
  lastModified?: string;
};

export type BlogArticle = BlogArticleCard & {
  body?: Array<PortableTextBlock | TypedObject>;
  seoTitle?: string;
  seoDescription?: string;
};
