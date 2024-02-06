import React from "react";
import dynamic from "next/dynamic";

import { SectionsProps, AskedQuestion, FaqsWithCategory } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

export interface FAQProps {
  subtitle?: string;
  title?: string;
  faqs?: AskedQuestion[];
  faqsWithCategories?: FaqsWithCategory[];
}

function FAQs({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    subtitle: data?.variants?.subtitle,
    title: data?.variants?.title,
    faqs: data?.variants?.askedQuestions,
    faqsWithCategories: data?.variants?.faqsWithCategory,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(FAQs);
