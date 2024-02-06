import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { ConditionalLink } from "helper";
import { FeaturesProps } from ".";

function VariantF({
  caption,
  title,
  description,
  images,
  primaryButton,
}: FeaturesProps) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="mb-12 flex w-full px-4 lg:mb-0 lg:w-1/2">
              <div className="max-w-md">
                <span className="font-bold text-webriq-darkblue">
                  {caption}
                </span>
                {title && (
                  <h1 className="font-heading mb-6 text-4xl font-bold lg:text-5xl">
                    {title}
                  </h1>
                )}
                {description && (
                  <div className="mb-6 max-w-sm">
                    <p className="leading-loose text-gray-500">{description}</p>
                  </div>
                )}
                {primaryButton?.label && (
                  <div className="flex flex-wrap lg:-ml-5">
                    <ConditionalLink
                      link={primaryButton}
                      className="lg:w-auto py-2 px-6 leading-loose lg:ml-5 text-gray-50 font-bold bg-webriq-darkblue hover:bg-webriq-blue transition duration-200 rounded-l-xl rounded-t-xl"
                      ariaLabel={primaryButton?.label}
                    >
                      {primaryButton?.label}
                    </ConditionalLink>
                  </div>
                )}
              </div>
            </div>
            {images && (
              <div className="w-full lg:w-1/2">
                <div className="mb-4 items-end lg:flex lg:flex-wrap xl:flex xl:flex-wrap 2xl:flex 2xl:flex-wrap">
                  <div className="mb-4 h-full px-3 lg:mb-0 lg:w-2/3 xl:mb-0 xl:w-2/3 2xl:mb-0 2xl:w-2/3">
                    {images?.[0]?.image && (
                      <div className="overflow-hidden rounded">
                        <Image
                          className="h-[269px] w-full object-cover"
                          src={urlFor(images[0]?.image)}
                          sizes="100vw"
                          width={356}
                          height={192}
                          alt={images[0]?.alt ?? "features-image-1"}
                        />
                      </div>
                    )}
                  </div>
                  <div className="h-full px-3 lg:w-1/3 xl:w-1/3 2xl:w-1/3">
                    {images?.[1]?.image && (
                      <div className="overflow-hidden rounded">
                        <Image
                          className="h-auto w-full object-cover"
                          src={urlFor(images[1]?.image)}
                          sizes="100vw"
                          width={166}
                          height={128}
                          alt={images[1]?.alt ?? "features-image-2"}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="mb-4 items-start lg:flex lg:flex-wrap xl:flex xl:flex-wrap 2xl:flex 2xl:flex-wrap">
                  <div className="mb-4 h-full px-3 lg:mb-0 lg:w-1/3 xl:mb-0 xl:w-1/3 2xl:mb-0 2xl:w-1/3">
                    {images?.[2]?.image && (
                      <div className="overflow-hidden rounded">
                        <Image
                          className="h-[269px] w-full object-cover lg:h-[126px]"
                          src={urlFor(images[2]?.image)}
                          width={166}
                          height={128}
                          sizes="100vw"
                          alt={images[2]?.alt ?? "features-image-3"}
                        />
                      </div>
                    )}
                  </div>
                  <div className="h-full px-3 lg:w-2/3 xl:w-2/3 2xl:w-2/3">
                    {images?.[3]?.image && (
                      <div className="overflow-hidden rounded">
                        <Image
                          className="h-auto w-full object-cover"
                          src={urlFor(images[3]?.image)}
                          width={356}
                          height={192}
                          sizes="100vw"
                          alt={images[3]?.alt ?? "features-image-4"}
                        />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantF);
