import { useContext } from "react";
import { Components } from "components/list";
import { InlineEditorContext } from "context/InlineEditorContext";
import InlineEditor from "components/InlineEditor";
import { EcwidContextProvider } from "context/EcwidContext";
import { ProductData } from "pages/products/[slug]";

interface ProductSectionsProps {
  data: ProductData;
}

export function ProductSections({ data }: ProductSectionsProps) {
  const {
    commonSections, // sections from Store > Commerce Pages > Products
    name, // product name
    ecwidProductId, // the product ID from Ecwid
    price, // product price
    description, // product description
    sections, // sections from the Design field group tab of Product page
    _id,
    _type,
  } = data;

  const showInlineEditor = useContext(InlineEditorContext);
  let sectionsToDisplay = commonSections?.sections;

  // if we have "slotProductInfo" section, then we have the placeholder for the productInfo values
  let slotSection = sections?.map((section) => {
    // get the index of the "slotProductInfo" section from Store > Commerce Pages > Products section
    const getIndex = commonSections?.sections?.findIndex((item) =>
      item?._type?.includes("slotProductInfo")
    );

    const newObj = {
      variant: commonSections?.sections?.[getIndex]?.variant, // e.g. variant_a
    };

    // mutate sections array to add the productInfo details if the section is slotProductInfo and if its variant is the default
    if (
      section?._type === "slotProductInfo" &&
      section?.variant === "defaultVariant"
    ) {
      return { ...section, ...newObj };
    }
    // just return other sections as is
    return section;
  });

  // let us make sure that "sections" array is not empty or undefined, otherwise use the default sections from Store > Commerce Pages > Products
  if (sections) {
    // check if we have other sections aside from slotProductInfo in a Store > Products product page
    const filtered = sections?.filter(
      (section) => section?._type !== "slotProductInfo"
    );

    if (filtered?.length !== 0) {
      // replace all the sections from Store > Commerce Pages > Products with sections from Store > Products
      sectionsToDisplay = slotSection;
    } else {
      // there is only "slotProductInfo" section in Store > Products product page
      sectionsToDisplay = sections?.reduce(
        (defaultsArr, newArr) => {
          // get the index of the "slotProductInfo" section from Store > Commerce Pages > Products sections
          const getIndex = commonSections?.sections?.findIndex((item) =>
            item?._type?.includes("slotProductInfo")
          );

          // if the variant from the Store > Products page is a "defaultVariant", then replace it with the variant of Store > Commerce Pages > Products "slotProductInfo"
          if (newArr?.variant === "defaultVariant") {
            newArr.variant = defaultsArr[getIndex]?.variant;
          }

          // if there is a "slotProductInfo" section in Store > Commerce Pages > Products, then replace it with the "slotProductInfo" of Store > Pages section
          if (getIndex !== -1) {
            defaultsArr[getIndex] = newArr;
          }

          // otherwise return the sections as defined
          return defaultsArr;
        },
        [...commonSections?.sections]
      );
    }
  }

  return (
    <>
      {sectionsToDisplay &&
        sectionsToDisplay?.map((section, index) => {
          const sectionType =
            section?._type === "slotCart" // for slotCart, apply the variant templates of the cart section
              ? "cartSection"
              : section?._type === "slotWishlist" // for slotWishlist, apply the variant templates of the wishlist section
              ? "wishlistSection"
              : section?._type === "slotProductInfo" // for slotProductInfo, apply the variant templates of the former productInfo section
              ? "productInfo"
              : section?._type; // otherwise, use the actual section type

          const Component = Components?.[sectionType];
          const currentDocument =
            section?._type === "slotProductInfo"
              ? { id: _id, type: _type }
              : { id: section?._id, type: section?._type };

          // skip rendering unknown components
          if (!Component) {
            return null;
          }

          return (
            <InlineEditor
              document={currentDocument}
              showInlineEditor={showInlineEditor}
              key={index}
            >
              <EcwidContextProvider>
                <Component
                  template={{
                    bg: "gray",
                    color: "webriq",
                  }}
                  product={{
                    name,
                    ecwidProductId,
                    price,
                    description,
                  }}
                  data={section}
                />
              </EcwidContextProvider>
            </InlineEditor>
          );
        })}
    </>
  );
}
