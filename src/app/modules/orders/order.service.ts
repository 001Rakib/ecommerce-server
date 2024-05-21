import { Product } from "../products/product.model";
import { TOrder } from "./order.interface";
import { Order } from "./order.model";

//create order into database
const createOrderIntoDB = async (orderData: TOrder) => {
  // for checking if product is available on the database. if product is not found on database then order will not be created
  if (await Product.isProductExists(orderData.productId)) {
    const result = await Order.create(orderData);
    return result;
  } else {
    throw new Error("Product Not Found");
  }
};

//get all the orders from DB
const getOrdersFromDB = async () => {
  const result = await Order.find();
  return result;
};

export const orderService = {
  createOrderIntoDB,
  getOrdersFromDB,
};
