export interface CartProduct {
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
