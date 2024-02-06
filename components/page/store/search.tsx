import { useContext } from "react";
import { Components } from "components/list";
import { InlineEditorContext } from "context/InlineEditorContext";
import InlineEditor from "components/InlineEditor";
import { SearchData } from "pages/search";

interface SearchPageSectionsProps {
  data: SearchData;
}

export function SearchPageSections({ data }: SearchPageSectionsProps) {
  const { sections } = data;
  const showInlineEditor = useContext(InlineEditorContext);

  return (
    <>
      {sections &&
        sections?.map((section, index) => {
          const Component = Components[section._type];
          const currentDocument =
            section?._type === "slotCollectionInfo"
              ? {
                  id: section?.variants?.collections?._id,
                  type: section?.variants?.collections?._type,
                }
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
              <Component
                template={{
                  bg: "gray",
                  color: "webriq",
                }}
                data={section}
              />
            </InlineEditor>
          );
        })}
    </>
  );
}
