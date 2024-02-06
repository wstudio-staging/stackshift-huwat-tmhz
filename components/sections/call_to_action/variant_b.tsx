import { urlFor } from "lib/sanity";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import WebriQForm from "components/webriq-form";
import { logoLink, thankYouPageLink } from "helper";

import { CTAProps } from ".";

function VariantB({ logo, title, text, form }: CTAProps) {
  return (
    <section>
      <div>
        <svg
          className="h-8 w-full text-gray-50 md:h-12 lg:h-20"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 10 10 0 10 10"></polygon>
        </svg>
      </div>
      <div className="rounded-br-3xl rounded-tl-3xl bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-xl text-center">
            {logo?.image && (
              <Link
                aria-label={
                  logoLink(logo) === "/"
                    ? "Go to home page"
                    : `Go to ${logoLink(logo)}`
                }
                className="mb-6 inline-block rounded p-3"
                href={logoLink(logo)}
              >
                <Image
                  src={urlFor(logo?.image)}
                  width={56}
                  height={56}
                  alt={logo?.alt ?? "callToAction-logo"}
                />
              </Link>
            )}
            <h1 className="font-heading mb-4 text-4xl font-bold md:text-5xl">
              {title}
            </h1>
            <p className="mb-6 text-gray-700">{text}</p>
            {form?.fields && (
              <WebriQForm
                method="POST"
                data-form-id={form?.id}
                name="Calltoaction-VariantB-Form"
                className="flex flex-wrap items-center justify-center"
                data-thankyou-url={thankYouPageLink(form?.thankYouPage)}
                scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
              >
                {form?.fields
                  ?.slice(0, 2)
                  ?.map((field) => (
                    <input
                      key={field?._key}
                      aria-label={field?.placeholder ?? field?.name}
                      className="mb-3 w-full rounded bg-white px-4 py-2 leading-loose md:mb-0 md:mr-4 md:w-auto"
                      type={
                        field?.type === "inputEmail"
                          ? "email"
                          : field?.type === "inputPassword"
                          ? "password"
                          : field?.type === "inputNumber"
                          ? "number"
                          : "text"
                      }
                      placeholder={field?.placeholder}
                      name={field?.name}
                      required={field?.isRequired}
                    />
                  ))}
                <div>
                  <div className="webriq-recaptcha" />
                </div>
                {form?.buttonLabel && (
                  <button
                    aria-label={
                      form?.buttonLabel ?? "Call to action form submit button"
                    }
                    className="w-full rounded-l-xl rounded-t-xl bg-webriq-darkblue px-4 py-2 font-bold leading-loose text-white transition duration-200 hover:bg-webriq-blue md:w-auto"
                    type="submit"
                  >
                    {form?.buttonLabel}
                  </button>
                )}
              </WebriQForm>
            )}
          </div>
        </div>
      </div>
      <div>
        <svg
          className="h-8 w-full text-gray-50 md:h-12 lg:h-20"
          viewBox="0 0 10 10"
          preserveAspectRatio="none"
        >
          <polygon fill="currentColor" points="0 0 10 0 0 10"></polygon>
        </svg>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
