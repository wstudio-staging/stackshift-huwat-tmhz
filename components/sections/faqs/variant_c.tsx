import React from "react";

import { FAQProps } from ".";

function VariantC({ subtitle, title, faqs }: FAQProps) {
  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-xl text-center">
            <span className="font-bold text-webriq-darkblue">{subtitle}</span>
            <h1 className="text-5xl font-bold">{title}</h1>
          </div>
          {faqs && (
            <div className="-mx-4 -mb-8 flex flex-wrap">
              {faqs?.map((faq, index) => (
                <div className="mb-8 w-full px-4 lg:w-1/2" key={index}>
                  {faq.question && (
                    <div className="h-full rounded bg-white p-8 shadow">
                      <div className="mb-6 flex items-start">
                        <span className="mr-4 inline-block rounded-full bg-webriq-darkblue p-3">
                          <svg
                            className="h-6 w-6 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                            />
                          </svg>
                        </span>
                        <p className="text-xl font-bold">{faq?.question}</p>
                      </div>
                      <p className="leading-loose text-gray-500">
                        {faq?.answer}
                      </p>
                    </div>
                  )}
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
