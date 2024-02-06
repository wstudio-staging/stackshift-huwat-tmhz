import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { ConditionalLink } from "helper";
import { PortfolioProps } from ".";

function VariantC({
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
            <div className="mt-5 hidden md:mt-0 lg:mt-0 lg:block xl:mt-0">
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
            {portfolios?.slice(0, portfolioLength)?.map((content, index) => (
              <div
                className="relative mb-8 w-full px-4 md:w-1/2 lg:w-1/3"
                key={index}
              >
                {content?.mainImage?.image && (
                  <div className="h-full overflow-hidden rounded bg-white">
                    <Image
                      className="h-[320px] w-[480px] object-cover"
                      src={urlFor(content?.mainImage?.image)}
                      width={480}
                      height={320}
                      sizes="(min-width: 1540px) 480px, (min-width: 1280px) 395px, (min-width: 1040px) 309px, (min-width: 780px) 352px, (min-width: 560px) 480px, 88.33vw"
                      alt={content?.mainImage?.alt ?? `portfolio-image${index}`}
                    />
                    <div className="p-6">
                      <span className="text-gray-500">
                        {content?.dateAdded}
                      </span>
                      <p className="font-heading mb-4 text-2xl font-bold">
                        {content?.title}
                      </p>
                      {content?.primaryButton?.label && (
                        <ConditionalLink
                          ariaLabel={content?.primaryButton?.label}
                          link={content?.primaryButton}
                          className="flex text-webriq-darkblue hover:text-webriq-blue font-bold"
                        >
                          {content?.primaryButton?.label}
                        </ConditionalLink>
                      )}
                    </div>
                  </div>
                )}
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

export default React.memo(VariantC);
