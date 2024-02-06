import React from "react";
import dynamic from "next/dynamic";

import { SectionsProps, Images, LabeledRoute } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

export interface LogoCloudProps {
  title?: string;
  images?: Images[];
  text?: string;
  button?: LabeledRoute;
}

function LogoCloud({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.variants?.title,
    images: data?.variants?.images,
    text: data?.variants?.plainText,
    button: data?.variants?.primaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(LogoCloud);
