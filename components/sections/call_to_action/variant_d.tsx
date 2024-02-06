import { urlFor } from "lib/sanity";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import WebriQForm from "components/webriq-form";
import { logoLink, thankYouPageLink, ConditionalLink } from "helper";

import { CTAProps } from ".";
import { FormFields } from "types";

function VariantD({
  logo,
  title,
  text,
  button,
  form,
  formLinks,
  signInLink,
}: CTAProps) {
  return (
    <section className="bg-gray-50 px-10 py-20">
      <div className="container mx-auto px-4">
        <div className="-mx-4 flex flex-wrap items-center justify-center">
          <div className="mb-16 max-w-2xl px-4 lg:mb-0 lg:w-1/2">
            {logo?.image && (
              <Link
                aria-label={
                  logoLink(logo) === "/"
                    ? "Go to home page"
                    : `Go to ${logoLink(logo)}`
                }
                className="mb-10 inline-block text-3xl font-bold leading-none"
                href={logoLink(logo)}
              >
                <Image
                  className="h-14"
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
            <p className="mb-8 leading-loose text-gray-700">{text}</p>
            {button?.label && (
              <ConditionalLink
                link={button}
                className="inline-block py-2 px-6 bg-webriq-darkblue hover:bg-webriq-blue text-white font-bold leading-loose transition duration-250 rounded-l-xl rounded-t-xl"
                ariaLabel={button?.label}
              >
                {button?.label}
              </ConditionalLink>
            )}
          </div>
          <div className="w-full lg:w-1/2">
            <div className="mx-auto max-w-sm lg:ml-auto lg:mr-0">
              {form?.fields && (
                <div className="mb-6 rounded-t-3xl rounded-bl-3xl bg-white px-6 py-8 text-center shadow">
                  <WebriQForm
                    method="POST"
                    data-form-id={form?.id}
                    name="Calltoaction-VariantD-Form"
                    className="form-callToAction"
                    data-thankyou-url={thankYouPageLink(form?.thankYouPage)}
                    scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
                  >
                    <div className="mb-6">
                      <span className="text-sm text-gray-500">
                        {form?.subtitle}
                      </span>
                      <p className="text-2xl">{form?.name}</p>
                    </div>
                    <div className="-mx-2 mb-3 flex flex-wrap">
                      {form?.fields?.slice(0, 2)?.map((formFields, index) => (
                        <div
                          className="mb-3 w-full px-2 lg:mb-0 lg:w-1/2 xl:mb-0 2xl:mb-0"
                          key={index}
                        >
                          <FormFields fields={formFields} />
                        </div>
                      ))}
                    </div>
                    {form?.fields?.slice(2)?.map((formFields, index) => (
                      <div key={index}>
                        <FormFields fields={formFields} />
                      </div>
                    ))}
                    <div>
                      <div className="webriq-recaptcha" />
                    </div>
                    {form?.buttonLabel && (
                      <button
                        aria-label={
                          form?.buttonLabel ??
                          "Call to action form submit button"
                        }
                        className="mb-4 w-full rounded bg-webriq-blue py-4 text-sm font-bold leading-normal text-white transition duration-200 hover:bg-webriq-darkblue"
                        type="submit"
                      >
                        {form?.buttonLabel}
                      </button>
                    )}
                  </WebriQForm>
                  {signInLink?.label && (
                    <p className="text-xs text-gray-500">
                      <span>Already have an account?</span>
                      <ConditionalLink
                        link={signInLink}
                        className="text-webriq-darkblue hover:text-webriq-babyblue"
                        ariaLabel={signInLink?.label}
                      >
                        {signInLink?.label}
                      </ConditionalLink>
                    </p>
                  )}
                </div>
              )}
              {formLinks && (
                <div className="flex flex-wrap items-center justify-center text-sm text-gray-500">
                  {formLinks?.map((link, index, { length }) => (
                    <div key={index}>
                      <ConditionalLink
                        link={link}
                        className="text-webriq-darkblue hover:text-webriq-blue font-bold"
                        ariaLabel={link?.label}
                      >
                        {link?.label}
                      </ConditionalLink>
                      {index === length - 1 ? null : index === length - 2 ? (
                        <span>&nbsp;and&nbsp;</span>
                      ) : (
                        <span>&nbsp;,&nbsp;</span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/**
 *
 * @param {fields}
 * @returns input fields according to type
 */
function FormFields({ fields }: { fields: FormFields }) {
  const [value, setValue] = React.useState(null); // setting selected value for input field radio type
  const [checked, setChecked] = React.useState([]); // setting selected value for input field checkbox type

  const handleRadioChange = (e) => {
    setValue(e.target.value);
  };

  const handleCheckboxChange = (e) => {
    const { checked, value } = e.target;

    setChecked((prev) =>
      checked ? [...prev, value] : prev.filter((v) => v !== value)
    );
  };

  if (fields?.type === "textarea") {
    return (
      <textarea
        aria-label={fields?.placeholder ?? fields?.name}
        className="w-full rounded bg-gray-100 p-4 text-xs outline-none"
        placeholder={fields?.placeholder}
        name={fields?.name}
        required={fields?.isRequired}
      />
    );
  } else if (fields?.type === "inputFile") {
    return (
      <label className="flex rounded bg-gray-100 px-2">
        <input
          aria-label={fields?.placeholder ?? fields?.name}
          className="w-full rounded bg-gray-100 p-4 text-xs outline-none"
          type="file"
          placeholder={fields?.placeholder ?? "Choose file.."}
          name={fields?.name}
          required={fields?.isRequired}
        />
      </label>
    );
  } else if (fields?.type === "inputNumber") {
    return (
      <input
        aria-label={fields?.placeholder ?? fields?.name}
        className="w-full rounded bg-gray-100 p-4 text-xs outline-none"
        type="number"
        placeholder={fields?.placeholder}
        name={fields?.name}
        required={fields?.isRequired}
      />
    );
  } else if (fields?.type === "inputSelect") {
    return (
      <div className="mb-4 flex">
        <label
          className="m-auto text-left text-xs text-gray-500"
          htmlFor={fields?.name}
        >
          {fields?.label}
        </label>
        <select
          className="w-full rounded bg-gray-100 p-3 text-xs outline-none"
          name={`cta-${fields?.name}`}
          defaultValue={"default-value"}
          required={fields?.isRequired}
        >
          <option value=""></option>
          {fields?.items?.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
    );
  } else if (fields?.type === "inputRadio") {
    return (
      <div className="mb-4 text-left">
        <label
          className="m-auto text-left text-xs text-gray-500"
          htmlFor={fields?.name}
        >
          {fields?.label}
        </label>
        <div>
          {fields?.items?.map((item, index) => (
            <label className="mr-4 text-xs text-gray-500" key={index}>
              <input
                className="mr-2"
                name={fields?.name}
                value={item}
                type="radio"
                onChange={handleRadioChange}
                checked={value === item}
                required={fields?.isRequired}
              />
              {item}
            </label>
          ))}
        </div>
      </div>
    );
  } else if (fields?.type === "inputCheckbox") {
    return (
      <div className="mb-4 text-left">
        <label
          className="m-auto text-left text-xs text-gray-500"
          htmlFor={fields?.name}
        >
          {fields?.label}
        </label>
        <div>
          {fields?.items?.map((item, index) => (
            <label className="mr-4 text-xs text-gray-500" key={index}>
              <input
                className="mr-2"
                name={fields?.name}
                value={item}
                type="checkbox"
                onChange={handleCheckboxChange}
                checked={checked.some((v) => v === item)}
                required={
                  fields?.isRequired && checked.length === 0 ? true : false
                }
              />
              {item}
            </label>
          ))}
        </div>
      </div>
    );
  } else {
    return (
      <input
        aria-label={fields?.placeholder ?? fields?.name}
        className="w-full rounded bg-gray-100 p-4 text-xs outline-none"
        type={
          fields?.type === "inputEmail"
            ? "email"
            : fields?.type === "inputPassword"
            ? "password"
            : "text"
        }
        placeholder={fields?.placeholder}
        name={fields?.name}
        required={fields?.isRequired}
      />
    );
  }
}

export default React.memo(VariantD);
