import createProductsPublishAction from "./actions/createProductsPublishAction";
import createMainProductPublishAction from "./actions/createMainProductPublishAction";
import CustomDuplicateAction from "./actions/CustomDuplicateAction";
import { NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO } from "../config";

export const ResolveDocumentActions = (props) => {
  const { prev, context } = props;

  if (
    [
      "mainProduct",
      "mainCollection",
      "cartPage",
      "wishlistPage",
      "searchPage",
      "productSettings",
      "collectionSettings",
      // c-studio sections
      "allProducts",
      "featuredProducts",
      "cartSection",
      "wishlistSection",
      "productInfo",
      // c-studio sections only in Store > Pages Products/Collections
      "dynamic_featuredProducts",
      "dynamic_productInfo",
      // c-studio sections only in Pages
      "pages_featuredProducts",
      "pages_productInfo",
    ]?.includes(context?.schemaType) &&
    NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO === "false"
  ) {
    // only show the publish action button (hide the button beside "Publish") for C-Studio elements when C-Studio is disabled
    return [createProductsPublishAction];
  } else if (
    [
      "cartPage",
      "wishlistPage",
      "searchPage",
      "productSettings",
      "collectionSettings",
    ]?.includes(context?.schemaType)
  ) {
    return [
      createProductsPublishAction,
      ...prev.filter(({ action }: { action: string }) =>
        ["discardChanges"].includes(action)
      ),
    ];
  } else if (
    [
      "slotProductInfo",
      "slotCollectionInfo",
      "slotCart",
      "slotWishlist",
    ]?.includes(context?.schemaType)
  ) {
    return []; // hide document actions for default slot sections (all are read only)
  } else if (context?.schemaType === "mainProduct") {
    // use a custom publish action function for mainProduct documents
    return [
      createMainProductPublishAction,
      ...prev.filter(({ action }: { action: string }) =>
        ["discardChanges", "unpublish", "delete"].includes(action)
      ),
    ];
  } else if (["post", "category", "author"]?.includes(context?.schemaType)) {
    // default document actions for blog documents: post, author and category
    return [
      createProductsPublishAction,
      ...prev.filter(({ action }: { action: string }) =>
        ["discardChanges", "unpublish", "delete"].includes(action)
      ),
    ];
  } else if (context?.schemaType === "page") {
    // use these custom document actions for page type documents
    return [
      createProductsPublishAction,
      CustomDuplicateAction,
      ...prev.filter(
        ({ action }: { action: string }) =>
          !["publish", "duplicate"].includes(action)
      ),
    ];
  }

  // else for other document types use the default
  return [
    createProductsPublishAction,
    ...prev.filter(
      ({ action }: { action: string }) => !["publish"].includes(action)
    ),
  ];
};
