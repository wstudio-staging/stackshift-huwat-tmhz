import { StructureBuilder } from "sanity/desk";

import { BsFillBagFill } from "react-icons/bs";

export const Products = (S: StructureBuilder) => {
  return S.listItem()
    .title("Products")
    .schemaType("productSettings")
    .icon(BsFillBagFill)
    .child(
      S.document()
        .title("Products")
        .schemaType("productSettings")
        .documentId("productSettings")
    );
};
