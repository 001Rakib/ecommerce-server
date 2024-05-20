import express from "express";
import { productController } from "./product.controller";

const router = express.Router();

//this will call the controller function
router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);

export const ProductRoutes = router;
