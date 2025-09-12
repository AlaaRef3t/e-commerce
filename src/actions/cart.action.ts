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

/** GET cart */
export async function getUserCart() {
  try {
    const token = await getUserToken();

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "GET",
      headers: buildHeaders(token as string),
      cache: "no-store",
      next: { revalidate: 0 },
    });

    const data = await safeJson(res);

    if (!res.ok) {
      return { data: [], status: res.status, message: data?.message || "An Error" };
    }

    console.log(data, "user cart details");

    return { data, status: res.status, message: data?.message };
  } catch {
    return { data: [], status: 500, message: "An Error" };
  }
}

/** POST add to cart */
export async function addProductToCart(productId: string) {
  try {
    const token = await getUserToken();

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "POST",
      headers: buildHeaders(token as string),
      body: JSON.stringify({ productId }),
      cache: "no-store",
      next: { revalidate: 0 },
    });

    const data = await safeJson(res);

    if (!res.ok) {
      return { data: [], status: res.status, message: data?.message || "An Error" };
    }

    console.log(data, "Add to cart");

    return { data, status: res.status, message: data?.message };
  } catch {
    return { data: [], status: 500, message: "An Error" };
  }
}

/** DELETE product from cart */
export async function removeProduct(id: string) {
  try {
    const token = await getUserToken();

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      method: "DELETE",
      headers: buildHeaders(token as string),
      cache: "no-store",
      next: { revalidate: 0 },
    });

    const data = await safeJson(res);

    if (!res.ok) {
      return { data: [], status: res.status, message: data?.message || "An Error" };
    }

    console.log(data, "removed cart");

    return { data, status: res.status, message: data?.message };
  } catch {
    return { data: [], status: 500, message: "An Error" };
  }
}

/** PUT update product count */
export async function updateProduct(id: string, count: number) {
  try {
    const token = await getUserToken();

    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${id}`, {
      method: "PUT",
      headers: buildHeaders(token as string),
      body: JSON.stringify({ count }),
      cache: "no-store",
      next: { revalidate: 0 },
    });

    const data = await safeJson(res);

    if (!res.ok) {
      return { data: [], status: res.status, message: data?.message || "An Error" };
    }

    console.log(data, "update cart");

    return { data, status: res.status, message: data?.message };
  } catch {
    return { data: [], status: 500, message: "An Error" };
  }
}

/** DELETE clear cart */
export async function clearCart() {
  try {
    const token = await getUserToken();

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
      method: "DELETE",
      headers: buildHeaders(token as string),
      cache: "no-store",
      next: { revalidate: 0 },
    });

    const data = await safeJson(res);

    if (!res.ok) {
      return { data: [], status: res.status, message: data?.message || "An Error" };
    }

    console.log(data, "user cart cleared");

    return { data, status: res.status, message: data?.message };
  } catch {
    return { data: [], status: 500, message: "An Error" };
  }
}
