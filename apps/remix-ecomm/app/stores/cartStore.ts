import { create } from "zustand";

interface CartProduct {
  id: string;
  name: string;
  price: number;
  stripeProductId: string;
  slug: {
    current: string;
  };
  quantity: number;
  description: string;
  image: {
    asset: {
      id: string;
      url: string;
    };
  };
}

interface State {
  cart: CartProduct[];
  totalItems: number;
  totalPrice: number;
  showCart: boolean;
}

interface Actions {
  addToCart: (product: CartProduct) => void;
  removeFromCart: (productId: string) => void;
}

export const useCart = create<State>((set) => ({
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  showCart: false,
}));
