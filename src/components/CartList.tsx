"use client"

import { useState } from "react"
import { Product } from "@/lib/products"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { toRead } from "@/utils/helper"
import { useTranslations } from "next-intl"

type Props = {
    initialItems: Product[];
}

export default function CartList({ initialItems }: Props) {
    const [cartItems, setCartItems] = useState<Product[]>(initialItems);

    const t = useTranslations("ProductCard");
    const tCart = useTranslations("Cart");

    const saveCart = (items: Product[]) => {
        setCartItems(items);
        localStorage.setItem("cart", JSON.stringify(items));
    }

    const handleRemove = (id:number) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        saveCart(updatedCart);
    }

    const handleChange = (id: number, delta: number) => {
        const updatedCart = cartItems.map(item => {
            if(item.id === id) {
                const newQuantity = (item.quantity || 1) + delta;
                return {...item, quantity: newQuantity > 0 ? newQuantity : 1};
            }
            return item;
        });
        saveCart(updatedCart);
    }

    if(cartItems.length === 0) {
        return(
            <div className="min-h-screen">
                <p className="p-10 text-center">{tCart("empty")}</p>
            </div>
        )
    }

    return(
        <div className="py-10 px-2 sm-px-10 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-6">{tCart("title")}</h1>
            <div className="flex flex-col gap-5  w-full max-w-[1000px]">
                {cartItems.map(item => {
                    const key = toRead(item.title)
                    const translatedTitle = t(key as keyof typeof t) || item.title;
                    return (
                        <div key={item.id} className="flex items-center gap-5 bg-gray-100 p-4 rounded shadow-md">
                            <Link href={`/products/${item.id}`}  className="h-20 flex items-center justify-center">
                                <Image src={item.image} alt={item.title} width={100} height={100} className="object-contain max-h-full"/>
                            </Link>                        
                            <div className="flex-1">
                                <Link href={`/products/${item.id}`}>
                                    <h2 className="font-semibold text-slate-700 mb-1">{translatedTitle}</h2>
                                </Link> 
                                <p className="text-green-600 font-bold mb-1">${item.price * (item.quantity || 1)}</p>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleChange(item.id, -1)}
                                        className="bg-gray-300 px-2 rounded hover:bg-gray-400 text-slate-700 cursor-pointer">-</button>
                                    <p className="text-slate-700">{item.quantity || 1}</p>
                                    <button onClick={() => handleChange(item.id, 1)}
                                        className="bg-gray-300 px-2 rounded hover:bg-gray-400 text-slate-700 cursor-pointer">+</button>
                                </div>
                            </div>
                            <button onClick={() => handleRemove(item.id)}
                                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600 cursor-pointer">
                                X
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}