import React from "react";
import dynamic from "next/dynamic";

import {
  SectionsProps,
  Stripe,
  Plans,
  FormFields,
  ThankYouPage,
  LabeledRoute,
} from "types";

export interface PricingProps {
  caption: string;
  title: string;
  description: string;
  plans: Plans[];
  annualBilling: string;
  monthlyBilling: string;
  banner: any;
  formFields: FormFields[];
  formId: string;
  formName: string;
  formThankYouPage: ThankYouPage;
  stripePKey: string;
  stripeSKey: string;
  hashKey: string;
  apiVersion: string;
  NEXT_PUBLIC_APP_URL: string;
  block: any;
  signInLink: LabeledRoute;
}

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

const { NEXT_PUBLIC_APP_URL } = process.env;

function Pricing({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];
  let stripeAccount: Stripe;
  if (data.variants.selectStripeAccount) {
    stripeAccount = JSON.parse(data.variants.selectStripeAccount);
  }

  const props = {
    caption: data?.variants?.subtitle,
    title: data?.variants?.title,
    description: data?.variants?.description,
    plans: data?.variants?.plans,
    annualBilling: data?.variants?.annualBilling,
    monthlyBilling: data?.variants?.monthlyBilling,
    banner: data?.variants?.banner,
    formFields: data?.variants?.form?.fields,
    formId: data?.variants?.form?.id,
    formName: data?.variants?.form?.name,
    formThankYouPage: data?.variants?.form?.thankYouPage,
    stripePKey: stripeAccount?.stripePKey,
    stripeSKey: stripeAccount?.stripeSKey,
    hashKey: stripeAccount?.hashKey,
    apiVersion: stripeAccount?.apiVersion,
    NEXT_PUBLIC_APP_URL: NEXT_PUBLIC_APP_URL || "https://dxpstudio.webriq.com",
    block: data?.variants?.block,
    signInLink: data?.variants?.signInLink,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Pricing);
