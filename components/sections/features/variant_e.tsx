import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { FeaturesProps } from ".";

function VariantE({ featuredItems }: FeaturesProps) {
  //for image carousel
  let [item, setItem] = React.useState(0); // Initial image index value

  const slider = (action) => {
    action === "next"
      ? item !== featuredItems.length - 1
        ? setItem((prevState) => prevState + 1)
        : setItem(0)
      : item >= 1
      ? setItem((prevState) => prevState - 1)
      : setItem(featuredItems.length - 1);
  };

  return (
    <section>
      <div className="radius-for-skewed overflow-x-auto bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="relative flex">
            <div className="order-0 absolute left-0 z-40 -mx-3 mt-20 items-center md:mt-40 lg:mt-60 xl:-mx-6 xl:flex">
              {featuredItems?.length >= 2 && (
                <button
                  aria-label="Show Previous Feature"
                  className="z-10 rounded-l-xl rounded-t-xl bg-webriq-blue p-4 text-white hover:bg-webriq-darkblue focus:outline-none"
                  onClick={() => slider("prev")}
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    ></path>
                  </svg>
                </button>
              )}
            </div>
            <div className="order-1 ml-auto w-full xl:w-4/5">
              {featuredItems?.[item]?.mainImage?.image?.asset?._ref && (
                <div className="mx-auto overflow-hidden rounded-md md:max-w-xl xl:max-w-4xl">
                  <Image
                    className="relative object-cover"
                    src={urlFor(featuredItems?.[item]?.mainImage?.image)}
                    sizes="100vw"
                    width={896}
                    height={575}
                    alt={
                      featuredItems?.[item]?.mainImage?.alt ??
                      `features-image-${item}`
                    }
                  />
                </div>
              )}
              <div className="left-0 top-0 mx-auto max-w-xl rounded border-gray-50 bg-white p-6 text-center shadow md:mt-12 md:p-10 lg:mt-12 lg:p-10 xl:absolute xl:mx-0 xl:mt-20 xl:py-24">
                <span className="lg:text-md text-xs font-bold text-webriq-darkblue md:text-sm xl:text-lg">
                  {featuredItems?.[item]?.subtitle &&
                    featuredItems?.[item]?.subtitle}
                </span>
                <h1 className="font-heading text-lg font-bold md:mt-5 md:text-3xl lg:mt-5 lg:text-5xl">
                  {featuredItems?.[item]?.title && featuredItems?.[item]?.title}
                </h1>
                <p className="mx-auto text-xs leading-loose text-gray-500 md:mt-5 md:text-sm lg:mt-5 lg:text-sm">
                  {featuredItems?.[item]?.description &&
                    featuredItems?.[item]?.description}
                </p>
              </div>
            </div>
            <div className="absolute right-0 order-2 -mx-3 mt-20 items-center md:mt-40 lg:mt-60 xl:-mx-6 xl:flex">
              {featuredItems?.length >= 2 && (
                <button
                  aria-label="Show Next Feature"
                  className="rounded-r-xl rounded-t-xl bg-webriq-blue p-4 text-white hover:bg-webriq-darkblue focus:outline-none"
                  onClick={() => slider("next")}
                >
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    ></path>
                  </svg>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantE);
