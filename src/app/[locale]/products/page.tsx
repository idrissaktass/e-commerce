"use client"

import { useEffect, useState } from "react";
import ProductCard, { Product } from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import { useTranslations } from "next-intl";

export default function Products() {
    const t = useTranslations("ProductsPage");
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then((data: Product[]) => {
                setProducts(data);
                setLoading(false);
            })
            .catch(() => setLoading(false))
    }, []);

    if(loading){
        return(
            <div className="min-h-screen">
                <Navbar/>
                <div className="flex items-center justify-center h-screen">
                    <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <Navbar/>
            <div className="p-6 sm:px-10 md:px-20 lg:px-10 xl:px-15 py-15">
                <h1 className="text-2xl font-bold mb-6">{t('title')}</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-6 xl:gap-7">
                    {products.map(product => (
                        <ProductCard key={product.id} product={product}/>
                    ))}
                </div>
            </div>
        </div>
    );
}
