import React from "react";
import dynamic from "next/dynamic";

import { SectionsProps, ArrayOfTitleAndText } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
  variant_e: dynamic(() => import("./variant_e")),
};

export interface HowItWorksProps {
  subtitle?: string;
  title?: string;
  text?: string;
  video?: string;
  steps?: ArrayOfTitleAndText[];
}

function HowItWorks({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    subtitle: data?.variants?.subtitle,
    title: data?.variants?.title,
    text: data?.variants?.plainText,
    video: data?.variants?.youtubeLink,
    steps: data?.variants?.arrayOfTitleAndText,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(HowItWorks);
