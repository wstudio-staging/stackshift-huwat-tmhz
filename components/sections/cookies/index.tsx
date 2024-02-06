import React from "react";
import dynamic from "next/dynamic";

import { SectionsProps } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
  variant_e: dynamic(() => import("./variant_e")),
};

export interface CookiesProps {
  title?: string;
  allowCookieBtn?: string;
  denyCookieBtn?: string;
  block?: any;
}

function Cookies({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.variants?.heading,
    allowCookieBtn: data?.variants?.acceptButtonLabel,
    denyCookieBtn: data?.variants?.declineButtonLabel,
    block: data?.variants?.block,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Cookies);
