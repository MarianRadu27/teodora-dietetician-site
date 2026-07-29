import { defineQuery } from "groq";

export const BLOG_ARTICLES_QUERY = defineQuery(/* groq */ `
  *[
    _type == "article"
    && defined(slug.current)
    && defined(publishedAt)
    && !(_id in path("drafts.**"))
  ]
  | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "bodyPlainText": pt::text(body),
    publishedAt,
    updatedAt,
    featured,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt,
      caption,
      crop,
      hotspot
    },
    category->{
      _id,
      title,
      "slug": slug.current,
      description
    }
  }
`);

export const HOME_RECENT_ARTICLES_QUERY = defineQuery(/* groq */ `
  *[
    _type == "article"
    && defined(slug.current)
    && defined(publishedAt)
    && !(_id in path("drafts.**"))
  ]
  | order(featured desc, publishedAt desc)[0...3] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "bodyPlainText": pt::text(body),
    publishedAt,
    featured,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt,
      caption,
      crop,
      hotspot
    },
    category->{
      _id,
      title,
      "slug": slug.current
    }
  }
`);

export const BLOG_ARTICLE_SLUGS_QUERY = defineQuery(/* groq */ `
  *[
    _type == "article"
    && defined(slug.current)
    && defined(publishedAt)
    && !(_id in path("drafts.**"))
  ] {
    "slug": slug.current
  }
`);

export const BLOG_ARTICLE_BY_SLUG_QUERY = defineQuery(/* groq */ `
  *[
    _type == "article"
    && slug.current == $slug
    && defined(slug.current)
    && defined(publishedAt)
    && !(_id in path("drafts.**"))
  ][0] {
    _id,
    title,
    "slug": slug.current,
    excerpt,
    "bodyPlainText": pt::text(body),
    publishedAt,
    updatedAt,
    featured,
    seoTitle,
    seoDescription,
    mainImage {
      asset->{
        _id,
        url,
        metadata {
          lqip,
          dimensions {
            width,
            height
          }
        }
      },
      alt,
      caption,
      crop,
      hotspot
    },
    category->{
      _id,
      title,
      "slug": slug.current
    },
    body[] {
      ...,
      markDefs[] {
        ...,
        _type == "link" => {
          href,
          blank
        }
      },
      _type == "image" => {
        asset->{
          _id,
          url,
          metadata {
            lqip,
            dimensions {
              width,
              height
            }
          }
        },
        alt,
        caption,
        crop,
        hotspot
      }
    }
  }
`);
