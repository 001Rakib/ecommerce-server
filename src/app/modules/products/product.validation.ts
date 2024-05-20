import { z } from "zod";

const variantValidationSchema = z.object({
  type: z.string().trim().min(1, "Variant type cannot be empty"),
  value: z.string().trim().min(1, "Variant value cannot be empty"),
});

const inventoryValidationSchema = z.object({
  quantity: z.number(),
  inStock: z.boolean(),
});

const productValidationSchema = z.object({
  name: z.string().trim().min(1, "Product name cannot be empty"),
  description: z.string(),
  price: z.number(),
  category: z.string(),
  tags: z.array(z.string().trim()),
  variants: z.array(variantValidationSchema),
  inventory: inventoryValidationSchema,
});

export default productValidationSchema;
