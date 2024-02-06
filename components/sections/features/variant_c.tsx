import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { FeaturesProps } from ".";

function VariantC({ caption, title, features }: FeaturesProps) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-md text-center">
            {caption && (
              <span className="font-bold text-webriq-darkblue">{caption}</span>
            )}
            {title && (
              <h1 className="font-heading text-4xl font-bold lg:text-5xl">
                {title}
              </h1>
            )}
          </div>
          <div className="-mx-3 flex flex-wrap justify-start">
            {features &&
              features.map((feature, index) => {
                return (
                  <div className="mb-6 w-full px-3 lg:w-1/2" key={index}>
                    <div className="flex h-full flex-wrap rounded-lg bg-white p-6 shadow">
                      <div>
                        <span className="mb-4 mr-6 inline-block rounded-lg bg-webriq-lightblue p-3 md:p-5 lg:mb-0">
                          {feature?.mainImage?.image && (
                            <Image
                              className="object-scale-down"
                              src={urlFor(feature?.mainImage?.image)}
                              width={40}
                              height={40}
                              alt={
                                feature?.mainImage?.alt ?? "features-main-image"
                              }
                            />
                          )}
                        </span>
                      </div>
                      <div className="w-full lg:w-2/3">
                        <p className="font-heading mb-2 text-2xl font-bold">
                          {feature?.title}
                        </p>
                        <p className="text-gray-500">{feature?.plainText}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantC);
