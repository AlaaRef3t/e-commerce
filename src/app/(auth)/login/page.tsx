"use client";
import { LoginInputs } from "@/interfaces/login.model";
import { LoaderCircle, Eye, EyeOff } from "lucide-react";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const searchParams = useSearchParams();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginInputs>();

  async function onSubmit(values: LoginInputs) {
    try {

      const callbackUrl = searchParams.get("callbackUrl") ?? "/";

      const response = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl,
      });

      if (response?.ok) {
        toast.success("Successfully Logged in!");
        setErrorMessage(null);



        window.location.assign(response.url ?? callbackUrl);
        return;
      }

      toast.error(response?.error ?? "Failed to login!");
      setErrorMessage("Email or password incorrect");
    } catch (error) {
      toast.error("An error occurred during login!");
      console.error(error);
    }
  }

  return (
    <div className=" w-full flex  justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-[350px] sm:max-w-[380px] bg-white rounded-xl shadow-xl p-6">
        <p className="text-center font-extrabold text-2xl sm:text-3xl tracking-tight mb-6">
          Sign in now
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

          <div className="relative">
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Password"
              className="w-full rounded-full border border-gray-300 px-4 py-3 pr-10 outline-none
                         focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              {...register("password", { required: "Password is required" })}
              disabled={isSubmitting}
              autoComplete="current-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-600"
              aria-label={showPassword ? "Show password" : "Hide password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-800">{errors.password.message}</p>
          )}

          <p className="m-0 text-right text-gray-500 underline underline-offset-2 text-[10px] sm:text-xs hover:text-black cursor-pointer">
            Forgot Password?
          </p>

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
              "Sign in"
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
