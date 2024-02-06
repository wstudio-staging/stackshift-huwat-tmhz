import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { TestimonialProps } from ".";

function VariantD({ testimonials }: TestimonialProps) {
  const [testimony, setTestimony] = React.useState(0);

  const slider = (stats) => {
    stats === "next"
      ? testimony !== testimonials?.length - 1
        ? setTestimony((prevState) => prevState + 1)
        : setTestimony(0)
      : testimony >= 1
      ? setTestimony((prevState) => prevState - 1)
      : setTestimony(testimonials?.length - 1);
  };

  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="items-center justify-center md:space-x-8 lg:flex">
            <div className="mb-10 text-center lg:hidden">
              {testimonials?.length > 1 && (
                <button
                  aria-label="Show previous testimonial"
                  className="mr-6 rounded-full bg-white p-4 text-webriq-darkblue shadow-md transition duration-200 hover:text-webriq-babyblue lg:mr-0"
                  onClick={() => slider("prev")}
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
              )}
              {testimonials?.length > 1 && (
                <button
                  aria-label="Show next testimonial"
                  className="rounded-full bg-white p-4 text-webriq-darkblue shadow-md transition duration-200 hover:text-webriq-babyblue"
                  onClick={() => slider("next")}
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
              )}
            </div>
            {testimonials?.length > 1 && (
              <button
                aria-label="Show previous testimonial"
                className="hidden rounded-full bg-white p-5 text-webriq-darkblue shadow-md transition  duration-200 hover:text-webriq-babyblue focus:outline-none lg:mr-0 lg:block"
                onClick={() => slider("prev")}
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
            )}
            {testimonials?.[testimony] && (
              <div className="flex w-full flex-wrap rounded bg-white shadow">
                {testimonials?.[testimony]?.rating && (
                  <div className="w-full border-r py-10 text-center lg:w-1/3">
                    <span className="text-5xl font-bold lg:text-6xl">
                      {`${testimonials?.[testimony]?.rating}.0`}
                    </span>
                    <div className="mb-6 flex justify-center text-webriq-darkblue">
                      {testimonials?.[testimony]?.rating === "1" ? (
                        <svg
                          className="h-6 w-6"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ) : testimonials?.[testimony]?.rating === "2" ? (
                        [1, 2].map((rate) => (
                          <svg
                            key={rate}
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))
                      ) : testimonials?.[testimony]?.rating === "3" ? (
                        [1, 2, 3].map((rate) => (
                          <svg
                            key={rate}
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))
                      ) : testimonials?.[testimony]?.rating === "4" ? (
                        [1, 2, 3, 4].map((rate) => (
                          <svg
                            key={rate}
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))
                      ) : (
                        [1, 2, 3, 4, 5].map((rate) => (
                          <svg
                            key={rate}
                            className="h-6 w-6"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))
                      )}
                    </div>
                    <div className="mx-auto mb-6 h-24 w-32 rounded-full object-contain">
                      {testimonials[testimony]?.mainImage?.image && (
                        <Image
                          className="h-[96px] w-[128px] object-scale-down"
                          src={urlFor(
                            testimonials[testimony]?.mainImage?.image
                          )}
                          width={128}
                          height={96}
                          alt={
                            testimonials[testimony]?.mainImage?.alt ??
                            `testimonial-source-profile-image${testimony}`
                          }
                        />
                      )}
                    </div>
                  </div>
                )}
                <div className="w-full px-6 py-10 lg:w-2/3">
                  <svg
                    className="mb-4 h-10 text-webriq-darkblue"
                    viewBox="0 0 32 28"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M10.2418 12.749C9.45369 12.522 8.66554 12.4069 7.89887 12.4069C6.71496 12.4069 5.72709 12.6775 4.96109 13.0088C5.69957 10.3053 7.47358 5.6405 11.0075 5.11517C11.3348 5.0665 11.603 4.82986 11.6923 4.51131L12.4646 1.74875C12.5298 1.51512 12.4912 1.26505 12.3579 1.06231C12.2246 0.859563 12.0105 0.724288 11.7705 0.691393C11.5097 0.655812 11.2438 0.637686 10.9803 0.637686C6.73846 0.637686 2.53756 5.06516 0.764895 11.4046C-0.275679 15.1238 -0.580802 20.7154 1.98237 24.2349C3.41668 26.2043 5.50924 27.2559 8.20198 27.361C8.21305 27.3613 8.2238 27.3616 8.23487 27.3616C11.5573 27.3616 14.5035 25.1241 15.3997 21.9208C15.9351 20.0058 15.6931 17.9975 14.7176 16.2644C13.7526 14.5508 12.1632 13.3018 10.2418 12.749Z"
                      fill="currentColor"
                    />
                    <path
                      d="M31.0396 16.2648C30.0746 14.5508 28.4852 13.3018 26.5638 12.749C25.7757 12.522 24.9875 12.4069 24.2212 12.4069C23.0373 12.4069 22.0491 12.6775 21.2831 13.0088C22.0215 10.3053 23.7955 5.6405 27.3298 5.11517C27.6571 5.0665 27.9249 4.82986 28.0146 4.51131L28.7869 1.74875C28.8521 1.51512 28.8135 1.26505 28.6802 1.06231C28.5473 0.859563 28.3331 0.724288 28.0928 0.691393C27.8323 0.655812 27.5664 0.637686 27.3026 0.637686C23.0608 0.637686 18.8599 5.06516 17.0869 11.4046C16.0466 15.1238 15.7415 20.7154 18.305 24.2356C19.739 26.2046 21.8319 27.2566 24.5243 27.3613C24.5354 27.3616 24.5461 27.362 24.5575 27.362C27.8796 27.362 30.8261 25.1244 31.7224 21.9211C32.2571 20.0061 32.0147 17.9975 31.0396 16.2648Z"
                      fill="currentColor"
                    />
                  </svg>
                  <p className="mb-10 text-xl leading-loose text-gray-500 lg:text-2xl">
                    {testimonials[testimony]?.testimony}
                  </p>
                  <p className="font-heading text-2xl font-bold">
                    {testimonials[testimony]?.name}
                  </p>
                  <p className="text-gray-500">
                    {testimonials[testimony]?.jobTitle}
                  </p>
                </div>
              </div>
            )}
            {testimonials?.length > 1 && (
              <button
                aria-label="Show next testimonial"
                className="hidden rounded-full bg-white p-5 text-webriq-darkblue shadow-md transition duration-200 hover:text-webriq-babyblue focus:outline-none lg:block"
                onClick={() => slider("next")}
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
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
