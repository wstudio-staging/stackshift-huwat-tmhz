import { decryptKey } from "lib/secureKey";
import Stripe from "stripe";

export default async (req, res) => {
  if (req.method !== "POST") {
    res.status(400).json({ message: "POST method only" });
  }

  const { amount, stripeSKey, hashKey } = req.body;
  const useKey = decryptKey(stripeSKey, hashKey);
  const stripe = new Stripe(useKey);

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });
    res.status(200).send(paymentIntent.client_secret);
  } catch (error) {
    res.status(400).json({ message: error });
  }
};
