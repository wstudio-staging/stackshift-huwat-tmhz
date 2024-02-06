import React from "react";
import WebriQForm from "components/webriq-form";
import { thankYouPageLink, ConditionalLink } from "helper";

import { HeaderProps } from ".";

import { FormFields } from "types";

function VariantE({
  template,
  title,
  description,
  primaryButton,
  secondaryButton,
  formLinks,
  form,
}: HeaderProps) {
  return (
    <section className="relative bg-gray-100 px-10">
      <div className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="-mx-4 flex flex-wrap">
            <div className="mb-12 flex w-full items-center px-4 md:mb-20 lg:mb-0 lg:w-1/2">
              <div className="w-full text-center lg:text-left">
                <div className="mx-auto max-w-md lg:mx-0">
                  {title && (
                    <h1 className="font-heading mb-3 text-4xl font-bold lg:text-5xl">
                      <span>{String(title).split("*")[0]}</span>
                      <span className={`text-${template.color}-900`}>
                        {String(title).split("*")[1]}
                      </span>
                    </h1>
                  )}
                </div>
                <div className="mx-auto max-w-sm lg:mx-0">
                  <p className="mb-6 leading-loose text-gray-500">
                    {description}
                  </p>
                  <div>
                    {primaryButton?.label && (
                      <ConditionalLink
                        ariaLabel={primaryButton?.label}
                        link={primaryButton}
                        className={`inline-block mb-3 lg:mb-0 lg:mr-3 w-auto py-2 px-6 leading-loose bg-${template.color}-darkblue hover:bg-${template.color}-blue text-white font-semibold rounded-l-xl rounded-t-xl transition duration-200`}
                      >
                        {primaryButton?.label}
                      </ConditionalLink>
                    )}
                    {secondaryButton?.label && (
                      <ConditionalLink
                        ariaLabel={secondaryButton?.label}
                        link={secondaryButton}
                        className="inline-block w-auto py-2 px-6 leading-loose font-semibold bg-white hover:bg-gray-50 rounded-l-xl rounded-t-xl transition duration-200"
                      >
                        {secondaryButton?.label}
                      </ConditionalLink>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full lg:w-1/2">
              <div className="mx-auto max-w-sm text-center">
                {form?.fields && (
                  <div className="mb-4 rounded-xl bg-white px-6 py-8 shadow-md">
                    <div className="mb-6">
                      <span className="text-sm text-gray-500">
                        {form?.subtitle}
                      </span>
                      <p className="text-2xl font-bold">{form?.name}</p>
                    </div>
                    <WebriQForm
                      method="POST"
                      data-form-id={form?.id}
                      name="Header-VariantE-Form"
                      className="form-header"
                      data-thankyou-url={thankYouPageLink(form?.thankYouPage)}
                      scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
                    >
                      <div className="-mx-2 flex flex-wrap">
                        {form?.fields?.slice(0, 2)?.map((formFields, index) => (
                          <div className="w-full px-2 lg:w-1/2" key={index}>
                            <FormFields fields={formFields} />
                          </div>
                        ))}
                      </div>
                      {form?.fields?.slice(2)?.map((formFields) => (
                        <div key={formFields?._key}>
                          <FormFields fields={formFields} />
                        </div>
                      ))}
                      <div>
                        <div className="webriq-recaptcha" />
                      </div>
                      <div className="text-center">
                        {form?.buttonLabel && (
                          <button
                            aria-label={
                              form?.buttonLabel ?? "Header form submit button"
                            }
                            className="mb-2 w-full rounded bg-webriq-darkblue py-4 text-sm font-bold text-gray-50 transition duration-200 hover:bg-webriq-blue"
                            type="submit"
                          >
                            {form?.buttonLabel}
                          </button>
                        )}
                      </div>
                    </WebriQForm>
                  </div>
                )}
                {formLinks && (
                  <div className="text-xs text-gray-500">
                    {formLinks?.map((link, index, { length }) => (
                      <span key={index}>
                        <ConditionalLink
                          ariaLabel={link?.label}
                          link={link}
                          className="underline text-webriq-darkblue hover:text-webriq-blue"
                        >
                          {link?.label}
                        </ConditionalLink>
                        {index === length - 1 ? null : index === length - 2 ? (
                          <span>&nbsp;and&nbsp;</span>
                        ) : (
                          <span>&nbsp;,&nbsp;</span>
                        )}
                      </span>
                    ))}
                  </div>
                )}
              </div>
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
  const [showPassword, setShowPassword] = React.useState(false);
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
        aria-label={fields?.name}
        className="mb-3 w-full rounded bg-gray-100 p-4 text-xs outline-none"
        placeholder={fields?.name}
        name={fields?.name}
        required={fields?.isRequired}
      />
    );
  } else if (fields?.type === "inputFile") {
    return (
      <div className="mb-4">
        <label className="flex rounded bg-gray-100 px-2">
          <input
            aria-label="Choose file.."
            className="w-full rounded bg-gray-100 p-4 text-xs outline-none"
            type="file"
            placeholder="Choose file.."
            name={fields?.name}
            required={fields?.isRequired}
          />
        </label>
      </div>
    );
  } else if (fields?.type === "inputPassword") {
    return (
      <div className="mb-4 flex rounded bg-gray-100 p-4">
        <input
          aria-label={fields?.name}
          className="w-full bg-gray-100 text-xs outline-none"
          type={showPassword ? "text" : "password"}
          placeholder={fields?.placeholder}
          name={fields?.name}
          required={fields?.isRequired}
        />
        {/* SVG icon on the right of the password input field */}
        <button
          aria-label={showPassword ? "Show password" : "Hide password"}
          className="focus:outline-none"
          type="button"
          onClick={() => setShowPassword(!showPassword)}
        >
          {showPassword ? (
            <svg
              className="my-auto ml-4 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
            >
              <g fill="currentColor">
                <path d="M13.359 11.238C15.06 9.72 16 8 16 8s-3-5.5-8-5.5a7.028 7.028 0 0 0-2.79.588l.77.771A5.944 5.944 0 0 1 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.134 13.134 0 0 1 14.828 8c-.058.087-.122.183-.195.288c-.335.48-.83 1.12-1.465 1.755c-.165.165-.337.328-.517.486l.708.709z" />
                <path d="M11.297 9.176a3.5 3.5 0 0 0-4.474-4.474l.823.823a2.5 2.5 0 0 1 2.829 2.829l.822.822zm-2.943 1.299l.822.822a3.5 3.5 0 0 1-4.474-4.474l.823.823a2.5 2.5 0 0 0 2.829 2.829z" />
                <path d="M3.35 5.47c-.18.16-.353.322-.518.487A13.134 13.134 0 0 0 1.172 8l.195.288c.335.48.83 1.12 1.465 1.755C4.121 11.332 5.881 12.5 8 12.5c.716 0 1.39-.133 2.02-.36l.77.772A7.029 7.029 0 0 1 8 13.5C3 13.5 0 8 0 8s.939-1.721 2.641-3.238l.708.709zm10.296 8.884l-12-12l.708-.708l12 12l-.708.708z" />
              </g>
            </svg>
          ) : (
            <svg
              className="my-auto ml-4 h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="img"
              width="1em"
              height="1em"
              preserveAspectRatio="xMidYMid meet"
              viewBox="0 0 16 16"
            >
              <g fill="currentColor">
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0z" />
              </g>
            </svg>
          )}
        </button>
      </div>
    );
  } else if (fields?.type === "inputNumber") {
    return (
      <div className="mb-4 flex rounded bg-gray-100 p-4">
        <input
          aria-label={fields?.name}
          className="w-full bg-gray-100 text-xs outline-none"
          type="number"
          placeholder={fields?.placeholder}
          name={fields?.name}
          required={fields?.isRequired}
        />
      </div>
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
          aria-label={fields?.name}
          className="w-full rounded bg-gray-100 p-3 text-xs outline-none"
          name={fields?.name}
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
      <div className="mb-4 flex rounded bg-gray-100 p-4">
        <input
          aria-label={`${
            fields?.type === "inputText"
              ? `Input ${fields?.name}`
              : `${fields?.type}`
          }`}
          className="w-full bg-gray-100 text-xs outline-none"
          type={fields?.type === "inputEmail" ? "email" : "text"}
          placeholder={fields?.placeholder}
          name={fields?.name}
          required={fields?.isRequired}
        />
        {/* SVG icon on the right of the email input field */}
        {fields?.type === "inputEmail" && (
          <svg
            className="my-auto ml-4 h-6 w-6 text-gray-500"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
            />
          </svg>
        )}
      </div>
    );
  }
}

export default React.memo(VariantE);
