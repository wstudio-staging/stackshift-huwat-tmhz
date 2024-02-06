import createImageUrlBuilder from "@sanity/image-url";
import { PortableText } from "@portabletext/react";
import { definePreview } from "next-sanity/preview";
import { config } from "./config";

export const imageBuilder = createImageUrlBuilder(config);

/**
 * Set up a helper function for generating Image URLs with only the asset reference data in your documents.
 * Read more: https://www.sanity.io/docs/image-url
 **/
export const urlFor = (source) =>
  source?.asset && imageBuilder.image(source).format("webp")?.url();

export const seoImageUrl = (source) =>
  source?.asset && imageBuilder.image(source).format("jpg")?.url();

// Set up the live preview subscription hook
export const usePreviewSubscription = definePreview(config);

export { PortableText };
