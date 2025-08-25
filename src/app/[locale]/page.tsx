import ProductCard, { Product } from "@/components/ProductCard";
import { getTranslations } from "next-intl/server";
import { getProducts } from "@/lib/products";
import { toRead } from "@/utils/helper";
import HomeSlider from "@/components/HomeSlider";

export const revalidate = 60;

type Params = {
  locale: string;
};

export async function generateMetadata({ params }: { params: Promise<Params> }) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    const isEnglish = locale === "en";

    const tProduct = !isEnglish ? await getTranslations({ locale, namespace: "ProductCard"}):(key:string) => key;
    
    const products = await getProducts();
    const postsToShow = products.slice(0,4);

    const productTitles = postsToShow.map(p => isEnglish ? p.title : tProduct(toRead(p.title) as keyof typeof tProduct) || p.title)
    const title = isEnglish ? "Popular products - MyShop" : "Popüler ürünler - MyShop"
    const description = isEnglish ? `Products - MyShop: ${productTitles.join(" | ")}` : `Ürünler - MyShop: ${productTitles.join(" | ")}`

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

export default async function Home({ params }: { params: Promise<Params> }) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;

    const t = await getTranslations({ locale, namespace: "HomePage"});
    const posts = await getProducts();

    return (
        <div className="min-h-screen">
            <HomeSlider posts={posts.slice(0, 4)}/>
        </div>
    );
}
