import { useContext } from "react";
import { Components } from "components/list";
import { InlineEditorContext } from "context/InlineEditorContext";
import InlineEditor from "components/InlineEditor";
import { EcwidContextProvider } from "context/EcwidContext";
import { CollectionData } from "pages/collections/[slug]";

interface CollectionSectionsProps {
  data: CollectionData;
}

export function CollectionSections({ data }: CollectionSectionsProps) {
  const {
    commonSections, // sections from Store > Pages > Collections
    name, // collection name
    sections, // sections from the Design field group tab of Collections page
    _id,
    _type,
  } = data;

  const showInlineEditor = useContext(InlineEditorContext);

  let sectionsToDisplay = commonSections?.sections;

  // if we have "slotCollectionInfo" section, then we have the placeholder for the collections values
  let slotSection = sections?.map((section) => {
    // get the index of the "slotCollectionInfo" section from Store > Commerce Pages > Collections section
    const getIndex = commonSections?.sections?.findIndex((item) =>
      item?._type?.includes("slotCollectionInfo")
    );

    const newObj = {
      variant: commonSections?.sections?.[getIndex]?.variant, // the selected variant for the featuredProducts from Store > Commerce Pages > Collections
    };

    // mutate sections array to add the collections details if the section is slotCollectionInfo and if defaultVariant
    if (
      section?._type === "slotCollectionInfo" &&
      section?.variant === "defaultVariant"
    ) {
      return { ...section, ...newObj };
    }

    // just return other sections as is
    return section;
  });

  if (sections) {
    const filtered = sections?.filter(
      (section) => section?._type !== "slotCollectionInfo"
    );

    if (filtered?.length !== 0) {
      // replace all the sections from Store > Commerce Pages > Collections with sections from Store > Collections
      sectionsToDisplay = slotSection;
    } else {
      // we only have featuredProducts section on the collection page so we merge this section with the sections in Store > Pages > Collections
      sectionsToDisplay = sections?.reduce(
        (defaultsArr, newArr) => {
          // only need the featuredProducts section from Store > Collections to match
          const getIndex = commonSections?.sections?.findIndex((item) =>
            item?._type?.includes("slotCollectionInfo")
          );

          // if the variant from the Store > Collections page is a "defaultVariant", then replace it with the variant of Store > Commerce Pages > Collections "slotCollectionInfo"
          if (newArr?.variant === "defaultVariant") {
            newArr.variant = defaultsArr[getIndex]?.variant;
          }

          // if there is a "slotCollectionInfo" section in Store > Commerce Pages > Collections, then replace it with the "slotCollectionInfo" of Store > Collections section
          if (getIndex !== -1) {
            defaultsArr[getIndex] = newArr;
          }

          // otherwise return the other sections defined
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
              : section?._type === "slotCollectionInfo" // for slotCollectionInfo, apply the variant templates of the featuredProducts section
              ? "featuredProducts"
              : section?._type; // otherwise, use the actual section type

          const Component = Components[sectionType];
          const currentDocument =
            section?._type === "slotCollectionInfo"
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
                  collection={{
                    name,
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
