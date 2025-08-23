"use client"

import React from "react"
import { usePathname } from "next/navigation";

export default function Footer() {
    const pathname = usePathname();
    const isEnglish = pathname.startsWith("/en");

    return (
        <footer className="bg-slate-800 text-slate-300 py-6 mt-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 log:px-8 flex flex-col sm:flex-row justify-between items-center">
                <p className="text-sm">{new Date().getFullYear()} {" "}
                    {isEnglish ? "MyShop. All rights reserved." : "MyShop. Tüm hakları saklıdır."}
                </p>
                <div className="flex gap-4 mt-3 sm:mt-0">
                    <a href="#" className="hover:text-slate-400 text-sm">
                        {isEnglish ? "About" : "Hakkımızda"}
                    </a>
                    <a href="#" className="hover:text-slate-400 text-sm">
                        {isEnglish ? "Contact" : "İletişim"}
                    </a>
                    <a href="#" className="hover:text-slate-400 text-sm">
                        {isEnglish ? "Privacy Policy" : "Gizlilik Politikası"}
                    </a>
                </div>
            </div>

        </footer>
    )
}