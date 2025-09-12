"use server";

import { getUserToken } from "@/lib/token.utils";

async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

function buildHeaders(token: string | null) {
  return {
    "Content-Type": "application/json",
    ...(token ? { token } : {}),
  } as HeadersInit;
}

export async function getUserWishlist() {
  try {
    const token = await getUserToken();

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: buildHeaders(token as string),
      cache: "no-store",          
      next: { revalidate: 0 },    
    });

    const data = await safeJson(res);

    if (!res.ok) {
      return {
        data: [],
        status: res.status,
        message: data?.message || "An Error",
      };
    }

    return {
      data,
      status: res.status,
      message: data?.message,
    };
  } catch {
    return {
      data: [],
      status: 500,
      message: "An Error",
    };
  }
}

/** POST: /wishlist { productId } */
export async function addProductToWishlist(productId: string) {
  try {
    const token = await getUserToken();

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "POST",
      headers: buildHeaders(token as string),
      body: JSON.stringify({ productId }),
      cache: "no-store",
      next: { revalidate: 0 },
    });

    const data = await safeJson(res);

    if (!res.ok) {
      return {
        data: [],
        status: res.status,
        message: data?.message || "An Error",
      };
    }

    return {
      data,
      status: res.status,
      message: data?.message,
    };
  } catch {
    return {
      data: [],
      status: 500,
      message: "An Error",
    };
  }
}

/** DELETE: /wishlist/:id */
export async function removeProductFromWish(id: string) {
  try {
    const token = await getUserToken();

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${id}`, {
      method: "DELETE",
      headers: buildHeaders(token as string),
      cache: "no-store",
      next: { revalidate: 0 },
    });

    const data = await safeJson(res);

    if (!res.ok) {
      return {
        data: [],
        status: res.status,
        message: data?.message || "An Error",
      };
    }

    return {
      data,
      status: res.status,
      message: data?.message,
    };
  } catch {
    return {
      data: [],
      status: 500,
      message: "An Error",
    };
  }
}
