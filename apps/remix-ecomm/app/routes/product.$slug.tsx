import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getSingleBySlug } from "~/models/product.model";

export async function loader(loaderArgs: LoaderArgs) {
  const product = await getSingleBySlug(loaderArgs.params.slug || "");

  console.log(JSON.stringify({ product }, null, 2));

  return json({ params: loaderArgs.params });
}

export default function Products() {
  const data = useLoaderData<typeof loader>();

  const slug = data.params.slug;

  return <div>Product {slug}</div>;
}
