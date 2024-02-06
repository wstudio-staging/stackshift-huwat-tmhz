import { StructureBuilder } from "sanity/desk";

import { GiShop } from "react-icons/gi";
import { MdSettings } from "react-icons/md";

import { ProductStructure } from "./main/products";
import { CollectionStructure } from "./main/collections";

import { Cart } from "./pages/cart";
import { Collections } from "./pages/collections";
import { Products } from "./pages/products";
import { Search } from "./pages/search";
import { Wishlist } from "./pages/wishlist";

export const Store = (S: StructureBuilder) => {
  return S.listItem()
    .title("Store")
    .icon(GiShop)
    .child(
      S.list()
        .title("Store")
        .items([
          ProductStructure(S),
          CollectionStructure(S),
          S.divider(),
          S.listItem()
            .title("Commerce Pages")
            .icon(MdSettings)
            .child(
              S.list()
                .title("Commerce Pages")
                .items([
                  Products(S),
                  Collections(S),
                  Cart(S),
                  Wishlist(S),
                  Search(S),
                ])
            ),
        ])
    );
};
