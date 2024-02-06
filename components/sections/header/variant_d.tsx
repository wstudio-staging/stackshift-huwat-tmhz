import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { ConditionalLink } from "helper";

import { HeaderProps } from ".";

function VariantD({
  template,
  mainImage,
  title,
  description,
  primaryButton,
  secondaryButton,
}: HeaderProps) {
  return (
    <section className="overflow-hidden">
      <div className="relative overflow-hidden bg-gray-50 py-20 md:pb-40 md:pt-20 lg:pb-40 lg:pt-28 xl:pb-40 xl:pt-28 2xl:pb-40 2xl:pt-28">
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap">
            <div className="flex w-full items-center px-4 lg:w-1/2">
              <div className="w-full text-center lg:text-left xl:text-left 2xl:text-left">
                <div className="relative mx-auto max-w-md">
                  <h1 className="mb-3 max-w-md text-3xl font-bold md:text-4xl lg:text-4xl xl:text-5xl 2xl:text-5xl">
                    {title && <span>{title}</span>}
                  </h1>
                </div>
                <div className="relative mx-auto max-w-md">
                  {description && (
                    <p className="mb-6 leading-loose text-gray-500">
                      {description}
                    </p>
                  )}
                  <div>
                    {primaryButton?.label && (
                      <ConditionalLink
                        ariaLabel={primaryButton?.label}
                        link={primaryButton}
                        className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
                      >
                        {primaryButton?.label}
                      </ConditionalLink>
                    )}
                    {secondaryButton?.label && (
                      <ConditionalLink
                        ariaLabel={secondaryButton?.label}
                        link={secondaryButton}
                        className="inline-block w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                      >
                        {secondaryButton?.label}
                      </ConditionalLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full px-4 lg:w-1/2 xl:w-1/2 2xl:w-1/2">
              {mainImage?.image?.asset?._ref && (
                <div className="top-0 my-12 h-full w-full rounded-none lg:absolute lg:my-0 lg:w-1/2 xl:absolute xl:my-0 xl:w-1/2 2xl:absolute 2xl:my-0 2xl:w-1/2">
                  <Image
                    src={urlFor(mainImage?.image)}
                    width={1050}
                    height={700}
                    sizes="100vw"
                    style={{ objectFit: "contain" }}
                    alt={mainImage?.alt ?? "header-main-image"}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
