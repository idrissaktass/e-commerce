"use client"

import Image from "next/image"
import { Link } from '@/i18n/navigation';
import { useTranslations } from "next-intl";
import { toRead } from "@/utils/helper";
import CartButton from "./CartButton";
import { usePathname } from "next/navigation";
import { Product } from "@/lib/products";

type ProductDetailProps = {
    product: Product;
}

export default function ProductDetail({product}: ProductDetailProps) {
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en")

    const t = !isEnglish ? useTranslations("ProductCard") : (key:string) => key;

    const key = !isEnglish && toRead(product.title)
    const translatedTitle = t(key as keyof typeof t) || product.title;
    const keyDesc = !isEnglish && toRead(product.description)
    const translatedDesc = t(keyDesc as keyof typeof t) || product.description;

    return(
        <div className="flex justify-center relative">
            <div className="px-4 sm:px-6 pt-6 pb-4 sm:pb-6 flex flex-col md:items-center md:flex-row gap-10 bg-gray-200 rounded-xl shadow-lg
                my-15 mx-5 sm:mx-15 md:mx-10 relative border-3 border-slate-400 w-full max-w-[1000px] sm:h-fit">
                <div className="flex-1 flex items-center justify-center h-70 md:h-100">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={400}
                        height={400}
                        className="object-contain max-h-full w-[300px] h-[300px] md:h-[350px] md:w-[350px] lg:h-[400px] lg:w-[400px]"
                    />    
                </div>   
                <div className="flex-1 flex flex-col">
                    <h1 className="text-2xl font-bold mb-6 text-slate-700">{isEnglish ? product.title : translatedTitle}</h1>
                    <p className="text-slate-400 absolute top-3 right-3">{isEnglish ? product.category : t(product.category)}</p>
                    <p className="text-slate-700 mb-10">{isEnglish ? product.description : translatedDesc}</p>
                    <div className="container flex items-center gap-3 md:px-2 justify-end md:absolute bottom-5 right-5">
                        <p className="text-green-600 font-bold text-xl">${product.price}</p>
                        <CartButton product={product}/>
                    </div>
                </div>             
            </div>
        </div>
    )
}