import { memo, useEffect } from "react";
import { urlFor } from "lib/sanity";
import { useEcwid } from "context/EcwidContext";
import Ribbon from "components/ecwid/Ribbon";
import Image from "next/image";

import { FeaturedProductsProps } from ".";

function VariantB({ title, featured }: FeaturedProductsProps) {
  const ecwid = useEcwid();
  const ids = featured && featured?.map((item) => item?.ecwidProductId);

  useEffect(() => {
    if (ecwid && ids) {
      ecwid?.fetchCollections(ids);
    }
  }, []);

  return (
    <section className="overflow-x-hidden bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="mb-20 flex flex-wrap justify-between md:mb-16">
          {title && <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>}
        </div>
        {featured && (
          <div className="-mx-3 flex flex-wrap">
            {featured?.map((product, index) => {
              let items = [];
              ecwid?.productCollection &&
                ecwid?.productCollection?.find((prod) => {
                  if (prod?.id === product?.ecwidProductId) {
                    items?.push({ ...prod, ...product });
                  }
                });

              return (
                items?.length > 0 &&
                items?.map((featuredCollections) => (
                  <div
                    className="mb-10 w-full px-3 md:w-1/2 lg:mb-6 lg:w-1/3 xl:w-1/4"
                    key={index}
                  >
                    <div className="h-full w-full bg-white shadow-md transition-all duration-700 md:hover:scale-110">
                      <a href={`/products/${product?.slug?.current}`}>
                        <div className="absolute z-10">
                          <Ribbon data={featuredCollections} />
                        </div>

                        <div className="overflow-hidden">
                          {product?.productInfo?.images ? (
                            <Image
                              className="h-[320px] w-full object-cover"
                              sizes="100vw"
                              width={294}
                              height={320}
                              src={urlFor(
                                product?.productInfo?.images?.[0]?.image
                              )}
                              alt={
                                product?.productInfo?.images?.[0]?.alt ??
                                `product-image-${index}`
                              }
                            />
                          ) : (
                            <Image
                              className="h-[320px] w-full object-cover"
                              sizes="100vw"
                              width={294}
                              height={320}
                              src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                              alt={`default image for product ${index + 1}`}
                            />
                          )}
                        </div>
                      </a>
                      <div className="mt-8 break-words px-6 pb-6">
                        {product?.name && (
                          <a
                            className="text-xl font-bold sm:text-2xl"
                            href={`/products/${product?.slug?.current}`}
                          >
                            {product?.name}
                          </a>
                        )}
                        <p className="font-heading text-lg font-bold">
                          <span className="text-webriq-darkblue">
                            {
                              featuredCollections?.defaultDisplayedPriceFormatted
                            }
                          </span>
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
export default memo(VariantB);
