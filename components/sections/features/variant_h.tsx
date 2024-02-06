import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { FeaturesProps } from ".";

function VariantH({ caption, title, features, images }: FeaturesProps) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="mb-12 w-full px-4 lg:mb-0 lg:w-1/2">
              <div className="max-w-md">
                <span className="font-bold text-webriq-darkblue">
                  {caption && caption}
                </span>
                <h1 className="font-heading mb-6 text-4xl font-bold lg:text-5xl">
                  {title && title}
                </h1>
                <ul>
                  {features?.[0] && (
                    <li className="mb-4 flex">
                      <div>
                        <svg
                          className="mr-3 h-8 w-8 text-webriq-darkblue"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                      </div>
                      <div className="max-w-xs">
                        <p className="font-heading font-bold">
                          {features?.[0]?.title}
                        </p>
                        <p className="leading-loose text-gray-500">
                          {features?.[0]?.plainText}
                        </p>
                      </div>
                    </li>
                  )}
                  {features?.[1] && (
                    <li className="mb-4 flex">
                      <div>
                        <svg
                          className="mr-3 h-8 w-8 text-webriq-darkblue"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                      </div>
                      <div className="max-w-xs">
                        <p className="font-heading font-bold">
                          {features?.[1]?.title}
                        </p>
                        <p className="leading-loose text-gray-500">
                          {features?.[1]?.plainText}
                        </p>
                      </div>
                    </li>
                  )}
                  {features?.[2] && (
                    <li className="flex">
                      <div>
                        <svg
                          className="mr-3 h-8 w-8 text-webriq-darkblue"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                          />
                        </svg>
                      </div>
                      <div className="max-w-xs">
                        <p className="font-heading font-bold">
                          {features?.[2]?.title}
                        </p>
                        <p className="leading-loose text-gray-500">
                          {features?.[2]?.plainText}
                        </p>
                      </div>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            {images && (
              <div className="w-full items-center px-4 sm:flex md:px-0 lg:w-1/2">
                <div className="mb-5 sm:mb-0 sm:w-1/2">
                  {images?.[0]?.image && (
                    <Image
                      className="overflow-hidden rounded-xl object-cover"
                      src={urlFor(images?.[0]?.image)}
                      width={640}
                      height={800}
                      sizes="(max-width: 639px) 100vw, (min-width: 640px) 30vw"
                      alt={images?.[0]?.alt ?? "features-image-1"}
                    />
                  )}
                  {images?.[1]?.image && (
                    <Image
                      className="mt-6 overflow-hidden rounded-xl object-cover"
                      src={urlFor(images?.[1]?.image)}
                      width={640}
                      height={800}
                      sizes="(max-width: 639px) 100vw, (min-width: 640px) 30vw"
                      alt={images?.[1]?.alt ?? "features-image-2"}
                    />
                  )}
                </div>
                {images?.[2]?.image && (
                  <Image
                    className="overflow-hidden rounded-xl object-cover sm:ml-6 sm:w-1/2"
                    src={urlFor(images?.[2]?.image)}
                    width={640}
                    height={800}
                    sizes="(max-width: 639px) 100vw, (min-width: 640px) 30vw"
                    alt={images?.[2]?.alt ?? "features-image-3"}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantH);
