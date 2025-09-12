import { decode } from "next-auth/jwt";
import { cookies } from "next/headers";

export async function getUserToken() {
    

        const cookieStore = await cookies();
        const sessionToken = cookieStore.get("next-auth.session-token")?.value;
        const secureSessionToken = cookieStore.get("__Secure-next-auth.session-token")?.value;
        const encodedToken = sessionToken || secureSessionToken;

        if (!encodedToken) {
            return null;
        }

        const decToken = await decode({ token: encodedToken, secret: process.env.AUTH_SECRET! });
        console.log(decToken, "tokeeeeeeeeeeeeeeeeeeeeeeeeeeen");
        
        const token = decToken?.token;


    return token
}