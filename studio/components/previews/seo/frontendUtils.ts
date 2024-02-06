export const assemblePageUrl = ({ document, options }) => {
  const { publishedURL, previewURL } = options;
  
  const documentType = document?._type;
  let slug = document?.slug?.current;

  if(documentType === "mainProduct") {
    slug = `products/${slug}`
  } else if(documentType === "mainCollection") {
    slug = `collections/${slug}`
  } else if(documentType === "cartPage") {
    slug = "cart"
  } else if(documentType === "wishlistPage") {
    slug = "wishlist"
  } else if (documentType === "searchPage") {
    slug = "search"
  }

  if ((!slug || !previewURL) && !["cartPage", "wishlistPage", "searchPage"].includes(documentType)) {
    console.warn("Missing slug or publishedURL/previewURL", {
      slug,
      publishedURL,
      previewURL,
    });
    return "";
  }

  return `${publishedURL || previewURL}/${slug}`;
};