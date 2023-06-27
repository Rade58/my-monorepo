// It is named .server because I don't want this code to be
// included in frontend

import Stripe from "stripe";

import { CartProduct } from "~/types";

export function getUrl(req: Request) {
  const host = req.headers.get("X-Forward-Host") ?? req.headers.get("host");

  if (!host) {
    throw new Error("No host!");
  }

  const protocol = host.includes("localhost") ? "http" : "https";

  return `${protocol}://${host}`;
}

export async function getStripeSession(
  products: CartProduct[],
  domainUrl: string
): Promise<string> {
  //
  //
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
    apiVersion: "2022-11-15",
    typescript: true,
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    line_items: [],
    success_url: "",
    cancel_url: "",
  });

  return "";
}
