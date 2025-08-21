"use client"

import { useEffect, useState } from "react";
import { Product } from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Image from "next/image";
import Link from "next/link";

export default function Cart() {
    const [cartItems, setCartItems] = useState<Product[]>([]);

    useEffect(() => {
        const savedCart = JSON.parse(localStorage.getItem("cart") || "[]");
        setCartItems(savedCart);
    }, []);

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
                <Navbar/>
                <p className="p-10 text-center">Your cart is empty.</p>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <Navbar/>
            <div className="py-10 px-2 sm-px-10 flex flex-col justify-center items-center">
                <h1 className="text-2xl font-bold mb-6">Your Cart</h1>
                <div className="flex flex-col gap-5  w-full max-w-[1000px]">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex items-center gap-5 bg-gray-100 p-4 rounded shadow-md">
                            <Link href={`/products/${item.id}`}  className="h-20 flex items-center justify-center">
                                <Image src={item.image} alt={item.title} width={100} height={100} className="object-contain max-h-full"/>
                            </Link>                        
                            <div className="flex-1">
                                <Link href={`/products/${item.id}`}>
                                    <h2 className="font-semibold text-slate-700 mb-1">{item.title}</h2>
                                </Link> 
                                <p className="text-green-600 font-bold mb-1">${item.price * item.quantity}</p>
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
                    ))}
                </div>
            </div>
        </div>
    );
}
