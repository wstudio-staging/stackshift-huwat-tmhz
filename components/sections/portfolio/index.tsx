import React from "react";
import dynamic from "next/dynamic";

import {
  SectionsProps,
  PortfoliosWithCategories,
  Portfolio,
  LabeledRoute,
} from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

export interface PortfolioProps {
  template?: any;
  caption?: string;
  title?: string;
  portfoliosWithCategory?: PortfoliosWithCategories[];
  portfolios?: Portfolio[];
  primaryButton?: LabeledRoute;
}

function Portfolio({ template, data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    template,
    caption: data?.variants?.subtitle,
    title: data?.variants?.title,
    portfoliosWithCategory: data?.variants?.portfoliosWithCategories,
    portfolios: data?.variants?.portfolios,
    primaryButton: data?.variants?.primaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Portfolio);
