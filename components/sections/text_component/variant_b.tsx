import React from "react";
import { PortableText } from "lib/sanity";
import { textComponentBlockStyling } from "./variant_a";
import { TextComponentProps } from ".";

function VariantB({ heading, firstColumn, secondColumn }: TextComponentProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="font-heading mb-5 text-center text-xl font-semibold lg:text-3xl">
          {heading}
        </h1>
        <div className="mx-auto flex flex-wrap justify-center">
          {firstColumn && (
            <div className="mb-3 px-5 text-justify text-xs leading-relaxed text-gray-500 lg:mb-6 lg:w-1/4 lg:text-base">
              <PortableText
                value={firstColumn}
                components={textComponentBlockStyling}
              />
            </div>
          )}
          {secondColumn && (
            <div className="mb-6 px-5 text-justify text-xs leading-relaxed text-gray-500 md:mb-0 lg:w-1/4 lg:text-base">
              <PortableText
                value={secondColumn}
                components={textComponentBlockStyling}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
