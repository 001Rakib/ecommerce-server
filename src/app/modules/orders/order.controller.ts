import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { orderService } from "./order.service";

//create order into db
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    //data validation using Zod
    const zodParsedData = orderValidationSchema.parse(orderData);

    const result = await orderService.createOrderIntoDB(zodParsedData);

    //send response
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Product not Found",
      error: err,
    });
  }
};

//get all orders from DB
const getOrder = async (req: Request, res: Response) => {
  try {
    const result = await orderService.getOrdersFromDB();

    //send response
    res.status(200).json({
      success: true,
      message: "Orders fetched successfully!",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Order not found",
    });
  }
};

export const orderController = {
  createOrder,
  getOrder,
};
