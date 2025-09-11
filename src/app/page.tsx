import MainSlider from "@/components/sliders-comps/MainSlider";
import CatSlider from "@/components/sliders-comps/CatSliderBridge";
import ProductsBridge from "@/components/products-comps/ProductsBridge";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/route";

export default async function Home() {

  const session = await getServerSession(options)



  // if (!session) return <p>you need to log in </p>
  return (
    <>
        <MainSlider />
        <CatSlider />
        <ProductsBridge />
      


    </>
  );
}
