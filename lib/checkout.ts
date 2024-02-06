import { loadStripe } from "@stripe/stripe-js";

export async function initiateCheckout(
  { lineItems = [] } = {},
  stripePKey,
  successUrl,
  cancelUrl,
  isSubscription
) {
  const stripe = loadStripe(stripePKey);

  await (
    await stripe
  ).redirectToCheckout({
    lineItems,
    mode: isSubscription ? "subscription" : "payment",
    successUrl,
    cancelUrl,
  });
}
