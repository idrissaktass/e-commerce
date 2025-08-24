"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import HomeCards from "@/components/HomeCards";
import { useTranslations } from "next-intl";
import Link from "next/link";

type Props = {
  posts: any[];
};

export default function HomeSlider({ posts }: Props) {
    const tCard = useTranslations("ProductCard");
  return (
    <div>
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={0}
            slidesPerView={1}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            className="w-full h-screen lg:h-[80vh]"
            >
            {posts.map((post: any, i: number) => (
                <SwiperSlide key={post.id} className="w-full h-full">
                <HomeCards product={post} isHome />
                </SwiperSlide>
            ))}
        </Swiper>
        <div className="flex justify-center mt-10">
            <Link
            href="/products"
            className="bg-indigo-600 hover:bg-indigo-700 transition-colors text-white font-semibold px-6 py-3 rounded-md text-lg flex items-center gap-2"
            >
            {tCard("allProducts")}
            </Link>
        </div>
    </div>
  );
}
