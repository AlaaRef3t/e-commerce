import { getCategoryDetails } from '@/actions/categories.action';
import CategoryDetailsComp from '@/components/cat-comps/CategoryDetailsComp';
import React from 'react'

export default async function CategoryDetails({ params }: { params: { id: string } }) {

    const { id } = await params;
    const result = await getCategoryDetails(id);
    const catDetails = result?.data

    // console.log(catDetails, "from category details");

    return (
        <div className='container mx-auto py-5 lg:px-10 md:px-6 px-4 
                   pb-8       
               sm:pb-13     
               md:pb-16    
               lg:pb-20   
               xl:pb-22'>

            <CategoryDetailsComp catDetails={catDetails} />
        </div>
    )
}
