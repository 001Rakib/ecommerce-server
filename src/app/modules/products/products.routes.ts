import express from "express";
import { productController } from "./product.controller";

const router = express.Router();

//this will call the controller function
router.post("/", productController.createProduct);
router.get("/", productController.getAllProducts);
router.get("/:productId", productController.getProductById);
router.put("/:productId", productController.updateProduct);
router.delete("/:productId", productController.deleteProduct);

export const ProductRoutes = router;
