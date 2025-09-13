import { getUserCart } from "@/actions/cart.action";
import { createContext, useContext, useEffect, useState } from "react";
import { CartResponse } from './../../interfaces/cart.model';
import { useSession } from 'next-auth/react';

interface CartContextType{
    cartDetails: CartResponse | null,
    getUserCartBridge: () => Promise<void>,
    setCartDetails:(cart : CartResponse | null )=> void
}

const CartContext = createContext<CartContextType>({
    cartDetails:null,
    getUserCartBridge: async () => { },
    setCartDetails:()=>{}
});

export default function CartContextProvider({children}: {children: React.ReactNode}) {
    
    const [cartDetails, setCartDetails] = useState<CartResponse | null>(null)

    const {data: session} = useSession()
    async function getUserCartBridge() {
        const response = await getUserCart()
            // console.log(response?.data);
            
        setCartDetails(response?.data)
    }

    useEffect(() => {
        getUserCartBridge()
    },[session])

    return (
        <CartContext.Provider value={{cartDetails , getUserCartBridge , setCartDetails}}>
            {children}
        </CartContext.Provider>
    );
}   


export function useCart() {
    
    const myContext = useContext(CartContext)
    return myContext
}