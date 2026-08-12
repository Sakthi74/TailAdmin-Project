import type { Product } from "../schema/ProductSchema";

const STORAGE_KEY = "products";

export const saveProduct = (product: Product) => {
  const existingProducts: Product[] = JSON.parse(
    localStorage.getItem(STORAGE_KEY) || "[]",
  );

  const updatedProducts = [...existingProducts, product];

  localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  console.log(updatedProducts);
};
