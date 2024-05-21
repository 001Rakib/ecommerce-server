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
exports.productService = void 0;
const product_model_1 = require("./product.model");
//for creating products into database
const createProductIntoDB = (productData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(productData);
    return result;
});
//for getting all the products from database and getting product using search term
const getAllProductsFromDB = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    //for getting product by search term
    if (searchTerm) {
        const regex = new RegExp(searchTerm, "i");
        const result = yield product_model_1.Product.find({ name: regex });
        return result;
    }
    else {
        // for getting all the products if there is  no search term
        const result = yield product_model_1.Product.find();
        return result;
    }
});
//for getting a single product by id
const getProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findById(id);
    return result;
});
//update product information
const updateProduct = (id, updatedProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.findByIdAndUpdate({ _id: id }, updatedProduct, {
        new: true,
    });
    return result;
});
//delete product form database
const deleteProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.deleteOne({ _id: id });
    return result;
});
exports.productService = {
    createProductIntoDB,
    getAllProductsFromDB,
    getProductById,
    updateProduct,
    deleteProductFromDB,
};
