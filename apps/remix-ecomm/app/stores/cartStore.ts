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
    // check if there is possible item
    const cart = get().cart;

    const possibleProduct = cart.find((item) => {
      return item.id === product.id;
    });

    if (possibleProduct) {
      set((state) => {
        const index = state.cart.indexOf(possibleProduct);

        const cart = [...state.cart];

        cart[index].quantity = state.cart[index].quantity + 1;

        localStorage.setItem("cart", JSON.stringify(cart));
        localStorage.setItem("totalItems", `${state.totalItems + 1}`);
        localStorage.setItem(
          "totalPrice",
          `${state.totalPrice + product.price}`
        );

        return {
          cart,
          totalItems: state.totalItems + 1,
          totalPrice: state.totalPrice + product.price,
        };
      });

      return;
    }

    set((state) => {
      localStorage.setItem("cart", JSON.stringify([...state.cart, product]));
      localStorage.setItem("totalItems", `${state.totalItems + 1}`);
      localStorage.setItem("totalPrice", `${state.totalPrice + product.price}`);

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
      let found = false;

      const products = state.cart.filter((prod) => {
        if (prod.id !== productId) {
          return true;
        }

        if (prod.quantity > 1) {
          price = prod.price;
          found = true;
          prod.quantity = prod.quantity - 1;
          return true;
        }

        if (prod.quantity <= 1) {
          price = prod.price;
          found = true;
          return false;
        }

        return false;
      });

      localStorage.setItem("cart", JSON.stringify(products));
      localStorage.setItem("totalItems", `${state.totalPrice - price}`);
      localStorage.setItem(
        "totalPrice",
        `${found ? state.totalItems - 1 : state.totalItems}`
      );

      return {
        cart: products,
        totalPrice: state.totalPrice - price,
        totalItems: found ? state.totalItems - 1 : state.totalItems,
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
