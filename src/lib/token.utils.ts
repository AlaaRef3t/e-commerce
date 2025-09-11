// src/lib/token.utils.ts
import { decode, type JWT } from "next-auth/jwt";
import { cookies } from "next/headers";

const SECRET = process.env.NEXTAUTH_SECRET ?? process.env.AUTH_SECRET!;

type MyJWT = JWT & {
  accessToken?: string;
  token?: string;
};

export async function getUserToken() {
  const jar = await cookies(); // في بيئتك محتاجة await

  const encodedToken =
    jar.get("__Secure-next-auth.session-token")?.value ||
    jar.get("next-auth.session-token")?.value;

  if (!encodedToken || !SECRET) return null;

  const payload = (await decode({
    token: encodedToken,
    secret: SECRET,
  })) as MyJWT | null;

  // خُد التوكن من أي مفتاح بتضيفه في callbacks
  return payload?.accessToken ?? payload?.token ?? null;
}
