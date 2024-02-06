import { NEXT_PUBLIC_APP_URL } from "../../config";

const retrieveProducts = `${
  NEXT_PUBLIC_APP_URL || "https://dxpstudio.webriq.com"
}/api/payments/stripe?resource=products&action=retrieve`;

const createProducts = `${
  NEXT_PUBLIC_APP_URL || "https://dxpstudio.webriq.com"
}/api/payments/stripe?resource=products&action=create`;

const createPriceForProduct = `${
  NEXT_PUBLIC_APP_URL || "https://dxpstudio.webriq.com"
}/api/payments/stripe?resource=prices&action=create`;

// const updateProducts = `${
//   NEXT_PUBLIC_APP_URL || "https://dxpstudio.webriq.com"
// }/api/payments/stripe?resource=products&action=update`;

const updatePriceForProduct = `${
  NEXT_PUBLIC_APP_URL || "https://dxpstudio.webriq.com"
}/api/payments/stripe?resource=prices&action=update`;

const listOfPrices = `${
  NEXT_PUBLIC_APP_URL || "https://dxpstudio.webriq.com"
}/api/payments/stripe?resource=prices&action=list`;

export const processData = async (payload) => {
  const { data, variant, type } = payload;

  if (type === "pricing") {
    let stripeAcc;
    if (data?.selectStripeAccount) {
      stripeAcc = JSON.parse(data.selectStripeAccount);
    }

    if (!stripeAcc && data) {
      return {
        status: 500,
        statusText: `Select a stripe account. If you haven't had any, please create under payments`,
      };
    }

    if (variant !== "variant_d" && !data?.plans && data) {
      return {
        status: 500,
        statusText: `You should add at least one plan for your pricing.`,
      };
    }

    if (
      variant === "variant_d" &&
      (!data?.monthlyBilling || !data?.annualBilling) &&
      data
    ) {
      return {
        status: 500,
        statusText: `"Monthly Billing" and "Annual Billing" should not be blank.`,
      };
    }

    // If variant is equal to a or c, then will create the annual and monthly billing. Otherwise if variant is b, then it will create the plans under pricing
    if (
      variant === "variant_a" ||
      (variant === "variant_c" && stripeAcc && data?.plans && data)
    ) {
      // iterate all over the plan to create the product that is ready for checkout
      let i = 0;
      const { plans } = data;
      for (; i < plans.length; ) {
        if (!plans[i].planType) {
          return {
            status: 500,
            statusText: `Plan Type should not be blank on plan ${i + 1}`,
          };
        } else if (!plans[i].monthlyPrice || !plans[i].yearlyPrice) {
          return {
            status: 500,
            statusText: `Monthly Price and Yearly Price should not be blank on plan "${plans[i].planType}"`,
          };
        }

        const credentials = {
          stripeSKey: stripeAcc.stripeSKey,
          hashKey: stripeAcc.hashKey,
          apiVersion: stripeAcc.apiVersion,
        };

        const productId = `webriq-studio-pricing-${plans[i]._key}-${
          i + 1
        }-${plans[i].planType.replace(/ /g, "-")}-recurring-monthlyPrice-${
          plans[i].monthlyPrice
        }-yearlyPrice-${plans[i].yearlyPrice}`;

        try {
          const productPayload = {
            credentials,
            stripeParams: {
              id: productId,
            },
          };

          const response = await fetch(retrieveProducts, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(productPayload),
          });
          const { meta } = await response.json();

          if (meta.status === 404) {
            // If Product not found it will create it

            const createProductPayload = {
              credentials,
              stripeParams: {
                id: productId,
                metadata: !plans[i].planIncludes ? {} : plans[i].planIncludes,
                name: plans[i].planType,
                description: plans[i].description,
              },
            };

            const createProduct = await fetch(createProducts, {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(createProductPayload),
            });
            const { id } = await createProduct.json();

            // Create price if successully created a product
            if (id) {
              // Yearly Price
              const yearlyPricePayload = {
                credentials,
                stripeParams: {
                  product: id,
                  currency: "usd",
                  metadata: !plans[i].planIncludes ? {} : plans[i].planIncludes,

                  unit_amount: isNaN(parseInt(plans[i].yearlyPrice))
                    ? 0
                    : plans[i].yearlyPrice * 100,
                  recurring: {
                    interval: "year",
                  },
                },
              };
              const createYearlyPrice = await fetch(createPriceForProduct, {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(yearlyPricePayload),
              });

              await createYearlyPrice.json();

              // Monthly Price
              const monthlyPricePayload = {
                credentials,
                stripeParams: {
                  product: id,
                  currency: "usd",
                  metadata: !plans[i].planIncludes ? {} : plans[i].planIncludes,

                  unit_amount: isNaN(parseInt(plans[i].monthlyPrice))
                    ? 0
                    : plans[i].monthlyPrice * 100,
                  recurring: {
                    interval: "month",
                  },
                },
              };
              const createMonthlyPrice = await fetch(createPriceForProduct, {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(monthlyPricePayload),
              });

              await createMonthlyPrice.json();
            }
          } else {
            const payload = {
              credentials,
              stripeParams: {},
            };
            // // If Product not found it will update it
            const getPrices = await fetch(listOfPrices, {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(payload),
            });

            const { data } = await getPrices.json();

            const price = data.filter((item) => {
              if (item.product === productId) {
                return item;
              }
            });

            if (price.length >= 2) {
              price.forEach(async (price) => {
                if (price.recurring.interval === "month") {
                  const monthlyPricePayload = {
                    credentials,
                    stripeParams: {
                      id: price.id,
                      currency: "usd",
                      metadata: !plans[i].planIncludes
                        ? {}
                        : plans[i].planIncludes,

                      unit_amount: isNaN(parseInt(plans[i].monthlyPrice))
                        ? 0
                        : plans[i].monthlyPrice * 100,
                      recurring: {
                        interval: "month",
                      },
                    },
                  };

                  const updateMonthlyPrice = await fetch(
                    updatePriceForProduct,
                    {
                      headers: {
                        "Content-Type": "application/json",
                      },
                      method: "POST",
                      body: JSON.stringify(monthlyPricePayload),
                    }
                  );

                  await updateMonthlyPrice.json();
                } else {
                  const yearlyPricePayload = {
                    credentials,
                    stripeParams: {
                      id: price.id,
                      currency: "usd",
                      metadata: !plans[i].planIncludes
                        ? {}
                        : plans[i].planIncludes,

                      unit_amount: isNaN(parseInt(plans[i].yearlyPrice))
                        ? 0
                        : plans[i].yearlyPrice * 100,
                      recurring: {
                        interval: "year",
                      },
                    },
                  };

                  const updateYearlyPrice = await fetch(updatePriceForProduct, {
                    headers: {
                      "Content-Type": "application/json",
                    },
                    method: "POST",
                    body: JSON.stringify(yearlyPricePayload),
                  });

                  await updateYearlyPrice.json();
                }
              });
            }
          }
        } catch (error) {
          console.log("error", error);
        }
        i++;
      }
    } else if (variant === "variant_b" && stripeAcc && data?.plans && data) {
      // iterate all over the plan to create the product that is ready for checkout
      let i = 0;
      const { plans } = data;
      for (; i < plans.length; ) {
        if (!plans[i].planType) {
          return {
            status: 500,
            statusText: `Plan Type should not be blank on plan ${i + 1}`,
          };
        } else if (!plans[i].price) {
          return {
            status: 500,
            statusText: `Price should not be blank and it should be a number on plan "${plans[i].planType}"`,
          };
        }

        const credentials = {
          stripeSKey: stripeAcc.stripeSKey,
          hashKey: stripeAcc.hashKey,
          apiVersion: stripeAcc.apiVersion,
        };

        const productId = `webriq-studio-pricing-${plans[i]._key}-${
          i + 1
        }-${plans[i].planType.replace(/ /g, "-")}-oneTime-Payment-${
          plans[i].price
        }`;

        try {
          const productPayload = {
            credentials,
            stripeParams: {
              id: productId,
            },
          };

          const response = await fetch(retrieveProducts, {
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(productPayload),
          });
          const { meta } = await response.json();

          if (meta.status === 404) {
            // If Product not found it will create it

            const createProductPayload = {
              credentials,
              stripeParams: {
                id: productId,
                metadata: !plans[i].planIncludes ? {} : plans[i].planIncludes,
                name: plans[i].planType,
                description: plans[i].description,
              },
            };

            const createProduct = await fetch(createProducts, {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(createProductPayload),
            });
            const { id } = await createProduct.json();

            // Create price if successully created a product
            if (id) {
              // OneTime Price

              const oneTimePaymentPayload = {
                credentials,
                stripeParams: {
                  product: id,
                  currency: "usd",
                  metadata: !plans[i].planIncludes ? {} : plans[i].planIncludes,
                  unit_amount: isNaN(parseInt(plans[i].price))
                    ? 0
                    : plans[i].price * 100,
                },
              };
              await fetch(createPriceForProduct, {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(oneTimePaymentPayload),
              });
            }
          } else {
            const payload = {
              credentials,
              stripeParams: {},
            };
            // // If Product found it will update it
            const getPrices = await fetch(listOfPrices, {
              headers: {
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify(payload),
            });

            const { data } = await getPrices.json();

            const price = data.filter((item) => {
              if (item.product === productId) {
                return item;
              }
            });

            if (price) {
              const updaterOneTimePaymentPayload = {
                credentials,
                stripeParams: {
                  product: price.id,
                  currency: "usd",
                  metadata: !plans[i].planIncludes ? {} : plans[i].planIncludes,
                  unit_amount: isNaN(parseInt(plans[i].price))
                    ? 0
                    : plans[i].price * 100,
                },
              };
              await fetch(updatePriceForProduct, {
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
                body: JSON.stringify(updaterOneTimePaymentPayload),
              });
            }
          }
        } catch (error) {
          console.log("error", error);
        }
        i++;
      }
    } else if (
      variant === "variant_d" &&
      stripeAcc &&
      data?.monthlyBilling &&
      data?.annualBilling &&
      data
    ) {
      // Create the products

      if (!data.form.id) {
        return {
          status: 500,
          statusText: `Form ID should not be blank`,
        };
      } else if (!data.monthlyBilling || !data.monthlyBilling) {
        return {
          status: 500,
          statusText: `Price should not be blank on plan "${plans[i].planType}"`,
        };
      }

      const credentials = {
        stripeSKey: stripeAcc.stripeSKey,
        hashKey: stripeAcc.hashKey,
        apiVersion: stripeAcc.apiVersion,
      };

      const productId = `webriq-studio-pricing-formPayment-${data.form.id}-recurring-monthlyPrice-${data.monthlyBilling}-yearlyPrice-${data.annualBilling}`;

      const createProductPayload = {
        credentials,
        stripeParams: {
          id: productId,
          name: "Form Payment",
          description: data?.form?.name || "",
        },
      };

      const createProduct = await fetch(createProducts, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(createProductPayload),
      });
      const { id } = await createProduct.json();

      if (id) {
        // Yearly Price
        const yearlyPricePayload = {
          credentials,
          stripeParams: {
            product: id,
            currency: "usd",
            unit_amount: isNaN(parseInt(data.annualBilling))
              ? 0
              : data.annualBilling * 100,
            recurring: {
              interval: "year",
            },
          },
        };

        const createYearlyPrice = await fetch(createPriceForProduct, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(yearlyPricePayload),
        });

        await createYearlyPrice.json();

        // Monthly Price
        const monthlyPricePayload = {
          credentials,
          stripeParams: {
            product: id,
            currency: "usd",
            unit_amount: isNaN(parseInt(data.monthlyBilling))
              ? 0
              : data.monthlyBilling * 100,
            recurring: {
              interval: "month",
            },
          },
        };
        const createMonthlyPrice = await fetch(createPriceForProduct, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(monthlyPricePayload),
        });

        await createMonthlyPrice.json();
      }
    }
  }
};
