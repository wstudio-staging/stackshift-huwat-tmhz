import React from "react";
import dynamic from "next/dynamic";

import { SectionsProps, SocialLink, Form } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

export interface ContactProps {
  title?: string;
  contactDescription?: string;
  officeInformation?: string;
  contactEmail?: string;
  contactNumber?: string;
  socialLinks?: SocialLink[];
  form?: Form;
  block?: any;
}

function Contact({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.variants?.title,
    contactDescription: data?.variants?.contactDescription,
    officeInformation: data?.variants?.officeInformation,
    contactEmail: data?.variants?.contactEmail,
    contactNumber: data?.variants?.contactNumber,
    socialLinks: data?.variants?.socialLinks,
    form: data?.variants?.form,
    block: data?.variants?.block,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Contact);
