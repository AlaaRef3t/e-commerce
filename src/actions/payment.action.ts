"use server"

import { getUserToken } from "@/lib/token.utils";
import axios from "axios";

interface ShippingAddressType{
    details: string;
    phone: string;
    city: string;
}

export async function getCashPayment(cartId: string, shippingAddress : {shippingAddress :ShippingAddressType }) {
    
    try {
        const token = await getUserToken();
        const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
            { shippingAddress },
            {
                headers: {
                    token:token as string
                }
            }   
        )

        console.log(response?.data , "cash payment data");
        

        return {
            data: response?.data,
            status: response?.status,
            message:response?.data.message
        }

    } catch (error : unknown) {
        if (axios.isAxiosError(error)) {
            return {
                data: [],
                status: error.response?.status,
                message: error.response?.data?.message || "An Error"
            }
        }
    }
    
}