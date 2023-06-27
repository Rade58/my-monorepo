import { json, type ActionArgs } from "@remix-run/node";
import { getUrl, getStripeSession } from "~/lib/stripe.server";

import { type CartProduct } from "~/types";

export async function action({ request }: ActionArgs) {
  if (request.method !== "POST") {
    throw new Response("Method not allowed", { status: 405 });
  }

  const formData = await request.formData();

  const cartString = formData.get("cart") as string;

  // const cart = JSON.parse(cartString || "")
  // console.log({ cartString });
  // console.log(typeof cartString);

  const cart: CartProduct[] = JSON.parse(cartString);

  const url = getUrl(request);

  const stripeSessionUrl = await getStripeSession(cart, url);

  // console.log("FROM BUY HANDLER!");
  // console.log({ cart });

  return new Response(null, {
    headers: {
      Location: stripeSessionUrl,
    },
    status: 302,
  });
}
