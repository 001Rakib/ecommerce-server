import { Request, Response } from "express";
import orderValidationSchema from "./order.validation";
import { orderService } from "./order.service";
import { Product } from "../products/product.model";

//create order into db
const createOrder = async (req: Request, res: Response) => {
  try {
    const { order: orderData } = req.body;
    //data validation using Zod
    const zodParsedData = orderValidationSchema.parse(orderData);

    //checking available quantity of product
    const productData = await Product.findById(orderData.productId);
    const availableQuantityBeforeOrder = productData?.inventory
      .quantity as number;
    //checking the ordered quantity
    const orderedQuantity = orderData.quantity;
    //returning error response if the quantity exceeds the available quantity
    if (orderedQuantity > availableQuantityBeforeOrder) {
      res.status(500).json({
        success: false,
        message: "Insufficient quantity available in inventory",
      });
    } else {
      const id = productData?._id;
      //calculating available quantity after order
      const availableQuantityAfterOrder =
        availableQuantityBeforeOrder - orderedQuantity;

      //setting the inStock to false if the available quantity is 0
      if (availableQuantityAfterOrder === 0) {
        await Product.findByIdAndUpdate(
          { _id: id },
          {
            "inventory.inStock": false,
          },
          { new: true }
        );
      }
      //update the quantity after making an order
      await Product.findByIdAndUpdate(
        { _id: id },
        {
          "inventory.quantity": availableQuantityAfterOrder,
        },
        { new: true }
      );
      //create order into DB
      const result = await orderService.createOrderIntoDB(zodParsedData);

      //send response
      res.status(200).json({
        success: true,
        message: "Order created successfully!",
        data: result,
      });
    }
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: "Product not Found",
      error: err,
    });
  }
};

//get all orders from DB
const getOrder = async (req: Request, res: Response) => {
  const email = req.query.email as string | undefined;

  if (email) {
    try {
      const result = await orderService.getOrdersFromDB(email);
      if (!result.length) {
        res.status(500).json({
          success: false,
          message: "Order not found",
        });
      } else {
        //send response
        res.status(200).json({
          success: true,
          message: "Orders fetched successfully for user email!",
          data: result,
        });
      }
    } catch (err: unknown) {
      res.status(500).json({
        success: false,
        message: "Order not found",
      });
    }
  } else {
    try {
      const result = await orderService.getOrdersFromDB();

      //send response
      res.status(200).json({
        success: true,
        message: "Orders fetched successfully!",
        data: result,
      });
    } catch (err: unknown) {
      res.status(500).json({
        success: false,
        message: "Order not found",
      });
    }
  }
};

export const orderController = {
  createOrder,
  getOrder,
};
