import CartList from "@/components/CartList";

export const revalidate = 60;

type PageProps = {
  params: { locale: string }
}

export default async function CartPage({ params }: { params: { locale: string } }) {
  
  return (
    <div className="min-h-screen">
      <CartList initialItems={[]}/>
    </div>
  );
}
