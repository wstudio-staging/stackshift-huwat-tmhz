import React from "react";
import dynamic from "next/dynamic";
import { EcwidContextProvider } from "context/EcwidContext";

import { SectionsProps, CollectionProduct } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

export interface PagesProductInfoProps {
  products?: CollectionProduct;
}

function PagesProductInfo({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    products: data?.variants?.products,
  };

  return Variant ? (
    <EcwidContextProvider>
      <Variant {...props} />
    </EcwidContextProvider>
  ) : null;
}
export default React.memo(PagesProductInfo);
