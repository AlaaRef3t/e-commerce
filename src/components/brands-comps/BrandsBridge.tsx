import { getBrands } from '@/actions/brands.action'
import React from 'react'
import BrandsComp from './BrandsGridComp';

export default async function BrandsBridge() {

    const response = await getBrands();
    console.log(response?.data , "from brands comp")
  return (
      <div>
      <BrandsComp brands={ response?.data} />
    </div>
  )
}
