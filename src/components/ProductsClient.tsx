"use client"

import { useMemo, useState } from "react"
import ProductCard from "./ProductCard"
import { useTranslations } from "next-intl";
import { usePathname } from "next/navigation";
type Product = {
    id: number,
    title: string,
    price:number,
    description: string,
    category: string,
    image: string,
    quantity?:number
}

export default function ProductsClient({ products }: {products:Product[]}) {
    const [sortOrder, setSortOrder ] = useState<"asc" | "desc" | "default">("default")
    const [minPrice, setMinPrice] = useState<number>(0)
    const [maxPrice, setMaxPrice] = useState<number>(1000)
    const [selectedCategory, setSelectedCategory] = useState<string>("All Products")
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en")

    const t = !isEnglish ? useTranslations("ProductsClient") : (key:string) => key;
    const tCard = !isEnglish ? useTranslations("ProductCard") : (key:string) => key;;

    const categories = ["All Products", ...new Set(products.map((p) => p.category))];

    const filteredProducts = useMemo(() => products.filter((p) => {
        const priceMatch = p.price >= minPrice && p.price <= maxPrice;
        const categoryMatch = selectedCategory === "All Products" || p.category === selectedCategory;
        return priceMatch && categoryMatch;
    }), [products, minPrice, maxPrice, selectedCategory])

    const sortedProducts = useMemo(() => [...filteredProducts].sort((a,b) => {
        if(sortOrder === "asc") return a.price - b.price;
        if(sortOrder === "desc") return b.price - a.price;
        return 0;
    }), [filteredProducts, sortOrder])

    return (
        <div>
            <div className="mb-6 flex flex-col sm:flex-row gap-4">
                <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value as "asc" | "desc" | "default")} 
                    className="border rounded p-2 bg-slate-900 cursor-pointer">
                        <option value={"default"} className="bg-slate-900">{t("Default sorting")}</option>
                        <option value={"asc"} className="bg-slate-900">{t("Price ascending")}</option>
                        <option value={"desc"} className="bg-slate-900">{t("Price descending")}</option>
                </select>
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}
                    className="border rounded p-2 bg-slate-900 cursor-pointer">
                        {categories.map((cat) => (
                            <option value={cat} key={cat} className="bg-slate-900">{tCard(cat)}</option>
                        ))}
                </select>
                <div className="flex items-center justify-center sm:justify-normal gap-2">
                    <p>{t("Price:")}</p>
                    <input type="number" value={minPrice} onChange={(e) => (setMinPrice(Number(e.target.value)))}
                        className="w-22 border rounded p-2 bg-slate-900" placeholder="Min"/>
                        <p>-</p>
                    <input type="number" value={maxPrice} onChange={(e) => (setMaxPrice(Number(e.target.value)))}
                        className="w-22 border rounded p-2 bg-slate-900" placeholder="Max"/>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 lg:gap-6 xl:gap-7">
                {sortedProducts.map((product:any) => (
                    <ProductCard key={product.id} product={product}/>
                ))}
            </div>
            {sortedProducts.length === 0 && (
                <p className="text-gray-400">{t("noResult")}</p>
            )}
        </div>
    )
}