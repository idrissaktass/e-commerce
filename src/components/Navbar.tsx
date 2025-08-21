"use client"

import { useState } from "react"
import { Link } from '@/i18n/navigation';
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false)
    const pathname = usePathname()
    const isEnglish = pathname.startsWith("/en")
    const t = useTranslations("Navbar");
    const newPath = pathname.replace(/^\/(en|tr)/,'')

    const switchLocale = (locale: string) => {
        window.location.href = `/${locale}${newPath}`;
    }
    
    return(
        <nav className="bg-slate-900 text-white px-6 h-18 md:h-14 flex items-center">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex gap-8 items-center">
                    <div className="flex gap-2 h-14 mt-0.5">
                        <button onClick={() => switchLocale("en")}
                            className={`cursor-pointer hover:border-b-slate-700 hover:border-b-1 ${isEnglish ? "" : "text-slate-400"}`}>EN</button>
                        <button onClick={() => switchLocale("tr")}
                            className={`cursor-pointer hover:border-b-slate-700 hover:border-b-1 ${!isEnglish ? "" : "text-slate-400"}`}>TR</button>
                    </div>
                    <Link href="/" className="text-2xl font-bold">
                        MyShop
                    </Link>
                </div>
                <div className="hidden md:flex items-center gap-5 text-xl">
                    <Link href="/" className={`h-14 flex items-center px-4 ${
                        (newPath === "/" || newPath === "") ? "bg-slate-700 text-white" : "text-gray-200 hover:border-b-slate-700 hover:border-b-1"}
                    `}>
                        {t("home")}
                    </Link>
                    <Link href="/products" className={`h-14 flex items-center px-4 ${
                        newPath === "/products" ? "bg-slate-700 text-white" : "text-gray-200 hover:border-b-slate-700 hover:border-b-1"}
                    `}>
                        {t("products")}
                    </Link>
                    <Link href="/cart" className={`h-14 gap-2 flex items-center px-4 ${
                        newPath === "/cart" ? "bg-slate-700 text-white" : "text-gray-200 hover:border-b-slate-700 hover:border-b-1"}
                    `}>
                        <p>{t("cart")}</p>
                        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 128 128">
                            <path d="M45.3 81.2h78V43.7L35.9 25.4l-3.1-12.9-12.6-4.2c0-.2.1-.3.1-.5 0-4.3-3.5-7.8-7.8-7.8S4.7 3.5 4.7 7.8s3.5 7.8 7.8 7.8c1.8 0 3.4-.6 4.7-1.6l9.4 4.7L39 78l-12.5 9.4V103l5.7 7.1c-1.6 1.9-2.5 4.3-2.5 7 0 6 4.9 10.9 10.9 10.9s10.9-4.9 10.9-10.9-4.9-10.9-10.9-10.9c-.9 0-1.8.1-2.6.3l-2.1-3.4h65.6l3.6 6c-2.2 2-3.6 4.9-3.6 8.1 0 6 4.9 10.9 10.9 10.9s10.9-4.9 10.9-10.9-4.9-10.9-10.9-10.9h-.3l-1.3-3.1h12.5V97H32.8v-6.2l12.5-9.6zm0-6.3-4.6-21.4.6 3L59.8 58l3.8 17H45.3zm21.8 0-3.7-16.7 18.1 1.4 1.4 15.3H67.1zm18.8 0-1.4-15 17 1.3v13.7H85.9zm31.2-15.6v15.6h-14.5V61.5l12.5 1v-3.2l-12.5-1V44.4l12.5 2.4v12.5zM35.9 31.2l65.6 12.6V58l-17.3-1.4-1.5-16.4-3.1-.6 1.6 16.8-18.5-1.5-4.3-19.3-3.7-.7 4.4 19.7-18.5-1.5-4.7-21.9zm76.5 81.2c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7zm-71.8 0c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7z" id="icon_11_"/>
                        </svg>
                    </Link>
                </div>
                <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
                    <svg 
                        xmlns="http://www.w3.org/2000/svg"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="white"
                    >
                        <path d="M 8 5 C 6.3550302 5 5 6.3550302 5 8 C 5 9.6449698 6.3550302 11 8 11 L 24 11 C 25.64497 11 27 9.6449698 27 8 C 27 6.3550302 25.64497 5 24 5 L 8 5 z M 8 7 L 24 7 C 24.56503 7 25 7.4349698 25 8 C 25 8.5650302 24.56503 9 24 9 L 8 9 C 7.4349698 9 7 8.5650302 7 8 C 7 7.4349698 7.4349698 7 8 7 z M 8 13 C 6.3550302 13 5 14.35503 5 16 C 5 17.64497 6.3550302 19 8 19 L 24 19 C 25.64497 19 27 17.64497 27 16 C 27 14.35503 25.64497 13 24 13 L 8 13 z M 8 15 L 24 15 C 24.56503 15 25 15.43497 25 16 C 25 16.56503 24.56503 17 24 17 L 8 17 C 7.4349698 17 7 16.56503 7 16 C 7 15.43497 7.4349698 15 8 15 z M 8 21 C 6.3550302 21 5 22.35503 5 24 C 5 25.64497 6.3550302 27 8 27 L 24 27 C 25.64497 27 27 25.64497 27 24 C 27 22.35503 25.64497 21 24 21 L 8 21 z M 8 23 L 24 23 C 24.56503 23 25 23.43497 25 24 C 25 24.56503 24.56503 25 24 25 L 8 25 C 7.4349698 25 7 24.56503 7 24 C 7 23.43497 7.4349698 23 8 23 z"/>
                    </svg>
                </button>
                {isOpen && (
                    <div className={`fixed top-0 right-0 h-full w-48 bg-slate-900 z-100 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                        <button className="absolute top-4 right-4 text-white text-2xl cursor-pointer" onClick={() => setIsOpen(false)}>
                            X
                        </button>
                    <div className="flex flex-col mt-20 ">
                        <Link href="/" className={`flex items-center px-6 py-4 ${
                            (newPath === "/" || newPath === "") ? "bg-slate-700 text-white" : "text-gray-200 hover:border-b-slate-700 hover:border-b-1"}
                        `}>
                            {t("home")}
                        </Link>
                        <Link href="/products" className={`flex items-center px-6  py-4 ${
                            newPath === "/products" ? "bg-slate-700 text-white" : "text-gray-200 hover:border-b-slate-700 hover:border-b-1"}
                        `}>
                            {t("products")}
                        </Link>
                        <Link href="/cart" className={`flex items-center px-6  py-4 ${
                            newPath === "/products" ? "bg-slate-700 text-white" : "text-gray-200 hover:border-b-slate-700 hover:border-b-1"}
                        `}>     
                            <p className="mr-2">{t("cart")}</p>                   
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="white" viewBox="0 0 128 128" className=" hover:fill-gray-300">
                                <path d="M45.3 81.2h78V43.7L35.9 25.4l-3.1-12.9-12.6-4.2c0-.2.1-.3.1-.5 0-4.3-3.5-7.8-7.8-7.8S4.7 3.5 4.7 7.8s3.5 7.8 7.8 7.8c1.8 0 3.4-.6 4.7-1.6l9.4 4.7L39 78l-12.5 9.4V103l5.7 7.1c-1.6 1.9-2.5 4.3-2.5 7 0 6 4.9 10.9 10.9 10.9s10.9-4.9 10.9-10.9-4.9-10.9-10.9-10.9c-.9 0-1.8.1-2.6.3l-2.1-3.4h65.6l3.6 6c-2.2 2-3.6 4.9-3.6 8.1 0 6 4.9 10.9 10.9 10.9s10.9-4.9 10.9-10.9-4.9-10.9-10.9-10.9h-.3l-1.3-3.1h12.5V97H32.8v-6.2l12.5-9.6zm0-6.3-4.6-21.4.6 3L59.8 58l3.8 17H45.3zm21.8 0-3.7-16.7 18.1 1.4 1.4 15.3H67.1zm18.8 0-1.4-15 17 1.3v13.7H85.9zm31.2-15.6v15.6h-14.5V61.5l12.5 1v-3.2l-12.5-1V44.4l12.5 2.4v12.5zM35.9 31.2l65.6 12.6V58l-17.3-1.4-1.5-16.4-3.1-.6 1.6 16.8-18.5-1.5-4.3-19.3-3.7-.7 4.4 19.7-18.5-1.5-4.7-21.9zm76.5 81.2c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7zm-71.8 0c2.6 0 4.7 2.1 4.7 4.7s-2.1 4.7-4.7 4.7-4.7-2.1-4.7-4.7 2.1-4.7 4.7-4.7z" id="icon_11_"/>
                            </svg>
                        </Link>
                    </div>
                    </div>
                )}
            </div>
        </nav>
    )
}