import React from "react";
import dynamic from "next/dynamic";

import {
  SectionsProps,
  Images,
  MainImage,
  LabeledRoute,
  LabeledRouteWithKey,
  Form,
  Template,
} from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
  variant_e: dynamic(() => import("./variant_e")),
};

export interface HeaderProps {
  template?: Template;
  mainImage?: MainImage;
  images?: Images[];
  title?: string;
  description?: string;
  primaryButton?: LabeledRoute;
  secondaryButton?: LabeledRoute;
  videoLink?: string;
  formLinks?: LabeledRouteWithKey[];
  form?: Form;
}

function Header({ template, data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    template,
    mainImage: data?.variants?.mainImage,
    images: data?.variants?.images,
    title: data?.variants?.title,
    description: data?.variants?.description,
    primaryButton: data?.variants?.primaryButton,
    secondaryButton: data?.variants?.secondaryButton,
    videoLink: data?.variants?.youtubeLink,
    formLinks: data?.variants?.formLinks,
    form: data?.variants?.form,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Header);
