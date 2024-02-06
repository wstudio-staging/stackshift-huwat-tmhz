module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://discover.webriq.com", // update fallback value with live site URL
  generateRobotsTxt: false, // (optional)
  generateIndexSitemap: false,
  // if C-Studio is disabled, exclude its pages from being added to sitemap
  exclude: process.env.NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO === "false" && [
    "/collections/*",
    "/products/*",
    "/cart",
    "/search",
    "/wishlist",
  ],
};
