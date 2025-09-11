import CatSliderComp from '@/components/sliders-comps/CatSliderComp'
import React from 'react'
import { getCategories } from '@/actions/categories.action'
import CategoriesGrid from './../../components/cat-comps/CategoriesGrid';

export default async function Category() {
  const categoriesRes = await getCategories();
  return (
    <>
      <CategoriesGrid category={categoriesRes?.data} />
    </>
  );
}
