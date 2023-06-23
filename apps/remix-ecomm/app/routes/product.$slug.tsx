import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSingleBySlug } from "~/models/product.model";

export async function loader(loaderArgs: LoaderArgs) {
  const product = await getSingleBySlug(loaderArgs.params.slug || "");

  // console.log(JSON.stringify({ product }, null, 2));

  if (!product) {
    throw new Response("not found", { status: 404 });
  }

  return json({ product });
}

export default function Products() {
  const { product } = useLoaderData<typeof loader>();

  return <pre>{JSON.stringify({ product }, null, 2)}</pre>;
}
