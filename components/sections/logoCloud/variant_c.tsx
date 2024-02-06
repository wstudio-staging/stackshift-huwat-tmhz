import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { ConditionalLink } from "helper";
import { LogoCloudProps } from ".";

function VariantC({ title, images, button }: LogoCloudProps) {
  return (
    <section className="relative overflow-hidden pb-12 pt-20 lg:pb-80">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md text-center">
          <h1 className="font-heading mb-8 text-4xl font-bold lg:text-5xl">
            {title}
          </h1>
          {button?.label && (
            <ConditionalLink
              ariaLabel={button?.label}
              link={button}
              className="inline-block py-2 px-6 rounded-l-xl rounded-t-xl bg-webriq-darkblue hover:bg-webriq-blue text-gray-50 font-bold leading-loose"
            >
              {button?.label}
            </ConditionalLink>
          )}
        </div>
        <div className="relative hidden lg:block">
          {images?.[0]?.image && (
            <div
              className="absolute flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-gray-50"
              style={{ top: "-120px", left: "-10px" }}
            >
              <Image
                className="h-16 w-16 object-scale-down"
                src={urlFor(images[0]?.image)}
                sizes="100vw"
                width={64}
                height={64}
                alt={images[0]?.alt ?? "logoCloud-image-1"}
              />
            </div>
          )}
          {images?.[1]?.image && (
            <div className="absolute left-0 top-0 mt-20 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50">
              <Image
                className="h-16 w-16 object-scale-down"
                src={urlFor(images[1]?.image)}
                sizes="100vw"
                width={64}
                height={64}
                alt={images[1]?.alt ?? "logoCloud-image-2"}
              />
            </div>
          )}
          {images?.[2]?.image && (
            <div
              className="absolute flex h-40 w-40 items-center justify-center rounded-full bg-gray-50"
              style={{ bottom: "-250px", left: "20%" }}
            >
              <Image
                className="h-32 w-32 object-scale-down"
                src={urlFor(images[2]?.image)}
                sizes="100vw"
                width={96}
                height={96}
                alt={images[2]?.alt ?? "logoCloud-image-3"}
              />
            </div>
          )}
          {images?.[3]?.image && (
            <div
              className="absolute flex h-40 w-40 items-center justify-center rounded-full bg-gray-50"
              style={{ top: "20px", right: "20%" }}
            >
              <Image
                className="h-32 w-32 object-scale-down"
                src={urlFor(images[3]?.image)}
                sizes="100vw"
                width={96}
                height={96}
                style={{ objectFit: "scale-down" }}
                alt={images[3]?.alt ?? "logoCloud-image-4"}
              />
            </div>
          )}
          {images?.[4]?.image && (
            <div
              className="absolute flex h-32 w-32 items-center justify-center rounded-full bg-gray-50"
              style={{ bottom: "-250px", right: 0 }}
            >
              <Image
                className="h-24 w-24 object-scale-down"
                src={urlFor(images[4]?.image)}
                sizes="100vw"
                width={64}
                height={64}
                alt={images[4]?.alt ?? "logoCloud-image-5"}
              />
            </div>
          )}
          {images?.[5]?.image && (
            <div
              className="absolute right-0 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50"
              style={{ top: "-150px" }}
            >
              <Image
                className="h-16 w-16 object-scale-down"
                src={urlFor(images[5]?.image)}
                sizes="100vw"
                width={64}
                height={64}
                alt={images[5]?.alt ?? "logoCloud-image-6"}
              />
            </div>
          )}
        </div>
        <div className="mt-16 flex flex-wrap justify-center lg:hidden">
          {images?.map((images, index) => (
            <div
              className="mx-4 mb-8 flex h-24 w-24 items-center justify-center rounded-full bg-gray-50"
              key={index}
            >
              <Image
                className="h-16 w-16 object-scale-down"
                src={urlFor(images?.image)}
                sizes="100vw"
                width={64}
                height={64}
                alt={images?.alt ?? `logoCloud-image-${index}`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
