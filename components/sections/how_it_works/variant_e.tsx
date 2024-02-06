import React from "react";
import { HowItWorksProps } from ".";

function VariantD({ subtitle, title, steps }: HowItWorksProps) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-md text-center">
            <span className="font-bold text-webriq-darkblue">{subtitle}</span>
            <h1 className="font-heading text-4xl font-bold lg:text-5xl">
              {title}
            </h1>
          </div>
          {steps && (
            <div className="relative mx-auto flex flex-wrap">
              {steps?.map((step, index) => (
                <div
                  className="mb-8 w-full px-16 text-center lg:w-1/3"
                  key={step?._key}
                >
                  <span className="relative z-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-webriq-darkblue text-2xl text-white lg:mb-10">
                    {index + 1}
                  </span>
                  <h3 className="font-heading mb-4 text-2xl font-bold">
                    {step?.title}
                  </h3>
                  <p className="leading-loose text-gray-500">
                    {step?.plainText}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantD);
