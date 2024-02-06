import React from "react";
import dynamic from "next/dynamic";
import { SectionsProps, StatItems } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

export interface StatsProps {
  stats?: StatItems[];
}

function Stats({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    stats: data?.variants?.statItems,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Stats);
