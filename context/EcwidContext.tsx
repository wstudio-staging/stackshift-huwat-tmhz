import { createContext, useContext, useEffect, useState, useMemo } from "react";
import { ToastContainer, toast } from "react-toast";
import { sanityClient } from "lib/sanity.client";
import { includes } from "lodash";
import { EProduct, EcwidTypes } from "./_ecwid-types";
import { isEqual } from "lodash";
import { CollectionProduct } from "../types";

interface EcConfig {
  storefrontUrls?: {
    cleanUrls?: boolean;
    queryBasedCleanUrls?: boolean;
  };
  store_main_page_url?: string;
}

interface ProductBrowserScript {
  widgetType: "ProductBrowser";
  id: string;
  arg: string[];
}

declare global {
  interface Window {
    ec?: {
      config?: EcConfig;
    };
    ecwid_script_defer?: boolean;
    _xnext_initialization_scripts?: ProductBrowserScript[];
    Ecwid: any;
  }
}

const EcwidContext = createContext<EcwidTypes>({
  products: null,
  addToBag: null,
  addWishlist: () => {},
  cart: null,
  favorited: false,
  favorites: null,
  fetchCollections: () => {},
  getPriceDisplay: () => 0,
  id: null,
  isAddingToBag: false,
  isScript: false,
  options: {},
  price: 0,
  productCollection: null,
  selected: null,
  selectedOpt: null,
  setCart: () => {},
  setId: () => {},
  setOptions: () => {},
  setPrice: () => {},
  setSelectedOpt: () => {},
  setWishlist: () => {},
  wishlist: { productIds: [] },
});

export function EcwidContextProvider({ children }) {
  const [cart, setCart] = useState(null);
  const [products, setProducts] = useState<EcwidTypes["products"] | null>(null);
  const [isAddingToBag, setIsAddingToBag] =
    useState<EcwidTypes["isAddingToBag"]>(false);
  const [options, setOptions] = useState<EcwidTypes["options"]>({});
  const [selectedOpt, setSelectedOpt] = useState<EcwidTypes["selectedOpt"]>([]);
  const [selected, setSelected] = useState<EcwidTypes["selected"] | null>(null);
  const [price, setPrice] = useState<number>(0);
  const [wishlist, setWishlist] = useState<EcwidTypes["wishlist"]>({
    productIds: [],
  });
  const [favorited, setFavorited] = useState(false);
  const [id, setId] = useState(null);
  const [favorites, setFavorites] = useState<EcwidTypes["favorites"]>(null);
  const [productCollection, setProductCollection] = useState<
    EcwidTypes["productCollection"] | null
  >(null);
  const storageName = `PSecwid__${process.env.NEXT_PUBLIC_ECWID_STORE_ID}PSfavorites`;
  const [storage, setStorage] = useState(false);
  const [count, setCount] = useState(0);
  const [isScript, setIsScript] = useState<boolean>(false);

  useEffect(() => {
    const fetchProducts = () => {
      id !== null &&
        fetch(`/api/ecwid/products/${id}`)
          .then((res) => res.json())
          .then((response: { result: EProduct }) => {
            response && setProducts(response.result); // EProduct on types
          })
          .catch((error) => {
            console.error(error);
            // setProducts({ error });
          });
    };

    fetchProducts();
  }, [id]);

  useMemo(() => {
    let data = null;
    if (selectedOpt.length) {
      const variants = products && products?.combinations;

      const sortingArr = variants[0]?.options.map((i) => i.name); // This will be the guide for array arrangement
      let sortArrSelected = selectedOpt?.sort(
        (a, b) => sortingArr?.indexOf(a.name) - sortingArr?.indexOf(b.name)
      );

      const filterArrSelected = sortArrSelected.filter((items) =>
        includes(sortingArr, items.name)
      );

      const selectedVariants = variants.flatMap((items) => {
        const countOptions = items.options.length;
        const arrOptions = items.options.map((i) => ({
          name: i.name,
          value: i.value,
        }));

        if (isEqual(arrOptions, filterArrSelected)) {
          return items;
        }
      });

      const finalVariant = selectedVariants.find((i) => i);

      // Multiple variants
      const selectedCombinedVariant = variants
        .flatMap((items) => {
          const arrOptions = items.options.map((i) => ({
            name: i.name,
            value: i.value,
          }));
          if (isEqual(arrOptions, sortArrSelected)) {
            return items;
          }
        })
        .find((i) => i);

      // Single variant
      const selectedVariant = selectedOpt
        .flatMap((sel) => {
          const variant = variants.flatMap((vrt) => {
            return vrt.options.map((item) => {
              if (
                vrt.options.length < 2 &&
                isEqual({ name: item.name, value: item.value }, sel)
              ) {
                return vrt;
              }
            });
          });
          return variant;
        })
        .find((i) => i);

      // setSelected(selectedCombinedVariant);
      if (finalVariant) {
        setSelected(finalVariant);
      }

      data = selectedOpt;
    }

    return data;
  }, [selectedOpt, products]);

  useEffect(() => {
    function load_ecwid() {
      if (typeof Ecwid !== "undefined") {
        try {
          Ecwid.OnAPILoaded.add(function () {
            Ecwid.init();
            // Ecwid.Cart.get(function (cart) {
            //   setCart(cart);
            // });
            // Ecwid.OnCartChanged.add(function (cart) {
            //   setCart(cart);
            // });
          });
        } catch (error) {
          console.error();
        }

        // Ecwid.OnPageLoaded.add(function (page) {
        //   if (page.type === "CATEGORY" || page.type === "PRODUCT") {
        //     Ecwid.openPage("cart");
        //   }
        //   console.log("page", page.type);
        // });
      } else {
        setCount((prev) => prev + 1);
      }
    }

    window.ec = window.ec || {};
    window.ec.config = window.ec.config || {};
    window.ec.config.storefrontUrls = window.ec.config.storefrontUrls || {};

    // add pages to implement clean URLs for SEO purposes
    if (["/cart"].includes(location.pathname)) {
      window.ec.config.storefrontUrls.cleanUrls = true;
      window.ec.config.storefrontUrls.queryBasedCleanUrls = true;
    }

    // window.ec.config.baseUrl = "/store";
    window.ec.config.store_main_page_url = `${process.env.NEXT_PUBLIC_SITE_URL}/cart`;

    window.ecwid_script_defer = true;
    // window.ecwid_dynamic_widgets = false;

    if (location.pathname === "/cart") {
      window._xnext_initialization_scripts = [
        {
          widgetType: "ProductBrowser",
          id: "ecwid-shop-store",
          arg: ["id=ecwid-shop-store"],
        },
      ];
    }

    load_ecwid();
  }, []);

  useEffect(() => {
    if (typeof window !== undefined) {
      if (localStorage.getItem(storageName)) {
        setStorage(true);
        let ids = JSON.parse(localStorage.getItem(storageName));
        if (ids.productIds.length > 0) {
          setWishlist((prev) => ({
            ...prev,
            productIds: ids.productIds,
          }));
          setFavorited(includes(ids.productIds, id) ? true : false);
        }
      }
    }
  }, [id, storage]);

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoriteIds = localStorage.getItem(storageName);
      const favorites = JSON.parse(favoriteIds);

      // only run functions when favorite product ids are available
      if (favorites?.productIds) {
        try {
          const query =
            '*[_type=="mainProduct" && ecwidProductId in $ids && !(_id in path("drafts.**"))]';
          const params = {
            ids: favorites?.productIds,
          };

          const studio: CollectionProduct[] = await sanityClient
            .fetch(query, params)
            .then((result) => result);

          const productReq = await fetch(
            `/api/ecwid/products/search?productIds=${favorites.productIds}`
          );

          interface ProductRes {
            items: EProduct[];
            count: number;
            limit: number;
            offset: number;
            total: number;
          }

          const productRes: ProductRes = await productReq.json();

          const favoriteProducts = studio
            ?.map((item) => {
              return productRes.items
                ?.map((prod) => {
                  if (prod.id === item.ecwidProductId) {
                    return {
                      ...item,
                      ...prod,
                      ecwidId: prod.id,
                      price: prod.defaultDisplayedPriceFormatted,
                    };
                  }
                })
                .flat();
            })
            .flat()
            .filter((item) => item !== undefined);
          setFavorites(favoriteProducts);
        } catch (error) {
          console.log(error);
        }
      }
    };

    fetchFavorites();
  }, [storage]);

  // useEffect(() => {
  //   if (typeof Ecwid !== "undefined") {
  //     Ecwid.OnPageLoaded.add(function (page) {
  //       console.log("pagezzz", page.type);
  //       if (page.type === "CART") {
  //         let elem = document.querySelector(".ec-cart--empty button");
  //         elem.addEventListener("click", (e) => {
  //           e.preventDefault();
  //           window.location.href = "/collections/all-products";
  //         });
  //       }
  //     });
  //   } else {
  //     setCount((prev) => prev + 1);
  //   }
  // }, []);

  const fetchCollections = async (ids: number[]) => {
    const productReq: { items: EProduct[]; [key: string]: any } = await fetch(
      `/api/ecwid/products/search?productIds=${ids}`
    ).then((res) => res.json());

    setProductCollection(productReq.items);
  };

  const getPriceDisplay = (amount) => {
    let priceFormated = `$${amount}`;
    if (typeof Ecwid !== "undefined") {
      Ecwid.OnAPILoaded.add(function () {
        priceFormated = Ecwid.formatCurrency(amount);
      });
    }

    return priceFormated;
  };

  const addToBag = (
    data: {
      id: number;
      quantity: number;
    },
    options: {
      [key: string]: any;
    }
  ) => {
    setIsAddingToBag(true);

    interface PayloadType {
      callback: (success: any) => void;
      id: number;
      quantity: number;
      options?: { [key: string]: any };
    }

    let payload: PayloadType = {
      ...data,
      callback: function (success) {
        if (success) {
          toast.success("Product was successfully added to your cart");
        } else {
          toast.error("There was an error adding this product to your cart.");
        }
        setIsAddingToBag(false);
      },
    };

    if (options && Object.keys(options).length) payload.options = options;

    setTimeout(() => {
      if (typeof Ecwid != "undefined") {
        Ecwid.Cart.addProduct(payload);
      }
    }, 1000);
  };

  const addWishlist = (id: number) => {
    const productIds = wishlist?.productIds;

    const productId = includes(productIds, id)
      ? productIds.filter((i) => i !== id)
      : productIds.concat(id);

    setWishlist((prev) => ({
      ...prev,
      productIds: productId,
    }));

    setFavorited(includes(productIds, id) ? false : true);

    localStorage.setItem(
      storageName,
      JSON.stringify({ productIds: productId })
    );
  };

  return (
    <>
      <EcwidContext.Provider
        value={{
          cart,
          setCart,
          products,
          options,
          setOptions,
          price,
          setPrice,
          addToBag,
          isAddingToBag,
          getPriceDisplay,
          setWishlist,
          wishlist,
          setId,
          id,
          favorited,
          addWishlist,
          favorites,
          fetchCollections,
          productCollection,
          setSelectedOpt,
          selectedOpt,
          selected,
          isScript,
        }}
      >
        {children}
      </EcwidContext.Provider>
      <div style={{ zIndex: 1 }}>
        <ToastContainer delay={5000} position="top-center" />
      </div>
    </>
  );
}

export function useEcwid() {
  return useContext(EcwidContext);
}
