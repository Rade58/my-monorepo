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

export default function AddOrRemoveFromCart(props: Props) {
  const { addToCart, removeFromCart, cart } = useCart();

  const found = cart.find((p) => {
    return p.id === props.product.id;
  });

  let moreThanOne = false;
  let oneOrMore = false;

  if (found) {
    if (found.quantity > 1) {
      moreThanOne = true;
    }
    if (found.quantity >= 1) {
      oneOrMore = true;
    }
  }

  console.log({ moreThanOne, oneOrMore });

  return (
    <div className="border-0 border-primary w-full">
      <button
        onClick={() => {
          addToCart({
            ...props.product,
            quantity: 1,
            image: props.image,
            stripeProductId: props.stripeProductId,
          });
        }}
        className="btn btn-block btn-secondary mt-auto"
      >
        Add {oneOrMore ? "Another One" : "To Cart"}
      </button>
      {oneOrMore && (
        <button
          onClick={() => {
            removeFromCart(props.product.id);
          }}
          className="btn btn-block btn-error mt-2"
        >
          Remove{moreThanOne ? " One" : ""}
        </button>
      )}
    </div>
  );
}
