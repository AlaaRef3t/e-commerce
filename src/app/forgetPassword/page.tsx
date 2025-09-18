"use client";
import { getUserPassword } from "@/actions/userPassword.action";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ForgetPassword() {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter()

    interface ForgetPasswordInputs {
        email: string;
    }
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ForgetPasswordInputs>();

    async function onSubmit(values: ForgetPasswordInputs) {
        try {
            const response = await getUserPassword(values.email)
            if (response?.data?.statusMsg === "success") {
                toast.success("Code Sent Successfully!")
                setErrorMessage(null)
                router.push("/resetPassword")
            
        }
        console.log(response);
        } catch (error) {
            toast.error("An error occurred during login!")
            console.error(error)
        }        
    }

    return (
        <div className=" w-full flex  justify-center bg-gray-50 px-4 py-10">
            <div className="w-full max-w-[350px] sm:max-w-[380px] bg-white rounded-xl shadow-xl p-6">
                <p className="text-center font-extrabold text-2xl sm:text-3xl tracking-tight mb-6">
                    Reset your password
                </p>

                {errorMessage && (
                    <p className="text-red-800 text-center pb-1">{errorMessage}</p>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-3 mb-4">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-full border border-gray-300 px-4 py-3 outline-none
                       focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        {...register("email", { required: "Email is required" })}
                        disabled={isSubmitting}
                        autoComplete="email"
                    />
                    {errors.email && (
                        <p className="text-red-800">{errors.email.message}</p>
                    )}





                    <button
                        type="submit"
                        className="w-full rounded-full bg-yellow-500 text-white py-2.5 font-semibold
             shadow hover:bg-yellow-600 active:translate-y-[1px] transition cursor-pointer
             flex items-center justify-center gap-2 disabled:opacity-60"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? (
                            <>
                                <span>Loading</span>
                                <LoaderCircle className="animate-spin" size={16} />
                            </>
                        ) : (
                            "Send Code"
                        )}
                    </button>
                </form>

                <p className="text-center text-[10px] sm:text-xs text-gray-500">
                    Don&apos;t have an account?
                    <Link href="/register">
                        <span className="ml-1 text-yellow-500 underline underline-offset-2 font-extrabold cursor-pointer hover:text-yellow-600">
                            Sign Up
                        </span>
                    </Link>
                </p>
            </div>
        </div>
    );
}
