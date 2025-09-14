"use client";
import { RegInputs } from "@/interfaces/register.model";
import axios from "axios";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState(null)
  const [showPassword, setShowPassword] = useState(true);
  const [showRePassword, setShowRePassword] = useState(true);


  const router = useRouter()
  const { register, handleSubmit, getValues, formState: { errors, isSubmitting } } = useForm<RegInputs>()


  async function onSubmit(values: RegInputs) {

    try {
      const response = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      if (response?.data?.message === "success") {
        router.push("/login")
        toast.success('Successfully Registered!')

      }
      setErrorMessage(null)
      console.log(response);

    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        console.log(error.response?.data.message)
        setErrorMessage(error.response?.data.message)


      }
    }
  }

  return (
    <div className=" w-full flex  justify-center bg-gray-50 px-4 py-10">
      <div className="w-full max-w-[350px] sm:max-w-[380px] bg-white rounded-xl shadow-xl p-6">
        <p className="text-center font-extrabold text-2xl sm:text-3xl tracking-tight mb-6">
          Create your account
        </p>
        {errorMessage && <p className="text-red-800 text-center">{errorMessage}</p>}

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-3 mb-4">
          <input
            type="text"
            placeholder="Full name"
            className="w-full rounded-full border border-gray-300 px-4 py-3 outline-none
                       focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
            {...register("name", { required: "Name Is Required" })}
          />
          {errors.name && <p className="text-red-800">{errors.name.message}</p>}
          <input
            type="email"
            placeholder="Email"
            className="w-full rounded-full border border-gray-300 px-4 py-3 outline-none
                       focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"

            {...register("email", { required: "Email Is Required" })}
          />
          {errors.email && <p className="text-red-800">{errors.email.message}</p>}



          {/* Password */}
          <div className="relative">
            <input
              type={showPassword ? "password" : "text"}
              placeholder="Password"
              className="w-full rounded-full border border-gray-300 px-4 py-3 pr-10 outline-none
               focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              {...register("password", {
                required: "Password Is Required",
                pattern: {
                  value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                  message: "Password must be at least 8 characters and like Ahmed@123",
                },
              })}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-600"
              aria-label={showPassword ? "Hide password" : "Show password"}
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.password && <p className="text-red-800">{errors.password.message}</p>}

          {/* RePassword */}
          <div className="relative">
            <input
              type={showRePassword ? "password" : "text"}
              placeholder="RePassword"
              className="w-full rounded-full border border-gray-300 px-4 py-3 pr-10 outline-none
               focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
              {...register("rePassword", {
                required: "Re Password is required",
                validate: (value) =>
                  value === getValues("password") || "Passwords must match",
              })}
            />
            <button
              type="button"
              onClick={() => setShowRePassword(!showRePassword)}
              className="cursor-pointer absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-yellow-600"
              aria-label={showRePassword ? "Hide rePassword" : "Show rePassword"}
            >
              {showRePassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          {errors.rePassword && (
            <p className="text-red-800">{errors.rePassword.message}</p>
          )}

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
                <span>Loading</span>
                <LoaderCircle className="animate-spin" size={16} />
              </>
            ) : (
              'Sign Up'
            )}
          </button>
        </form>

        <p className="text-center text-[10px] sm:text-xs text-gray-500">
          Already have an account?
          <Link href="/login">
            <span className="ml-1 text-yellow-500 underline underline-offset-2 font-extrabold cursor-pointer hover:text-yellow-600">
              Log in
            </span>
          </Link>
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            className="w-full rounded-full bg-black text-white border-2 border-black
                       px-4 py-2 flex items-center justify-center gap-2"
          >


            {/* Google icon */}
            <svg
              viewBox="0 0 48 48"
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12
                c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24
                c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657
                C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36
                c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571
                c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            <span className="text-sm">Sign up with Google</span>
          </button>
        </div>
      </div>
    </div>
  );
}
