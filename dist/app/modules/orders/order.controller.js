"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_validation_1 = __importDefault(require("./order.validation"));
const order_service_1 = require("./order.service");
const product_model_1 = require("../products/product.model");
//create order into db
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { order: orderData } = req.body;
        //data validation using Zod
        const zodParsedData = order_validation_1.default.parse(orderData);
        //checking available quantity of product
        const productData = yield product_model_1.Product.findById(orderData.productId);
        const availableQuantityBeforeOrder = productData === null || productData === void 0 ? void 0 : productData.inventory.quantity;
        //checking the ordered quantity
        const orderedQuantity = orderData.quantity;
        //returning error response if the quantity exceeds the available quantity
        if (orderedQuantity > availableQuantityBeforeOrder) {
            res.status(500).json({
                success: false,
                message: "Insufficient quantity available in inventory",
            });
        }
        else {
            const id = productData === null || productData === void 0 ? void 0 : productData._id;
            //calculating available quantity after order
            const availableQuantityAfterOrder = availableQuantityBeforeOrder - orderedQuantity;
            //setting the inStock to false if the available quantity is 0
            if (availableQuantityAfterOrder === 0) {
                yield product_model_1.Product.findByIdAndUpdate({ _id: id }, {
                    "inventory.inStock": false,
                }, { new: true });
            }
            //update the quantity after making an order
            yield product_model_1.Product.findByIdAndUpdate({ _id: id }, {
                "inventory.quantity": availableQuantityAfterOrder,
            }, { new: true });
            //create order into DB
            const result = yield order_service_1.orderService.createOrderIntoDB(zodParsedData);
            //send response
            res.status(200).json({
                success: true,
                message: "Order created successfully!",
                data: result,
            });
        }
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Product not Found",
            error: err,
        });
    }
});
//get all orders from DB
const getOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const email = req.query.email;
    if (email) {
        try {
            const result = yield order_service_1.orderService.getOrdersFromDB(email);
            if (!result.length) {
                res.status(500).json({
                    success: false,
                    message: "Order not found",
                });
            }
            else {
                //send response
                res.status(200).json({
                    success: true,
                    message: "Orders fetched successfully for user email!",
                    data: result,
                });
            }
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Order not found",
            });
        }
    }
    else {
        try {
            const result = yield order_service_1.orderService.getOrdersFromDB();
            //send response
            res.status(200).json({
                success: true,
                message: "Orders fetched successfully!",
                data: result,
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Order not found",
            });
        }
    }
});
exports.orderController = {
    createOrder,
    getOrder,
};
