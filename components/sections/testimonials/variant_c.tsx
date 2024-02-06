import React from "react";
import Image from "next/image";
import { urlFor } from "lib/sanity";
import { TestimonialProps } from ".";

function VariantC({ caption, title, testimonials }: TestimonialProps) {
  const [testimony, setTestimony] = React.useState(testimonials);

  const slider = (action) => {
    if (action === "next") {
      // Remove first element
      let firstItem = testimony?.shift();

      // Push the deleted element to last index
      setTestimony((prevState) => [...prevState, firstItem]);
    } else if (action === "prev") {
      // Remove last element
      let lastItem = testimony?.pop();

      // Push the deleted element to first index
      setTestimony((prevState) => [lastItem, ...prevState]);
    }
  };

  return (
    <section>
      <div className="radius-for-skewed overflow-hidden bg-gray-50 py-10 lg:py-20">
        <div className="mx-auto max-w-6xl px-4 pb-6 lg:pb-16">
          <div className="flex flex-wrap items-center justify-center text-center lg:justify-between lg:text-left">
            <div className="mb-4 w-full lg:mb-0 lg:w-4/5">
              <span className="font-bold text-webriq-darkblue">{caption}</span>
              <h1 className="font-heading text-4xl font-bold lg:text-5xl">
                {title}
              </h1>
            </div>
            <div className="w-full lg:w-1/5">
              {testimony?.length >= 4 && (
                <button
                  aria-label="Show previous testimonial"
                  className="mr-4 rounded-full bg-white p-5 text-webriq-darkblue shadow-md transition duration-200 hover:text-webriq-babyblue"
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
              {testimony?.length >= 4 && (
                <button
                  aria-label="Show next testimonial"
                  className="rounded-full bg-white p-5 text-webriq-darkblue shadow-md transition duration-200 hover:text-webriq-babyblue"
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
        <div className="relative flex">
          {testimony && (
            <div className="mx-auto flex max-w-6xl flex-wrap px-2">
              {testimony?.slice(0, 3)?.map((item, index) => (
                <div className="mb-4 w-full px-3 lg:w-1/3" key={index}>
                  <div className="rounded bg-white p-8 text-center shadow">
                    <p className="mb-8 leading-loose text-gray-500">
                      {item?.testimony}
                    </p>
                    {item?.mainImage?.image && (
                      <Image
                        className="mx-auto mb-2 h-12 w-12 overflow-hidden rounded-full object-cover"
                        src={urlFor(item?.mainImage?.image)}
                        sizes="100vw"
                        width={128}
                        height={128}
                        alt={
                          item?.mainImage?.alt ??
                          `testimonial-source-${item?.name}-profile-image`
                        }
                      />
                    )}
                    <p className="font-heading mb-1 text-2xl font-bold">
                      {item?.name}
                    </p>
                    <p className="text-gray-500">{item?.jobTitle}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
