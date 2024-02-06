import React from "react";
import { PortableText } from "lib/sanity";

import { TextComponentProps } from ".";
import { MyPortableTextComponents } from "types";

// block styling as props to `components` of the PortableText component
export const textComponentBlockStyling: MyPortableTextComponents = {
  block: {
    h1: ({ children }) => {
      return (
        <h1 className="mb-6 text-7xl leading-loose text-gray-900">
          {children}
        </h1>
      );
    },
    h2: ({ children }) => {
      return (
        <h2 className="mb-6 text-5xl leading-loose text-gray-900">
          {children}
        </h2>
      );
    },
    h3: ({ children }) => {
      return (
        <h3 className="mb-6 text-3xl leading-loose text-gray-900">
          {children}
        </h3>
      );
    },
    h4: ({ children }) => {
      return (
        <h4 className="mb-6 text-xl leading-loose text-gray-900">{children}</h4>
      );
    },
    normal: ({ children }) => {
      return (
        <p className="mb-5 text-justify leading-relaxed text-gray-500">
          {children}
        </p>
      );
    },
    blockquote: ({ children }) => {
      return (
        <blockquote className="mb-6 px-14 italic leading-loose text-gray-500">
          - {children}
        </blockquote>
      );
    },
  },
  code: ({ value }) => {
    return (
      <pre data-language={value.language}>
        <code>{value.code}</code>
      </pre>
    );
  },

  list: {
    bullet: ({ children }) => {
      return (
        <ul className="mb-6 list-disc pl-10 leading-loose text-gray-900">
          {children}
        </ul>
      );
    },
    number: ({ children }) => {
      return (
        <ol className="mb-6 list-decimal leading-loose text-gray-900">
          {children}
        </ol>
      );
    },
  },
  listItem: {
    bullet: ({ children }) => (
      <li className="mb-6 leading-loose text-gray-900">{children}</li>
    ),
  },
  marks: {
    strong: ({ children }) => <strong>{children}</strong>,
    em: ({ children }) => <em>{children}</em>,
    code: ({ children }) => <code>{children}</code>,
    link: ({ children, value }) => (
      <a
        aria-label={value.href ?? "external link"}
        className="text-webriq-blue hover:text-webriq-lightblue"
        href={value?.href}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
  },
};

function VariantA({ heading, firstColumn }: TextComponentProps) {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h1 className="font-heading mb-5 text-center text-xl font-semibold lg:text-3xl">
          {heading}
        </h1>
        <div className="mx-auto flex flex-wrap justify-center">
          {firstColumn && (
            <div className="mb-2 text-xs md:mb-0 md:w-1/2 lg:text-base">
              <PortableText
                value={firstColumn}
                components={textComponentBlockStyling}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
