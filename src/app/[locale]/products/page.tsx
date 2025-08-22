import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { getTranslations } from "next-intl/server";
import { getProducts } from "@/lib/products";

export const revalidate = 60;

export default async function ProductsPage({ params }: { params: any}) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: "ProductsPage"});
    const products = await getProducts();

    return (
        <div className="min-h-screen">
            <Navbar/>
            <div className="p-6 sm:px-10 md:px-20 lg:px-10 xl:px-15 py-15">
                <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-6 xl:gap-7">
                    {products.map((product:any) => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
