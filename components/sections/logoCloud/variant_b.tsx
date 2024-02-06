import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { LogoCloudProps } from ".";

function VariantB({ title, text, images }: LogoCloudProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center">
          <div className="mb-12 w-full lg:mb-0 lg:w-1/2">
            <div className="max-w-md">
              <h1 className="font-heading mb-4 text-4xl font-bold lg:text-5xl">
                {title}
              </h1>
              <p className="leading-loose text-gray-500">{text}</p>
            </div>
          </div>
          <div className="-mx-2 flex w-full flex-wrap lg:w-1/2">
            {images &&
              images?.map((image, index) => (
                <div
                  className="mb-4 w-full px-2 sm:w-1/2 md:w-1/3 lg:mr-10 lg:w-1/3 xl:mr-0 xl:w-1/3 2xl:w-1/3"
                  key={index}
                >
                  {image?.image?.asset?._ref && (
                    <div>
                      <div className="mx-auto flex h-[192px] w-[192px] items-center justify-center rounded bg-gray-50">
                        <Image
                          className="object-scale-down"
                          src={urlFor(image?.image)}
                          sizes="192px"
                          width={192}
                          height={192}
                          alt={image?.alt ?? `logoCloud-image${index}`}
                        />
                      </div>
                    </div>
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
