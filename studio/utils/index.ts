/* 
  Call this functional component to update the existing schemas from included plugins with the changes from the custom folder
*/
import { NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO } from "../config";

const CStudioSchema = [
  "allProducts",
  "featuredProducts",
  "pages_productInfo",
  "mainProduct",
  "mainCollection",
  "productSettings",
  "collectionSettings",
  "cartPage",
  "wishlistPage",
  "searchPage",
];

export const mergeReplaceAndAdd = (existingItems: any, newItems: any) => {
  const updatedItems = existingItems.map((existingItem: any) => {
    const searchedIndex = newItems
      .map((newItem: any) => newItem.name)
      .indexOf(existingItem.name);

    if (searchedIndex >= 0) {
      return newItems[searchedIndex];
    }

    return existingItem;
  });

  const additionalSchemas = newItems.reduce((all: any, current: any) => {
    if (!existingItems.map((i: any) => i.name).includes(current.name)) {
      all = [...all, current];
    }

    return all;
  }, []);

  const mergedSchemas = [...updatedItems, ...additionalSchemas];

  // If C-Studio is disabled, then C-Studio fields should be read-only
  if (NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO === "false") {
    return mergedSchemas?.map((items) => {
      if (CStudioSchema.includes(items?.name)) {
        return {
          ...items,
          __experimental_actions: [
            // hide options for creating and deleting documents from C-Studio schema
            /*'create',*/ "update",
            /*'delete',*/ "publish",
          ],
        };
      }
      return items;
    });
  }

  return mergedSchemas;
};
