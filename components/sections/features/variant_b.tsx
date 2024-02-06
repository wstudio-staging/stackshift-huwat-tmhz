import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { FeaturesProps } from ".";

function VariantB({
  caption,
  title,
  description,
  features,
  tags,
}: FeaturesProps) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="mb-12 w-full lg:mb-0 lg:w-1/2">
              <div className="max-w-md lg:mx-auto">
                {caption && (
                  <span className="font-bold text-webriq-darkblue">
                    {caption}
                  </span>
                )}
                {title && (
                  <h1 className="font-heading my-2 text-4xl font-bold lg:text-5xl">
                    {title}
                  </h1>
                )}
                {description && (
                  <p className="mb-6 leading-loose text-gray-500">
                    {description}
                  </p>
                )}
                <ul className="font-bold text-gray-500">
                  {tags &&
                    tags.map((item) => (
                      <li className="mb-4 flex" key={item}>
                        <svg
                          className="mr-2 h-6 w-6 text-webriq-babyblue"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{item}</span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="-mx-4 flex w-full flex-wrap lg:w-1/2">
              {features &&
                features?.map((feature, index) =>
                  index % 2 === 0 ? (
                    <div
                      className="mb-8 w-full px-4 md:w-1/2 lg:mb-0"
                      key={index}
                    >
                      <div className="mb-8 rounded bg-white py-6 pl-6 pr-4 shadow">
                        <span className="mb-4 inline-block rounded-lg bg-webriq-lightblue p-3">
                          {feature?.mainImage?.image && (
                            <Image
                              className="object-scale-down"
                              src={urlFor(feature?.mainImage?.image)}
                              width={40}
                              height={40}
                              alt={
                                feature?.mainImage?.alt ??
                                `features-image-${index}`
                              }
                            />
                          )}
                        </span>
                        <p className="font-heading mb-2 text-2xl font-bold">
                          {feature?.title}
                        </p>
                        <p className="leading-loose text-gray-500">
                          {feature?.plainText}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full px-4 md:w-1/2 lg:mt-12" key={index}>
                      <div className="mb-8 rounded-lg bg-white py-6 pl-6 pr-4 shadow lg:mb-0">
                        <span className="mb-4 inline-block rounded bg-webriq-lightblue p-3">
                          {feature?.mainImage?.image && (
                            <Image
                              className="object-scale-down"
                              src={urlFor(feature?.mainImage?.image)}
                              width={40}
                              height={40}
                              alt={
                                feature?.mainImage?.alt ??
                                `features-image-${index}`
                              }
                            />
                          )}
                        </span>
                        <p className="font-heading mb-2 text-2xl font-bold">
                          {feature?.title}
                        </p>
                        <p className="leading-loose text-gray-500">
                          {feature?.plainText}
                        </p>
                      </div>
                    </div>
                  )
                )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantB);
