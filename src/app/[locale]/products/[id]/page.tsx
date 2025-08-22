import Navbar from "@/components/Navbar";
import Image from "next/image";
import { useParams } from "next/navigation";
import { getProducts, Product } from "@/lib/products";
import { getTranslations } from "next-intl/server";
import { toRead } from "@/utils/helper";
import CartButton from "@/components/CartButton";

export const revalidate = 60;

type PageProps = {
    params: { locale: string; id:string}
}

export default async function ProductDetailPage({ params }: PageProps) {

    const {id, locale} = await params;
    const t = await getTranslations({ locale, namespace: "ProductCard"})

    let products: Product[] = await getProducts();
    products = products.map((p) => ({...p, quantity: 1}));

    const product = products.find((p) => p.id === Number(id));

    if(!product){
        return(
            <div className=" min-h-screen">
                <Navbar/>
                <div className="flex items-center justify-center h-screen">
                    <p>Product not found!</p>
                </div>
            </div>
        )
    }
    const key = toRead(product.title)
    const keyDesc = toRead(product.description)
    const translatedTitle = t(key as keyof typeof t) || product.title;
    const translatedDesc = t(keyDesc as keyof typeof t) || product.description;

    return (
        <div className="min-h-screen">
            <Navbar/>
            <div className="flex justify-center relative">
                <div className="p-6 flex flex-col lg:items-center lg:flex-row gap-10 bg-gray-200 rounded-xl shadow-lg
                    my-15 mx-2 md:mx-10 relative border-3 border-slate-400 w-full max-w-[1000px]">
                    <div className="flex-1 flex items-center justify-center h-100">
                        <Image
                            src={product.image}
                            alt={product.title}
                            width={400}
                            height={400}
                            className="object-contain max-h-full"
                        />    
                    </div>   
                    <div className="flex-1 flex flex-col gap-6 mt-10">
                        <h1 className="text-2xl font-bold mb-6 text-slate-700">{translatedTitle}</h1>
                        <p className="text-slate-400 absolute top-3 right-3">{t(product.category)}</p>
                        <p className="text-slate-700">{translatedDesc}</p>
                        <div className="container flex items-center gap-3 md:px-2 justify-end mt-3 relative">
                            <p className="text-green-600 font-bold text-xl">${product.price}</p>
                            <CartButton product={product}/>
                        </div>
                    </div>             
                </div>
            </div>
        </div>
    );
}
