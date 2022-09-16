export type PizzaItem = {
  id: string;
  title: string;
  type: number[];
  size: number[];
  imageUrl: string;
  price: number;
  count: number;
};

export enum Status {
  LOADING = 'loading',
  SUCCESS = 'success',
  ERROR = 'error',
}

export interface PizzaSliceState {
  items: PizzaItem[];
  status: Status;
}
