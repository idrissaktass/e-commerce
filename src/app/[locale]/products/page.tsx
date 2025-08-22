import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { getTranslations } from "next-intl/server";
import { getProducts } from "@/lib/products";
import ProductsClient from "@/components/ProductsClient";

export const revalidate = 60;

export default async function ProductsPage({ params }: { params: any}) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: "ProductsPage"});
    const products = await getProducts();

    return (
        <div className="min-h-screen">
            <Navbar/>
            <div className="p-6 sm:px-10 md:px-20 lg:px-10 xl:px-15 py-15">
                <ProductsClient products={products}/>
            </div>
        </div>
    );
}
