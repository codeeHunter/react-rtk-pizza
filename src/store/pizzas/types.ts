export type Pizza = {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  size: number[];
  types: number[];
  rating: number;
};
export type SearchPizzaParams = {
  sortBy: string;
  order: string;
  category: string;
  search: string;
  currentPage: string;
};

export enum Status {
  LOADING = "loading",
  SUCCESS = "success",
  ERROR = "error",
}

export interface PizzaSliceState {
  items: Pizza[];
  status: Status.LOADING | Status.ERROR | Status.SUCCESS;
}
