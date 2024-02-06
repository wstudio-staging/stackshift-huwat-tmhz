import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { ConditionalLink } from "helper";
import { PortfolioProps } from ".";

function VariantA({ caption, title, portfoliosWithCategory }: PortfolioProps) {
  let portfolioLength = 8; //set initial number of portfolios to display for this variant
  const [activeTab, setActiveTab] = React.useState(
    portfoliosWithCategory?.[0]?.category
  ); //set the first index category as initial value

  //creates new array of items filtered by active tab
  const portfoliosPerCategory = portfoliosWithCategory?.filter(
    (data) => data?.category === activeTab
  );

  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-8 max-w-lg text-center md:mb-16">
            {caption && (
              <span className="font-bold text-webriq-darkblue">{caption}</span>
            )}
            {title && (
              <h1 className="font-heading mb-6 text-4xl font-bold lg:text-5xl">
                {title}
              </h1>
            )}
            {portfoliosWithCategory && (
              <div className="inline-flex flex-wrap rounded bg-white py-1 text-sm">
                {portfoliosWithCategory?.map((content, index) => (
                  <button
                    aria-label={content?.category}
                    key={index}
                    className={`mx-auto mb-1 w-auto px-4 py-2 ${
                      activeTab === content?.category
                        ? "rounded bg-gray-50 font-bold text-webriq-darkblue shadow transition duration-200 focus:outline-none"
                        : "rounded font-bold text-gray-700 transition duration-200 hover:bg-webriq-lightblue hover:text-webriq-blue hover:shadow focus:outline-none"
                    }`}
                    onClick={() => setActiveTab(content?.category)}
                  >
                    {content?.category}
                  </button>
                ))}
              </div>
            )}
          </div>
          {portfoliosPerCategory?.[0]?.content && (
            <div className="-mx-4 mb-8 flex flex-wrap">
              {portfoliosPerCategory?.[0]?.content
                ?.slice(0, portfolioLength)
                ?.map((content, index) => (
                  <div
                    className="mb-8 w-full px-4 sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4"
                    key={index}
                  >
                    <div className="relative mx-auto h-[256px] w-[352px] overflow-hidden rounded-lg">
                      {content?.mainImage?.image && (
                        <Image
                          className="h-full w-full object-cover"
                          src={urlFor(content?.mainImage?.image)}
                          sizes="100vw"
                          width={352}
                          height={256}
                          alt={
                            content?.mainImage?.alt ?? `portfolio-image${index}`
                          }
                        />
                      )}
                      <div className="absolute inset-0 z-10 flex items-center justify-center rounded-lg bg-gray-900 opacity-0 duration-300 hover:opacity-75">
                        {content?.primaryButton?.label && (
                          <ConditionalLink
                            ariaLabel={content?.primaryButton?.label}
                            link={content?.primaryButton}
                            className="inline-block py-2 px-4 border-2 border-gray-400 hover:border-white hover:opacity-100 text-gray-50 hover:bg-white hover:text-gray-900 transition duration-200 rounded-l-xl rounded-t-xl font-bold leading-loose"
                          >
                            {content?.primaryButton?.label}
                          </ConditionalLink>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
          {portfoliosPerCategory?.[0]?.primaryButton?.label && (
            <div className="text-center">
              <ConditionalLink
                ariaLabel={portfoliosPerCategory?.[0]?.primaryButton?.label}
                link={portfoliosPerCategory?.[0]?.primaryButton}
                className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose outline-none transition duration-200"
              >
                {portfoliosPerCategory?.[0]?.primaryButton?.label}
              </ConditionalLink>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantA);
