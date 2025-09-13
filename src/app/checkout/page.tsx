"use client";
import { getCashPayment, getOnlinePayment } from "@/actions/payment.action";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useCart } from "../context/CartProvider";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export default function CheckoutPage() {
  interface inputs {
    details: string;
    city: string;
    phone: string;
  }

  const { cartDetails, setCartDetails } = useCart();
  const cartId = cartDetails?.cartId;

  const [paymentMethod, setPaymentMethod] = useState<"cash" | "online" | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<inputs>();

  async function onSubmit(values: inputs) {
    if (paymentMethod === "cash") {
      try {
        const response = await getCashPayment(cartId as string, {
          shippingAddress: values,
        });
        if (response?.data.status === "success") {
          setCartDetails(null);
          router.push("/");
          toast.success("The order has been booked");
        }
      } catch (error) {
        console.log(error);
      }
    } else if (paymentMethod === "online") {
      try {
        const response = await getOnlinePayment(cartId as string, {
          shippingAddress: values,
        });
        console.log(response?.data, " from online func");

        if (response?.data.status === "success") {
          // setCartDetails(null);
          // router.push("/");
          // toast.success("The order has been booked");

          window.location.href = response?.data?.session.url
        }
      } catch (error) {
        console.log(error);
      }
    }
  }

  return (
    <>
      {cartDetails ? (
        <div className="min-h-[calc(100vh-0px)] w-full flex items-center justify-center bg-gray-100 px-4 py-12">
          <div className="w-full max-w-md bg-white rounded-2xl shadow-lg border border-gray-200 p-8">
            <h1 className="text-center font-extrabold text-2xl sm:text-3xl tracking-tight text-gray-900 mb-6">
              Checkout
            </h1>
            {errorMessage && (
              <p className="text-red-600 text-center mb-4">{errorMessage}</p>
            )}

            <form
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-5"
            >
              {/* Details */}
              <div className="space-y-1">
                <Label className="text-sm font-medium text-gray-700">
                  Details
                </Label>
                <input
                  type="text"
                  placeholder="Your details"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none text-gray-800 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                  {...register("details", { required: "Details is required" })}
                />
                {errors.details && (
                  <p className="text-red-600 text-sm">{errors.details.message}</p>
                )}
              </div>

              {/* City */}
              <div className="space-y-1">
                <Label className="text-sm font-medium text-gray-700">
                  City
                </Label>
                <input
                  type="text"
                  placeholder="Your city"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none text-gray-800 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                  {...register("city", { required: "City is required" })}
                />
                {errors.city && (
                  <p className="text-red-600 text-sm">{errors.city.message}</p>
                )}
              </div>

              {/* Phone */}
              <div className="space-y-1">
                <Label className="text-sm font-medium text-gray-700">
                  Phone
                </Label>
                <input
                  type="tel"
                  placeholder="Phone number"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 outline-none text-gray-800 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition"
                  {...register("phone", { required: "Phone is required" })}
                />
                {errors.phone && (
                  <p className="text-red-600 text-sm">{errors.phone.message}</p>
                )}
              </div>

              {/* Payment Method */}
              <div className="space-y-2">
                <Label className="text-sm font-medium text-gray-700">
                  Payment Method
                </Label>
                <RadioGroup
                  onValueChange={(value) =>
                    setPaymentMethod(value as "cash" | "online")
                  }
                  className="flex gap-6 mt-2"
                >
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="cash" id="cash" />
                    <Label htmlFor="cash" className="cursor-pointer">
                      Cash
                    </Label>
                  </div>
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value="online" id="online" />
                    <Label htmlFor="online" className="cursor-pointer">
                      Online
                    </Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full rounded-xl bg-yellow-500 text-black py-3 font-semibold shadow-md hover:bg-yellow-600 active:translate-y-[1px] transition cursor-pointer flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <span>Processing...</span>
                    <LoaderCircle className="animate-spin" size={18} />
                  </>
                ) : (
                  "Confirm Order"
                )}
              </button>
            </form>
          </div>
        </div>
      ) : (
        <h2 className="text-center text-2xl py-12">
          Please add any product to your cart
        </h2>
      )}
    </>
  );
}
