import { memo, useState, useEffect } from "react";
import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { Collection, CollectionProduct } from "types";
import { AllProductsProps } from ".";

function VariantB({ products }: AllProductsProps) {
  const [productQuery, setProductQuery] = useState("");
  const [activeTab, setActiveTab] = useState(products?.[0]?.name); // initial value will be the first option from the list of collections

  const router = useRouter();

  useEffect(() => {
    // temp: on first render always return to the search page
    router.push("/search", undefined, { shallow: true });
  }, []);

  // reads the param from the router object to get the query
  useEffect(() => {
    if (router.query.q && typeof router.query.q == "string") {
      setProductQuery(router.query.q);
    }
  }, [router.query.q]);

  // set products array to display based on conditions met
  const displayProducts = getFinalProducts(products, productQuery, activeTab);

  return (
    <section className="pt-20">
      <div className="container mx-auto px-4 bg-white">
        <div className="flex flex-wrap -mx-3 mb-24">
          {!productQuery && (
            <div className="block w-full sm:w-1/3 lg:w-1/4 px-3">
              <div className="lg:mb-6 py-5 lg:py-10 px-6 lg:px-12 font-custom bg-gray-50">
                <h1 className="mb-8 text-2xl font-bold font-heading">
                  Category
                </h1>
                {products && (
                  <ul>
                    {products?.map((collection, index) => (
                      <li
                        className={`mb-4 ${
                          activeTab === collection?.name
                            ? " font-bold text-webriq-darkblue"
                            : "hover:text-webriq-blue"
                        }`}
                        key={index}
                      >
                        <button
                          className="lg:text-lg"
                          type="button"
                          onClick={() => setActiveTab(collection?.name)}
                        >
                          {collection?.name}
                        </button>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          )}
          {displayProducts && (
            <div className={`w-full ${!productQuery && "lg:w-3/4"} px-3`}>
              {productQuery && (
                <h1 className="text-4xl font-bold font-heading">
                  {`Showing ${displayProducts?.length} results for "${productQuery}"`}
                </h1>
              )}
              {displayProducts?.length !== 0 ? (
                <div className="flex flex-wrap -mx-3">
                  {displayProducts?.map((product, index) => (
                    <div
                      className={`w-full sm:w-1/2 ${
                        !productQuery ? "md:w-1/3" : "md:w-1/4"
                      } px-3 mb-8`}
                      key={index}
                    >
                      <div className="p-6">
                        <Link
                          className="block px-6 mt-6 mb-2 text-center"
                          href={`/products/${product?.slug?.current}`}
                        >
                          {product?.productInfo?.images ? (
                            <Image
                              className="mb-5 mx-auto h-56 w-full object-contain hover:scale-110 transition-all duration-700"
                              src={urlFor(
                                product?.productInfo?.images?.[0]?.image
                              )}
                              width={350}
                              height={250}
                              alt={
                                product?.productInfo?.images?.[0]?.alt ??
                                `product-image-${index + 1}`
                              }
                            />
                          ) : (
                            <Image
                              className="mb-5 mx-auto h-56 w-full object-contain hover:scale-110 transition-all duration-700"
                              src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                              width={350}
                              height={250}
                              alt={
                                product?.productInfo?.images?.[0]?.alt ??
                                `product-image-${index + 1}`
                              }
                            />
                          )}
                          {product?.name && (
                            <h2 className="mb-2 text-xl font-heading">
                              {product?.name}
                            </h2>
                          )}
                          {product?.price && (
                            <p className="text-lg font-bold font-heading text-webriq-darkblue">
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
                    className="w-96 h-96 object-contain mx-auto"
                    src="https://cdn.sanity.io/images/9itgab5x/production/951b1f5f26048374711fa6800e0b542528240432-982x638.png"
                    width={384}
                    height={384}
                    alt="no-query-results"
                  />
                  <span className="mb-6 text-4xl text-webriq-darkblue font-bold">
                    Whoops!
                  </span>
                  <p className="my-8 text-gray-700">
                    {`No results for query "${productQuery}". Kindly try another keyword.`}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default memo(VariantB);

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
