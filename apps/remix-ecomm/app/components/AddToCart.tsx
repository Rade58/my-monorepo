import { type ReactNode } from "react";
import { useCart } from "~/stores/cartStore";
// import type { CartProduct } from "~/types";

interface Props {
  children?: ReactNode;
  product: {
    id: string;
    name: string;
    price: number;
    description: string;
    slug: {
      current: string;
    };
    images: {
      asset: {
        url: string;
        id: string;
      };
    }[];
  };
  image: {
    asset: {
      id: string;
      url: string;
    };
  };
  // quantity: number;
  stripeProductId: string;
}

export default function AddToCart(props: Props) {
  const { addToCart } = useCart();

  return (
    <button
      onClick={() => {
        addToCart({
          ...props.product,
          quantity: 1,
          image: props.image,
          stripeProductId: props.stripeProductId,
        });
      }}
      className="btn btn-block btn-secondary mt-9"
    >
      Add To Cart
    </button>
  );
}
