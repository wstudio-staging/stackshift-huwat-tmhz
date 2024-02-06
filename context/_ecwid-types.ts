import { Dispatch, SetStateAction } from "react";
export interface EcwidTypes {
  products?: EProduct | null;
  addToBag?: (
    data: {
      id: number;
      quantity: number;
    },
    options: {
      [key: string]: any;
    }
  ) => void;
  addWishlist?: (id: number) => void | null;
  cart?: any;
  favorited?: boolean;
  favorites?: EProduct[] | null;
  fetchCollections?: (ids: number[]) => void;
  getPriceDisplay?: (amount: number) => number;
  id?: number | null;
  isAddingToBag?: boolean;
  isScript?: boolean;
  options?: {
    [key: string]: string;
  };
  price?: number;
  productCollection?: EProduct[];
  selected?: any;
  selectedOpt?: {
    [key: string]: any;
  }[];
  setCart?: Dispatch<SetStateAction<any>>;
  setId?: Dispatch<SetStateAction<number | null>>;
  setOptions?: Dispatch<SetStateAction<{ [key: string]: any }>>;
  setPrice?: Dispatch<SetStateAction<number>>;
  setSelectedOpt?: Dispatch<SetStateAction<any>>;
  setWishlist?: Dispatch<SetStateAction<Wishlist>>;
  wishlist?: Wishlist;
}

interface Wishlist {
  productIds: number[];
}

export interface EProduct {
  inStock: boolean;
  ribbon: {
    text: string;
    color: string;
  };
  id: number;
  defaultDisplayedPrice: number;
  options: EProductOptions[];
  [key: string]: any;
}

interface EProductOptions {
  choices: Choices[];
  defaultChoice: number;
  name: string;
  nameTranslated: TTranslated;
  required: boolean;
  type: string;
}

interface Choices {
  priceModifier: number;
  priceModifierType: string;
  text: string;
  textTranslated: TTranslated;
}

interface TTranslated {
  en: string;
}
