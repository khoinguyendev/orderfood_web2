import { IProduct } from "./Product";
import { IUser } from "./User";

export type IReview = {
    id: number;
    comment: string;
    user: IUser;
    product: IProduct;
    rating:number;
    published:boolean;
    createdAt:string;

  };