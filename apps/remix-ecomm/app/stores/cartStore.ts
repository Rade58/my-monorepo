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
  toggleShowCart: () => void;
}

export const useCart = create<State & Actions>((set, get) => ({
  addToCart(product) {
    set((state) => {
      return {
        cart: [...state.cart, product],
        totalItems: state.totalItems + 1,
        totalPrice: state.totalPrice + product.price,
      };
    });
  },
  removeFromCart(productId) {
    set((state) => {
      let price: number = 0;

      const products = state.cart.filter((prod) => {
        if (prod.id !== productId) {
          return true;
        }

        price = prod.price;

        return false;
      });

      return {
        cart: products,
        totalPrice: state.totalPrice - price,
        totalItems: state.totalItems - 1,
      };
    });
  },
  toggleShowCart() {
    set((state) => {
      return { showCart: !state.showCart };
    });
  },
  cart: [],
  showCart: false,
  totalItems: 0,
  totalPrice: 0,
}));
