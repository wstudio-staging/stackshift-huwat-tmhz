import React from "react";
import axios from "axios";
import { initiateCheckout } from "lib/checkout";
import { PricingProps } from ".";

function VariantA({
  caption,
  title,
  description,
  plans,
  hashKey,
  apiVersion,
  stripeSKey,
  stripePKey,
  NEXT_PUBLIC_APP_URL,
}: PricingProps) {
  const [plan, setPlan] = React.useState("monthly");
  const [usePlan, setUsePlan] = React.useState(plans);
  const [pKeyError, setPKError] = React.useState(false);
  const comma = Intl.NumberFormat("en-us");

  React.useEffect(() => {
    async function getPriceId(plans: PricingProps["plans"]) {
      let i = 0;
      for (; i < plans?.length; ) {
        const productPayload = {
          credentials: {
            hashKey,
            stripeSKey,
            apiVersion,
          },
          stripeParams: {
            id: `webriq-studio-pricing-${plans[i]._key}-${i + 1}-${plans[
              i
            ].planType.replace(/ /g, "-")}-recurring-monthlyPrice-${
              plans[i].monthlyPrice
            }-yearlyPrice-${plans[i].yearlyPrice}`,
          },
        };

        const pricePayload = {
          credentials: {
            hashKey,
            stripeSKey,
            apiVersion,
          },
          stripeParams: {},
        };
        try {
          const product = await axios.post(
            `${NEXT_PUBLIC_APP_URL}/api/payments/stripe?resource=products&action=retrieve`,
            productPayload
          );
          const productResponse = await product.data;
          // plansResponse.push(data.data);

          const { data } = await axios.post(
            `${NEXT_PUBLIC_APP_URL}/api/payments/stripe?resource=prices&action=list`,
            pricePayload
          );

          if (data) {
            data?.data?.forEach((item) => {
              if (
                item.product === productResponse.data.id &&
                item.recurring.interval === "month"
              ) {
                plans[i]["variant_a_monthlyPriceCheckoutButton"] = item.id;
              } else if (
                item.product === productResponse.data.id &&
                item.recurring.interval === "year"
              ) {
                plans[i]["variant_a_yearlyPriceCheckoutButton"] = item.id;
              }
            });
          }
          setUsePlan(plans);
        } catch (error) {
          console.log(error);
        }
        i++;
      }
    }

    getPriceId(usePlan);
  }, [NEXT_PUBLIC_APP_URL, apiVersion, hashKey, stripeSKey, usePlan]);

  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-2xl text-center">
            <span className="font-bold text-webriq-darkblue">
              {caption && caption}
            </span>
            <h2 className="font-heading mb-2 text-4xl font-bold lg:text-5xl">
              {title && title}
            </h2>
            <p className="mb-6 text-gray-500">{description && description}</p>
            {plans?.[0]?.monthlyPrice && (
              <div className="inline-block rounded-lg bg-white px-1 py-1">
                <button
                  aria-label="Monthly Plan"
                  className={`mr-1 px-4 py-2 text-sm ${
                    plan === "monthly"
                      ? "rounded-lg bg-gray-50 text-gray-900 shadow"
                      : "text-gray-500"
                  } font-bold hover:text-gray-900 focus:outline-none`}
                  onClick={() => setPlan("monthly")}
                >
                  Monthly
                </button>
                <button
                  aria-label="Yearly Plan"
                  className={`px-4 py-2 text-sm ${
                    plan === "yearly"
                      ? "rounded-lg bg-gray-50 text-gray-900 shadow"
                      : "text-gray-500"
                  } font-bold focus:outline-none`}
                  onClick={() => setPlan("yearly")}
                >
                  Yearly
                </button>
              </div>
            )}
          </div>
          {pKeyError && (
            <div>
              <p
                style={{
                  fontSize: 9,
                  color: "red",
                  textAlign: "center",
                  padding: 20,
                }}
              >
                {`Stripe Checkout won't work because of an Invalid`}
                <strong> Stripe Public Key</strong>, please fix it in your
                studio under webriq-payments to get rid of this error message.
              </p>
            </div>
          )}
          <div className="-mx-4 flex flex-wrap">
            {usePlan?.map((planDetail, index) => {
              return (
                <div
                  className="mb-8 w-full px-4 md:w-1/2 lg:mb-5 lg:w-1/3"
                  key={planDetail._key}
                >
                  <div
                    className={`p-8 ${
                      index % 2 !== 0
                        ? "bg-webriq-darkblue text-white"
                        : "bg-white"
                    } rounded shadow`}
                  >
                    <h4
                      className={`font-heading mb-2 text-2xl font-bold ${
                        index % 2 !== 0 && "text-white"
                      }`}
                    >
                      {planDetail.planType}
                    </h4>
                    <span
                      className={`text-6xl font-bold ${
                        index % 2 !== 0 && "text-white"
                      }`}
                    >
                      {isNaN(parseInt(planDetail.monthlyPrice))
                        ? planDetail.monthlyPrice
                        : `$${
                            plan === "yearly"
                              ? comma.format(+planDetail.yearlyPrice)
                              : comma.format(+planDetail.monthlyPrice)
                          }`}
                    </span>
                    {!isNaN(parseInt(planDetail.monthlyPrice)) && (
                      <span
                        className={` text-xs ${
                          index % 2 !== 0 ? "text-white" : "text-gray-500"
                        }`}
                      >
                        /{plan}
                      </span>
                    )}
                    <p
                      className={`mb-6 mt-3 ${
                        index % 2 !== 0 ? "text-white" : "text-gray-500"
                      } leading-loose`}
                    >
                      {planDetail.description}
                    </p>
                    <ul
                      className={`mb-6 ${
                        index % 2 !== 0 ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {planDetail.planIncludes?.map((include) => (
                        <li className="mb-2 flex" key={include}>
                          <svg
                            className={`mr-2 h-5 w-5 ${
                              index % 2 !== 0
                                ? "text-baby-darkblue"
                                : "text-webriq-darkblue"
                            }`}
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          <span>{include}</span>
                        </li>
                      ))}
                    </ul>
                    <button
                      aria-label={planDetail.checkoutButtonName}
                      className={`inline-block w-full rounded-l-xl rounded-t-xl px-4 py-2 text-center ${
                        index % 2 !== 0
                          ? "bg-white text-black"
                          : "bg-webriq-darkblue text-white  hover:bg-webriq-blue"
                      } cursor-pointer font-bold leading-loose transition duration-200 ${
                        !planDetail ||
                        ("variant_a_monthlyPriceCheckoutButton" in planDetail &&
                          !planDetail?.variant_a_monthlyPriceCheckoutButton &&
                          "cursor-not-allowed bg-gray-100 disabled:opacity-50")
                      }`}
                      disabled={
                        !planDetail ||
                        ("variant_a_monthlyPriceCheckoutButton" in planDetail &&
                          !planDetail?.variant_a_monthlyPriceCheckoutButton)
                      }
                      onClick={() => {
                        initiateCheckout(
                          {
                            lineItems: [
                              {
                                price:
                                  plan === "monthly"
                                    ? planDetail.variant_a_monthlyPriceCheckoutButton
                                    : planDetail.variant_a_yearlyPriceCheckoutButton,
                                quantity: 1,
                              },
                            ],
                          },
                          stripePKey,
                          window.location.origin + "/success",
                          window.location.href,
                          true
                          // setPKError
                        );
                      }}
                    >
                      {!planDetail
                        ? "Processing..."
                        : planDetail.checkoutButtonName}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantA);
