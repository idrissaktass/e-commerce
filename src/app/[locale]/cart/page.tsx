import CartList from "@/components/CartList";
import { Product } from "@/lib/products";

export const revalidate = 60;

export default async function CartPage({ params }: { params: Promise<{ locale: string }> }) {
  const resolvedParams = await params;
  const locale = resolvedParams.locale;

  return (
    <div className="min-h-screen">
      <CartList initialItems={[] as Product[]}/>
    </div>
  );
}
