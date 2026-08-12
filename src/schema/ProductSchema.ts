import { z } from "zod";

const StockStatusEnum = z.enum([
  "In Stock",
  "Out of Stock",
  "Low Stock",
  "Pre-order",
]);

export const ProductSchema = z.object({
  name: z.string().min(1, "Product name is required"),
  category: z.string().min(1, "Category is required"),
  brand: z.string().min(1, "Brand is required"),
  price: z.number().positive("Price must be positive"),
  stock: StockStatusEnum,
  imageUrl: z.string().url().optional(),
});

export type Product = z.infer<typeof ProductSchema>;

export const ProductListSchema = z.array(ProductSchema);
