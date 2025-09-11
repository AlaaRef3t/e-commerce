"use client";
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";
import { useWishlist } from "@/app/context/WishlistProvider";
import { useCart } from "@/app/context/CartProvider";
import { addProductToCart } from "@/actions/cart.action";
import toast from "react-hot-toast";
import { removeProductFromWish } from "@/actions/wishlist.action";

export default function WishlistTableStatic() {
    const {getUserCartBridge } = useCart()
    const {getUserWishlistBridge } = useWishlist()
  async function handleAddToCart(productId: string) {
  
      const response = await addProductToCart(productId)
      console.log(response, "add to cart from card");
      getUserCartBridge()
      toast.success(response?.message)
  
    }
    
     async function handleRemoveCartFromWish(id: string) {
        const response = await removeProductFromWish(id)
        getUserWishlistBridge()
        toast.success("Product successfully deleted from wishlist")

        console.log(response)
    }

    const { wishlistDetails } = useWishlist()

    const headCls = "px-6 py-3 text-sm font-semibold text-gray-600";
    const cellLeft = "px-6 py-4 align-middle text-left";
    const cellCenter = "px-6 py-4 align-middle text-left";

    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                <Table className="w-full table-fixed min-w-[720px]">
                    <colgroup>
                        <col className="w-[48%]" />
                        <col className="w-[18%]" />
                        <col className="w-[18%]" />
                        <col className="w-[16%]" />
                    </colgroup>

                    <TableHeader>
                        <TableRow className="bg-gray-50/60">
                            <TableHead className={headCls + " text-left"}>Product</TableHead>
                            <TableHead className={headCls + " text-center"}>Price</TableHead>
                            <TableHead className={headCls + " text-center"}>Status</TableHead>
                            <TableHead className={headCls + " text-center"}>Actions</TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {wishlistDetails?.data?.map((wish) => <TableRow key={wish?._id} className="hover:bg-gray-50/70 transition-colors">
                            <TableCell className={cellLeft}>
                                <div className="relative flex items-center gap-4">
                                    <button
                                        type="button"
                                        className="cursor-pointer absolute -left-3 -top-2 grid h-5 w-5 place-items-center rounded-full bg-red-500 text-white shadow ring-1 ring-black/5"
                                        aria-label="Remove from wishlist"
                                        onClick={()=>handleRemoveCartFromWish(wish?._id)}
                                    >
                                        <Trash2 className="h-3.5 w-3.5" />
                                    </button>

                                    <div className="overflow-hidden rounded-lg ring-1 ring-gray-200 shrink-0">
                                        <Image
                                            src={wish?.imageCover}
                                            alt={wish?.title}
                                            width={68}
                                            height={68}
                                            className="h-[68px] w-[68px] object-cover"
                                        />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="font-semibold text-gray-900 line-clamp-1">
                                            {wish?.title}
                                        </p>
                                        <div className="mt-1 flex items-center gap-2">

                                            <Badge className="text-xs bg-yellow-500 text-black hover:bg-yellow-500/90">
                                                In stock
                                            </Badge>


                                            <span className="text-xs text-gray-500">{wish?.category?.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell className={cellCenter}>
                                <span className="font-semibold text-gray-800">{wish?.price} EGP</span>
                            </TableCell>

                            <TableCell className={cellCenter}>

                                <span className="inline-flex items-center rounded-full px-3 py-1 text-xs font-medium bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200">
                                    Available
                                </span>

                            </TableCell>

                            <TableCell className={cellCenter}>
                                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-center gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
                                    <button
                                        type="button"
                                        className="cursor-pointer inline-flex items-center justify-center rounded-full bg-yellow-500 px-4 py-2 text-sm font-semibold text-black shadow hover:bg-yellow-600 transition w-full sm:w-auto sm:flex-none min-w-[130px]"
                                        onClick={()=>handleAddToCart(wish?._id)}
                                    >
                                        Add to cart
                                    </button>

                                    <button
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-full border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:border-yellow-500 hover:text-yellow-600 transition w-full sm:w-auto sm:flex-none min-w-[130px]"
                                    >
                                        <Heart className="h-4 w-4 mr-2" />
                                        Keep
                                    </button>
                                </div>
                            </TableCell>
                        </TableRow>)}

                    </TableBody>
                </Table>
            </div>

            <div className="mt-6 w-full rounded-xl border border-gray-200 bg-white p-4 sm:p-5 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <span className="text-sm text-gray-500">You have {wishlistDetails?.count ? wishlistDetails?.count : 0} item in your wishlist</span>

                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
                        <Link
                            href="/product"
                            className="inline-flex items-center justify-center rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-yellow-500 hover:text-yellow-600 transition w-full sm:w-auto sm:flex-none min-w-[160px]"
                        >
                            Continue shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
