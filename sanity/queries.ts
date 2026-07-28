import { defineQuery } from "next-sanity";

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
