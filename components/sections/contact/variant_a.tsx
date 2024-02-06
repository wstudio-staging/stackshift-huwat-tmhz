import React from "react";
import Image from "next/image";
import WebriQForm from "components/webriq-form";
import { PortableText, urlFor } from "lib/sanity";
import { thankYouPageLink } from "helper";
import { PortableTextComponents } from "@portabletext/react";

import { ContactProps } from ".";

function VariantA({
	contactDescription,
	officeInformation,
	contactEmail,
	contactNumber,
	socialLinks,
	form,
	block,
}: ContactProps) {
	const [value, setValue] = React.useState(null); // setting selected value for input field radio type
	const [checked, setChecked] = React.useState([]); // setting selected value for input field checkbox type
	const [filename, setFilename] = React.useState(null); // setting input field filename

	// block styling as props to `components` of the PortableText component
	const blockCustomization: PortableTextComponents = {
		marks: {
			internalLink: ({ children, value }) => (
				<a
					aria-label={value.href ?? "internal link"}
					style={{ color: "red" }}
					href={value.slug.current}>
					{children}
				</a>
			),
			link: ({ children, value }) =>
				value.blank ? (
					<a
						aria-label={value.href ?? "external link"}
						href={value.href}
						target="_blank"
						rel="noopener noreferrer">
						{children}
					</a>
				) : (
					<a
						aria-label={value.href ?? "external link"}
						style={{ color: "blue" }}
						href={value.href}>
						{children}
					</a>
				),
		},
	};

	const handleRadioChange = (e) => {
		setValue(e.target.value);
	};

	const handleCheckboxChange = (e) => {
		const { checked, value } = e.target;

		setChecked((prev) =>
			checked ? [...prev, value] : prev.filter((v) => v !== value)
		);
	};

	const handleShowFileName = (e) => {
		if (e.target.files.length > 0) {
			setFilename(e.target.files[0].name);
		}
	};

	return (
		<section>
			<div className="bg-gray-50 py-20">
				<div className="container mx-auto px-4">
					{contactDescription && (
						<div className="mb-12 px-5 sm:px-10 lg:px-0 lg:pl-10">
							<h1 className="font-heading text-4xl font-bold lg:text-5xl">
								Contact
							</h1>
							<p className="mt-5 leading-loose text-gray-700">
								{contactDescription}
							</p>
						</div>
					)}
					<div className="flex flex-wrap">
						<div className="mb-16 w-full px-5 sm:px-10 lg:mb-0 lg:w-1/2 lg:pr-0 lg:pl-10">
							<div className="flex flex-wrap">
								{officeInformation && (
									<div className="mb-12 w-full pr-10 md:w-1/2 lg:w-1/2">
										<h2 className="mb-5 text-3xl font-bold lg:text-4xl">
											Office
										</h2>
										<p className="text-gray-700">{officeInformation}</p>
									</div>
								)}
								{contactEmail || contactNumber ? (
									<div className="mb-12 w-full pr-10 md:w-1/2">
										<h2 className="mb-5 text-3xl font-bold lg:text-4xl">
											Contacts
										</h2>
										<p className="mb-5 text-gray-700">{contactEmail}</p>
										<p className="text-gray-700">{contactNumber}</p>
									</div>
								) : null}
								{socialLinks && (
									<div className="w-full md:w-1/3 lg:w-full">
										<h2 className="mb-5 text-3xl font-bold lg:text-4xl">
											Socials
										</h2>
										<div className="order-first mb-4 lg:order-last lg:mb-0">
											{socialLinks?.map(
												(social) =>
													social?.socialMediaLink && (
														<a
															aria-label={
																social?.socialMedia ||
																social?.socialMediaPlatform
															}
															className="mr-5 inline-block rounded bg-gray-50 hover:bg-gray-100"
															target="_blank"
															rel="noopener noreferrer"
															href={social?.socialMediaLink}
															key={social?._key}>
															{social?.socialMedia === "facebook" ? (
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="24"
																	height="24"
																	viewBox="0 0 24 24">
																	<path
																		fill="#0045d8"
																		d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"
																	/>
																</svg>
															) : social?.socialMedia === "twitter" ? (
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="24"
																	height="24"
																	viewBox="0 0 24 24">
																	<path
																		fill="#0045d8"
																		d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
																	/>
																</svg>
															) : social?.socialMedia === "instagram" ? (
																<svg
																	xmlns="http://www.w3.org/2000/svg"
																	width="24"
																	height="24"
																	viewBox="0 0 24 24">
																	<path
																		fill="#0045d8"
																		d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"
																	/>
																</svg>
															) : (
																social?.socialMediaIcon?.image && (
																	<Image
																		src={urlFor(social?.socialMediaIcon?.image)}
																		width={24}
																		height={24}
																		alt={
																			social?.socialMediaIcon?.alt ??
																			"contact-socialMedia-icon"
																		}
																	/>
																)
															)}
														</a>
													)
											)}
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="w-full px-5 sm:px-10 lg:w-1/2 lg:px-0 lg:pl-10">
							{form?.fields && (
								<div className="lg:mx-auto lg:max-w-md">
									<WebriQForm
										method="POST"
										data-form-id={form?.id}
										name="Contact-VariantA-Form"
										className="form-contacts"
										data-thankyou-url={thankYouPageLink(form?.thankYouPage)}
										scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms">
										{form?.fields?.map((formFields, index) => (
											<div key={index}>
												{formFields?.type === "textarea" ? (
													<div className="mb-4">
														<textarea
															aria-label={
																formFields?.placeholder ?? formFields?.name
															}
															className="h-24 w-full resize-none rounded bg-white p-4 text-xs font-semibold leading-none outline-none"
															placeholder={formFields?.placeholder}
															name={formFields?.name}
															required={formFields?.isRequired}
														/>
													</div>
												) : formFields?.type === "inputFile" ? (
													<div className="mb-4">
														<label className="flex rounded bg-white px-2">
															<input
																aria-label={
																	formFields?.name ?? "Choose file..."
																}
																className="absolute opacity-0"
																type="file"
																placeholder="Choose file.."
																name={formFields?.name}
																required={formFields?.isRequired}
																onChange={handleShowFileName}
															/>
															<span className="w-full px-2 py-4 text-xs font-semibold leading-none">
																{filename}
															</span>
															<div className="my-1 ml-auto cursor-pointer rounded bg-gray-500 px-4 py-3 text-xs font-semibold leading-none text-white transition duration-200 hover:bg-gray-600">
																Browse
															</div>
														</label>
													</div>
												) : formFields.type === "inputNumber" ? (
													<input
														aria-label={
															formFields?.placeholder ?? formFields?.name
														}
														className="mb-4 w-full rounded bg-white p-4 text-xs font-semibold leading-none outline-none"
														type="number"
														placeholder={formFields?.placeholder}
														name={formFields?.name}
														required={formFields?.isRequired}
													/>
												) : formFields.type === "inputSelect" ? (
													<div className="mb-4 flex">
														<label
															className="m-auto text-left text-xs font-semibold leading-none text-gray-500"
															htmlFor={formFields?.name}>
															{formFields?.label}
														</label>
														<select
															aria-label={formFields?.label}
															className="w-full rounded bg-white p-3 text-xs font-semibold text-gray-500 outline-none"
															name={`contact-${formFields?.name}`}
															defaultValue={"default-value"}
															required={formFields?.isRequired}>
															<option value=""></option>
															{formFields?.items?.map((item, index) => (
																<option key={index} value={item}>
																	{item}
																</option>
															))}
														</select>
													</div>
												) : formFields?.type === "inputRadio" ? (
													<div className="mb-4 text-left">
														<label
															className="m-auto text-left text-xs font-semibold text-gray-500"
															htmlFor={formFields?.name}>
															{formFields?.label}
														</label>
														<div>
															{formFields?.items?.map((item, index) => (
																<label
																	className="mr-4 text-xs font-semibold text-gray-500"
																	key={index}>
																	<input
																		className="mr-2"
																		name={formFields?.name}
																		value={item}
																		type="radio"
																		onChange={handleRadioChange}
																		checked={value === item}
																		required={formFields?.isRequired}
																	/>
																	{item}
																</label>
															))}
														</div>
													</div>
												) : formFields?.type === "inputCheckbox" ? (
													<div className="mb-4 text-left">
														<label
															className="m-auto text-left text-xs font-semibold text-gray-500"
															htmlFor={formFields?.name}>
															{formFields?.label}
														</label>
														<div>
															{formFields?.items?.map((item, index) => (
																<label
																	className="mr-4 text-xs font-semibold text-gray-500"
																	key={index}>
																	<input
																		className="mr-2"
																		name={formFields?.name}
																		value={item}
																		type="checkbox"
																		onChange={handleCheckboxChange}
																		checked={checked.some((v) => v === item)}
																		required={
																			formFields?.isRequired &&
																			checked.length === 0
																				? true
																				: false
																		}
																	/>
																	{item}
																</label>
															))}
														</div>
													</div>
												) : (
													<div className="mb-4">
														<input
															aria-label={
																formFields?.placeholder ?? formFields?.name
															}
															className="w-full rounded bg-white p-4 text-xs font-semibold leading-none outline-none"
															type={
																formFields?.type === "inputEmail"
																	? "email"
																	: formFields?.type === "inputPassword"
																	? "password"
																	: "text"
															}
															placeholder={formFields?.placeholder}
															name={formFields?.name}
															required={formFields?.isRequired}
														/>
													</div>
												)}
											</div>
										))}
										<div className="items-center sm:flex sm:justify-between">
											{block && (
												<div className="inline-flex">
													<input
														aria-label="Agree to terms"
														className="mr-2 mt-1"
														type="checkbox"
														id="terms"
														name="terms"
														defaultValue={1}
														required
													/>
													<span className="text-sm font-semibold">
														<PortableText
															value={block}
															components={blockCustomization}
														/>
													</span>
												</div>
											)}
											<div>
												<div className="webriq-recaptcha" />
											</div>
											{form?.buttonLabel && (
												<button
													aria-label={
														form?.buttonLabel ?? "Contact form submit button"
													}
													className="mt-5 inline-block rounded-l-xl rounded-t-xl bg-webriq-darkblue px-6 py-2 font-bold leading-loose text-white transition duration-200 hover:bg-webriq-blue sm:mt-0"
													type="submit">
													{form?.buttonLabel}
												</button>
											)}
										</div>
									</WebriQForm>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
export default React.memo(VariantA);
