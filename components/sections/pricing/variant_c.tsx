import React from "react";
import axios from "axios";
import { initiateCheckout } from "lib/checkout";
import { PricingProps } from ".";

function VariantC({
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
                plans[i]["variant_c_monthlyPriceCheckoutButton"] = item.id;
              } else if (
                item.product === productResponse.data.id &&
                item.recurring.interval === "year"
              ) {
                plans[i]["variant_c_yearlyPriceCheckoutButton"] = item.id;
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
  }, [NEXT_PUBLIC_APP_URL, apiVersion, hashKey, plans, stripeSKey, usePlan]);

  return (
    <section>
      <div className="radius-for-skewed bg-gray-50 py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-lg text-center">
            {caption && (
              <span className="font-bold text-webriq-darkblue">{caption}</span>
            )}
            {title && (
              <h2 className="font-heading mb-2 text-4xl font-bold lg:text-5xl">
                {title}
              </h2>
            )}
            {description && <p className="mb-6 text-gray-500">{description}</p>}
            {usePlan && (
              <div className="inline-block rounded-lg bg-white px-1 py-1">
                <button
                  aria-label="Monthly Plan"
                  className={`mr-1 px-4 py-2 text-sm ${
                    plan === "monthly"
                      ? "rounded-lg bg-gray-50 text-gray-900 shadow"
                      : "text-gray-500"
                  } font-bold focus:outline-none`}
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
            {usePlan &&
              usePlan?.map((planDescription, index) => {
                return (
                  <div
                    className="mb-8 w-full px-4 md:w-1/2 lg:mb-8 lg:w-1/3"
                    key={index}
                  >
                    <div className="mx-auto max-w-md rounded bg-white px-10 py-8 text-center shadow">
                      <div className="mb-12">
                        <h3 className="font-heading mb-4 text-2xl font-bold">
                          {planDescription?.planType}
                        </h3>
                        <p className="mb-6 text-gray-500">
                          {planDescription?.description}
                        </p>
                      </div>
                      <div>
                        <span className="text-5xl font-bold lg:text-6xl">
                          {isNaN(parseInt(planDescription?.monthlyPrice))
                            ? planDescription?.monthlyPrice
                            : `$${
                                plan === "yearly"
                                  ? comma.format(+planDescription?.yearlyPrice)
                                  : comma.format(+planDescription?.monthlyPrice)
                              }`}
                        </span>
                        {!isNaN(parseInt(planDescription?.price)) && (
                          <span className="text-gray-500">{`/${plan}`}</span>
                        )}
                        <button
                          aria-label={planDescription?.checkoutButtonName}
                          className={`mt-6 block w-full rounded-l-xl rounded-t-xl bg-webriq-darkblue px-6 py-2 font-bold leading-loose text-white transition duration-200 hover:bg-webriq-blue ${
                            !planDescription ||
                            (!planDescription?.variant_c_monthlyPriceCheckoutButton &&
                              "cursor-not-allowed bg-gray-100 disabled:opacity-50")
                          }`}
                          disabled={
                            !planDescription ||
                            !planDescription?.variant_c_monthlyPriceCheckoutButton
                          }
                          onClick={() => {
                            initiateCheckout(
                              {
                                lineItems: [
                                  {
                                    price:
                                      plan === "monthly"
                                        ? planDescription?.variant_c_monthlyPriceCheckoutButton
                                        : planDescription?.variant_c_yearlyPriceCheckoutButton,
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
                          {!usePlan[0]
                            ? "Processing..."
                            : planDescription?.checkoutButtonName}
                        </button>
                      </div>
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
export default React.memo(VariantC);
