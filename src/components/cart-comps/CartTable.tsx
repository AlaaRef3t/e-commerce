"use client"
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
import { Badge } from "../ui/badge";
import { Trash2, X } from "lucide-react";
import { useCart } from "@/app/context/CartProvider";
import { clearCart, removeProduct, updateProduct } from "@/actions/cart.action";
import toast from "react-hot-toast";
import Link from "next/link";


export default function CartTable() {

    const { cartDetails, getUserCartBridge } = useCart();

    async function handleRemoveCart(id: string) {
        const response = await removeProduct(id)
        getUserCartBridge()
        toast.success("Product successfully deleted from cart")

        console.log(response)
    }


    async function handleUpdateProduct(id: string, count: number) {
        const response = await updateProduct(id, count)
        getUserCartBridge()
        toast.success("Product successfully updated")

        console.log(response)
    }


    async function handleClearCart() {
        const response = await clearCart()
        getUserCartBridge()
        toast.success("Cart successfully cleared")

        console.log(response)
    }


    return (
        <div className="max-w-6xl mx-auto px-4 py-8">
            <div className="overflow-x-auto rounded-2xl border border-gray-200 bg-white shadow-sm">
                <Table className="min-w-[720px] ">
                    <TableHeader>
                        <TableRow className="bg-gray-50/60 text-center">
                            <TableHead className="p-4 text-gray-600 font-semibold text-center ">Product</TableHead>
                            <TableHead className="p-3 text-gray-600 font-semibold text-center">Price</TableHead>
                            <TableHead className="p-3 text-gray-600 font-semibold text-center">
                                Quantity
                            </TableHead>
                            <TableHead className="p-3 text-gray-600 font-semibold text-center">
                                Subtotal
                            </TableHead>
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {cartDetails?.data?.products.map((product) => <TableRow key={product._id} className="hover:bg-gray-50/70 transition-colors">
                            <TableCell className="p-4 text-center">
                                <div className="flex items-center gap-4">
                                    <div className="relative">
                                        {/* Remove */}
                                        <button
                                            onClick={() => handleRemoveCart(product.product._id)}
                                            type="button"
                                            className="cursor-pointer absolute -top-2 -left-2 z-10 grid h-[22px] w-[22px] place-items-center rounded-full bg-red-500 text-white shadow ring-1 ring-black/5"
                                            aria-label="Remove item"
                                        >
                                            <X className="h-3.5 w-3.5" />
                                        </button>

                                        {/* Image */}
                                        <div className="overflow-hidden rounded-lg ring-1 ring-gray-200">
                                            <Image
                                                src={product?.product.imageCover}
                                                alt="Product image"
                                                width={68}
                                                height={68}
                                                className="h-[68px] w-[68px] object-cover"
                                            />
                                        </div>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="font-semibold text-gray-900 line-clamp-1">{product.product.title.split(" ").slice(0, 4).join(" ")}</p>
                                        <div className="mt-1 flex items-center gap-2">
                                            <Badge className="bg-yellow-500 text-black hover:bg-yellow-500/90">
                                                In stock
                                            </Badge>
                                            <span className="text-xs text-gray-500">{product.product.category.name}</span>
                                        </div>
                                    </div>
                                </div>
                            </TableCell>

                            <TableCell className="p-2  text-left">
                                <span className="text-gray-700 font-semibold">{product.price} EGP</span>
                            </TableCell>

                            <TableCell className="p-2 text-left">
                                <div className="flex items-center  gap-2">
                                    <button

                                        className="cursor-pointer grid h-8 w-8 place-items-center rounded-full border border-gray-300 text-gray-700 hover:border-yellow-500 hover:text-yellow-600 transition"
                                        onClick={() => handleUpdateProduct(product.product._id, product.count + 1)}
                                    >
                                        +
                                    </button>
                                    <span className="w-6 text-center font-semibold text-gray-800">{product.count}</span>
                                    <button

                                        className="cursor-pointer grid h-8 w-8 place-items-center rounded-full border border-gray-300 text-gray-700 hover:border-yellow-500 hover:text-yellow-600 transition"
                                        onClick={() => handleUpdateProduct(product.product._id, product.count - 1)}
                                    >
                                        –
                                    </button>
                                </div>
                            </TableCell>

                            <TableCell className="p-2 align-middle text-left">
                                <span className="text-base font-semibold text-gray-900">{product.price * product.count} EGP</span>
                            </TableCell>
                        </TableRow>)}

                    </TableBody>
                </Table>
            </div>

            {/* Footer actions */}
            <div className="mt-6 w-full rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                   
                    <div className="flex items-center justify-between sm:justify-start gap-8 w-full sm:w-auto">
                        <span className="text-sm text-gray-500">Total</span>
                        <span className="text-xl font-bold text-gray-900">
                            {cartDetails?.data.totalCartPrice} EGP
                        </span>
                    </div>

                    {/* Buttons */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-2 sm:gap-3 w-full sm:w-auto flex-wrap">
                        <Link
                            href="/product"
                            className="cursor-pointer inline-flex items-center justify-center rounded-full border border-gray-300 px-5 py-2.5 text-sm font-medium text-gray-700 hover:border-yellow-500 hover:text-yellow-600 transition w-full sm:w-auto sm:flex-none min-w-[150px]"
                        >
                            Continue Shopping
                        </Link>

                        <button
                            type="button"
                            className="cursor-pointer inline-flex items-center justify-center rounded-full bg-yellow-500 px-6 py-2.5 text-sm font-semibold text-black shadow hover:bg-yellow-600 transition w-full sm:w-auto sm:flex-none min-w-[140px]"
                        >
                            Checkout
                        </button>

                        <button
                            type="button"
                            onClick={handleClearCart}
                            className="cursor-pointer inline-flex items-center justify-center rounded-full bg-red-500 px-6 py-2.5 text-sm font-semibold text-white shadow hover:bg-red-600 transition w-full sm:w-auto sm:flex-none min-w-[140px]"
                        >
                            <Trash2 className="h-4 w-4 mr-2 shrink-0" />
                            Clear Cart
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}