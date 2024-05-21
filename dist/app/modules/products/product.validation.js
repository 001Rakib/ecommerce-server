"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const variantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, "Variant type cannot be empty"),
    value: zod_1.z.string().min(1, "Variant value cannot be empty"),
});
const inventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number(),
    inStock: zod_1.z.boolean(),
});
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Product name cannot be empty"),
    description: zod_1.z.string(),
    price: zod_1.z.number(),
    category: zod_1.z.string(),
    tags: zod_1.z.array(zod_1.z.string()),
    variants: zod_1.z.array(variantValidationSchema),
    inventory: inventoryValidationSchema,
});
exports.default = productValidationSchema;
