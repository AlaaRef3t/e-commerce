"use client";
import { Brands } from '@/interfaces/brands.model'

import React, { useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { Eye } from "lucide-react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

export default function BrandsCard({ brand }: { brand: Brands }) {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  return (
    <>
      <Card
        data-aos="fade-up"
        className="group relative h-[500px] overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-[0_6px_24px_rgba(0,0,0,0.06)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(0,0,0,0.10)]"
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />


        <CardHeader className="pb-2">
          <CardTitle className="text-base font-extrabold tracking-tight text-gray-900 sm:text-lg line-clamp-2">
            {brand.name}
          </CardTitle>


          <CardDescription className="mt-1 text-xs text-gray-500 sm:text-sm line-clamp-2">
            {brand.slug}
          </CardDescription>
        </CardHeader>


        <CardContent className="pt-0">
          <div className="relative h-[230px] w-full overflow-hidden rounded-xl sm:h-[240px] md:h-[250px]">
            <Image
              src={brand.image}
              alt={brand.name}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
              className="object-contain bg-white p-6 transition-transform duration-500 group-hover:scale-[1.04]"
              priority
            />


            <div className="absolute left-3 top-3">
              <span className="rounded-md border border-gray-200 bg-white/85 px-2 py-0.5 text-[10px] font-semibold text-gray-800 shadow-sm backdrop-blur">
                {brand.name}
              </span>
            </div>
          </div>
        </CardContent>


        <CardFooter className="pt-3">
          <div className='flex items-center justify-center w-full'>
            <Link
              href={`/brands/${brand._id}`}
              className=" inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-3 py-1.5 text-md font-semibold text-gray-700 shadow-sm transition-colors hover:border-gray-300"
            >
              <Eye className="h-[16px] w-[16px]" />
              View Brand Details
            </Link>
          </div>
        </CardFooter>
      </Card>
    </>
  )
}
