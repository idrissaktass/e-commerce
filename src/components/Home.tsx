"use client"

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ProductCard, {Product} from "./ProductCard";
import { useTranslations } from "next-intl";

export default function Home() {
    const [posts, setPosts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const t = useTranslations("HomePage");

    useEffect(() => {
        fetch('https://fakestoreapi.com/products')
            .then(res => res.json())
            .then((data: Product[]) => {
                setPosts(data);
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
            <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-3 xl:gap-5">
            {posts.slice(0,4).map((post) => (
                <ProductCard key={post.id} product={post}/>
            ))}
            </div>
        </div>
        </div>
    );
}
