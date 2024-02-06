import React from "react";
import dynamic from "next/dynamic";

import {
  SectionsProps,
  Logo,
  ContactDetails,
  SocialLink,
  LabeledRouteWithKey,
} from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

export interface FooterProps {
  logo?: Logo;
  text?: string;
  contacts?: ContactDetails[];
  copyright?: string;
  socialMedia?: SocialLink[];
  menu?: LabeledRouteWithKey[];
  multipleMenus?: any;
}

function Footer({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.variants?.logo,
    text: data?.variants?.plainText,
    contacts: data?.variants?.contactDetails,
    copyright: data?.variants?.copyright,
    socialMedia: data?.variants?.socialLinks,
    menu: data?.variants?.menu,
    multipleMenus: data?.variants?.multipleMenus,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Footer);
