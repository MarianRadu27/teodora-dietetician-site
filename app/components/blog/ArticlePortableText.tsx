import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";

import { urlFor } from "../../../sanity/image";
import type { BlogArticle, SanityMainImage } from "../../../sanity/types";

type LinkMarkValue = {
  href?: string;
  blank?: boolean;
};

function getImageSize(image: SanityMainImage, maxWidth: number) {
  const dimensions = image.asset?.metadata?.dimensions;
  const originalWidth = dimensions?.width ?? maxWidth;
  const originalHeight = dimensions?.height ?? Math.round(maxWidth / 1.5);
  const width = Math.min(originalWidth, maxWidth);
  const height = Math.max(1, Math.round((width * originalHeight) / originalWidth));

  return { width, height };
}

function ArticleImage({ value }: { value: SanityMainImage }) {
  if (!value.asset) {
    return null;
  }

  const { width, height } = getImageSize(value, 1100);

  return (
    <figure className="article-body-image">
      <Image
        alt={value.alt ?? ""}
        blurDataURL={value.asset.metadata?.lqip}
        height={height}
        placeholder={value.asset.metadata?.lqip ? "blur" : "empty"}
        src={urlFor(value).width(width).height(height).fit("max").url()}
        width={width}
      />
      {value.caption ? <figcaption>{value.caption}</figcaption> : null}
    </figure>
  );
}

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
    h1: ({ children }) => <h2>{children}</h2>,
    h2: ({ children }) => <h2>{children}</h2>,
    h3: ({ children }) => <h3>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  list: {
    bullet: ({ children }) => <ul>{children}</ul>,
    number: ({ children }) => <ol>{children}</ol>,
  },
  listItem: {
    bullet: ({ children }) => <li>{children}</li>,
    number: ({ children }) => <li>{children}</li>,
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    link: ({ children, value }) => {
      const link = value as LinkMarkValue | undefined;
      const href = link?.href;

      if (!href) {
        return <>{children}</>;
      }

      const isInternal = href.startsWith("/") || href.startsWith("#");
      const openInNewTab = Boolean(link?.blank) && !isInternal;

      return (
        <a
          href={href}
          rel={openInNewTab ? "noopener noreferrer" : undefined}
          target={openInNewTab ? "_blank" : undefined}
        >
          {children}
        </a>
      );
    },
  },
  types: {
    image: ({ value }) => <ArticleImage value={value as SanityMainImage} />,
  },
};

export function ArticlePortableText({ value }: { value: BlogArticle["body"] }) {
  if (!Array.isArray(value) || value.length === 0) {
    return null;
  }

  return (
    <div className="article-body">
      <PortableText components={components} value={value} />
    </div>
  );
}
