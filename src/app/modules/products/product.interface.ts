import { Model } from "mongoose";

export type TVariant = {
  type: string;
  value: string;
};

export type TInventory = {
  quantity: number;
  inStock: boolean;
};

export type TProducts = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: TVariant[];
  inventory: TInventory;
};
export interface ProductModel extends Model<TProducts> {
  isProductExists(id: string): Promise<TProducts | null>;
}
