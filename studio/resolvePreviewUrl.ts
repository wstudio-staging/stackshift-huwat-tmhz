import {
  NEXT_PUBLIC_PREVIEW_SECRET,
  NEXT_PUBLIC_SITE_URL,
} from "studio/config";
import type { SanityDocumentLike } from "sanity";

export default function resolveProductionUrl(
  doc: SanityDocumentLike & { slug?: { current: string } },
  inStudioWebPreview?: boolean
) {
  const currentSlug = doc?.slug?.current || "";

  // localhost
  if (
    typeof window !== "undefined" &&
    window.location.hostname.includes("localhost")
  ) {
    return PreviewURL(
      NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
      NEXT_PUBLIC_PREVIEW_SECRET,
      doc?._type,
      currentSlug,
      inStudioWebPreview
    );
  }

  // remote / live site
  return PreviewURL(
    NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
    NEXT_PUBLIC_PREVIEW_SECRET,
    doc?._type,
    currentSlug,
    inStudioWebPreview
  );
}

// only show the "Open Preview" option for the following documents
export function PreviewURL(
  siteUrl: string,
  previewSecret: string,
  documentType: string,
  slug: string,
  inStudioWebPreview?: boolean
) {
  const URL = !inStudioWebPreview
    ? `${BaseUrl(siteUrl, previewSecret)}&source=studio`
    : `${BaseUrl(siteUrl, previewSecret)}`;

  if (["page", "post"].includes(documentType)) {
    return `${URL}&slug=${slug}`;
  } else if (documentType === "mainProduct") {
    return `${URL}&type=products&slug=${slug}`;
  } else if (documentType === "mainCollection") {
    return `${URL}&type=collections&slug=${slug}`;
  } else if (documentType === "cartPage") {
    return `${URL}&slug=cart?store-page=cart`;
  } else if (documentType === "wishlistPage") {
    return `${URL}&slug=wishlist`;
  } else if (documentType === "searchPage") {
    return `${URL}&slug=search`;
  }

  return undefined;
}

function BaseUrl(siteUrl: string, previewSecret: string) {
  return `${siteUrl}/api/preview?secret=${previewSecret}`;
}
