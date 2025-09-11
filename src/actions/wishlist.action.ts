"use server";

import { getUserToken } from "@/lib/token.utils";

/** Helper: يحاول يقرأ الـJSON بأمان حتى في حالات الأخطاء */
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/** Helper: يبني الـheaders مع التوكن */
function buildHeaders(token: string | null) {
  return {
    "Content-Type": "application/json",
    ...(token ? { token } : {}),
  } as HeadersInit;
}

/** GET: /wishlist */
export async function getUserWishlist() {
  try {
    const token = await getUserToken();

    const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
      method: "GET",
      headers: buildHeaders(token as string),
      cache: "no-store",          // مهم لتفادي الكاش
      next: { revalidate: 0 },    // يضمن الديناميكية في App Router
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
