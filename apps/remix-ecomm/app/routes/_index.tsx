import { json, redirect, type V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import Image from "remix-image";
import type { LoaderArgs } from "@remix-run/node";
import { getAllProducts } from "~/models/product.model";

import { blured_hero } from "~/lib/util/blured_hero";
import { blured_product } from "~/lib/util/blured_product";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "UAP Toys" },
    { name: "description", content: "Welcome to UAP Toys shop!" },
  ];
};

export async function loader(loaderArgs: LoaderArgs) {
  const products = await getAllProducts();

  if (!products) {
    throw new Response("not found", { status: 404 });
  }

  return json({ products });
}

export default function Index() {
  const { products } = useLoaderData<typeof loader>();

  // console.log({ loaderData });

  return (
    <>
      <section className="lg:w-[80vw] lg:mx-auto border-0 border-primary">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <Image
              blurDataURL={blured_hero}
              src="/images/uap-hero.png"
              className="max-w-sm rounded-lg shadow-2xl"
              alt="hero"
            />
            <div>
              <h1 className="text-5xl font-bold">
                A myriad of gadgets awaits your exploration!
              </h1>
              <h2 className="text-3xl pt-4">
                Discover impactful tech at our shop!
              </h2>
              <p className="py-6">
                Welcome to{" "}
                <span className="text-lg text-primary bolder">UAP Toys</span>,
                your ultimate tech destination! Discover innovation and
                excitement as we bring you the latest gadgets and accessories.
                Elevate your tech experience with us!
              </p>
              <Link to="#products" className="btn btn-primary">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>
      <section id="products" className="w-[96vw] lg:w-[80vw] mx-auto">
        <div className="py-24 sm:py-32 lg:pt-32">
          <div className="mt-6 grid grid-col-2 gap-x-4 gap-y-10 sm:gap-x-6 md:grid-cols-4 md:gap-y-0 lg:gap-x-8">
            {products.map((product) => (
              <Link
                key={product.slug.current}
                className="group relative"
                to={`/product/${product.slug.current}`}
              >
                <div className="w-full h-56 rounded-md overflow-hidden group-hover:opacity-75 lg:h-72 xl:h-80 border-0 border-primary">
                  <Image
                    // blurDataURL={blured_product}
                    src={product.image}
                    alt={`image of ${product.name}`}
                    className="w-full h-full object-center object-contain"
                  />
                </div>
                <h3 className="mt-4 text-sm text-center">{product.name}</h3>
                <p className="mt-1 text-sm font-medium text-base-content opacity-50 text-center">
                  {/* $ {product.price} */}
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );

  /*  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
      <h1>Welcome to Remix</h1>
      <ul>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/blog"
            rel="noreferrer"
          >
            15m Quickstart Blog Tutorial
          </a>
        </li>
        <li>
          <a
            target="_blank"
            href="https://remix.run/tutorials/jokes"
            rel="noreferrer"
          >
            Deep Dive Jokes App Tutorial
          </a>
        </li>
        <li>
          <a target="_blank" href="https://remix.run/docs" rel="noreferrer">
            Remix Docs
          </a>
        </li>
      </ul>
    </div>
  ); */
}
