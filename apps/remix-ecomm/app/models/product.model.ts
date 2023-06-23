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
  image: string;
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
    const product: Product | undefined = await client.fetch(
      /* groq */ `
      *[_type == "recomm_product" && $slug == slug.current]{
        name,
        price,
        slug,
        description,
        stripeProductId,
        images[]{
          asset -> {
            url
          }
        }
      }
    `,
      {
        slug,
      }
    );

    if (!product) {
      return undefined;
    }

    return product;
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
