import { getProducts, Product } from "@/lib/products";
import { getTranslations } from "next-intl/server";
import { toRead } from "@/utils/helper";
import ProductDetail from "@/components/ProductDetail";

export const revalidate = 60;

type PageProps = {
    params: { locale: string; id:string}
}

export async function generateMetadata({params}: {params: PageProps["params"]}) {
    const {locale, id} = await params;
    const isEnglish = locale === "en";

    const tProduct = !isEnglish ? await getTranslations({ locale, namespace: "ProductCard"}):(key:string) => key;
    
    const products = await getProducts();
    const product = products.find((p) => p.id === Number(id));

    if(!product) {
        return {
            title: isEnglish ? "Product not found" : "Ürün bulunamadı",
            description: isEnglish ? "Product does not exist" : "Ürün mevcut değil"
        }
    }

    const title = isEnglish ? product!.title : tProduct(toRead(product!.title) as keyof typeof tProduct) || product!.title
    const description = isEnglish ? product!.description : tProduct(toRead(product!.description) as keyof typeof tProduct) || product?.description;

    return {
        title: `${title} - MyShop`,
        description: description,
        openGraph: {
            title: `${title} - MyShop`,
            description:description,
            url: "http://localhost:3000",
            siteName: "MyShop",
            type: "website"
        },
        twitter: {
            card: "product",
            title: `${title} - MyShop`,
            description: description
        },
    }
} 

export default async function ProductDetailPage({params}: {params: Promise<{ id: string }>}){

    const {id} = await params;
    let products: Product[] = await getProducts();
    products = products.map((p) => ({...p, quantity: 1}));

    const product = products.find((p) => p.id === Number(id));

    if(!product){
        return(
            <div className=" min-h-screen">
                <div className="flex items-center justify-center h-screen">
                    <p>Product not found!</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen">
            <ProductDetail product={product}/>
        </div>
    );
}
