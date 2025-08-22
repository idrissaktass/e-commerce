import Navbar from "@/components/Navbar";
import { getTranslations } from "next-intl/server";
import { getProducts, Product } from "@/lib/products";
import CartList from "@/components/CartList";

export const revalidate = 60;

type PageProps = {
  params: { locale: string }
}

export default async function CartPage({ params }: PageProps) {

  let cartItems: Product[] = await getProducts();
  cartItems = cartItems.map(p => ({ ...p, quantity: 1 }));

  return (
    <div className="min-h-screen">
      <Navbar />
      <CartList initialItems={cartItems}/>
    </div>
  );
}
