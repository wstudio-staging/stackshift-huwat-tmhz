import { memo } from "react";
import dynamic from "next/dynamic";
import { EcwidContextProvider } from "context/EcwidContext";
import { SectionsProps } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
};

function Wishlist({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  return Variant ? (
    <EcwidContextProvider>
      <Variant />
    </EcwidContextProvider>
  ) : null;
}
export default memo(Wishlist);
