
"use client"
import React, { useEffect, useState } from 'react'
import { Products } from '../../interfaces/products.model';
import ProductCard from './ProductCard';
import { Sparkles } from 'lucide-react';



export default function ProductsGridSystem({ products }: { products: Products[] }) {

  
  return (
    <div
      className='container mx-auto lg:px-10 md:px-6 px-4 
      pb-8       
  sm:pb-13     
  md:pb-16    
  lg:pb-20   
  xl:pb-22 '>
      <div className="flex items-center justify-center gap-6 pb-6 md:pb-10 ">
        <div

        >
          <div
                       
            
            className="flex items-center gap-2 text-yellow-600/90 text-xs sm:text-sm text-center">
            <Sparkles className="h-4 w-4" />
            <span className="uppercase tracking-wider font-semibold ">Handpicked</span>
          </div>

          <h2
                                  
            className={`mt-2 text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600 dark:from-white dark:via-neutral-200 dark:to-neutral-400`}
          >
            Our Featured Products
          </h2>
          <div
                                

            className="relative mt-3 h-[3px] w-24 sm:w-70 rounded-full bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600" />
          <p
            
            className="mt-3 text-sm sm:text-base text-gray-600 dark:text-gray-300 max-w-prose text-center">
            Discover Featured Products our Customers love right now.
          </p>
        </div>


      </div>

      <div  className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2`}  >
        {products.map((product) => <ProductCard key={product._id} product={product} />)}
      </div>

    </div>
  )
}
