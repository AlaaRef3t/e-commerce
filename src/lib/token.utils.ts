// src/lib/token.utils.ts
import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

const SECRET = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET!;

export async function getUserToken() {
  const jar = await cookies(); // ← لازم await في بيئتك

  const encodedToken =
    jar.get("__Secure-next-auth.session-token")?.value ||
    jar.get("next-auth.session-token")?.value;

  if (!encodedToken || !SECRET) return null;

  try {
    const decToken = await decode({ token: encodedToken, secret: SECRET });
    // بدّل accessToken بـ token لو ده اسم الحقل عندك
    return (decToken as any)?.accessToken ?? (decToken as any)?.token ?? null;
  } catch {
    return null;
  }
}
