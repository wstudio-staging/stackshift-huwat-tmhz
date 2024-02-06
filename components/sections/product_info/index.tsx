import { memo, useMemo, useEffect } from "react";
import { TypedObject } from "sanity";
import dynamic from "next/dynamic";
import { useEcwid } from "context/EcwidContext";

import { SectionsProps, Images, ProductDetail, SocialLink } from "types";
import { EProduct } from "context/_ecwid-types";

interface ProductIndexProps extends SectionsProps {
  product?: {
    name: string;
    ecwidProductId: number;
    price: string;
    description: TypedObject | TypedObject[] | null;
  };
}

export interface ProductInfoProps {
  subtitle: string;
  images: Images[];
  productDetails: ProductDetail[];
  socialLinks: SocialLink[];
  btnLabel: string;
  product: {
    name: string;
    ecwidProductId: number;
    price: string;
    description: string;
  };
  ecwidProduct: EProduct;
  variantSku: any;
  getPriceDisplay: () => number;
}

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function ProductInfo({ data, product }: ProductIndexProps) {
  const ecwid = useEcwid();
  const ecwid_products = ecwid?.products || null;
  const price = ecwid?.price || 0;
  const getPriceDisplay = ecwid?.getPriceDisplay;

  const variantSku = ecwid.selected;

  const variant = data?.variant;
  const Variant = Variants?.[variant];

  useEffect(() => {
    if (product?.ecwidProductId) {
      ecwid.setId(product?.ecwidProductId);
    }
  }, [ecwid, product?.ecwidProductId]);

  const ecwidProduct = useMemo(() => {
    let data: EProduct | null = null;
    if (product?.ecwidProductId && ecwid_products) {
      data = ecwid_products;
    }
    return data;
  }, [ecwid_products, product]);

  const props = {
    subtitle: data?.variants?.subtitle,
    images: data?.variants?.images,
    productDetails: data?.variants?.productDetails,
    socialLinks: data?.variants?.socialLinks,
    btnLabel: data?.variants?.btnLabel,
    product,
    ecwidProduct,
    variantSku,
    getPriceDisplay: () => getPriceDisplay(price),
  };

  return Variant ? <Variant {...props} /> : null;
}
export default memo(ProductInfo);
