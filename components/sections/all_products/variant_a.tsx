import { memo, useState, useEffect } from "react";
import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { AllProductsProps } from ".";
import { Collection, CollectionProduct } from "types";

function VariantA({ products }: AllProductsProps) {
  // get Ecwid product details
  const [productQuery, setProductQuery] = useState("");
  const [selectInput, setSelectInput] = useState(products?.[0]?.name); // initial value will be the first option from the list of collections
  const router = useRouter();

  useEffect(() => {
    // temp: on first render always return to the search page
    router.push("/search", undefined, { shallow: true });
  }, []);

  // reads the param from the router object to get the query
  useEffect(() => {
    if (router.query.q && typeof router.query.q === "string") {
      setProductQuery(router.query.q);
    }
  }, [router.query.q]);

  // get selected input
  const handleSelectInput = (e) => {
    setSelectInput(e.target.value);
  };

  const displayProducts = getFinalProducts(products, productQuery, selectInput);

  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="mb-5 flex flex-wrap items-center justify-between lg:-mx-4">
          <div className="mb-12 w-full lg:w-auto lg:px-4 xl:mb-0">
            <h1 className="font-heading text-2xl font-bold sm:text-4xl">
              {productQuery &&
                `Showing ${displayProducts?.length} results for "${productQuery}"`}
            </h1>
          </div>
          {!productQuery && products?.length > 1 && (
            <select
              className="rounded-md border border-gray-400 bg-white p-4 text-lg focus:border-webriq-blue focus:ring-webriq-blue"
              name="by-collection"
              value={selectInput}
              onChange={handleSelectInput}
            >
              <option value={selectInput}>{selectInput}</option>
              {products
                ?.filter((collection) => collection?.name !== selectInput)
                ?.map((collection, index) => (
                  <option value={collection?.name} key={index}>
                    {collection?.name}
                  </option>
                ))}
            </select>
          )}
        </div>
        {displayProducts && (
          <div className="-mx-3 flex flex-wrap">
            <div className="w-full px-3">
              {displayProducts?.length !== 0 ? (
                <div className="-mx-3 flex flex-wrap">
                  {displayProducts?.map((product, index) => (
                    <div
                      className="mb-8 w-full px-3 sm:w-1/2 lg:w-1/3 xl:w-1/4"
                      key={index}
                    >
                      <div className="mx-10">
                        <Link
                          className="mb-2 mt-6 block md:px-6"
                          href={`/products/${product?.slug?.current}`}
                        >
                          {product?.productInfo?.images ? (
                            <Image
                              className="mx-auto mb-3 h-56 w-full object-contain transition-all duration-700 hover:scale-110 sm:mb-5"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              src={urlFor(
                                product?.productInfo?.images?.[0]?.image
                              )}
                              width={350}
                              height={250}
                              alt={
                                product?.productInfo?.images?.[0]?.alt ??
                                `product-image-${index}`
                              }
                            />
                          ) : (
                            <Image
                              className="mx-auto mb-3 h-56 w-full object-contain transition-all duration-700 hover:scale-110 sm:mb-5"
                              src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              width={350}
                              height={250}
                              alt={
                                product?.productInfo?.images?.[0]?.alt ??
                                `product-image-${index}`
                              }
                            />
                          )}
                          {product?.name && (
                            <h2 className="text-center sm:text-left font-heading mb-2 text-lg sm:text-xl">
                              {product?.name}
                            </h2>
                          )}
                          {product?.price && (
                            <p className="text-center sm:text-left font-heading text-lg font-bold text-webriq-darkblue">
                              ${product?.price}
                            </p>
                          )}
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center">
                  <Image
                    className="mx-auto h-96 w-96 object-contain"
                    src="https://cdn.sanity.io/images/9itgab5x/production/951b1f5f26048374711fa6800e0b542528240432-982x638.png"
                    width={384}
                    height={384}
                    alt="no-query-results"
                  />
                  <span className="mb-6 text-4xl font-bold text-webriq-darkblue">
                    Whoops!
                  </span>
                  <p className="my-8 text-gray-700">
                    {`No results for query "${productQuery}". Kindly try another keyword.`}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
export default memo(VariantA);

const getFinalProducts = (
  products: Collection[],
  productQuery: string | undefined,
  activeTab: string | undefined
): CollectionProduct[] => {
  if (productQuery) {
    const arr: CollectionProduct[] = products
      .flatMap((obj) => obj.products || [])
      .reduce((uniqueProducts, product) => {
        const duplicateIndex = uniqueProducts.findIndex(
          (p) => p.ecwidProductId === product.ecwidProductId
        );
        if (duplicateIndex === -1) {
          uniqueProducts.push(product);
        }
        return uniqueProducts;
      }, [])
      .filter((product) =>
        product.name.toLowerCase().includes(productQuery.toLowerCase())
      );
    return arr;
  } else {
    const arr =
      products && products?.filter((product) => product?.name === activeTab);
    return arr[0].products;
  }
};
