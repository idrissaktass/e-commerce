import Navbar from "@/components/Navbar";
import ProductCard, { Product } from "@/components/ProductCard";
import { getTranslations } from "next-intl/server";
import { getProducts } from "@/lib/products";

export const revalidate = 60;

export default async function Home({ params }: { params: any}) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: "HomePage"});
    const posts = await getProducts();

    return (
        <div className="min-h-screen">
        <Navbar/>
        <div className="p-6 sm:px-10 md:px-20 lg:px-10 xl:px-15 py-15">
            <h1 className="text-2xl font-bold mb-6">{t("title")}</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-3 xl:gap-5">
            {posts.slice(0,4).map((post:any) => (
                <ProductCard key={post.id} product={post}/>
            ))}
            </div>
        </div>
        </div>
    );
}
