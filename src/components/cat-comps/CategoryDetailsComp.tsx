"use client";

import { Brands } from '@/interfaces/brands.model'
import React from 'react'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Image from "next/image";


export default function CategoryDetailsComp({ catDetails }: { catDetails: Brands }) {
    return (
        <main className="mx-auto max-w-2xl px-4 py-8">
            <Card
                className="group relative h-auto overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(0,0,0,0.10)]"
            >
                <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                <CardHeader className="pb-2">
                    <CardTitle className="text-xl font-extrabold tracking-tight text-gray-900 sm:text-2xl">
                        {catDetails.name}
                    </CardTitle>
                    <CardDescription className="mt-1 text-sm text-gray-500">
                        {catDetails.slug}
                    </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                    <div className="relative h-[280px] w-full overflow-hidden rounded-xl sm:h-[320px]">
                        <Image
                            src={catDetails.image}
                            alt={catDetails.name}
                            fill
                            sizes="(max-width:768px) 100vw, (max-width:1200px) 75vw, 50vw"
                            className="bg-white object-contain p-6 transition-transform duration-500 group-hover:scale-[1.02]"
                            priority
                        />

                        <div className="absolute left-3 top-3">
                            <span className="rounded-md border border-gray-200 bg-white/85 px-2 py-0.5 text-[10px] font-semibold text-gray-800 shadow-sm backdrop-blur">
                                {catDetails.name}
                            </span>
                        </div>
                    </div>

                    <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <div className="rounded-lg border border-gray-200 bg-gray-50/60 p-3">
                            <p className="text-[11px] uppercase tracking-wide text-gray-500">ID</p>
                            <p className="truncate text-sm font-semibold text-gray-800">{catDetails._id}</p>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-gray-50/60 p-3">
                            <p className="text-[11px] uppercase tracking-wide text-gray-500">Created</p>
                            <p className="text-sm font-semibold text-gray-800">
                                {new Date(catDetails.createdAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-gray-50/60 p-3">
                            <p className="text-[11px] uppercase tracking-wide text-gray-500">Updated</p>
                            <p className="text-sm font-semibold text-gray-800">
                                {new Date(catDetails.updatedAt).toLocaleDateString()}
                            </p>
                        </div>
                        <div className="rounded-lg border border-gray-200 bg-gray-50/60 p-3">
                            <p className="text-[11px] uppercase tracking-wide text-gray-500">Slug</p>
                            <p className="text-sm font-semibold text-gray-800">{catDetails.slug}</p>
                        </div>
                    </div>
                </CardContent>

              
            </Card>
        </main>
    )
}
