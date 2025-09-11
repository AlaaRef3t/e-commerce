"use client";
import { ProductDetails } from "@/interfaces/productDetails.model";
import { StarRating } from "react-flexible-star-rating";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { ShoppingCart, Heart } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import Image from "next/image";
import { useCart } from "@/app/context/CartProvider";
import { addProductToCart } from "@/actions/cart.action";
import toast from "react-hot-toast";
import { useWishlist } from "@/app/context/WishlistProvider";
import { addProductToWishlist } from "@/actions/wishlist.action";

export default function ProductDetailsComp({
  productDetails,
}: {
  productDetails: ProductDetails;
  }) {
  
  const {getUserCartBridge } = useCart()
    const {getUserWishlistBridge } = useWishlist();
  
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
  const rating = Math.floor(productDetails.ratingsAverage || 0);

  return (
    <article
      className="
        bg-white rounded-2xl shadow-[0_6px_24px_rgba(0,0,0,0.06)]
        p-5 sm:p-6 md:p-8
        flex flex-col md:flex-row gap-8 lg:gap-10
      "
    >
      
      <div className="w-full md:w-[48%]">
        <div className="rounded-xl border border-gray-200 bg-gray-50 overflow-hidden">
          <Swiper
            slidesPerView={1}
            spaceBetween={12}
            navigation
            pagination={{ clickable: true }}
            modules={[Navigation, Pagination]}
            className="rounded-xl"
          >
            {productDetails.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <div className="relative w-full h-[320px] sm:h-[420px] md:h-[480px]">
                  <Image
                    src={image}
                    alt={`Product image ${index + 1}`}
                    fill
                    className="object-contain"
                    sizes="(max-width:768px) 100vw, 50vw"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>

      
      <div className="w-full md:w-[52%] flex flex-col">
        
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1 text-xs font-semibold">
            {productDetails.category?.name ?? "Category"}
          </span>

          <div className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-white px-2.5 py-1 shadow-sm">
            <StarRating starsLength={5} initialRating={rating} dimension={12} />
            <span className="text-xs font-semibold text-gray-700">
              {productDetails.ratingsAverage?.toFixed(1)}
            </span>
          </div>
        </div>

      
        <h1 className="mt-3 text-2xl sm:text-3xl font-extrabold tracking-tight text-gray-900">
          {productDetails.title}
        </h1>

        
        <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4">
          <p className="text-3xl font-extrabold text-gray-900">
            {productDetails.price}
            <span className="ml-1 text-base font-semibold text-gray-600">EGP</span>
          </p>
          <p className="mt-1 text-sm text-gray-600">
            Shipping included • Fast shipping and easy returns
          </p>
        </div>

       
        <div className="mt-4">
          <h2 className="text-sm font-semibold text-gray-900">Description</h2>
          <p className="mt-2 text-gray-700 leading-relaxed">
            {productDetails.description}
          </p>
        </div>

        <div className="my-5 h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          <button
            type="button"
            className="
              inline-flex justify-center items-center gap-2
              w-full sm:w-auto
              rounded-xl bg-yellow-500 hover:bg-yellow-600
              text-white font-semibold
              px-5 py-3 transition-colors
              cursor-pointer
            "
            onClick={()=>handleAddToCart(productDetails._id)}
          >
            <ShoppingCart className="h-5 w-5 " />
            Add to Cart
          </button>

          <button
            type="button"
            className="
              inline-flex justify-center items-center gap-2
              w-full sm:w-auto
              rounded-xl border border-gray-300
              text-gray-800 hover:bg-gray-50
              font-semibold px-5 py-3 transition-colors
              cursor-pointer
            "
            onClick={()=>handleAddToWishlist(productDetails._id)}
          >
            <Heart className="h-5 w-5 " />
            Wishlist
          </button>
        </div>

        <ul className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-gray-600">
          <li className="rounded-lg border border-gray-200 bg-white px-3 py-2">
            <span className="font-semibold text-gray-900">Brand :</span>{" "}
            {productDetails.brand?.name ?? "—"}
          </li>
          <li className="rounded-lg border border-gray-200 bg-white px-3 py-2">
            <span className="font-semibold text-gray-900">Quantity :</span>{" "}
            {productDetails.quantity}
          </li>
        </ul>
      </div>
    </article>
  );
}
