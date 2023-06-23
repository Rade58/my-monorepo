import client from "~/lib/sanity";

interface Product {
  name: string;
  price: number;
  slug: { current: string };
  image: string;
}

export async function getAllProducts() {
  try {
    const data: Product[] = await client.fetch(/* groq */ `
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
  //
}
