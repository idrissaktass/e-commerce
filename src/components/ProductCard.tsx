"use client"

import Image from "next/image"
import Link from "next/link";
import { useState } from "react";

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

    const handleAddToCart = (product: Product) => {
        const existingCart = JSON.parse(localStorage.getItem("cart") || "[]")
        const existingItemIndex = existingCart.findIndex((item: Product) => item.id === product.id);
        if(existingItemIndex !== -1) {
            existingCart[existingItemIndex].quantity = (existingCart[existingItemIndex].quantity || 1) +1;
        } else {
            existingCart.push({...product, quantity: 1});
        }
        localStorage.setItem("cart", JSON.stringify(existingCart));
        setToast("Added to cart!");
        setTimeout(() => {
            setToast(null)
        }, 2000);
    }

    return(
        <div className="relative">
            {toast && (
                <div className="fixed bottom-5 bg-green-600 text-white px-4 py-2 rounded-lg animate-fade-in-out z-100">
                    {toast}
                </div>
            )}
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
                <h2 className="text-lg text-slate-700 font-semibold truncate w-full">{product.title}</h2>
                <p className="text-sm text-slate-400 absolute top-2 right-2">{product.category}</p>
                <div className="container flex items-center gap-3 md:px-2 justify-end mt-3">
                    <p className="text-green-600 font-bold">${product.price}</p>
                    <button className="text-green-600 font-semibold border-2 border-green-600 hover:shadow hover:border-green-500
                        py-1 px-2 rounded-lg flex gap-3 items-center cursor-pointer" 
                        onClick={(e) => {handleAddToCart(product); e.preventDefault(); e.stopPropagation(); } }>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28"  className="fill-green-600" viewBox="0 0 128 128">
                            <path d="M45.3 81.2h78V43.7L35.9 25.4l-3.1-12.9-12.6-4.2c0-.2.1-.3.1-.5 0-4.3-3.5-7.8-7.8-7.8S4.7 3.5 4.7 7.8s3.5 7.8 
                                7.8 7.8c1.8 0 3.4-.6 4.7-1.6l9.4 4.7L39 78l-12.5 9.4V103l5.7 7.1c-1.6 1.9-2.5 4.3-2.5 7 0 6 4.9 10.9 10.9 10.9s10.9-4.9
                                10.9-10.9-4.9-10.9-10.9-10.9c-.9 0-1.8.1-2.6.3l-2.1-3.4h65.6l3.6 6c-2.2 2-3.6 4.9-3.6 8.1 0 6 4.9 10.9 10.9 10.9s10.9-4.9 
                                10.9-10.9-4.9-10.9-10.9-10.9h-.3l-1.3-3.1h12.5V97H32.8v-6.2l12.5-9.6zm0-6.3-4.6-21.4.6 3L59.8 58l3.8 17H45.3zm21.8 0-3.7-16.7
                                18.1 1.4 1.4 15.3H67.1zm18.8 0-1.4-15 17 1.3v13.7H85.9zm31.2-15.6v15.6h-14.5V61.5l12.5 1v-3.2l-12.5-1V44.4l12.5 2.4v12.5zM35.9 31.2l65.6
                                12.6V58l-17.3-1.4-1.5-16.4-3.1-.6 1.6 16.8-18.5-1.5-4.3-19.3-3.7-.7 4.4 19.7-18.5-1.5-4.7-21.9zm76.5 81.2c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7
                                4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7zm-71.8 0c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7z" 
                                id="icon_11_"/>
                        </svg>
                        Add to cart
                    </button>
                </div>
            </Link>
        </div>
    )
}