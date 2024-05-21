import { TProducts } from "./product.interface";
import { Product } from "./product.model";

//for creating products into database
const createProductIntoDB = async (productData: TProducts) => {
  const result = await Product.create(productData);
  return result;
};
//for getting all the products from database and getting product using search term
const getAllProductsFromDB = async (searchTerm?: string) => {
  //for getting product by search term
  if (searchTerm) {
    const regex = new RegExp(searchTerm, "i");
    const result = await Product.find({ name: regex });
    return result;
  } else {
    // for getting all the products if there is  no search term
    const result = await Product.find();
    return result;
  }
};
//for getting a single product by id
const getProductById = async (id: string) => {
  const result = await Product.findById(id);
  return result;
};

//update product information
const updateProduct = async (id: string, updatedProduct: TProducts) => {
  const result = await Product.findByIdAndUpdate({ _id: id }, updatedProduct, {
    new: true,
  });
  return result;
};

//delete product form database
const deleteProductFromDB = async (id: string) => {
  const result = await Product.deleteOne({ _id: id });
  return result;
};

export const productService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getProductById,
  updateProduct,
  deleteProductFromDB,
};
