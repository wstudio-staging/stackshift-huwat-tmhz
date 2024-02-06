import React from "react";
import { HowItWorksProps } from ".";

function VariantC({ subtitle, title, steps }: HowItWorksProps) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-8 max-w-md text-center">
            <span className="font-bold text-webriq-darkblue">{subtitle}</span>
            <h1 className="font-heading text-4xl font-bold lg:text-5xl">
              {title}
            </h1>
          </div>
          <div className="-mx-4 flex flex-wrap justify-center">
            {steps &&
              steps?.map((step, index) => (
                <div
                  className="mt-8 w-full px-4 md:w-1/2 lg:mb-0 lg:w-1/3"
                  key={index}
                >
                  <div className="rounded bg-white px-6 py-10 text-center shadow">
                    <span className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded bg-webriq-lightblue text-2xl font-bold text-webriq-darkblue">
                      {index + 1}
                    </span>
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
    </section>
  );
}
export default React.memo(VariantC);
