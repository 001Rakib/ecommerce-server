import { Request, Response } from "express";
import productValidationSchema from "./product.validation";
import { productService } from "./product.service";

//creating products into database
const createProduct = async (req: Request, res: Response) => {
  try {
    const productData = req.body;

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
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};
//getting all the products from database
const getAllProducts = async (req: Request, res: Response) => {
  const searchTerm = req.query.searchTerm as string | undefined;
  //for getting product by search term
  if (searchTerm) {
    try {
      const result = await productService.getAllProductsFromDB(searchTerm);

      //send response
      res.status(200).json({
        success: true,
        message: `Products matching search term ${searchTerm} fetched successfully!`,
        data: result,
      });
    } catch (err: unknown) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    }
  } else {
    // for getting all the products if there is  no search term
    try {
      const result = await productService.getAllProductsFromDB();
      //send response
      res.status(200).json({
        success: true,
        message: "Products fetched successfully!",
        data: result,
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: "Something went wrong",
        error: err,
      });
    }
  }
};

//getting a single product form database
const getProductById = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.getProductById(productId);
    //send response
    res.status(200).json({
      success: true,
      message: "Products fetched successfully!",
      data: result,
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

//update product information
const updateProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const updatedProduct = req.body;
    const result = await productService.updateProduct(
      productId,
      updatedProduct
    );

    //send response
    res.status(200).json({
      success: true,
      message: "Product updated successfully!",
      data: result,
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

//delete Product from database
const deleteProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await productService.deleteProductFromDB(productId);

    //send response
    res.status(200).json({
      success: true,
      message: "Product deleted successfully!",
      data: result,
    });
  } catch (err: unknown) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: err,
    });
  }
};

export const productController = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
