import { json, type LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Tab } from "@headlessui/react";
import { getSingleBySlug } from "~/models/product.model";
import { useState } from "react";
import Image from "remix-image";

export async function loader(loaderArgs: LoaderArgs) {
  const product = await getSingleBySlug(loaderArgs.params.slug || "");

  // console.log(JSON.stringify({ product }, null, 2));

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

  console.log({ images, product });
  let [categories] = useState({
    Recent: [
      {
        id: 1,
        title: "Does drinking coffee make you smarter?",
        date: "5h ago",
        commentCount: 5,
        shareCount: 2,
      },
      {
        id: 2,
        title: "So you've bought coffee... now what?",
        date: "2h ago",
        commentCount: 3,
        shareCount: 2,
      },
    ],
    Popular: [
      {
        id: 1,
        title: "Is tech making coffee better or worse?",
        date: "Jan 7",
        commentCount: 29,
        shareCount: 16,
      },
      {
        id: 2,
        title: "The most innovative things happening in coffee",
        date: "Mar 19",
        commentCount: 24,
        shareCount: 12,
      },
    ],
    Trending: [
      {
        id: 1,
        title: "Ask Me Anything: 10 answers to your questions about coffee",
        date: "2d ago",
        commentCount: 9,
        shareCount: 5,
      },
      {
        id: 2,
        title: "The worst advice we've ever heard about coffee",
        date: "4d ago",
        commentCount: 1,
        shareCount: 2,
      },
    ],
  });

  return (
    <section className="border border-primary mx-auto lg:mx-14 flex flex-wrap-reverse justify-center mt-6 items-center content-center">
      <div className="w-full max-w-lg px-2 py-16 sm:px-0">
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
      <div className="max-w-md flex content-between flex-wrap">
        <h1 className="text-2xl lg:text-5xl text-base-content mb-4">
          {product.name}
        </h1>
        <p className="border-0 border-primary">{product.description}</p>
        {/*  */}
      </div>

      {/* {JSON.stringify({ product }, null, 2)} */}
    </section>
  );
}
