import React from "react";
import { urlFor } from "lib/sanity";
import Link from "next/link";
import Image from "next/image";
import WebriQForm from "components/webriq-form";
import { logoLink, thankYouPageLink } from "helper";

import { NewsletterProps } from ".";

function VariantA({ logo, title, description, form }: NewsletterProps) {
	const { id, fields, buttonLabel, thankYouPage } = form;

	return (
		<section>
			<div className="radius-for-skewed bg-gray-50 py-20">
				<div className="container mx-auto px-4">
					<div className="mx-auto max-w-xl text-center">
						{logo?.image && (
							<Link
								aria-label={
									logoLink(logo) === "/"
										? "Go to home page"
										: `Go to ${logoLink(logo)}`
								}
								className="mb-6 inline-block text-3xl font-bold leading-none"
								href={logoLink(logo)}>
								<Image
									src={urlFor(logo?.image)}
									width={48}
									height={48}
									alt={logo?.alt ?? "newsletter-logo"}
								/>
							</Link>
						)}
						<h1 className="font-heading mb-2 text-4xl font-bold lg:text-5xl">
							{title}
						</h1>
						<p className="mb-8 leading-loose text-gray-700">{description}</p>
						{fields && fields[0]?.name && (
							<WebriQForm
								method="POST"
								data-form-id={id}
								name="Newsletter-VariantA-Form"
								className="form-newsletter"
								data-thankyou-url={thankYouPageLink(thankYouPage)}
								scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms">
								<div className="mx-auto flex max-w-md flex-wrap items-center">
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
											className="w-auto rounded-l-xl rounded-t-xl bg-webriq-darkblue px-6 py-2 font-bold leading-loose text-gray-50 transition duration-200 hover:bg-webriq-blue"
											type="submit">
											{buttonLabel}
										</button>
									)}
								</div>
							</WebriQForm>
						)}
					</div>
				</div>
			</div>
		</section>
	);
}
export default React.memo(VariantA);
