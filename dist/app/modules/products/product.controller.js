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
exports.productController = void 0;
const product_validation_1 = __importDefault(require("./product.validation"));
const product_service_1 = require("./product.service");
//creating products into database
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productData = req.body;
        //data validation using Zod
        const zodParsedData = product_validation_1.default.parse(productData);
        //this will call the service function and create product into the DB
        const result = yield product_service_1.productService.createProductIntoDB(zodParsedData);
        //send response
        res.status(200).json({
            success: true,
            message: "Product created successfully",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
});
//getting all the products from database
const getAllProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const searchTerm = req.query.searchTerm;
    //for getting product by search term
    if (searchTerm) {
        try {
            const result = yield product_service_1.productService.getAllProductsFromDB(searchTerm);
            //send response
            res.status(200).json({
                success: true,
                message: `Products matching search term ${searchTerm} fetched successfully!`,
                data: result,
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err,
            });
        }
    }
    else {
        // for getting all the products if there is  no search term
        try {
            const result = yield product_service_1.productService.getAllProductsFromDB();
            //send response
            res.status(200).json({
                success: true,
                message: "Products fetched successfully!",
                data: result,
            });
        }
        catch (err) {
            res.status(500).json({
                success: false,
                message: "Something went wrong",
                error: err,
            });
        }
    }
});
//getting a single product form database
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productService.getProductById(productId);
        //send response
        res.status(200).json({
            success: true,
            message: "Products fetched successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
});
//update product information
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const updatedProduct = req.body;
        const result = yield product_service_1.productService.updateProduct(productId, updatedProduct);
        //send response
        res.status(200).json({
            success: true,
            message: "Product updated successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
});
//delete Product from database
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_service_1.productService.deleteProductFromDB(productId);
        //send response
        res.status(200).json({
            success: true,
            message: "Product deleted successfully!",
            data: result,
        });
    }
    catch (err) {
        res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: err,
        });
    }
});
exports.productController = {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct,
};
