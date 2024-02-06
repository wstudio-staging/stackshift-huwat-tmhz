import { memo } from "react";
import dynamic from "next/dynamic";
import { SectionsProps, Collection } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

export interface AllProductsProps {
  products?: Collection[];
}

function AllProducts({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    products: data?.variants?.allProducts,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default memo(AllProducts);
