"use client"
import { SessionProvider } from "next-auth/react";
import CartContextProvider from "./CartProvider";
import WishlistContextProvider from "./WishlistProvider";



export function AuthProvider({ children }: { children: React.ReactNode }) {



    return (
        <SessionProvider>
            <CartContextProvider>
                <WishlistContextProvider>
                    {children}

                </WishlistContextProvider>

            </CartContextProvider>
        </SessionProvider>
    );
}