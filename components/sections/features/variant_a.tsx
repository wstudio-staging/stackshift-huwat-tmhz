import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";

import { FeaturesProps } from ".";

function VariantA({ caption, title, features }: FeaturesProps) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-md text-center">
            {caption && (
              <span className="font-bold text-webriq-darkblue">{caption}</span>
            )}
            {title && (
              <h1 className="text-4xl font-bold md:text-5xl">{title}</h1>
            )}
          </div>
          <div className="-mx-4 flex flex-wrap">
            {features &&
              features?.map((feature, index) => {
                return (
                  <div
                    className="mb-12 mt-16 w-full px-4 md:w-1/2 lg:mb-0 lg:w-1/4"
                    key={index}
                  >
                    <span className="mb-4 inline-block rounded bg-webriq-lightblue p-3 text-webriq-blue md:mb-6">
                      {feature?.mainImage?.image && (
                        <Image
                          className="object-scale-down"
                          src={urlFor(feature?.mainImage?.image)}
                          width={40}
                          height={40}
                          alt={
                            feature?.mainImage?.alt ?? `features-image-${index}`
                          }
                        />
                      )}
                    </span>

                    {feature?.title && (
                      <p className="font-heading mb-4 text-2xl font-bold">
                        {feature?.title}
                      </p>
                    )}
                    {feature?.plainText && (
                      <p className="leading-loose text-gray-500">
                        {feature?.plainText}
                      </p>
                    )}
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantA);
