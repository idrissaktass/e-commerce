"use client"

import Image from "next/image"
import { Link } from '@/i18n/navigation';
import { useTranslations } from "next-intl";
import { toRead } from "@/utils/helper";
import CartButton from "./CartButton";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export type Product = {
    quantity?: number;
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
}

type ProductCardProps = {
  product: Product;
  isHome?: boolean; // 🔑 optional prop
};


export default function ProductCard({product}: ProductCardProps) {
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en")

    const translationsHook = useTranslations("ProductCard");

    const t = (key: string) => isEnglish ? key : translationsHook(key);

    const translatedTitle = useMemo(() => {
        if(isEnglish) return product.title;
        const key = toRead(product.title)
        return t(key) || product.title;
    }, [product.title, t, isEnglish])

    return(
        <div>
            <Link href={`/products/${product.id}`} className="bg-slate-800 rounded-xl shadow-lg p-4 flex flex-col items-center border-3
                border-slate-500 justify-center hover:shadow-xl text-center gap-3 relative hover:border-slate-300">
                <div className="w-full h-50 flex items-center justify-center">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={200}
                        height={200}
                        className="object-contain max-h-full h-[180px] md:h-[200px] w-auto sm:w-[200px]"
                        loading="lazy"
                    />
                </div>
                <h2 className="text-lg text-slate-300 font-semibold truncate w-full">{isEnglish ? product.title : translatedTitle}</h2>
                <p className="text-sm text-slate-500 absolute top-2 right-2">{isEnglish ? product.category : t(product.category)}</p>
                <div className="container flex items-center gap-3 md:px-2 justify-end mt-3">
                    <p className="text-green-600 font-bold text-lg">${product.price}</p>
                    <CartButton product={product}/>
                </div>
            </Link>
        </div>
    )
}