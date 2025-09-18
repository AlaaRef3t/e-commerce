"use client";

import { categories } from '@/interfaces/categories.model';
import React, { useEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { ArrowRight, ShoppingCart, Sparkles } from 'lucide-react';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Navigation, Pagination } from 'swiper/modules';
import Image from 'next/image';

import Link from 'next/link';
export default function CatSliderComp({ category }: { category: categories[] }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);
   


    return (
        <section
            className="container mx-auto lg:px-10 md:px-6 px-4   pb-8       
  sm:pb-13     
  md:pb-16    
  lg:pb-20   
  xl:pb-22  ">
            <div className="flex items-end justify-between gap-6 pb-6 md:pb-10">
                <div
                    className={`transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                        }`}
                >
                    <div 
                        className="flex items-center gap-2 text-yellow-600/90 text-xs sm:text-sm">
                        <Sparkles className="h-4 w-4" />
                        <span className="uppercase tracking-wider font-semibold">Handpicked</span>
                    </div>

                    <h2
                       

                        className={`mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400`}
                    >
                        Our Categories
                    </h2>
                    <div
                        

                        className="relative mt-3 h-[3px] w-24 sm:w-32 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600" />
                    <p
                      

                        className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-prose">
                        Discover categories our customers love right now.
                    </p>
                </div>

                <Link
                    

                    href="/category">
                    <button
                        className={`cursor-pointer group flex-shrink-0 inline-flex items-center gap-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-white/70 dark:bg-neutral-900/70 backdrop-blur px-4 sm:px-7 py-2.5 sm:py-3 text-sm sm:text-base font-semibold shadow-sm hover:shadow-md hover:border-yellow-500 hover:bg-white dark:hover:bg-neutral-900 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-500 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
                            }`}
                        aria-label="View all Categories"
                    >
                        View All Categories
                        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </button>
                </Link>
            </div>

            <Swiper
                slidesPerView={1.15}
                spaceBetween={18}
                navigation
                pagination={{ clickable: true, dynamicBullets: true }}
                modules={[Navigation, Pagination]}
                breakpoints={{
                    480: { slidesPerView: 1.4, spaceBetween: 16 },
                    640: { slidesPerView: 2, spaceBetween: 18 },
                    768: { slidesPerView: 3, spaceBetween: 20 },
                    1024: { slidesPerView: 4, spaceBetween: 22 },
                    1280: { slidesPerView: 4.5, spaceBetween: 24 },
                }}
                className="!pb-8"
            >
                {category.map((cat) => (
                    <SwiperSlide key={cat._id} className="!h-auto">
                        <div

                            className="group relative h-full rounded-2xl overflow-hidden bg-white dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-[0_8px_30px_rgb(0,0,0,0.06)] hover:shadow-[0_10px_35px_rgba(0,0,0,0.10)] transition-shadow"
                            style={{
                                background:
                                    'radial-gradient(500px circle at var(--mouse-x,50%) var(--mouse-y,50%), rgba(255,255,255,0.12), transparent 35%)',
                            }}
                        >
                            <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-yellow-500/50 transition" />

                            <div className="relative w-full aspect-[4/5] overflow-hidden">
                                <Image
                                    fill
                                    src={cat.image}
                                    alt={cat.name}
                                    className="object-cover will-change-transform duration-500 ease-out group-hover:scale-[1.03]"
                                    sizes="(min-width:1280px) 25vw, (min-width:1024px) 30vw, (min-width:768px) 33vw, (min-width:640px) 45vw, 90vw"
                                    priority
                                />

                                <div className="absolute left-3 top-3 sm:left-4 sm:top-4">
                                    <span className="inline-flex items-center gap-1 rounded-full bg-white/90 dark:bg-neutral-800/90 backdrop-blur px-2.5 py-1 text-[11px] sm:text-xs font-semibold text-gray-800 dark:text-gray-100 border border-gray-200/70 dark:border-neutral-700/70 shadow-sm">
                                        <Sparkles className="h-3.5 w-3.5" /> Popular
                                    </span>
                                </div>

                                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/10 opacity-90" />



                            </div>

                            {/* Content */}
                            <div className="p-4 sm:p-5">
                                <h3 className="text-base sm:text-lg md:text-xl font-bold tracking-tight text-gray-900 dark:text-white line-clamp-1">
                                    {cat.name}
                                </h3>
                                <p className="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 line-clamp-2">
                                    Explore the best picks in this category.
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </section>
    );
}
