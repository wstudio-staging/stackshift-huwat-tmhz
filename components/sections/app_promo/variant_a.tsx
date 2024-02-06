import React from "react";
import Image from "next/image";
import Link from "next/link";
import { urlFor } from "lib/sanity";
import { logoLink } from "helper";
import { AppPromoProps } from ".";

function VariantA({ logo, subtitle, title, images }: AppPromoProps) {
  //for image carousel
  let [currentPosition, setCurrentPosition] = React.useState(0); // Initial image index value

  const arrowRightClick = () => {
    currentPosition !== images.length - 1 // Check index length
      ? setCurrentPosition(currentPosition + 1)
      : setCurrentPosition((currentPosition = 0));
  };
  const arrowLeftClick = () => {
    currentPosition !== 0 // Check index length
      ? setCurrentPosition(currentPosition - 1)
      : setCurrentPosition((currentPosition = images.length - 1));
  };

  return (
    <section>
      <div className="radius-for-skewed overflow-hidden bg-webriq-darkblue pt-16">
        <div className="container mx-auto px-4">
          <div className="relative mx-auto max-w-md text-center">
            {logo?.image && (
              <Link
                aria-label={
                  logoLink(logo) === "/"
                    ? "Go to home page"
                    : `Go to ${logoLink(logo)}`
                }
                className="mb-8 inline-block rounded-lg bg-white p-5"
                href={logoLink(logo)}
              >
                <Image
                  src={urlFor(logo?.image)}
                  width={50}
                  height={56}
                  alt={logo?.alt ?? "appPromo-logo"}
                />
              </Link>
            )}
            <p className="mb-3 text-gray-50">{subtitle}</p>
            <h1 className="mb-8 text-3xl font-bold text-white lg:text-5xl">
              {title}
            </h1>
            <div className="hidden h-72 sm:block">
              {images?.[0]?.image && (
                <Image
                  className="absolute bottom-0 left-1/2 z-20 -mb-10 h-80 -translate-x-1/2 transform rounded-t-2xl object-contain"
                  src={urlFor(images[0]?.image)}
                  sizes="218px"
                  width={218}
                  height={320}
                  alt="appPromo-variantA-image-1"
                />
              )}
              {images?.[1]?.image && (
                <Image
                  className="absolute bottom-0 left-0 -mb-24 h-80 rounded-t-2xl object-contain"
                  src={urlFor(images[1]?.image)}
                  sizes="218px"
                  width={218}
                  height={320}
                  alt="appPromo-variantA-image-2"
                />
              )}
              {images?.[2]?.image && (
                <Image
                  className="absolute bottom-0 right-0 -mb-24 h-80 rounded-t-2xl object-contain"
                  src={urlFor(images[2]?.image)}
                  sizes="218px"
                  width={218}
                  height={320}
                  alt="appPromo-variantA-image-3"
                />
              )}
            </div>
            {/* mobile image view less than 640px */}
            <div className="mx-auto w-1/2 object-contain sm:hidden">
              {images?.[currentPosition]?.image && (
                <Image
                  className="h-full w-full object-contain"
                  src={urlFor(images?.[currentPosition]?.image)}
                  sizes="(min-width: 520px) 224px, 45vw"
                  width={500}
                  height={850}
                  alt={
                    images?.[currentPosition]?.alt ??
                    `appPromo-variantB-image${currentPosition}`
                  }
                />
              )}
            </div>
            <div className="mb-16 flex justify-between sm:hidden">
              <button
                aria-label="Left Arrow button"
                className="order-0 md:order-0 lg:order-0 inline-block rounded-full bg-white p-2 text-webriq-darkblue shadow hover:text-webriq-babyblue focus:outline-none xl:order-1 2xl:order-1"
                onClick={arrowLeftClick}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
              </button>
              <button
                aria-label="Right Arrow button"
                className="order-2 inline-block rounded-full bg-white p-2 text-webriq-darkblue shadow hover:text-webriq-babyblue focus:outline-none"
                onClick={arrowRightClick}
              >
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M14 5l7 7m0 0l-7 7m7-7H3"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
