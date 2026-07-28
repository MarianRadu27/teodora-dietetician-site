import { createImageUrlBuilder } from "@sanity/image-url";

import { dataset, projectId } from "./client";

const builder = createImageUrlBuilder({ projectId, dataset });
type SanityImageSource = Parameters<typeof builder.image>[0];

export function urlFor(source: SanityImageSource) {
  return builder.image(source);
}
