import { getTranslations } from "next-intl/server";
import { getProducts } from "@/lib/products";
import ProductsClient from "@/components/ProductsClient";
import { toRead } from "@/utils/helper";

export const revalidate = 60;

export async function generateMetadata({params}: {params: Promise<{ locale:string }>}) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    const isEnglish = locale === "en";

    const tProduct = !isEnglish ? await getTranslations({ locale, namespace: "ProductCard"}):(key:string) => key;
    
    const products = await getProducts();

    const productTitles = products.map(p => isEnglish ? p.title : tProduct(toRead(p.title) as keyof typeof tProduct) || p.title)
    const title = isEnglish ? "Products - MyShop" : "Ürünler - MyShop"
    const description = isEnglish ? `Popular products - MyShop: ${productTitles.join(" | ")}` : `Popüler ürünler - MyShop: ${productTitles.join(" | ")}`
    
    return {
        title: title,
        description: description,
        openGraph: {
            title: title,
            description:description,
            url: "http://localhost:3000",
            siteName: "MyShop",
            type: "website"
        },
        twitter: {
            card: "product",
            title: title,
            description: description
        },
    }
} 

export default async function ProductsPage({ params }: { params: any}) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: "ProductsPage"});
    const products = await getProducts();

    return (
        <div className="min-h-screen">
            <div className="p-6 sm:px-10 md:px-20 lg:px-10 xl:px-15 py-15">
                <ProductsClient products={products}/>
            </div>
        </div>
    );
}
