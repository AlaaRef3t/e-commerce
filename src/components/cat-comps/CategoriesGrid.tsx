"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { Sparkles, Eye } from "lucide-react";
import type { categories } from "@/interfaces/categories.model";
import Link from "next/link";

export default function CategoriesGrid({ category }: { category: categories[] }) {
    

    return (
        <section className="container mx-auto lg:px-10 md:px-6 px-4 pb-12"
        
    >
            <div className="flex items-center justify-center gap-6 pb-6 md:pb-10 "
            
            >
                <div
                >
                    <div

                        className="flex items-center gap-2 text-yellow-600/90 text-xs sm:text-sm text-center">
                        <Sparkles className="h-4 w-4" />
                        <span className="uppercase tracking-wider font-semibold ">Handpicked</span>
                    </div>

                    <h2

                        className={`mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400`}
                    >
                        Our Categories
                    </h2>
                    <div

                        className="relative mt-3 h-[3px] w-24 sm:w-70 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600" />
                    <p
                        
                        className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-prose text-center">
                        Discover Featured Products our Customers love right now.
                    </p>
                </div>


            </div>

            <div
                className="
          grid gap-4 sm:gap-5
          sm:grid-cols-1
          md:grid-cols-2
          lg:grid-cols-3
          xl:grid-cols-4
        "
            >
                {category.map((cat) => (
                    <div
                        

                        key={cat._id}
                        className="
              group relative overflow-hidden rounded-2xl
              border border-gray-200 bg-white
              shadow-[0_8px_30px_rgba(0,0,0,0.06)]
              hover:shadow-[0_12px_36px_rgba(0,0,0,0.10)]
              transition-all duration-300
            "
                    >
                        <div className="relative w-full aspect-[4/5] overflow-hidden">
                            <Image
                                fill
                                src={cat.image}
                                alt={cat.name}
                                className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                sizes="(min-width:1280px) 20vw, (min-width:1024px) 25vw, (min-width:640px) 33vw, 50vw"
                                priority={false}
                            />

                            <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />

                            <div className="absolute left-3 top-3">
                                <span className="inline-flex items-center gap-1 rounded-full bg-white/90 backdrop-blur px-2.5 py-1 text-[11px] font-semibold text-gray-800 border border-gray-200 shadow-sm">
                                    <Sparkles className="h-3.5 w-3.5" />
                                    Popular
                                </span>
                            </div>
                        </div>

                        <div className="p-3 sm:p-4 flex flex-col gap-2">
                            <h3 className="text-sm sm:text-base md:text-lg font-bold tracking-tight text-gray-900 line-clamp-1">
                                {cat.name}
                            </h3>
                            <p className="text-xs sm:text-sm text-gray-500 line-clamp-2">
                                Explore the best picks in this category.
                            </p>

                            <Link
                                href={`/category/${cat._id}`}
                                className="mt-2 inline-flex items-center justify-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs sm:text-sm font-semibold text-gray-700 shadow-sm transition-colors hover:border-gray-300 hover:text-yellow-600"
                            >
                                <Eye className="h-[14px] w-[14px]" />
                                View Category Details
                            </Link>
                        </div>

                        <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-transparent group-hover:ring-yellow-500/50 transition" />
                    </div>
                ))}
            </div>
        </section>
    );
}
