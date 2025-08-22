import Navbar from "@/components/Navbar";
import CartList from "@/components/CartList";

export const revalidate = 60;

type PageProps = {
  params: { locale: string }
}

export default async function CartPage({ params }: PageProps) {
  
  return (
    <div className="min-h-screen">
      <Navbar />
      <CartList initialItems={[]}/>
    </div>
  );
}
