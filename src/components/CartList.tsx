"use client"

import { useCallback, useEffect, useState } from "react"
import { Product } from "@/lib/products"
import Image from "next/image"
import { Link } from "@/i18n/navigation"
import { toRead } from "@/utils/helper"
import { useTranslations } from "next-intl"
import { usePathname } from "next/navigation";

type Props = {
    initialItems: Product[];
}

export default function CartList({ initialItems }: Props) {
    const [cartItems, setCartItems] = useState<Product[]>(initialItems);
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en")
    const t = !isEnglish ? useTranslations("ProductCard") : (key:string) => key;
    const tCart = useTranslations("Cart");

    useEffect(() => {
        const storedCart: Product[] = JSON.parse(localStorage.getItem("cart") || "[]");
        if(storedCart) {
            setCartItems(storedCart);
            const translatedTitles = storedCart.map((item:any) => {
                const key = toRead(item.title);
                return isEnglish ? item.title : t(key as keyof typeof t) || item.title;
            });
            document.title = `${tCart("cart")} - MyShop`;
            const metaDesc = document.querySelector("meta[name='description']");
            if (metaDesc) {
                metaDesc.setAttribute("content", `${tCart("products")}: ${translatedTitles.join(" | ")}`);
            }
        } else{
            setCartItems(initialItems);
            localStorage.setItem("cart", JSON.stringify(initialItems));
        }
    }, [initialItems])

    const saveCart = useCallback((items: Product[]) => {
        setCartItems(items);
        localStorage.setItem("cart", JSON.stringify(items));
    }, [])

    const handleRemove = useCallback((id:number) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        saveCart(updatedCart);
    }, [cartItems, saveCart])

    const handleChange = useCallback((id: number, delta: number) => {
        const updatedCart = cartItems.map(item => {
            if(item.id === id) {
                const newQuantity = (item.quantity || 1) + delta;
                return {...item, quantity: newQuantity > 0 ? newQuantity : 1};
            }
            return item;
        });
        saveCart(updatedCart);
    }, [cartItems, saveCart])

    if(cartItems.length === 0) {
        return(
            <div className="min-h-screen">
                <p className="p-10 text-center">{tCart("empty")}</p>
            </div>
        )
    }

    return(
        <div className="py-10 px-2 sm-px-10 flex flex-col justify-center items-center">
            <h1 className="text-2xl font-bold mb-6 text-slate-200">{tCart("title")}</h1>
            <div className="flex flex-col gap-5  w-full max-w-[1000px]">
                {cartItems.map(item => {
                    const key = toRead(item.title)
                    const translatedTitle = t(key as keyof typeof t) || item.title;
                    return (
                        <div key={item.id} className="flex items-center gap-5 bg-slate-800 p-4 rounded shadow-md border-slate-500 border-2">
                            <Link href={`/products/${item.id}`}  className="h-20 flex items-center justify-center">
                                <Image src={item.image} alt={item.title} loading="lazy" width={100} height={100} className="object-contain max-h-full"/>
                            </Link>                        
                            <div className="flex-1">
                                <Link href={`/products/${item.id}`}>
                                    <h2 className="font-semibold text-slate-200 mb-1 line-clamp-2">{isEnglish ? item.title : translatedTitle}</h2>
                                </Link> 
                                <p className="text-green-600 font-bold mb-1">${item.price * (item.quantity || 1)}</p>
                                <div className="flex items-center gap-2">
                                    <button onClick={() => handleChange(item.id, -1)}
                                        className="bg-gray-300 px-2 rounded hover:bg-gray-400 text-slate-700 cursor-pointer">-</button>
                                    <p className="text-slate-200">{item.quantity || 1}</p>
                                    <button onClick={() => handleChange(item.id, 1)}
                                        className="bg-gray-300 px-2 rounded hover:bg-gray-400 text-slate-700 cursor-pointer">+</button>
                                </div>
                            </div>
                            <button onClick={() => handleRemove(item.id)}
                                className="bg-red-500 text-slate-300 py-1 px-3 rounded hover:bg-red-600 cursor-pointer">
                                X
                            </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}