"use server"

import { UpdatePasswordModel } from "@/interfaces/updatePassword.model";
import axios from "axios";

export async function getUserPassword(email: string) {
  try {
    const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords`, { email });

    return {
      data: response.data,
      status: response.status,
      message: response.data.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        data: [],
        status: error.response?.status || 500,
        message: error.response?.data?.message || "An error occurred",
      };
    }
    return {
      data: [],
      status: 500,
      message: "Unexpected error",
    };
  }
}



export async function resetUserPassword(resetCode: string) {
  try {
    const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode`, { resetCode });

    return {
      data: response.data,
      status: response.status,
      message: response.data.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        data: [],
        status: error.response?.status || 500,
        message: error.response?.data?.message || "An error occurred",
      };
    }
    return {
      data: [],
      status: 500,
      message: "Unexpected error",
    };
  }
}

export async function updateUserPassword(body: UpdatePasswordModel) {
  try {
    const response = await axios.put(`https://ecommerce.routemisr.com/api/v1/auth/resetPassword`, { body });

    return {
      data: response.data,
      status: response.status,
      message: response.data.message,
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      return {
        data: [],
        status: error.response?.status || 500,
        message: error.response?.data?.message || "An error occurred",
      };
    }
    return {
      data: [],
      status: 500,
      message: "Unexpected error",
    };
  }
}
