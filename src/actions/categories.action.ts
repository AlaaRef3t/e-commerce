"use server";

/** Helper: قراءة JSON بأمان */
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}

/** GET: كل الكاتيجوريز */
export async function getCategories() {
  try {
    const res = await fetch("https://ecommerce.routemisr.com/api/v1/categories", {
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

/** GET: تفاصيل كاتيجوري بالـid */
export async function getCategoryDetails(id: string) {
  try {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${id}`, {
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
