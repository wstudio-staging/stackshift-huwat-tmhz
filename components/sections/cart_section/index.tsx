import { memo } from "react";
import dynamic from "next/dynamic";
import { useEcwid } from "context/EcwidContext";

import { SectionsProps } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
};

function Cart({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];
  const ecwid = useEcwid();

  const props = {
    isReady: ecwid.isScript,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default memo(Cart);
