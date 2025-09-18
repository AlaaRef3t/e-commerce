"use client";
import {  resetUserPassword } from "@/actions/userPassword.action";
import { LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

export default function ResetPassword() {

    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const router = useRouter()

    interface ResetPasswordInputs {
        resetCode: string;
    }
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<ResetPasswordInputs>();

    async function onSubmit(values: ResetPasswordInputs) {
        try {
            const response = await resetUserPassword(values.resetCode);
            if (response?.message == "success") {
                toast.success("Successfully Reset!")
                setErrorMessage(null)
                router.push("/updatePassword")
            console.log(response?.message);
        }
        } catch (error) {
            toast.error("An error occurred during reset!")
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
                        type="code"
                        placeholder="Type The Code"
                        className="w-full rounded-full border border-gray-300 px-4 py-3 outline-none
                       focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                        {...register("resetCode", { required: "code is required" })}
                        disabled={isSubmitting}
                        autoComplete="code"
                    />
                    {errors.resetCode && (
                        <p className="text-red-800">{errors.resetCode.message}</p>
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
                            "Reset Password"
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
