import { IProduct } from "./Product";

export type IOrder = {
  id: number;
  user: {
    id: number;
    name: string;
    email: string;
    phone: string;
  };
  totalPrice: number;
  phone: string;
  address: string;
  status: string;
  paymentMethod: string;
  createdAt: string;
  orderDetails: Array<{
    id: number;
    product: IProduct;
    price: number;
    quantity: number;
    message: string;
  }>;
};
