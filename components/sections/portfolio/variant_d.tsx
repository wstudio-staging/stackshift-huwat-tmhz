import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { ConditionalLink } from "helper";
import { PortfolioProps } from ".";

function VariantD({ caption, title, portfoliosWithCategory }: PortfolioProps) {
  let portfoliosPerPage = 6,
    count = 0; // default number of portfolios per category
  const [activeTab, setActiveTab] = React.useState(
    portfoliosWithCategory?.[0]?.category
  ); // set the first index category as initial value

  // group portfolios per category
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
                    onClick={() => setActiveTab(content?.category)}
                    className={`mx-auto mb-1 w-auto px-4 py-2 ${
                      activeTab === content?.category
                        ? "rounded bg-gray-50 font-bold text-webriq-darkblue shadow transition duration-200 focus:outline-none"
                        : "rounded font-bold text-gray-500 transition duration-200 hover:bg-webriq-lightblue hover:text-webriq-blue hover:shadow focus:outline-none"
                    }`}
                  >
                    {content?.category}
                  </button>
                ))}
              </div>
            )}
          </div>
          <div className="-mx-4 mb-12 sm:flex">
            <div className="mb-8 flex w-full flex-wrap lg:mb-0 lg:w-1/2">
              {portfoliosPerCategory?.[0]?.content
                ?.slice(count, count + 2)
                ?.map((content) => (
                  <div
                    className="mb-8 w-full px-4 lg:w-1/2"
                    key={content?._key}
                  >
                    {content?.mainImage?.image && (
                      <div className="relative overflow-hidden rounded">
                        <Image
                          className="h-64 w-full object-cover"
                          src={urlFor(content?.mainImage?.image)}
                          sizes="100vw"
                          width={352}
                          height={280}
                          alt={`portfolio-image-${content?._key}`}
                        />
                        <div className="absolute inset-0 z-10 justify-center rounded-lg bg-gray-900 p-6 opacity-0 duration-300 hover:opacity-80">
                          <div className="my-auto max-w-md text-xs">
                            <span className="font-bold text-webriq-blue">
                              {content?.subtitle}
                            </span>
                            <h1 className="my-5 font-bold text-white">
                              {content?.title}
                            </h1>
                            <div className="my-5 max-w-xs">
                              <p className="mb-6 text-gray-500">
                                {content?.description}
                              </p>
                              {content?.primaryButton?.label && (
                                <ConditionalLink
                                  ariaLabel={content?.primaryButton?.label}
                                  link={content?.primaryButton}
                                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose"
                                >
                                  {content?.primaryButton?.label}
                                </ConditionalLink>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              {portfoliosPerCategory?.[0]?.content
                ?.slice(count + 2, count + 3)
                ?.map((content) => (
                  <div
                    className="mb-8 w-full px-4 lg:h-full lg:w-full lg:px-4 xl:px-4"
                    key={content?._key}
                  >
                    {content?.mainImage?.image && (
                      <div className="relative overflow-hidden rounded">
                        <Image
                          className="h-128 w-full object-cover"
                          src={urlFor(content?.mainImage?.image)}
                          sizes="100vw"
                          width={352}
                          height={256}
                          alt={`portfolio-image-${content?._key}`}
                        />
                        <div className="absolute inset-0 z-10 h-full justify-center rounded-lg bg-gray-900 p-6 opacity-0 duration-300 hover:opacity-80">
                          <div className="my-auto max-w-md text-xs lg:mt-10 lg:text-sm xl:mt-10 xl:text-sm 2xl:mt-10 2xl:text-sm">
                            <span className="font-bold text-webriq-blue">
                              {content?.subtitle}
                            </span>
                            <h1 className="my-5 font-bold text-white lg:text-4xl xl:text-4xl 2xl:text-4xl">
                              {content?.title}
                            </h1>
                            <div className="my-5 max-w-sm">
                              <p className="mb-6 text-gray-500">
                                {content?.description}
                              </p>
                              {content?.primaryButton?.label && (
                                <ConditionalLink
                                  ariaLabel={content?.primaryButton?.label}
                                  link={content?.primaryButton}
                                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose"
                                >
                                  {content?.primaryButton?.label}
                                </ConditionalLink>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
            </div>
            <div className="w-full lg:w-1/2">
              {portfoliosPerCategory?.[0]?.content
                ?.slice(count + 3, count + 4)
                ?.map((content) => (
                  <div
                    className="mb-8 w-full px-4 lg:w-full lg:px-4 xl:w-full xl:px-4"
                    key={content?._key}
                  >
                    {content?.mainImage?.image && (
                      <div className="relative overflow-hidden rounded">
                        <Image
                          className="h-128 w-full object-cover"
                          src={urlFor(content?.mainImage?.image)}
                          sizes="100vw"
                          width={352}
                          height={256}
                          alt={`portfolio-image-${content?._key}`}
                        />
                        <div className="absolute inset-0 z-10 h-full justify-center rounded-lg bg-gray-900 p-6 opacity-0 duration-300 hover:opacity-80 ">
                          <div className="my-auto max-w-md text-xs lg:mt-10 lg:text-sm xl:mt-10 xl:text-sm 2xl:mt-10 2xl:text-sm">
                            <span className="font-bold text-webriq-blue">
                              {content?.subtitle}
                            </span>
                            <h1 className="my-5 font-bold text-white lg:text-4xl xl:text-4xl 2xl:text-4xl">
                              {content?.title}
                            </h1>
                            <div className="my-5 max-w-xs">
                              <p className="mb-6 text-gray-500">
                                {content?.description}
                              </p>
                              {content?.primaryButton?.label && (
                                <ConditionalLink
                                  ariaLabel={content?.primaryButton?.label}
                                  link={content?.primaryButton}
                                  className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose"
                                >
                                  {content?.primaryButton?.label}
                                </ConditionalLink>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              <div className="flex flex-wrap">
                {portfoliosPerCategory?.[0]?.content
                  ?.slice(count + 4, portfoliosPerPage)
                  ?.map((content) => (
                    <div
                      className="relative mb-8 w-full px-4 lg:mb-0 lg:w-1/2"
                      key={content?._key}
                    >
                      {content?.mainImage?.image && (
                        <div className="relative overflow-hidden rounded">
                          <Image
                            className="h-64 w-full object-cover"
                            src={urlFor(content?.mainImage?.image)}
                            width={352}
                            height={280}
                            sizes="100vw"
                            alt={`portfolio-image${content?._key}`}
                          />
                          <div className="absolute inset-0 z-10 h-full justify-center rounded-lg bg-gray-900 p-6 opacity-0 duration-300 hover:opacity-80 ">
                            <div className="my-auto max-w-md text-xs">
                              <span className="font-bold text-webriq-blue">
                                {content?.subtitle}
                              </span>
                              <h1 className="my-5 font-bold text-white">
                                {content?.title}
                              </h1>
                              <div className="my-5 max-w-xs">
                                <p className="mb-6 text-gray-500">
                                  {content?.description}
                                </p>
                                {content?.primaryButton?.label && (
                                  <ConditionalLink
                                    ariaLabel={content?.primaryButton?.label}
                                    link={content?.primaryButton}
                                    className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose"
                                  >
                                    {content?.primaryButton?.label}
                                  </ConditionalLink>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </div>
          </div>
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

export default React.memo(VariantD);
