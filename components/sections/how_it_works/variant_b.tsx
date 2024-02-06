import React from "react";

import { HowItWorksProps } from ".";

function VariantB({ subtitle, title, text, steps }: HowItWorksProps) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="mb-12 w-full lg:mb-0 lg:w-1/2">
              <div className="mx-20 max-w-md">
                <span className="font-bold text-webriq-darkblue">
                  {subtitle}
                </span>
                <h1 className="font-heading mb-2 text-4xl font-bold lg:text-5xl">
                  {title}
                </h1>
                <div className="max-w-xs">
                  <p className="leading-loose text-gray-500">{text}</p>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              {steps &&
                steps?.map((step, index) => (
                  <div
                    className="mb-12 flex flex-wrap items-start lg:mb-8 lg:ml-10"
                    key={index}
                  >
                    <span className="mb-4 inline-flex h-16 w-16 items-center justify-center rounded bg-webriq-lightblue text-2xl font-bold text-webriq-darkblue lg:mb-0 lg:mr-6">
                      {index + 1}
                    </span>
                    <div className="w-full lg:w-3/4">
                      <p className="font-heading mb-4 text-2xl font-bold">
                        {step?.title}
                      </p>
                      <p className="leading-loose text-gray-500">
                        {step?.plainText}
                      </p>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
