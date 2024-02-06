import { StructureBuilder } from "sanity/desk";

import { BsFillTagFill } from "react-icons/bs";

export const Collections = (S: StructureBuilder) => {
  return S.listItem()
    .title("Collections")
    .schemaType("collectionSettings")
    .icon(BsFillTagFill)
    .child(
      S.document()
        .title("Collections")
        .schemaType("collectionSettings")
        .documentId("collectionSettings")
    );
};
