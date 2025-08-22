"use client"

import Image from "next/image"
import { Link } from '@/i18n/navigation';
import { useState } from "react";
import { useTranslations } from "next-intl";
import { toRead } from "@/utils/helper";
import CartButton from "./CartButton";

export type Product = {
    quantity: number;
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

type ProductCardProps = {
    product: Product;
}

export default function ProductCard({product}: ProductCardProps) {
    const [toast, setToast] = useState<string | null>(null);
    const t = useTranslations("ProductCard");

    const key = toRead(product.title)
    const translatedTitle = t(key as keyof typeof t) || product.title;

    const handleAddToCart = (product: Product) => {
        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
        const existingItemIndex = existingCart.findIndex((item: Product) => item.id === product.id);
        if(existingItemIndex !== -1) {
            existingCart[existingItemIndex].quantity = (existingCart[existingItemIndex].quantity || 1) +1;
        } else {
            existingCart.push({...product, quantity: 1});
        }
        localStorage.setItem("cart", JSON.stringify(existingCart));
        setToast(t("Added to cart"));
        setTimeout(() => {
            setToast(null)
        }, 2000);
    }

    return(
        <div>
            <Link href={`/products/${product.id}`} className="bg-gray-200 rounded-xl shadow-lg p-4 flex flex-col items-center border-3 border-slate-400
                justify-center hover:shadow-xl text-center gap-3 relative hover:border-slate-300">
                <div className="w-full h-50 flex items-center justify-center">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={200}
                        height={200}
                        className="object-contain max-h-full"
                    />
                </div>
                <h2 className="text-lg text-slate-700 font-semibold truncate w-full">{translatedTitle}</h2>
                <p className="text-sm text-slate-400 absolute top-2 right-2">{t(product.category)}</p>
                <div className="container flex items-center gap-3 md:px-2 justify-end mt-3">
                    <p className="text-green-600 font-bold">${product.price}</p>
                    <CartButton product={product}/>
                </div>
            </Link>
        </div>
    )
}