import express from "express";
import { orderController } from "./order.controller";

const router = express.Router();

router.get("/", orderController.getOrder);
router.post("/", orderController.createOrder);

export const OrderRoutes = router;
