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
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderService = void 0;
const product_model_1 = require("../products/product.model");
const order_model_1 = require("./order.model");
//create order into database
const createOrderIntoDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    // for checking if product is available on the database. if product is not found on database then order will not be created
    if (yield product_model_1.Product.isProductExists(orderData.productId)) {
        const result = yield order_model_1.Order.create(orderData);
        return result;
    }
    else {
        throw new Error("Product Not Found");
    }
});
//get all the orders from DB
const getOrdersFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    //for getting order by email
    if (email) {
        const regex = new RegExp(email);
        const result = yield order_model_1.Order.find({ email: regex });
        return result;
    }
    else {
        const result = yield order_model_1.Order.find();
        return result;
    }
});
exports.orderService = {
    createOrderIntoDB,
    getOrdersFromDB,
};
