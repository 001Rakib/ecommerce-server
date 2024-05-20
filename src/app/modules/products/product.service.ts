import { TProducts } from "./product.interface";
import { Product } from "./product.model";

//for creating products into database
const createProductIntoDB = async (productData: TProducts) => {
  const result = await Product.create(productData);
  return result;
};
//for getting all the products from database
const getAllProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProductsFromDB,
};
