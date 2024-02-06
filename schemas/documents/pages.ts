import { defineArrayMember, defineField, defineType } from "sanity";
import { MdLibraryBooks } from "react-icons/md";
import { isSlugUnique } from "studio/isSlugUnique";
import { NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO } from "studio/config";

export default defineType({
  title: "Page",
  name: "page",
  icon: MdLibraryBooks,
  type: "document",
  fields: [
    defineField({
      title: "Title",
      name: "title",
      description: "What's this page is for?",
      type: "string",
    }),
    defineField({
      title: "Slug",
      name: "slug",
      type: "slug",
      description:
        "On what URL should this be published? e.g: /heres-a-sample-url",
      validation: (Rule) =>
        Rule.required().custom((slug) => {
          const regex = /[!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]+/;

          if (slug?.current !== undefined) {
            if (regex.test(slug.current)) {
              return `Slug cannot contain these special characters [!@#$%^&*()+\=\[\]{};':"\\|,.<>\/?]`;
            }

            if (slug?.current !== slug.current.toLowerCase()) {
              return "Slug must be in lowercase";
            }

            if (slug?.current.indexOf(" ") !== -1) {
              return "Slug cannot contain spaces";
            }
          }

          return true;
        }),
      options: {
        source: "title",
        maxLength: 96,
        isUnique: isSlugUnique,
      },
    }),
    defineField({
      title: "Sections",
      name: "sections",
      type: "array",
      of: [
        defineArrayMember({
          title: "Navigation",
          name: "navigation",
          type: "reference",
          to: [{ type: "navigation" }],
          options: {
            filter: () => {
              const defaultLabel = "Default C-Studio Navigation";

              // Do not display default navigation if C-Studio is not enabled
              if (NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO === "false") {
                return {
                  filter: "label != $label",
                  params: { label: defaultLabel },
                };
              }

              // When C-Studio is enabled, show all navigation documents
              return {
                filter: "_type == $type",
                params: {
                  type: "navigation",
                },
              };
            },
          },
        }),
        defineArrayMember({
          title: "Header",
          name: "header",
          type: "reference",
          to: [{ type: "header" }],
        }),
        defineArrayMember({
          title: "Blog",
          name: "blog",
          type: "reference",
          to: [{ type: "blog" }],
        }),
        defineArrayMember({
          title: "App Promo",
          name: "appPromo",
          type: "reference",
          to: [{ type: "appPromo" }],
        }),
        defineArrayMember({
          title: "Call To Action",
          name: "callToAction",
          type: "reference",
          to: [{ type: "callToAction" }],
        }),
        defineArrayMember({
          title: "Featured products",
          name: "featuredProducts",
          type: "reference",
          to: [{ type: "featuredProducts" }],
        }),
        defineArrayMember({
          title: "Pricing",
          name: "pricing",
          type: "reference",
          to: [{ type: "pricing" }],
        }),
        defineArrayMember({
          title: "Product Info",
          name: "productInfo",
          type: "reference",
          to: [{ type: "pages_productInfo" }],
        }),
        defineArrayMember({
          title: "Wishlist",
          name: "wishlist",
          type: "reference",
          to: [{ type: "slotWishlist" }],
        }),
        defineArrayMember({
          title: "Contact",
          name: "contact",
          type: "reference",
          to: [{ type: "contact" }],
        }),
        defineArrayMember({
          title: "Cookies",
          name: "cookies",
          type: "reference",
          to: [{ type: "cookies" }],
        }),
        defineArrayMember({
          title: "Faqs",
          name: "faqs",
          type: "reference",
          to: [{ type: "faqs" }],
        }),
        defineArrayMember({
          title: "Features",
          name: "features",
          type: "reference",
          to: [{ type: "features" }],
        }),
        defineArrayMember({
          title: "How It Works",
          name: "howItWorks",
          type: "reference",
          to: [{ type: "howItWorks" }],
        }),
        defineArrayMember({
          title: "Logo Cloud",
          name: "logoCloud",
          type: "reference",
          to: [{ type: "logoCloud" }],
        }),
        defineArrayMember({
          title: "Newsletter",
          name: "newsletter",
          type: "reference",
          to: [{ type: "newsletter" }],
        }),
        defineArrayMember({
          title: "Portfolio",
          name: "portfolio",
          type: "reference",
          to: [{ type: "portfolio" }],
        }),
        defineArrayMember({
          title: "Statistics",
          name: "stats",
          type: "reference",
          to: [{ type: "stats" }],
        }),
        defineArrayMember({
          title: "Sign In Sign Up",
          name: "signInSignUp",
          type: "reference",
          to: [{ type: "signInSignUp" }],
        }),
        defineArrayMember({
          title: "Team",
          name: "team",
          type: "reference",
          to: [{ type: "team" }],
        }),
        defineArrayMember({
          title: "Testimonial",
          name: "testimonial",
          type: "reference",
          to: [{ type: "testimonial" }],
        }),
        defineArrayMember({
          title: "Text Component",
          name: "textComponent",
          type: "reference",
          to: [{ type: "textComponent" }],
        }),
        defineArrayMember({
          title: "Footer",
          name: "footer",
          type: "reference",
          to: [{ type: "footer" }],
          options: {
            filter: () => {
              const defaultLabel = "Default C-Studio Footer";

              // Do not display default footer if C-Studio is not enabled
              if (NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO === "false") {
                return {
                  filter: "label != $label",
                  params: { label: defaultLabel },
                };
              }

              // When C-Studio is enabled, show all footer documents
              return {
                filter: "_type == $type",
                params: {
                  type: "footer",
                },
              };
            },
          },
        }),
      ],
    }),
    defineField({
      title: "SEO Settings",
      name: "seo",
      type: "seoSettings",
      options: {
        collapsible: true,
        collapsed: true,
      },
    }),
  ],
});
