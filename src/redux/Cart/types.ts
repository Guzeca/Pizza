export type CartItem = {
  id: string;
  title: string;
  type: string;
  size: number;
  imageUrl: string;
  price: number;
  count: number;
};

export interface CartSliceState {
  totalPrice: number;
  items: CartItem[];
}
