import React from "react";
import WebriQForm from "components/webriq-form";
import Image from "next/image";
import Link from "next/link";
import { PortableText, urlFor } from "lib/sanity";
import { initiateCheckout } from "lib/checkout";
import {
	CardElement,
	Elements,
	useElements,
	useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import router from "next/router";
import { thankYouPageLink, ConditionalLink } from "helper";
import { PricingProps } from ".";
import { MyPortableTextComponents } from "types";

function VariantD({
	caption,
	title,
	description,
	annualBilling,
	monthlyBilling,
	banner,
	formFields,
	formId,
	formName,
	formThankYouPage,
	block,
	signInLink,
	hashKey,
	apiVersion,
	stripeSKey,
	stripePKey,
	NEXT_PUBLIC_APP_URL,
}: PricingProps) {
	// const [pKeyError, setPKError] = React.useState(false);
	const [useCheckout, setUseCheckout] = React.useState({
		monthlyCheckout: "",
		yearlyCheckout: "",
	});
	const [banners, setBanners] = React.useState(0);
	const [billing, setBilling] = React.useState({ amount: 0, billType: "" });
	const [paymentOngoing, setPaymentOngoing] = React.useState(false);
	const stripePromise = loadStripe(stripePKey);

	const handleChange = (e) => {
		e.target.value === monthlyBilling
			? setBilling({ amount: e.target.value, billType: "Monthly" })
			: setBilling({ amount: e.target.value, billType: "Annual" });
	};

	React.useEffect(() => {
		async function getPriceId() {
			const productPayload = {
				credentials: {
					hashKey,
					stripeSKey,
					apiVersion,
				},
				stripeParams: {
					id: `webriq-studio-pricing-formPayment-${formId}-recurring-monthlyPrice-${monthlyBilling}-yearlyPrice-${annualBilling}`,
				},
			};

			const pricePayload = {
				credentials: {
					hashKey,
					stripeSKey,
					apiVersion,
				},
			};

			try {
				const product = await axios.post(
					`${NEXT_PUBLIC_APP_URL}/api/payments/stripe?resource=products&action=retrieve`,
					productPayload
				);
				const { data } = await product.data;

				const prices = await axios.post(
					`${NEXT_PUBLIC_APP_URL}/api/payments/stripe?resource=prices&action=list`,
					pricePayload
				);
				const pricesData = await prices.data;

				pricesData.data.map((price) => {
					if (
						price.product === data.id &&
						price.recurring.interval === "month"
					) {
						useCheckout["monthlyCheckout"] = price.id;
					} else if (
						price.product === data.id &&
						price.recurring.interval === "year"
					) {
						useCheckout["yearlyCheckout"] = price.id;
						setUseCheckout((prevState) => ({ ...prevState }));
					}
				});
			} catch (error) {
				console.log(error);
			}
		}

		getPriceId();
	}, [
		NEXT_PUBLIC_APP_URL,
		annualBilling,
		apiVersion,
		formId,
		hashKey,
		monthlyBilling,
		stripeSKey,
		useCheckout,
	]);

	// block styling as props to `components` of the PortableText component
	const blockCustomization: MyPortableTextComponents = {
		block: {
			normal: ({ children }) => {
				return <p className="text-xs">{children}</p>;
			},
		},
		marks: {
			link: ({ children, value }) => (
				<a
					aria-label={value.href ?? "external link"}
					className="font-bold text-webriq-darkblue hover:text-webriq-darkblue"
					href={value.href}>
					{children}
				</a>
			),
		},
	};

	const Form = () => {
		const elements = useElements();
		const stripe = useStripe();
		const [showPassword, setShowPassword] = React.useState(false); // show or hide password field value
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

		const handleSubmit = async (event) => {
			event.preventDefault();
			let data = {};
			formFields?.forEach((field) => {
				const formData = new FormData(
					document.querySelector(`form[name='${formName}']`)
				).get(field.name);
				if (field.name === "Card number") {
					data["creditCard"] = "************************";
				} else {
					data[field.name] = formData;
				}
			});

			if (elements == null) {
				return;
			}
			const { data: monthlyBilling_ClientSecret } = await axios.post(
				"/api/paymentIntent",
				{
					amount: +monthlyBilling * 100,
					stripeSKey: stripeSKey,
					hashKey,
				}
			);

			const { data: yearlyBilling_ClientSecret } = await axios.post(
				"/api/paymentIntent",
				{
					amount: +annualBilling * 100,
					stripeSKey: stripeSKey,
					hashKey,
				}
			);

			const { paymentMethod } = await stripe.createPaymentMethod({
				type: "card",
				card: elements.getElement(CardElement),
			});

			if (paymentMethod) {
				const { error, paymentIntent } = await stripe.confirmCardPayment(
					billing.billType === "Monthly"
						? monthlyBilling_ClientSecret
						: yearlyBilling_ClientSecret,
					{
						payment_method: paymentMethod.id,
					}
				);
				if (paymentIntent) {
					const response = await fetch("/api/submitForm", {
						method: "POST",
						body: JSON.stringify({ data, id: formId }),
					});
					const responseData = await response.json();

					setPaymentOngoing(true);
					if (response.statusText === "OK") {
						router.push("/success");
					}
				}
			}
		};

		return (
			<div className="mb-8 w-full md:mb-0 md:w-1/2">
				<div className="px-6 py-8 text-center lg:px-8">
					<p className="font-heading mb-8 text-2xl">{formName}</p>
					{formFields && (
						<WebriQForm
							stripepkey={stripePKey}
							method="POST"
							data-form-id={formId}
							name={formName}
							className="form-pricing"
							data-thankyou-url={thankYouPageLink(formThankYouPage)}
							scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms">
							{formFields?.map((field, index) => {
								return (
									<div key={index}>
										{field.pricingType === "textarea" ? (
											<div className="mb-4">
												<textarea
													aria-label={field?.placeholder ?? field?.name}
													className="h-24 w-full resize-none rounded bg-gray-50 p-4 text-xs font-semibold leading-none outline-none"
													placeholder={field?.placeholder}
													name={field?.name}
													required={field?.isRequired}
												/>
											</div>
										) : field.pricingType === "inputFile" ? (
											<div className="mb-4">
												<label className="flex rounded bg-white px-2">
													<input
														aria-label="Choose file.."
														className="hidden"
														type="file"
														placeholder="Choose file.."
														name={field?.name}
														required={field?.isRequired}
													/>
													<div className="my-1 ml-auto cursor-pointer rounded bg-gray-500 px-4 py-3 text-xs font-semibold leading-none text-white transition duration-200 hover:bg-gray-600">
														Browse
													</div>
												</label>
											</div>
										) : field.pricingType === "inputCard" ? (
											<div className="mb-4">
												<CardElement className="w-full rounded bg-gray-50 p-4 text-xs font-semibold leading-none outline-none" />
												{paymentOngoing && (
													<div
														style={{
															textAlign: "left",
															marginTop: 12,
															fontSize: 12,
															color: "green",
														}}>
														Payment Success!
													</div>
												)}
											</div>
										) : field.pricingType === "inputNumber" ? (
											<div className="mb-4">
												<input
													aria-label={field?.placeholder ?? field?.name}
													className="w-full rounded bg-gray-50 p-4 text-xs font-semibold leading-none outline-none"
													type="number"
													placeholder={field?.placeholder}
													name={field?.name}
													required={field?.isRequired}
												/>
											</div>
										) : field.pricingType === "inputPassword" ? (
											<div className="mb-4 flex rounded bg-gray-50">
												<input
													aria-label={field?.placeholder ?? field?.name}
													className="w-full rounded bg-gray-50 p-4 text-xs font-semibold leading-none outline-none"
													type={showPassword ? "text" : "password"}
													placeholder={field?.placeholder}
													name={field?.name}
													required={field?.isRequired}
												/>
												{/* SVG icon on the right of the password input field */}
												<button
													aria-label={
														showPassword ? "Show password" : "Hide password"
													}
													className="pr-4 focus:outline-none"
													onClick={() => setShowPassword(!showPassword)}>
													{showPassword ? (
														<svg
															className="my-auto ml-4 h-5 w-5 text-gray-500"
															xmlns="http://www.w3.org/2000/svg"
															aria-hidden="true"
															role="img"
															width="1em"
															height="1em"
															preserveAspectRatio="xMidYMid meet"
															viewBox="0 0 16 16">
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
															viewBox="0 0 16 16">
															<g fill="currentColor">
																<path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
																<path d="M8 5.5a2.5 2.5 0 1 0 0 5a2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0a3.5 3.5 0 0 1-7 0z" />
															</g>
														</svg>
													)}
												</button>
											</div>
										) : field.pricingType === "inputSelect" ? (
											<div className="mb-4 flex">
												<label
													className="m-auto text-left text-xs text-gray-500"
													htmlFor={field?.name}>
													{field?.label}
												</label>
												<select
													className="w-full rounded bg-gray-50 p-3 text-xs outline-none"
													name={`pricing-${field?.name}`}
													defaultValue={"default-value"}
													required={field?.isRequired}>
													<option value=""></option>
													{field?.items?.map((item, index) => (
														<option key={index} value={item}>
															{item}
														</option>
													))}
												</select>
											</div>
										) : field?.type === "inputRadio" ? (
											<div className="mb-4 text-left">
												<label
													className="m-auto text-left text-xs text-gray-500"
													htmlFor={field?.name}>
													{field?.label}
												</label>
												<div>
													{field?.items?.map((item, index) => (
														<label
															className="mr-4 text-xs text-gray-500"
															key={index}>
															<input
																className="mr-2"
																name={field?.name}
																value={item}
																type="radio"
																onChange={handleRadioChange}
																checked={value === item}
																required={field?.isRequired}
															/>
															{item}
														</label>
													))}
												</div>
											</div>
										) : field?.type === "inputCheckbox" ? (
											<div className="mb-4 text-left">
												<label
													className="m-auto text-left text-xs text-gray-500"
													htmlFor={field?.name}>
													{field?.label}
												</label>
												<div>
													{field?.items?.map((item, index) => (
														<label
															className="mr-4 text-xs text-gray-500"
															key={index}>
															<input
																className="mr-2"
																name={field?.name}
																value={item}
																type="checkbox"
																onChange={handleCheckboxChange}
																checked={checked.some((v) => v === item)}
																required={
																	field?.isRequired && checked.length === 0
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
											<div className="mb-4 flex rounded bg-gray-50">
												<input
													aria-label={`${
														field?.type === "inputText"
															? `Input ${field?.name}`
															: `${field?.type}`
													}`}
													className="w-full rounded bg-gray-50 p-4 text-xs font-semibold leading-none outline-none"
													type={
														field.pricingType === "inputEmail"
															? "email"
															: field.pricingType === "inputPassword"
															? "password"
															: "text"
													}
													placeholder={field?.placeholder}
													name={field?.name}
													required={field?.isRequired}
												/>
												{/* SVG icon on the right of the email input field */}
												{field?.pricingType === "inputEmail" && (
													<svg
														className="my-auto ml-4 mr-4 h-6 w-6 text-gray-500"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
														stroke="currentColor">
														<path
															strokeLinecap="round"
															strokeLinejoin="round"
															strokeWidth={2}
															d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
														/>
													</svg>
												)}
											</div>
										)}
									</div>
								);
							})}
							<div className="mb-5 text-left text-sm text-gray-500">
								<label className="inline-flex">
									<input
										aria-label="Agree to terms"
										className="mr-2"
										type="checkbox"
										name="terms"
										defaultValue={1}
									/>
									<PortableText value={block} components={blockCustomization} />
								</label>
							</div>
							<div>
								<div className="webriq-recaptcha" />
							</div>
							<button
								id="submitBtn"
								aria-label="Submit Pricing Form button"
								onClick={(e) => handleSubmit(e)}
								// type="submit"
								// onClick={() =>
								//   initiateCheckout(
								//     {
								//       lineItems: [
								//         {
								//           price:
								//             billing.billType === "Monthly"
								//               ? useCheckout.monthlyCheckout
								//               : useCheckout.yearlyCheckout,
								//           quantity: 1,
								//         },
								//       ],
								//     },
								//     stripePKey,
								//     window.location.origin + "/success",
								//     window.location.href,
								//     true,
								//     setPKError
								//   )
								// }
								className={`block w-full rounded-l-xl rounded-t-xl bg-webriq-blue p-4 text-center font-bold leading-none text-white transition duration-200 hover:bg-webriq-darkblue ${
									billing.billType === "" &&
									"cursor-not-allowed disabled:opacity-50"
								}`}
								disabled={billing.billType === ""}>
								{/* {paymentOngoing
                  ? "Processing Payment...."
                  : `Buy ${billing.billType} Supply`} */}
								Buy {billing.billType} Supply
							</button>
						</WebriQForm>
					)}
					{signInLink?.label && (
						<p className="text-xs text-gray-500">
							Already have an account?{" "}
							<ConditionalLink
								link={signInLink}
								style="text-webriq-darkblue hover:underline"
								ariaLabel={signInLink?.label}>
								{signInLink?.label}
							</ConditionalLink>
						</p>
					)}
				</div>
			</div>
		);
	};

	return (
		<section>
			<div className="radius-for-skewed bg-gray-50 py-20">
				<div className="container mx-auto px-4">
					<div className="mx-auto mb-16 max-w-2xl text-center">
						<div className="mx-auto max-w-lg">
							<span className="font-bold text-webriq-darkblue">{caption}</span>
							<h1 className="font-heading mb-2 text-4xl font-bold lg:text-5xl">
								{title}
							</h1>
							<p className="mb-8 text-gray-500">{description}</p>
						</div>
						<div className="flex flex-wrap justify-center">
							{monthlyBilling && (
								<label className="mb-2 mr-8 flex w-full items-center sm:w-auto md:mr-4">
									<input
										aria-label={`Select ${monthlyBilling}`}
										type="radio"
										name="billing"
										defaultValue={monthlyBilling}
										onChange={(e) => handleChange(e)}
									/>
									<span className="mx-2 font-semibold">Monthly Billing</span>
									<span className="inline-flex h-10 w-16 items-center justify-center rounded-lg bg-webriq-darkblue font-semibold text-white">
										${monthlyBilling}
									</span>
								</label>
							)}
							{annualBilling && (
								<label className="mb-2 flex w-full items-center sm:w-auto">
									<input
										aria-label={`Select ${annualBilling}`}
										type="radio"
										name="billing"
										defaultValue={annualBilling}
										onChange={(e) => handleChange(e)}
									/>
									<span className="mx-2 font-semibold">Annual Billing</span>
									<span className="inline-flex h-10 w-16 items-center justify-center rounded-lg bg-webriq-darkblue font-semibold text-white">
										${annualBilling}
									</span>
								</label>
							)}
						</div>
					</div>
					<div className="flex flex-wrap rounded bg-white shadow">
						<Elements stripe={stripePromise}>
							<Form />
						</Elements>
						<div className="flex w-full flex-col overflow-hidden bg-webriq-darkblue py-10 md:w-1/2 lg:rounded-r">
							{banner?.[banners]?.mainImage?.image?.asset?._ref && (
								<div className="mx-auto my-auto w-full md:max-w-xs">
									<Image
										className="object-cover"
										src={urlFor(banner?.[banners]?.mainImage.image)}
										sizes="100vw"
										width={320}
										height={296}
										alt={`pricing-image-${banners}`}
									/>
								</div>
							)}
							<p className="mx-auto mb-4 max-w-sm text-center text-xl text-white">
								{banner?.[banners]?.title}
							</p>
							<div className="text-center">
								{banner?.map((item, index) => (
									<button
										aria-label={`Page ${index} button`}
										key={item?._key}
										className={` ${
											banners === index
												? "mr-2 inline-block h-2 w-2 rounded-full bg-white focus:outline-none"
												: "mr-2 inline-block h-2 w-2 rounded-full bg-webriq-babyblue focus:outline-none"
										} `}
										onClick={() => setBanners(index)}
									/>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default React.memo(VariantD);
