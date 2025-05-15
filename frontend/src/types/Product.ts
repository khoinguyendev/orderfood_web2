import { ICategory } from "./Category";

export type IProduct = {
  id: number;
  name: string;
  image: string;
  description: string;
  price: number;
  available: boolean;
  createdAt: string;
  category: ICategory;
};
export type IProductOrder = {
  id: number;
  name: string;
  image: string;
  price: number;
  message: string;
  quantity: number;
  totalPrice: number;
};
