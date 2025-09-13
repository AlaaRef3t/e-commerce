"use client";
import { getCashPayment } from "@/actions/payment.action";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCart } from "../context/CartProvider";

export default function checkoutPage() {
  interface inputs {
    details: string;
    city: string;
    phone: string
  }

  const { cartDetails, setCartDetails } = useCart()
  const cartId = cartDetails?.cartId;


  const [errorMessage, setErrorMessage] = useState(null)
  const router = useRouter()
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<inputs>()

  async function onSubmit(values: inputs) {

    try {

      const response = await getCashPayment(cartId as string, { shippingAddress: values })
      console.log(response, "cart check out ");

      if (response?.data.status === "success") {
        setCartDetails(null)
        router.push("/")
        console.log(response?.data.status);
        toast.success("The order has been booked")

      }

    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {cartDetails ? <div className="min-h-[calc(100vh-0px)] w-full flex items-center justify-center bg-gray-50 px-4 py-10">
        <div className="w-full max-w-[350px] sm:max-w-[380px] bg-white rounded-xl shadow-xl p-6">
          <p className="text-center font-extrabold text-2xl sm:text-3xl tracking-tight mb-6">
            Complete Cash Payment
          </p>
          {errorMessage && <p className="text-red-800 text-center">{errorMessage}</p>}

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="grid gap-3 mb-4">

            <input
              type="text"
              placeholder="Your Details"
              className="w-full rounded-full border border-gray-300 px-4 py-3 outline-none
                       focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"

              {...register("details", { required: "Email Is Required" })}
            />
            {errors.details && <p className="text-red-800">{errors.details.message}</p>}

            <input
              type="text"
              placeholder="Your City"
              className="w-full rounded-full border border-gray-300 px-4 py-3 outline-none
                       focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"

              {...register("city", { required: "Email Is Required" })}
            />
            {errors.city && <p className="text-red-800">{errors.city.message}</p>}



            <input
              type="tel"
              placeholder="Phone Number"
              className="w-full rounded-full border border-gray-300 px-4 py-3 outline-none
                       focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              {...register("phone", { required: "Phone Is Required" })}
            />
            {errors.phone && <p className="text-red-800">{errors.phone.message}</p >}



            <button
              type="submit"
              className="w-full rounded-full bg-yellow-500 text-white py-2.5 font-semibold
             shadow hover:bg-yellow-600 active:translate-y-[1px] transition cursor-pointer
             flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span>Loading...</span>
                  <LoaderCircle className="animate-spin" size={16} />
                </>
              ) : (
                'Checkout'
              )}
            </button>
          </form>


        </div>
      </div> : <h2 className="text-center text-4xl">Please add any product to your cart</h2>}
    </>
  );
}
