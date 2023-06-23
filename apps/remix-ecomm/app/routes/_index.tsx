import type { V2_MetaFunction } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";

import type { LoaderArgs } from "@remix-run/node";
import { getAllProducts } from "~/models/product.model";

export const meta: V2_MetaFunction = () => {
  return [
    { title: "UAP Toys" },
    { name: "description", content: "Welcome to UAP Toys shop!" },
  ];
};

export async function loader(loaderArgs: LoaderArgs) {
  const products = getAllProducts();

  return products;
}

export default function Index() {
  const loaderData = useLoaderData<typeof loader>();

  console.log({ loaderData });

  return (
    <>
      <section className="lg:w-[80vw] lg:mx-auto border border-primary">
        <div className="hero min-h-screen">
          <div className="hero-content flex-col lg:flex-row-reverse">
            <img
              src="/images/uap-hero.png"
              className="max-w-sm rounded-lg shadow-2xl"
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
      <section id="products"></section>
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
