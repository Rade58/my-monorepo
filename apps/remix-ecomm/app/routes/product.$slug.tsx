import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Tab } from "@headlessui/react";
import { getSingleBySlug } from "~/models/product.model";
import Image from "remix-image";
import AddOrRemoveFromCart from "~/components/AddOrRemoveFromCart";

export async function loader(loaderArgs: LoaderArgs) {
  const product = await getSingleBySlug(loaderArgs.params.slug || "");

  if (!product) {
    throw new Response("not found", { status: 404 });
  }

  return json({ product });
}

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export default function Products() {
  const { product } = useLoaderData<typeof loader>();
  const images = product.images;

  return (
    <section className="border-0 border-primary mx-4 flex flex-wrap justify-center mt-6 items-stretch content-center mb-6">
      <div className="border-0 border-primary w-full max-w-lg px-2 pt-9 sm:px-0">
        <h1 className="text-2xl text-secondary font-normal text-center lg:text-5xl mb-4">
          {product.name}
        </h1>
        <Tab.Group>
          <Tab.Panels>
            {images.map(({ asset: { url, id } }, idx) => {
              return (
                <Tab.Panel
                  key={idx}
                  className={classNames(
                    "rounded-xl p-3 pb-9 border-0 border-primary",
                    "ring-primary ring-opacity-60 ring-offset-2 ring-offset-primary-focus focus:outline-none focus:ring-2"
                  )}
                >
                  <Image src={url} alt={`${product.name} image`} />
                </Tab.Panel>
              );
            })}
          </Tab.Panels>
          <Tab.List className="flex space-x-1 rounded-xl bg-secondary/20 p-1">
            {images.map(({ asset: { url, id } }, idx) => {
              return (
                <Tab
                  key={idx}
                  className={({ selected }) =>
                    classNames(
                      "w-full rounded-lg py-2.5 text-sm font-medium leading-5",
                      "ring-primary ring-opacity-60 ring-offset-2 ring-offset-primary-focus focus:outline-none focus:ring-2",
                      selected ? "shadow bg-primary" : "hover:bg-primary/[0.12]"
                    )
                  }
                >
                  <Image src={url} alt={`${product.name} image`} />
                </Tab>
              );
            })}
          </Tab.List>
        </Tab.Group>
      </div>

      <div className="w-6"></div>
      <div className="max-w-md flex content-between pt-12 flex-wrap">
        <p className="w-min mb-4 lg:ml-auto lg:mr-9 text-3xl lg:text-5xl font-light text-primary">
          {product.price.toLocaleString("en-US", {
            style: "currency",
            currency: "USD",
          })}
        </p>
        <p className="border-0 border-primary text-sm lg:text-base">
          {product.description}
        </p>

        <AddOrRemoveFromCart
          product={product}
          image={images[0]}
          stripeProductId={product.stripeProductId}
        />
      </div>
    </section>
  );
}
