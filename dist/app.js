"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const products_routes_1 = require("./app/modules/products/products.routes");
const order_routes_1 = require("./app/modules/orders/order.routes");
const app = (0, express_1.default)();
//parser
app.use(express_1.default.json());
app.use((0, cors_1.default)());
//application routes
app.use("/api/products", products_routes_1.ProductRoutes);
app.use("/api/orders", order_routes_1.OrderRoutes);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
//for not found route
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Route is not found",
    });
});
exports.default = app;
