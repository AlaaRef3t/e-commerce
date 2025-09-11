"use server";

/** Helper: قراءة JSON بأمان */
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/** GET: كل المنتجات */
export async function getProducts() {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/products", {
      method: "GET",
      cache: "no-store",
      next: { revalidate: 0 },
    });

    const json = await safeJson(res);

    if (!res.ok) {
      return {
        data: [],
        status: res.status,
        message: json?.message || "An Error",
      };
    }

    return {
      data: json?.data,
      status: res.status,
      message: json?.message,
    };
  } catch {
    return {
      data: [],
      status: 500,
      message: "An Error",
    };
  }
}

/** GET: تفاصيل منتج */
export async function getProductsDetails(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${id}`, {
      method: "GET",
      cache: "no-store",
      next: { revalidate: 0 },
    });

    const json = await safeJson(res);

    if (!res.ok) {
      return {
        data: [],
        status: res.status,
        message: json?.message || "An Error",
      };
    }

    return {
      data: json?.data,
      status: res.status,
      message: json?.message,
    };
  } catch {
    return {
      data: [],
      status: 500,
      message: "An Error",
    };
  }
}
