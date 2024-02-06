import React from "react";

import { HowItWorksProps } from ".";

function VariantD({ subtitle, title, steps }: HowItWorksProps) {
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
          {steps && (
            <div className="mx-10 flex flex-wrap justify-center">
              {steps?.map((step, index) => (
                <div
                  className="relative mt-20 w-full px-10 md:w-1/2 lg:mb-0 lg:w-1/3"
                  key={index}
                >
                  <p
                    className="absolute left-0 top-0 -mt-14 ml-10 text-9xl font-semibold text-webriq-darkblue opacity-20"
                    style={{ width: "69px", height: "103px" }}
                  >
                    {index + 1}
                  </p>
                  <p className="text-2xl font-bold">{step?.title}</p>
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
