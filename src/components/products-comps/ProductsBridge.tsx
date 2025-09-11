import { getProducts } from '@/actions/products.action'
import axios from 'axios'
import React from 'react'
import ProductsComp from './ProductsGridSystem';
import { getUserCart } from '@/actions/cart.action';
import { getUserWishlist } from '@/actions/wishlist.action';


export default async function ProductsBridge() {

    const userWish = await getUserWishlist();

    console.log(userWish, "user wish list from products ")
    
    const response = await getProducts();
    console.log(response?.data);

    return (
        <div>
            <ProductsComp products={response?.data} />

        </div>
    )
}
