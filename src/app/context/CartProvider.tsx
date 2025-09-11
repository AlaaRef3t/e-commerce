import { getUserCart } from "@/actions/cart.action";
import { createContext, useContext, useEffect, useState } from "react";
import { CartResponse } from './../../interfaces/cart.model';

interface CartContextType{
    cartDetails: CartResponse | null,
    getUserCartBridge:()=> Promise<void>
}

const CartContext = createContext<CartContextType>({
    cartDetails:null,
    getUserCartBridge:async()=>{}
});

export default function CartContextProvider({children}: {children: React.ReactNode}) {
    
    const [cartDetails, setCartDetails] = useState(null)

    async function getUserCartBridge() {
        const response = await getUserCart()
            console.log(response?.data);
            
        setCartDetails(response?.data)
    }

    useEffect(() => {
        getUserCartBridge()
    },[])

    return (
        <CartContext.Provider value={{cartDetails , getUserCartBridge}}>
            {children}
        </CartContext.Provider>
    );
}   


export function useCart() {
    
    const myContext = useContext(CartContext)
    return myContext
}