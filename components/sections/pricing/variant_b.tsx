import React from "react";
import axios from "axios";
import { initiateCheckout } from "lib/checkout";
import { PricingProps } from ".";

function VariantB({
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
  const [usePlan, setUsePlan] = React.useState(plans);
  const [pKeyError, setPKError] = React.useState(false);
  const comma = Intl.NumberFormat("en-us");

  React.useEffect(() => {
    async function getPriceId(plans) {
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
            ].planType.replace(/ /g, "-")}-oneTime-Payment-${plans[i].price}`,
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
              if (item.product === productResponse.data.id) {
                plans[i]["variant_b_checkoutButton"] = item.id;
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
          <div className="mb-16 flex w-full flex-wrap items-center">
            <div className="w-full lg:w-1/2">
              {caption && (
                <span className="lg:text=base text-sm font-bold text-webriq-darkblue xl:text-base 2xl:text-base">
                  {caption}
                </span>
              )}
              {title && (
                <h1 className="font-heading mb-2 text-2xl font-bold lg:text-5xl xl:text-5xl 2xl:text-5xl">
                  {title}
                </h1>
              )}
            </div>
            <div className="w-full lg:w-1/2">
              {!description ? null : (
                <p className="max-w-xs text-sm leading-loose text-gray-500 lg:mx-auto lg:text-base xl:text-base 2xl:text-base">
                  {description}
                </p>
              )}
            </div>
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

          {usePlan &&
            usePlan.map((plan) => {
              return (
                <div
                  className="mb-8 flex w-full flex-wrap items-center rounded bg-white p-8 shadow"
                  key={plan._key}
                >
                  <div className="w-full self-start px-3 lg:w-1/5">
                    <h3 className="font-heading mb-4 text-xl font-bold lg:text-2xl xl:text-2xl 2xl:text-2xl">
                      {plan.planType}
                    </h3>
                  </div>
                  <div className="w-full px-3 lg:w-2/5">
                    <ul className="mb-4 text-gray-500">
                      {plan.planIncludes?.map((include) => (
                        <li className="mb-4 flex" key={include}>
                          <svg
                            className="mr-2 h-5 w-5 text-webriq-darkblue"
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
                          <span className="text-sm lg:text-base xl:text-base 2xl:text-base">
                            {include}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="w-full px-3 lg:w-1/5 lg:text-center">
                    <span className="text-4xl font-bold">
                      {isNaN(parseInt(plan.price))
                        ? plan.price
                        : `$${comma.format(+plan.price)}`}
                    </span>
                  </div>
                  <div className="w-full px-3 lg:w-1/5">
                    {plan.checkoutButtonName && (
                      <button
                        aria-label={plan.checkoutButtonName}
                        className={`mt-4 inline-block rounded-l-xl rounded-t-xl bg-webriq-darkblue px-6 py-2 font-bold leading-loose text-white transition duration-200 hover:bg-webriq-blue lg:mt-0  ${
                          !plan ||
                          (!plan?.variant_b_checkoutButton &&
                            "cursor-not-allowed bg-gray-100 disabled:opacity-50")
                        }`}
                        disabled={!plan || !plan?.variant_b_checkoutButton}
                        onClick={() => {
                          initiateCheckout(
                            {
                              lineItems: [
                                {
                                  price: plan.variant_b_checkoutButton,
                                  quantity: 1,
                                },
                              ],
                            },
                            stripePKey,
                            window.location.origin + "/success",
                            window.location.href,
                            false
                            // setPKError
                          );
                        }}
                      >
                        {!usePlan ? "Processing..." : plan.checkoutButtonName}
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </section>
  );
}
export default React.memo(VariantB);
