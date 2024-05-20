import e, { Request, Response } from "express";
import productValidationSchema from "./product.validation";
import { productService } from "./product.service";

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: productData } = req.body;

    //data validation using Zod
    const zodParsedData = productValidationSchema.parse(productData);
    //this will call the service function and create product into the DB
    const result = await productService.createProductIntoDB(zodParsedData);

    //send response
    res.status(200).json({
      success: true,
      message: "Product created successfully",
      data: result,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

export const productController = {
  createProduct,
};
