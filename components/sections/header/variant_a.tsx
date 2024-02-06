import React from "react";
import { urlFor } from "lib/sanity";
import Image from "next/image";
import { ConditionalLink } from "helper";

import { HeaderProps } from ".";

function VariantA({
  template,
  mainImage,
  title,
  description,
  primaryButton,
  secondaryButton,
}: HeaderProps) {
  return (
    <section className="skewed-bottom-right">
      <div
        className={`bg-${template.bg}-lightblue radius-for-skewed pb-20 pt-12 lg:pt-20`}
      >
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap">
            <div className="mb-12 flex w-full items-center px-4 md:mb-20 lg:mb-0 lg:w-1/2">
              <div className="w-full text-center lg:text-left xl:text-left 2xl:text-left">
                <div className="mx-auto max-w-md">
                  <h1 className="font-heading mb-3 text-2xl font-bold md:text-4xl lg:text-5xl">
                    {title && (
                      <>
                        <span>{String(title).split("*")[0]}</span>
                        <span className={`text-${template.color}-900`}>
                          {String(title).split("*")[1]}
                        </span>
                      </>
                    )}
                  </h1>
                </div>
                <div className="mx-auto max-w-md">
                  {description && (
                    <p className="my-6 text-xs leading-loose text-gray-500 md:text-base lg:text-base">
                      {description}
                    </p>
                  )}
                  <div>
                    {primaryButton?.label && (
                      <ConditionalLink
                        link={primaryButton}
                        className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
                        ariaLabel={primaryButton?.label}
                      >
                        {primaryButton?.label}
                      </ConditionalLink>
                    )}
                    {secondaryButton?.label && (
                      <ConditionalLink
                        link={secondaryButton}
                        className="inline-block w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                        ariaLabel={secondaryButton?.label}
                      >
                        {secondaryButton?.label}
                      </ConditionalLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-center px-4 lg:w-1/2">
              {mainImage && (
                <div className="relative w-full max-w-md">
                  {mainImage?.image && (
                    <Image
                      className="overflow-hidden rounded-3xl object-cover md:rounded-br-none lg:h-[448px]"
                      src={urlFor(mainImage?.image)}
                      sizes="(min-width: 520px) 448px, 90vw"
                      width={448}
                      height={448}
                      alt={mainImage?.alt ?? "header-main-image"}
                      priority={true}
                    />
                  )}
                  <div
                    className="absolute hidden md:block"
                    style={{ top: "-2rem", right: "3rem", zIndex: "-1" }}
                  >
                    <Image
                      src="/assets/elements/webriq-blue-dark-up.png"
                      width={112}
                      height={112}
                      alt="webriq-blue-dark-up-mainImage-element"
                    />
                  </div>
                  <div
                    className="absolute hidden md:block"
                    style={{ bottom: "-2rem", right: "-2rem", zIndex: "-1" }}
                  >
                    <Image
                      src="/assets/elements/wing-webriq-blue-down.png"
                      width={144}
                      height={144}
                      alt="wing-webriq-blue-down-mainImage-element"
                    />
                  </div>
                  <div
                    className="absolute hidden md:block"
                    style={{ top: "3rem", right: "-3rem", zIndex: "-1" }}
                  >
                    <Image
                      src="/assets/elements/bullets-gray-right.svg"
                      width={115}
                      height={157}
                      alt="bullets-gray-right-mainImage-element"
                    />
                  </div>
                  <div
                    className="absolute hidden md:block"
                    style={{
                      bottom: "2.5rem",
                      left: "-4.5rem",
                      zIndex: "-1",
                    }}
                  >
                    <Image
                      src="/assets/elements/bullets-gray-left.svg"
                      width={157}
                      height={115}
                      alt="bullets-gray-left-mainImage-element"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
