export type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  quantity?: number;
};

export async function getProducts(): Promise<Product[]> {
  const res = await fetch("https://fakestoreapi.com/products", {
    next: { revalidate: 60 }
  });

  if (!res.ok) throw new Error("Failed to fetch products");

  const data: Product[] = await res.json();

  return data.map(p => ({ ...p, quantity: 1 }));
}