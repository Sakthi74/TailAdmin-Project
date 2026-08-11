export interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  thumbnail: string;
  brand: string;
  stock: number;
  meta: {
    createdAt: string;
  };
}
export interface RecentOrder {
  id: number;
  title: string;
  variant: string;
  price: number;
  category: string;
  thumbnail: string;
  status: "Delivered" | "Pending" | "Canceled";
}

const statusList: RecentOrder["status"][] = [
  "Delivered",
  "Pending",
  "Canceled",
];

export const getRecentOrders = async (
  limit: number = 5,
): Promise<RecentOrder[]> => {
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: { products: Product[] } = await response.json();

  return data.products.map((product) => ({
    id: product.id,
    title: product.title,
    variant: `${(product.id % 3) + 1} Variant${
      product.id % 3 === 0 ? "" : "s"
    }`,
    price: product.price,
    category: product.category,
    thumbnail: product.thumbnail,
    status: statusList[product.id % statusList.length],
  }));
};

//get product
export const getProducts = async (limit: number = 10): Promise<Product[]> => {
  const response = await fetch(`https://dummyjson.com/products?limit=${limit}`);

  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }

  const data: { products: Product[] } = await response.json();

  return data.products;
};
