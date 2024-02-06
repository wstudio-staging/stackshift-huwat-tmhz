import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { AppPromoProps } from ".";

function VariantC({
  subtitle,
  title,
  description,
  features,
  images,
}: AppPromoProps) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="mb-12 w-full px-4 lg:mb-0 lg:w-1/2">
              <div className="max-w-xl">
                <p className="mb-5 text-left text-sm font-bold text-webriq-darkblue md:text-lg lg:text-xl">
                  {subtitle}
                </p>
                <h1 className="font-heading mb-4 text-left text-xl font-bold md:text-4xl lg:text-5xl">
                  {title}
                </h1>
                <p className="mb-6 text-left text-sm leading-loose text-gray-500 md:text-lg lg:text-xl">
                  {description}
                </p>
                <ul className="mb-8 font-bold text-gray-500">
                  {features &&
                    features.map((feature, index) => (
                      <li className="mb-3 flex items-center" key={index}>
                        <svg
                          className="mr-2 h-5 w-5 text-webriq-blue"
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
                        <span className="text-sm md:text-lg lg:text-xl">
                          {feature}
                        </span>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
            <div className="flex w-full -rotate-12 transform items-center lg:w-1/2">
              <div className="w-full">
                {images?.[0]?.image && (
                  <Image
                    className="object-cover"
                    src={urlFor(images[0]?.image)}
                    sizes="100vw"
                    width={500}
                    height={850}
                    alt={images[0]?.alt ?? "appPromo-variantC-image1"}
                  />
                )}
              </div>
              <div className="w-full">
                {images
                  ?.slice(1, 3)
                  ?.map((images, index) => (
                    <Image
                      className="object-cover"
                      src={urlFor(images?.image)}
                      sizes="100vw"
                      width={500}
                      height={850}
                      alt={images[1]?.alt ?? `appPromo-variantC-image${index}`}
                      key={index}
                    />
                  ))}
              </div>
              <div className="w-full">
                {images?.[3]?.image && (
                  <Image
                    className="object-cover"
                    src={urlFor(images[3]?.image)}
                    sizes="100vw"
                    width={500}
                    height={850}
                    alt={images[3]?.alt ?? "appPromo-variantC-image4"}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default React.memo(VariantC);
