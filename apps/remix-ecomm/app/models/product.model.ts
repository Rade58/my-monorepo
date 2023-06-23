import client from "~/lib/sanity";

export async function getAllProducts() {
  try {
    const data = await client.fetch(/* groq */ `
      *[_type == "recomm_product"]{
        name,
        price,
        slug,
        description,
        // images[0] {
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
    console.log(err);
  }
}
