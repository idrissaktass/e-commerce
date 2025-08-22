import ProductCard, { Product } from "@/components/ProductCard";
import { getTranslations } from "next-intl/server";
import { getProducts } from "@/lib/products";
import { toRead } from "@/utils/helper";

export const revalidate = 60;

export async function generateMetadata({params}: {params: Promise<{ locale:string }>}) {
    const resolvedParams = await params;
    const locale = resolvedParams.locale;
    const isEnglish = locale === "en";

    const tProduct = !isEnglish ? await getTranslations({ locale, namespace: "ProductCard"}):(key:string) => key;
    
    const products = await getProducts();
    const postsToShow = products.slice(0,4);

    const productTitles = postsToShow.map(p => isEnglish ? p.title : tProduct(toRead(p.title) as keyof typeof tProduct) || p.title)
    const description = isEnglish ? "Popular products on MyShop" : "MyShop popüler ürünler"

    return {
        title: productTitles.join(" | "),
        description: description,
        openGraph: {
            title: productTitles.join(" | "),
            description:description,
            url: "http://localhost:3000",
            siteName: "MyShop",
            type: "website"
        },
        twitter: {
            card: "product",
            title: productTitles.join(" | "),
            description: description
        },
    }
} 

export default async function Home({ params }: { params: any}) {
    const { locale } = await params;

    const t = await getTranslations({ locale, namespace: "HomePage"});
    const posts = await getProducts();

    return (
        <div className="min-h-screen">
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
