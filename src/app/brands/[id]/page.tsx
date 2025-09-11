import { getBrandsDetails } from '@/actions/brands.action';
import BrandsDetailsComp from '@/components/brands-comps/BrandsDetailsComp';
import React from 'react'

export default  async function BrandsDetails({ params }: { params: { id: string } }) {
    const { id } = await params;
    const result = await getBrandsDetails(id);
    const brandsDetails = result?.data;

    // console.log(brandsDetails)

    return (
        <div className='container mx-auto py-5 lg:px-10 md:px-6 px-4 
              pb-8       
          sm:pb-13     
          md:pb-16    
          lg:pb-20   
          xl:pb-22'>

            <BrandsDetailsComp brandsDetails={brandsDetails} />
        </div>
    )
}
