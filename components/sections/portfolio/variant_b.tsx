import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { ConditionalLink } from "helper";
import { PortfolioProps } from ".";

function VariantB({
  caption,
  title,
  portfolios,
  primaryButton,
}: PortfolioProps) {
  const portfolioLength = 6; //set initial number of portfolios to display for this variant

  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mb-16 flex flex-wrap items-center justify-center md:justify-between">
            <div className="text-center lg:text-left">
              {caption && (
                <span className="font-bold text-webriq-darkblue">
                  {caption}
                </span>
              )}
              {title && (
                <h1 className="font-heading text-4xl font-bold lg:text-5xl">
                  {title}
                </h1>
              )}
            </div>
            <div className="mt-5 hidden text-right md:mt-0 lg:mt-0 lg:block xl:mt-0">
              {primaryButton?.label && (
                <ConditionalLink
                  ariaLabel={primaryButton?.label}
                  link={primaryButton}
                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose transition duration-200"
                >
                  {primaryButton?.label}
                </ConditionalLink>
              )}
            </div>
          </div>
          <div className="-mx-4 mb-4 flex flex-wrap">
            {portfolios?.slice(0, portfolioLength).map((content, index) => (
              <div
                className="relative mb-4 w-full px-4 md:w-1/2 lg:w-1/3"
                key={index}
              >
                <div className="relative mx-auto overflow-hidden rounded md:mb-5 lg:mb-5 xl:mb-5">
                  {content?.mainImage?.image && (
                    <Image
                      className="h-80 w-full object-cover"
                      src={urlFor(content?.mainImage?.image)}
                      width={480}
                      height={320}
                      sizes="100vw"
                      alt={content?.mainImage?.alt ?? `portfolio-image${index}`}
                    />
                  )}

                  <div className="absolute inset-0 z-10 flex flex-col items-start rounded bg-gray-900 p-6 opacity-0 duration-300 hover:opacity-75">
                    <span className="text-webriq-lightblue">
                      {content?.dateAdded}
                    </span>
                    <p className="mb-auto font-bold text-white md:text-xl lg:text-2xl">
                      {content?.title}
                    </p>
                    {content?.primaryButton?.label && (
                      <ConditionalLink
                        ariaLabel={content?.primaryButton?.label}
                        link={content?.primaryButton}
                        className="inline-block py-2 px-4 border-2 border-gray-400 hover:border-webriq-darkblue bg-transparent text-gray-50 hover:bg-webriq-darkblue hover:text-white transition duration-200 rounded-l-xl rounded-t-xl font-bold leading-loose"
                      >
                        {content?.primaryButton?.label}
                      </ConditionalLink>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-5 block text-center md:mt-0 lg:mt-0 lg:hidden xl:mt-0">
            {primaryButton?.label && (
              <ConditionalLink
                ariaLabel={primaryButton?.label}
                link={primaryButton}
                className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose transition duration-200"
              >
                {primaryButton?.label}
              </ConditionalLink>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantB);
