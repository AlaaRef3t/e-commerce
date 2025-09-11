import { getUserWishlist } from "@/actions/wishlist.action";
import { WishlistResponse } from "@/interfaces/wishlist.model";
import { useSession } from "next-auth/react";
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

const {data: session} = useSession()
    async function getUserWishlistBridge() {
        const response = await getUserWishlist()

        setWishlistDetails(response?.data)
    }

    useEffect(() => {
        getUserWishlistBridge()
    },[session])

    return <WishlistContext.Provider value={{ wishlistDetails, getUserWishlistBridge }}>

        {children}
    </WishlistContext.Provider>
}

export function useWishlist() {
    const wishContext = useContext(WishlistContext)

    return wishContext
} 