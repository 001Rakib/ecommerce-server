import { z } from "zod";

const variantSchema = z.object({
  type: z.string().trim().min(1, "Variant type cannot be empty"),
  value: z.string().trim().min(1, "Variant value cannot be empty"),
});

const inventorySchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

const productSchema = z.object({
  name: z.string().trim().min(1, "Product name cannot be empty"),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string().trim()),
  variants: z.array(variantSchema),
  inventory: inventorySchema,
});
