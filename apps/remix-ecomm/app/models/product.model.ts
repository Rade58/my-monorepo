import client from "~/lib/sanity";

type Products = {
  name: string;
  price: number;
  slug: { current: string };
  image: string;
}[];

interface Product {
  name: string;
  price: number;
  description: string;
  slug: { current: string };
  images: { asset: { url: string; id: string } }[];
}

export async function getAllProducts() {
  try {
    const data: Products = await client.fetch(/* groq */ `
      *[_type == "recomm_product"]{
        name,
        price,
        slug,
        // description,
        // images[] {
        //   asset -> {
        //     url,
        //     hotspot {
        //       x,y,width,height
        //     }
        //   }
        // }
        "image": images[0].asset -> url
      }
    
    `);

    return data;
  } catch (err) {
    console.error(err);
    return [];
  }
}

export async function getSingleBySlug(slug: string) {
  //
  try {
    const products: Product[] | undefined = await client.fetch(
      /* groq */ `
      *[_type == "recomm_product" && $slug == slug.current]{
        name,
        price,
        slug,
        description,
        stripeProductId,
        images[]{
          asset -> {
            "id": _id,
            url
          }
        }
      }
    `,
      {
        slug,
      }
    );

    if (!products) {
      return undefined;
    }
    if (products.length === 0) {
      return undefined;
    }

    return products[0];
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
