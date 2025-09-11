import { getCategories } from '@/actions/categories.action'
import React from 'react'
import CatSliderComp from './CatSliderComp';


export default async function catSlider() {

    const response = await getCategories();
    // console.log(response?.data, "From category slider ");
    
    

  return (
    <div>
      <CatSliderComp category={ response?.data}  />
    </div>
  )
}
