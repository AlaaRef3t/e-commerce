"use client";
import Link from "next/link";
import { ShoppingCart, Heart, User,  LogOut } from "lucide-react";

import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";
import { Badge } from "../ui/badge";
import { useEffect, useState } from "react";
import { useCart } from "@/app/context/CartProvider";
import { useWishlist } from "@/app/context/WishlistProvider";

export default function Navbar() {

  const session = useSession()
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href;
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (session?.data?.user) {
      // console.log("User:", session.data.user);

    }
  }, [session]);


  const { cartDetails } = useCart();
  const { wishlistDetails } = useWishlist()

  // console.log(cartDetails, " from navbar");

  return (
    <div
      className={`py-3
    transition-[background-color,box-shadow,backdrop-filter] duration-300 ease-out
    ${isFixed
          ? "fixed top-0 left-0 w-full z-50 bg-base-100/90 supports-[backdrop-filter]:backdrop-blur-md shadow-lg "
          : "bg-base-100 shadow-sm"
        }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="navbar">


          <div className="navbar-start">
            {/* Mobile menu */}
            <div className="dropdown">
              <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5"
                  fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </div>
              <ul
                tabIndex={0}
                className="
                   menu menu-sm dropdown-content
                   bg-base-100/95 backdrop-blur-md
                    rounded-2xl shadow-2xl ring-1 ring-base-200
                     z-20 mt-3 w-64 p-3 text-left
  "
              >
                <li className="menu-title px-2 pt-1 pb-2 text-[11px] tracking-wider text-gray-500 uppercase">
                  Menu
                </li>

                <li>
                  <Link
                    className={`font-semibold rounded-lg px-3 py-2.5 hover:bg-base-200 transition
                         ${isActive("/") ? "bg-yellow-50 text-yellow-700" : ""}`}
                    href="/"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    className={`font-semibold rounded-lg px-3 py-2.5 hover:bg-base-200 transition
                    ${isActive("/product") ? "bg-yellow-50 text-yellow-700" : ""}`}
                    href="/product"
                  >
                    Products
                  </Link>
                </li>
                <li>
                  <Link
                    className={`font-semibold rounded-lg px-3 py-2.5 hover:bg-base-200 transition
                    ${isActive("/category") ? "bg-yellow-50 text-yellow-700" : ""}`}
                    href="/category"
                  >
                    Category
                  </Link>
                </li>
                <li>
                  <Link
                    className={`font-semibold rounded-lg px-3 py-2.5 hover:bg-base-200 transition
                    ${isActive("/brands") ? "bg-yellow-50 text-yellow-700" : ""}`}
                    href="/brands"
                  >
                    Brands
                  </Link>
                </li>
                <li>
                  <Link
                    className={`font-semibold rounded-lg px-3 py-2.5 hover:bg-base-200 transition
                     ${isActive("/cart") ? "bg-yellow-50 text-yellow-700" : ""}`}
                    href="/cart"
                  >
                    Cart
                  </Link>
                </li>

                <div className="divider my-3" />

                {/* Auth Mobile */}
                {!session?.data ? (
                  <>
                    <li className="mb-2">
                      <Link href="/login" className="btn btn-ghost btn-sm w-full rounded-full border border-base-300 hover:border-yellow-500">
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link href="/register" className="btn btn-sm btn-warning w-full rounded-full text-black">
                        Register
                      </Link>
                    </li>
                  </>
                ) : null}
              </ul>

            </div>

            <Link href="/" className="md:text-2xl lg:text-4xl font-bold tracking-wide  underline">
              Go<span className='text-yellow-600'>Buy<span className='text-black'>.</span></span>
            </Link>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li>
                <Link className={`font-bold hover:text-yellow-600${isActive("/") ? " text-yellow-600" : ""}`} href="/">Home</Link>
              </li>
              <li>
                <Link className={`font-bold hover:text-yellow-600${isActive("/product") ? " text-yellow-600" : ""}`} href="/product">Products</Link>
              </li>
              <li>
                <Link className={`font-bold hover:text-yellow-600${isActive("/category") ? " text-yellow-600" : ""}`} href="/category">Category</Link>
              </li>
              <li>
                <Link className={`font-bold hover:text-yellow-600${isActive("/brands") ? " text-yellow-600" : ""}`} href="/brands">Brands</Link>
              </li>
              <li>
                <Link className={`font-bold hover:text-yellow-600${isActive("/cart") ? " text-yellow-600" : ""}`} href="/cart">Cart</Link>
              </li>
            </ul>
          </div>


          <div className="navbar-end gap-3 pr-4">
            {/* Search / wish / cart */}


            <Link href="/cart" className="relative cursor-pointer hover:text-yellow-600">
              <Badge
                variant="default"
                className="  absolute -top-2 -right-1.5 !p-0 !h-[18px] !w-[18px] !rounded-full flex items-center justify-center  !bg-red-500 !text-white text-[10px] font-bold shadow"
              >
                {cartDetails?.numOfCartItems ? cartDetails?.numOfCartItems : 0}
              </Badge>

              <ShoppingCart size={22} />
            </Link>

            <Link href="/wishlist" className="relative cursor-pointer hover:text-yellow-600 ">
              <Badge
                variant="default"
                className=" absolute -top-2 -right-1.5 !p-0 !h-[18px] !w-[18px] !rounded-full flex items-center justify-center  !bg-red-500 !text-white text-[10px] font-bold shadow  "
              >
                {wishlistDetails?.count ? wishlistDetails?.count : 0}
              </Badge>
              <Heart size={22} />
            </Link>


            {/* Auth in the Desktop */}
            <div className="hidden sm:flex dropdown dropdown-end">
              <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
                <User size={20} />
              </div>
              <ul
                tabIndex={0}
                className="
                   dropdown-content menu menu-sm
                    relative z-20 mt-10 w-64 p-2
                    bg-white rounded-xl shadow-xl ring-1 ring-black/5">
                <span className="pointer-events-none absolute -top-2 right-6 h-4 w-4 rotate-45 bg-white ring-1 ring-black/5 rounded-sm " />
                {session?.data ?
                  <>
                    <li className="-mx-1 mb-2 rounded-lg bg-gray-50 px-2.5 py-2">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/15 overflow-hidden">
                          {session?.data?.user?.image ? (
                            <img
                              src={session?.data?.user?.image}
                              alt={"User"}
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <User className="h-4 w-4 text-yellow-600" />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold text-gray-800 leading-5">
                            {session?.data?.user?.name}
                          </p>
                          <p className="truncate text-xs text-gray-500 leading-4">
                            {session?.data?.user?.email}
                          </p>
                        </div>
                      </div>
                    </li>

                    <li>
                      <Link
                        href="/"
                        onClick={() => signOut({ callbackUrl: "/login" })}
                        className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                      >
                        <LogOut className="h-4 w-4 text-gray-500" />
                        <span>LogOut</span>
                      </Link>
                    </li>

                  </> : <>
                    <li>
                      <Link
                        href="/login"
                        className={`${isActive("/login") ? " text-yellow-600" : ""}`}
                      >
                        Login
                      </Link>
                    </li>
                    <li>
                      <Link
                        href="/register"
                        className={`${isActive("/register") ? " text-yellow-600" : ""}`}
                      >
                        Register
                      </Link>
                    </li>
                  </>}


              </ul>
            </div>


            {/* Auth Mobile */}
            {session?.data ? (
              <div className="sm:hidden dropdown dropdown-end">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle"
                >
                  <User size={20} />
                </div>

                <ul
                  tabIndex={0}
                  className="  dropdown-content menu menu-sm  relative z-20 mt-2 w-64 p-2 bg-white rounded-xl shadow-xl ring-1 ring-black/5 "
                >
                  <span
                    className="  pointer-events-none absolute -top-2 right-6  h-4 w-4 rotate-45 bg-white ring-1 ring-black/5  rounded-sm "
                  />


                  <li className="-mx-1 mb-2 rounded-lg bg-gray-50 px-2.5 py-2">
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500/15 overflow-hidden">
                        {session?.data?.user?.image ? (
                          <img
                            src={session?.data?.user?.image}
                            alt={session?.data?.user?.name || "User"}
                            className="h-full w-full object-cover"
                          />
                        ) : (
                          <User className="h-4 w-4 text-yellow-600" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-semibold text-gray-800 leading-5">
                          {session?.data?.user?.name}
                        </p>
                        <p className="truncate text-xs text-gray-500 leading-4">
                          {session?.data?.user?.email}
                        </p>
                      </div>
                    </div>
                  </li>


                  <li>
                    <Link
                      href="/"
                      onClick={() => signOut({ callbackUrl: "/login" })}
                      className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 text-gray-500" />
                      <span>LogOut</span>
                    </Link>
                  </li>

                </ul>
              </div>
            ) : null}

          </div>

        </div>
      </div>
    </div>
  );
}
