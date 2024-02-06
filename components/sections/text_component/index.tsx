import React from "react";
import dynamic from "next/dynamic";
import { SectionsProps } from "types";
import { PortableTextBlock } from "sanity";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

export interface TextComponentProps {
  heading?: string;
  firstColumn?: PortableTextBlock[];
  secondColumn?: PortableTextBlock[];
  thirdColumn?: PortableTextBlock[];
}

function TextComponent({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    heading: data?.variants?.title,
    firstColumn: data?.variants?.firstColumn,
    secondColumn: data?.variants?.secondColumn,
    thirdColumn: data?.variants?.thirdColumn,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(TextComponent);
