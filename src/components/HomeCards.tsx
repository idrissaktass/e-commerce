"use client";

import Image from "next/image";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { toRead } from "@/utils/helper";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Product } from "@/lib/products";

type ProductCardProps = {
  product: Product;
  isHome?: boolean;
};

export default function HomeCards({ product, isHome }: ProductCardProps) {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  const t = useTranslations("ProductCard");

  const translatedTitle = useMemo(() => {
    if (isEnglish) return product.title; 
    const key = toRead(product.title);
    return t(key as keyof typeof t) || product.title;
  }, [product.title, t, isEnglish]);

  const translatedCategory = useMemo(() => {
    if (isEnglish) return product.category;
    return t(product.category as keyof typeof t) || product.category;
  }, [product.category, t, isEnglish]);
  
  const translatedDesc = useMemo(() => {
    if(isEnglish) return product.description;
    const key = toRead(product.description)
    return t(key as keyof typeof t) || product.description;
  }, [product.description, t, isEnglish])

  return (
    <div
      className={`relative flex flex-col lg:flex-row items-center justify-between w-full h-[90vh] sm:h-full px-6 py-3
        lg:px-30 md:py-6 text-center lg:text-left rounded-none bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 
        text-slate-200 shadow-2xl`}
    >
      <div className="flex-1 flex flex-col justify-center items-center lg:items-baseline lg:justify-start mb-6 lg:mb-0">
        <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold mb-3 leading-tight line-clamp-3">
          {isEnglish ? product.title : translatedTitle}
        </h2>
        <p className="text-sm sm:text-base md:text-lg mb-2 lg:mb-6 text-slate-200 lg:hidden">
          {translatedCategory}
        </p>
        <div className="flex justify-center lg:hidden mb-4">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={400}
            className="object-contain h-[250px] sm:h-[300px] md:h-[250px]"
            loading="lazy"
          />
        </div>
        <p className="text-base sm:text-lg md:text-xl mb-4 text-slate-300"> {isEnglish ? product.description : translatedDesc}</p>
        {/* <p className="text-2xl font-bold text-green-400">{`$${product.price}`}</p> */}
        <Link
        href={`/products/${product.id}`}
        className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold px-6 py-3 rounded-md 
            text-lg flex items-center gap-2 w-fit"
        >
        {t("seeProduct")}
        </Link>
      </div>
      <div className="hidden lg:flex flex-1 items-center justify-center h-full">
        <Image
          src={product.image}
          alt={product.title}
          width={500}
          height={500}
          className="object-contain h-[400px] lg:h-[500px]"
          loading="lazy"
        />
      </div>
      <p className="hidden lg:block absolute top-6 right-6 text-lg font-semibold text-slate-200">
        {translatedCategory}
      </p>
    </div>
  );
}
