import Navbar from "@/components/Navbar";
import Image from "next/image";
import { getProducts, Product } from "@/lib/products";
import { getTranslations } from "next-intl/server";
import { toRead } from "@/utils/helper";
import CartButton from "@/components/CartButton";
import { usePathname } from "next/navigation";
import ProductDetail from "@/components/ProductDetail";

export const revalidate = 60;

type PageProps = {
    params: { locale: string; id:string}
}

export default async function ProductDetailPage({ params }: PageProps) {

    const {id} = await params;
    let products: Product[] = await getProducts();
    products = products.map((p) => ({...p, quantity: 1}));

    const product = products.find((p) => p.id === Number(id));

    if(!product){
        return(
            <div className=" min-h-screen">
                <Navbar/>
                <div className="flex items-center justify-center h-screen">
                    <p>Product not found!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <Navbar/>
            <ProductDetail product={product}/>
        </div>
    );
}
