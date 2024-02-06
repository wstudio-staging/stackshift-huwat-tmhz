import React from "react";
import dynamic from "next/dynamic";

import { SectionsProps, Logo, Form } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

export interface NewsletterProps {
  logo?: Logo;
  title?: string;
  description?: string;
  form?: Form;
}

function Newsletter({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.variants?.logo,
    title: data?.variants?.title,
    description: data?.variants?.description,
    form: data?.variants?.form,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Newsletter);
