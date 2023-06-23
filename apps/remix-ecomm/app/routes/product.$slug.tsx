import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

export async function loader(loaderArgs: LoaderArgs) {
  return json({ params: loaderArgs.params });
}

export default function Products() {
  const data = useLoaderData<typeof loader>();

  const slug = data.params.slug;

  return <div>Product {slug}</div>;
}
