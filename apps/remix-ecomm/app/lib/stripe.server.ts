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

  const line_items = products.map((prod) => {
    return {
      // adjustable_quantity,
      //  dynamic_tax_rates,
      // tax_rates,
      // price_data,
      price_data: {
        // product,
        currency: "USD",
        // recurring,
        // tax_behavior,
        // unit_amount_decimal,
        unit_amount: prod.quantity,
        product_data: {
          name: prod.name,
          description: prod.description,
          images: [prod.image],
          // metadata,
          // tax_code,
        },
      },
      //
      price: prod.stripeProductId,
      quantity: prod.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    // line_items: [],
    line_items,
    success_url: `${domainUrl}/payment/success`,
    cancel_url: `${domainUrl}/payment/cancelled`,
  });

  return "";
}
