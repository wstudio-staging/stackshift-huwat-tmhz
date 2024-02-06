import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { AppPromoProps } from ".";

function VariantB({
  subtitle,
  title,
  description,
  statistics,
  images,
}: AppPromoProps) {
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
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-10">
          <div className="lg:mx-4 lg:flex lg:flex-wrap">
            <div className="w-full px-4 lg:w-1/2">
              <div className="mt-8 max-w-xl">
                <p className="text-center font-bold text-webriq-darkblue md:text-left lg:text-left">
                  {subtitle}
                </p>
                <h1 className="font-heading mt-3 text-center text-xl font-bold md:text-left md:text-4xl lg:text-left lg:text-5xl">
                  {title}
                </h1>
                <p className="mb-10 mt-3 break-words text-center leading-loose text-gray-500 md:text-left lg:text-left">
                  {description}
                </p>
                <div className="sm:flex sm:flex-wrap">
                  {statistics &&
                    statistics.map((items, index) => (
                      <div
                        className="mb-8 w-full text-center md:text-left lg:w-1/2 lg:text-left"
                        key={index}
                      >
                        <p className="mb-3 text-gray-500">{items?.label}</p>
                        <span className="text-xl font-bold md:text-3xl lg:text-4xl">
                          {items?.value}
                        </span>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            <div className="flex w-full items-center justify-center sm:flex-wrap lg:w-1/2 xl:w-1/2 2xl:w-1/2">
              {images &&
                (images.length > 1 ? (
                  <>
                    <button
                      aria-label="Left Arrow button"
                      className="order-0 md:order-0 lg:order-0 mx-2 hidden rounded-full bg-white p-2 text-webriq-darkblue shadow hover:text-webriq-babyblue focus:outline-none sm:inline-block md:mr-12 md:p-4 lg:mr-12 lg:p-4 xl:order-1 xl:mr-12 xl:p-4 2xl:order-1 2xl:mr-12 2xl:p-4"
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
                    <div className="xl:order-0 2xl:order-0 order-1 mr-2 w-1/2 object-contain md:order-1 lg:order-1">
                      {images?.[currentPosition]?.image && (
                        <Image
                          className="mx-auto mb-8 w-full object-cover xl:mb-0"
                          src={urlFor(images?.[currentPosition]?.image)}
                          sizes="100vw"
                          width={500}
                          height={850}
                          alt={
                            images?.[currentPosition]?.alt ??
                            `appPromo-variantB-image${currentPosition}`
                          }
                        />
                      )}
                    </div>
                    <button
                      aria-label="Right Arrow button"
                      className="order-2 hidden rounded-full bg-white p-2 text-webriq-darkblue shadow hover:text-webriq-babyblue focus:outline-none sm:inline-block md:ml-12 md:p-4 lg:ml-12 lg:p-4 xl:ml-12 xl:p-4 2xl:ml-12 2xl:p-4"
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
                  </>
                ) : (
                  <div className="object-contain md:w-2/5 xl:w-2/5">
                    {images?.[currentPosition]?.image && (
                      <Image
                        className="mx-auto mb-8 object-cover xl:mb-0"
                        src={urlFor(images?.[currentPosition]?.image)}
                        sizes="100vw"
                        width={500}
                        height={850}
                        alt={
                          images?.[currentPosition]?.alt ??
                          `appPromo-variantB-image${currentPosition}`
                        }
                      />
                    )}
                  </div>
                ))}
            </div>
            <div className="flex justify-between sm:hidden">
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
export default React.memo(VariantB);
