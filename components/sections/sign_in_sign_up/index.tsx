import React from "react";
import dynamic from "next/dynamic";
import {
  SectionsProps,
  Logo,
  LabeledRoute,
  LabeledRouteWithKey,
  Form,
} from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

export interface SignUpFormProps {
  logo?: Logo;
  title?: string;
  subtitle?: string;
  text?: string;
  firstButton?: LabeledRoute;
  secondButton?: LabeledRoute;
  formLinks?: LabeledRouteWithKey[];
  signInLink?: LabeledRoute;
  form?: Form;
}

function SignUpForm({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.variants?.logo,
    title: data?.variants?.title,
    subtitle: data?.variants?.subtitle,
    text: data?.variants?.plainText,
    firstButton: data?.variants?.primaryButton,
    secondButton: data?.variants?.secondaryButton,
    formLinks: data?.variants?.formLinks,
    signInLink: data?.variants?.signInLink,
    form: data?.variants?.form,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(SignUpForm);
