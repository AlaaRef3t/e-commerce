import { getUserWishlist } from "@/actions/wishlist.action";
import { WishlistResponse } from "@/interfaces/wishlist.model";
import { createContext, useContext, useEffect, useState } from "react";


interface wishlistContextType {
    wishlistDetails: WishlistResponse | null,
    getUserWishlistBridge:()=> Promise<void>
}
const WishlistContext = createContext<wishlistContextType>({
    wishlistDetails : null,
    getUserWishlistBridge:async()=>{}
})


export default function WishlistContextProvider({ children }: { children: React.ReactNode }) {

    const [wishlistDetails, setWishlistDetails] = useState(null)


    async function getUserWishlistBridge() {
        const response = await getUserWishlist()

        setWishlistDetails(response?.data)
    }

    useEffect(() => {
        getUserWishlistBridge()
    },[])

    return <WishlistContext.Provider value={{ wishlistDetails, getUserWishlistBridge }}>

        {children}
    </WishlistContext.Provider>
}

export function useWishlist() {
    const wishContext = useContext(WishlistContext)

    return wishContext
} 