import { getProductsDetails } from '@/actions/products.action';
import ProductDetailsComp from '@/components/products-comps/ProductDetailsComp';

export default async function ProductDetails({ params }: { params: { id: string } }) {
    const { id } = params;
    const result = await getProductsDetails(id);
    const productDetails = result?.data;


    return (
        <div className='container mx-auto py-5 lg:px-10 md:px-6 px-4 
      pb-8       
  sm:pb-13     
  md:pb-16    
  lg:pb-20   
  xl:pb-22'>

            <ProductDetailsComp productDetails={productDetails} />
        </div>
    );
}
