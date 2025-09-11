import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"


//conf

// 1-Providers [done]
// 2-session strategy  [done]
// 3-pages      
// 4-callbacks
// 5-encryption



export const options: NextAuthOptions = {
    providers: [
        CredentialsProvider({

            name: 'Credentials',

            credentials: {
                email: { label: "Email", type: "text" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {


                const res = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
                    method: 'POST',
                    body: JSON.stringify({
                        email: credentials?.email,
                        password: credentials?.password
                    }),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                // If no error and we have user data, return it
                if (res.ok && user) {
                    return user
                }
                // Return null if user data could not be retrieved
                return null
            }
        })
    ],

    session: {
        strategy: "jwt"
    },

    pages: {
        signIn: '/login',
    },

    callbacks: {
        async session({ session, user, token }) {
            return {...session , ...user , ...token}
        },
        async jwt({ token, user }) {
            return {...token , ...user}
        }
    },

    secret:process.env.AUTH_SECRET



}

const handler = NextAuth(options)

export { handler as GET, handler as POST }