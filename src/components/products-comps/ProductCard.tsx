"use client";
import React, { useEffect } from "react";
import type { Products } from "@/interfaces/products.model";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import { StarRating } from "react-flexible-star-rating";
import { Eye, ShoppingCart, Heart, Sparkles } from "lucide-react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";
import { addProductToCart } from "@/actions/cart.action";
import toast from "react-hot-toast";
import { useCart } from "@/app/context/CartProvider";
import { useWishlist } from "@/app/context/WishlistProvider";
import { addProductToWishlist } from "@/actions/wishlist.action";

export default function ProductCard({ product }: { product: Products }) {
  const { getUserCartBridge } = useCart();
  const { getUserWishlistBridge } = useWishlist();

  async function handleAddToCart(productId: string) {

    const response = await addProductToCart(productId)
    console.log(response, "add to cart from card");
    getUserCartBridge()
    toast.success(response?.message)

  }
  async function handleAddToWishlist(productId: string) {

    const response = await addProductToWishlist(productId)
    console.log(response, "add to cart from card");
    getUserWishlistBridge()
    toast.success(response?.message)

  }


  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);
  return (
    <div className="group">

      <Card
        data-aos="fade-up"
        className="
        h-[500px]
          relative overflow-hidden
          rounded-2xl border border-gray-200/80 bg-white
          shadow-[0_6px_24px_rgba(0,0,0,0.06)]
          transition-all duration-300
          hover:-translate-y-0.5 hover:shadow-[0_10px_35px_rgba(0,0,0,0.10)]
        "
      >

        <div className="pointer-events-none absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <CardHeader className="pb-2">

          <div className="mb-2 inline-flex items-center gap-1 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-[10px] font-semibold text-amber-700">
            <Sparkles className="h-3 w-3" />
            Featured
          </div>

          <CardTitle className="text-base sm:text-lg font-extrabold tracking-tight text-gray-900 line-clamp-2">
            {product.title.split(" ").slice(0, 2).join(" ")}
          </CardTitle>

          <CardDescription className="mt-1 text-xs sm:text-sm text-gray-500 line-clamp-2">
            {product.description.split(" ").slice(0, 3).join(" ")}...
          </CardDescription>
        </CardHeader>

        <CardContent className="pt-0">
          <div className="relative w-full h-[230px] sm:h-[240px] md:h-[250px] rounded-xl overflow-hidden">
            <Image
              src={product.imageCover}
              alt={product.title}
              fill
              sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
              className="object-contain transition-transform duration-500 group-hover:scale-[1.04]"
              priority
            />


            <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-90" />


            <div className="absolute left-3 top-3">
              <span className="rounded-md bg-white/85 backdrop-blur px-2 py-0.5 text-[10px] font-semibold text-gray-800 border border-gray-200 shadow-sm">
                {product.brand?.name}
              </span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="pt-3">
          <div className="flex w-full items-center justify-between">

            <div>
              <p className="text-xs uppercase tracking-wide text-gray-500">Price</p>
              <p className="text-lg font-extrabold text-gray-900">
                {product.price}
                <span className="ml-1 text-sm font-semibold text-gray-600">EGP</span>
              </p>
            </div>


            <div className="flex items-center rounded-full border border-gray-200 bg-white px-2.5 py-1 shadow-sm">
              <StarRating
                starsLength={5}
                initialRating={Math.floor(product.ratingsAverage)}
                dimension={6}
              />
              <span className="ml-1 text-xs font-semibold text-gray-700">
                {product.ratingsAverage.toFixed(1)}
              </span>
            </div>
          </div>
        </CardFooter>

        <div
          aria-hidden="true"
          className="
    absolute top-1/2 right-3 -translate-y-1/2
    flex flex-col items-center gap-2.5
    translate-x-0 md:translate-x-16 md:group-hover:translate-x-0
    transition-all duration-300 ease-out
  "
        >
          <div className="relative group/tooltip">
            <button
              aria-label="Quick View"
              className="
        p-2.5 rounded-full
        bg-white/95 border border-gray-200
        shadow-[0_4px_12px_rgba(0,0,0,0.08)]
        hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]
        hover:border-gray-300
        transition-all
        cursor-pointer
      "
            >
              <Link href={`/product/${product._id}`}>
                <Eye className="h-[18px] w-[18px] text-gray-700 hover:text-yellow-500" />
              </Link>
            </button>
            <span
              className="
        hidden sm:block
        absolute right-full top-1/2 -translate-y-1/2 mr-2
        whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white
        opacity-0 group-hover/tooltip:opacity-100
        transition-opacity duration-200
      "
            >
              Quick View
            </span>
          </div>

          <div className="relative group/tooltip">
            <button
              onClick={() => handleAddToCart(product._id)}
              aria-label="Add to Cart"
              className="
        p-2.5 rounded-full
        bg-white/95 border border-gray-200
        shadow-[0_4px_12px_rgba(0,0,0,0.08)]
        hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]
        hover:border-gray-300
        transition-all
        cursor-pointer
      "
            >
              <ShoppingCart className="h-[18px] w-[18px] text-gray-700 hover:text-yellow-500" />
            </button>
            <span
              className="
        hidden sm:block
        absolute right-full top-1/2 -translate-y-1/2 mr-2
        whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white
        opacity-0 group-hover/tooltip:opacity-100
        transition-opacity duration-200
      "
            >
              Add to Cart
            </span>
          </div>

          <div className="relative group/tooltip">
            <button
              onClick={() => handleAddToWishlist(product._id)}
              aria-label="Wishlist"
              className="
        p-2.5 rounded-full
        bg-white/95 border border-gray-200
        shadow-[0_4px_12px_rgba(0,0,0,0.08)]
        hover:shadow-[0_6px_16px_rgba(0,0,0,0.12)]
        hover:border-gray-300
        transition-all
        cursor-pointer
      "
            >
              <Heart className="h-[18px] w-[18px] text-gray-700 hover:text-yellow-500" />
            </button>
            <span
              className="
        hidden sm:block
        absolute right-full top-1/2 -translate-y-1/2 mr-2
        whitespace-nowrap rounded-md bg-gray-800 px-2 py-1 text-xs text-white
        opacity-0 group-hover/tooltip:opacity-100
        transition-opacity duration-200
      "
            >
              Wishlist
            </span>
          </div>
        </div>


      </Card>
    </div>
  );
}
