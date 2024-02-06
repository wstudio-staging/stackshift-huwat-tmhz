import React from "react";
import dynamic from "next/dynamic";

import { SectionsProps, BlogPost, LabeledRoute } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

//inferred type on props inside the component, use for variants
export interface BlogProps {
  subtitle?: string;
  title?: string;
  posts?: BlogPost[];
  primaryButton?: LabeledRoute;
}

function Blog({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    subtitle: data?.variants?.subtitle,
    title: data?.variants?.title,
    posts: data?.variants?.blogPosts,
    primaryButton: data?.variants?.primaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Blog);
