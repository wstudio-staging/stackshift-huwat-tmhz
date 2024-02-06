import React from "react";
import WebriQForm from "components/webriq-form";
import { thankYouPageLink } from "helper";

import { CTAProps } from ".";

function VariantC({ title, text, features, form }: CTAProps) {
  return (
    <section className="bg-gray-50 py-20">
      <div className="container mx-auto px-4">
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="mb-8 w-full px-4 lg:mb-0 lg:w-1/2">
            <h1 className="font-heading mb-4 text-4xl font-bold lg:text-5xl">
              {title}
            </h1>
            <p className="max-w-lg leading-loose text-gray-700">{text}</p>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            {form?.fields && (
              <WebriQForm
                method="POST"
                data-form-id={form?.id}
                name="Calltoaction-VariantC-Form"
                className="form-callToAction mb-4 flex items-center lg:justify-end"
                data-thankyou-url={thankYouPageLink(form?.thankYouPage)}
                scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
              >
                {form?.fields?.[0] && form?.fields[0]?.type && (
                  <input
                    aria-label={
                      form?.fields[0]?.placeholder ?? form?.fields[0]?.name
                    }
                    className="mr-2 rounded bg-white px-4 py-2 leading-loose"
                    type={
                      form?.fields[0]?.type === "inputEmail"
                        ? "email"
                        : form?.fields[0]?.type === "inputPassword"
                        ? "password"
                        : form?.fields[0]?.type === "inputNumber"
                        ? "number"
                        : "text"
                    }
                    placeholder={form?.fields[0]?.placeholder}
                    name={form?.fields[0]?.name}
                    required={form?.fields[0]?.isRequired}
                  />
                )}
                <div>
                  <div className="webriq-recaptcha" />
                </div>
                {form?.buttonLabel && (
                  <button
                    aria-label={
                      form?.buttonLabel ?? "Call to action form submit button"
                    }
                    className="inline-block rounded-l-xl rounded-t-xl bg-webriq-darkblue px-6 py-2 font-bold leading-loose text-white transition duration-200 hover:bg-webriq-blue"
                    type="submit"
                  >
                    {form?.buttonLabel}
                  </button>
                )}
              </WebriQForm>
            )}
            <div>
              <ul className="flex items-center text-gray-500 lg:justify-end">
                {features &&
                  features?.map((feature, index) => (
                    <li className="mr-4 flex items-center" key={index}>
                      <span>
                        <svg
                          className="mr-2 h-6 w-6 text-webriq-blue"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      <span>{feature}</span>
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantC);
