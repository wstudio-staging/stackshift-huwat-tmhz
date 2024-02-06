import { memo, useEffect } from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { useEcwid } from "context/EcwidContext";
import Ribbon from "components/ecwid/Ribbon";

import { FeaturedProductsProps } from ".";

function VariantA({ title, featured }: FeaturedProductsProps) {
  const ecwid = useEcwid();
  const ids = featured && featured?.map((item) => item?.ecwidProductId);

  useEffect(() => {
    if (ids) {
      ecwid?.fetchCollections(ids);
    }
  }, []);

  return (
    <section className="relative py-20">
      <div className="container relative mx-auto px-4">
        {title && (
          <h1 className="mb-8 text-4xl font-bold md:mb-16 md:text-5xl">
            {title}
          </h1>
        )}
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
                    className="mb-10 w-full px-3 transition-all duration-700 md:w-1/2 md:hover:scale-110 lg:mb-6 lg:w-1/3"
                    key={index}
                  >
                    <a
                      href={`/products/${product?.slug?.current}`}
                      //className="flex flex-col gap-4"
                    >
                      <div className="relative">
                        <div className="absolute z-10">
                          <Ribbon data={featuredCollections} />
                        </div>
                        <div className="overflow-hidden">
                          {product?.productInfo?.images ? (
                            <Image
                              className="h-[357px] w-full object-cover"
                              sizes="100vw"
                              width={357}
                              height={357}
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
                              width={357}
                              height={357}
                              sizes="100vw"
                              src="https://cdn.sanity.io/images/9itgab5x/production/9523d40461371b7b4948456c57bb663bd8998c4a-500x362.png"
                              alt={`default image for product ${index + 1}`}
                            />
                          )}
                        </div>
                      </div>

                      <p className="text-xl font-bold hover:text-opacity-80 sm:text-2xl xl:text-3xl">
                        {product?.name}
                      </p>
                    </a>
                    <p className="font-heading text-lg font-bold text-white sm:text-xl">
                      <span className="mr-2 text-webriq-darkblue">
                        {featuredCollections?.defaultDisplayedPriceFormatted}
                      </span>
                    </p>
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
export default memo(VariantA);
