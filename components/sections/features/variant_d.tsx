import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { FeaturesProps } from ".";

function VariantD({ caption, title, features }: FeaturesProps) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-8 max-w-md text-center">
            {caption && (
              <span className="font-bold text-webriq-darkblue">{caption}</span>
            )}
            {title && (
              <h1 className="font-heading text-4xl font-bold lg:text-5xl">
                {title}
              </h1>
            )}
          </div>
          <div className="-mx-4 flex flex-wrap justify-center">
            {features.map((feature, index) => (
              <div className="mt-8 w-full px-4 lg:mb-0 lg:w-1/3" key={index}>
                <div className="h-full rounded bg-white px-6 py-12 text-center shadow">
                  <span className="mb-6 inline-block rounded-lg bg-webriq-lightblue p-3 md:p-5">
                    {feature?.mainImage?.image?.asset?._ref && (
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
                  <p className="font-heading mb-4 px-8 text-2xl font-bold">
                    {feature?.title}
                  </p>
                  <p className="text-gray-500">{feature?.plainText}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantD);
