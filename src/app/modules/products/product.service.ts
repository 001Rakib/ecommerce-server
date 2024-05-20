import { TProducts } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (productData: TProducts) => {
  const result = await Product.create(productData);
  return result;
};

export const productService = {
  createProductIntoDB,
};
