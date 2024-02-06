import dynamic from "next/dynamic";

export const Components = {
  navigation: dynamic(() => import("components/sections/navigation")),
  header: dynamic(() => import("components/sections/header")),
  features: dynamic(() => import("components/sections/features")),
  portfolio: dynamic(() => import("components/sections/portfolio")),
  blog: dynamic(() => import("components/sections/blog")),
  contact: dynamic(() => import("components/sections/contact")),
  pricing: dynamic(() => import("components/sections/pricing")),
  testimonial: dynamic(() => import("components/sections/testimonials")),
  team: dynamic(() => import("components/sections/team")),
  howItWorks: dynamic(() => import("components/sections/how_it_works")),
  newsletter: dynamic(() => import("components/sections/newsletter")),
  faqs: dynamic(() => import("components/sections/faqs")),
  callToAction: dynamic(() => import("components/sections/call_to_action")),
  stats: dynamic(() => import("components/sections/stats")),
  cookies: dynamic(() => import("components/sections/cookies")),
  appPromo: dynamic(() => import("components/sections/app_promo")),
  logoCloud: dynamic(() => import("components/sections/logoCloud")),
  footer: dynamic(() => import("components/sections/footer")),
  signInSignUp: dynamic(() => import("components/sections/sign_in_sign_up")),
  textComponent: dynamic(() => import("components/sections/text_component")),
  // C-Studio
  cartSection: dynamic(() => import("components/sections/cart_section")),
  featuredProducts: dynamic(
    () => import("components/sections/featured_products")
  ),
  productInfo: dynamic(() => import("components/sections/product_info")),
  wishlistSection: dynamic(() => import("components/sections/wishlist")),
  pages_productInfo: dynamic(
    () => import("components/sections/pages_productInfo")
  ),
  allProducts: dynamic(() => import("components/sections/all_products")),
};

/**
 * Helper function to return the correct version of the document
 * If we're in "preview mode" and have multiple documents, return the draft
 *
 * Reference: https://www.sanity.io/guides/nextjs-live-preview
 */
export function filterDataToSingleItem(data, preview) {
  if (!Array.isArray(data)) {
    return data[0];
  }

  if (data.length === 1) {
    // To help identify never published pages from published ones since on preview, no document with _id `drafts` is returned
    if (data[0]._id.includes("drafts")) {
      data[0].hasNeverPublished = true;
    }

    return data[0];
  } else if (data.length === 2) {
    // Published document with unpublished edits returns 2 ids (1 with draft prefix and 1 without) so array length is 2

    // add flag to differentiate a never published document from one with unpublished edits since either would have "drafts" in their ids
    data[1].hasUnpublishedEdits = true;

    // return the draft document to show live preview updates
    return data[1];
  }

  if (preview) {
    return data.find((item) => item._id.includes("drafts")) || data[0];
  }

  return data[0];
}

// SEO component to add required metatags to pages (add component inside <Head></Head>)
export const SEO = dynamic(() => import("components/SEO"));
