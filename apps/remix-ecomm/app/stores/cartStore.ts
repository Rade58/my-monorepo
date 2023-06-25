import { create } from "zustand";

interface CartProduct {
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

interface Actions {}

export const useCart = create<State>((set) => ({
  cart: [],
  totalItems: 0,
  totalPrice: 0,
  showCart: false,
}));
