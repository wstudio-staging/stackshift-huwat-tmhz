import React from "react";
import dynamic from "next/dynamic";
import { SectionsProps, Team } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

export interface TeamsProps {
  caption?: string;
  title?: string;
  team?: Team[];
}

function Team({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    caption: data?.variants?.subtitle,
    title: data?.variants?.title,
    team: data?.variants?.teams,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Team);
