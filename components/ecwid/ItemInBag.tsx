import { useEcwid } from "context/EcwidContext";
import React from "react";
import AddToWishlist from "./AddToWishlist";

const ItemInBag = ({ itemsCount }: { itemsCount: number }) => {
  return (
    <>
      <p className="mb-3">{`${itemsCount} ${
        itemsCount === 1 ? "item" : "items"
      } in the bag`}</p>
    </>
  );
};

export default ItemInBag;
