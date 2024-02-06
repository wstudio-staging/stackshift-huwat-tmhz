import React from "react";
import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import WebriQForm from "components/webriq-form";
import { logoLink, thankYouPageLink } from "helper";
import { NewsletterProps } from ".";

function VariantB({ logo, title, description, form }: NewsletterProps) {
  const { id, fields, buttonLabel, thankYouPage } = form;

  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap items-center">
            <div className="mb-4 w-full text-center lg:mr-8 lg:w-auto">
              <div className="mx-auto flex items-center justify-center">
                {logo?.image && (
                  <Link
                    aria-label={
                      logoLink(logo) === "/"
                        ? "Go to home page"
                        : `Go to ${logoLink(logo)}`
                    }
                    className="mb-8 inline-block rounded bg-white p-5"
                    href={logoLink(logo)}
                  >
                    <Image
                      src={urlFor(logo?.image)}
                      width={40}
                      height={40}
                      quality={100}
                      alt={logo?.alt ?? "newsletter-logo"}
                    />
                  </Link>
                )}
              </div>
            </div>
            <div className="mx-auto mb-6 mr-auto w-full max-w-lg text-center lg:ml-0 lg:w-auto lg:text-left">
              <h1 className="text-4xl font-bold">{title}</h1>
              <p className="text-gray-700">{description}</p>
            </div>
            {fields && fields[0]?.name && (
              <div className="w-full lg:w-2/5">
                <WebriQForm
                  method="POST"
                  data-form-id={id}
                  name="Newsletter-VariantB-Form"
                  className="form-newsletter"
                  data-thankyou-url={thankYouPageLink(thankYouPage)}
                  scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
                >
                  <div className="mx-auto flex max-w-md flex-wrap items-center lg:max-w-sm">
                    <input
                      aria-label={fields[0]?.placeholder ?? fields[0]?.name}
                      className="mr-4 flex-grow rounded px-4 py-3 text-xs leading-loose border border-slate-300"
                      type={
                        fields[0].type === "inputEmail"
                          ? "email"
                          : "inputNumber"
                          ? "number"
                          : "text"
                      }
                      placeholder={fields[0]?.placeholder}
                      name={fields[0]?.name}
                      required={fields[0]?.isRequired}
                    />
                    <div>
                      <div className="webriq-recaptcha" />
                    </div>
                    {buttonLabel && (
                      <button
                        aria-label={
                          buttonLabel ?? "Newsletter form submit button"
                        }
                        className="flex-none rounded-l-xl rounded-t-xl bg-webriq-darkblue px-6 py-2 font-bold leading-loose text-gray-50 transition duration-200 hover:bg-webriq-blue"
                        type="submit"
                      >
                        {buttonLabel}
                      </button>
                    )}
                  </div>
                </WebriQForm>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
