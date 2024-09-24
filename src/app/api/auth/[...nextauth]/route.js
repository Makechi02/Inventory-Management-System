import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from "next-auth";
import {UserAuthService} from "@/service/UserService";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'email', placeholder: 'email@example.com'},
                password: {label: 'Password', type: 'text'}
            },
            async authorize(credentials) {
                try {
                    const response = await UserAuthService.login(JSON.stringify(credentials));
                    return response.data;
                } catch (error) {
                    if (!error?.response)
                        throw new Error("No server response");

                    if (error.response.status === 401)
                        throw new Error("Invalid credentials");

                    else console.error("Error: " + error);
                }
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.accessToken = user.access_token;
                token.refreshToken = user.refresh_token;
                token.user = user.user;
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user = token.user;
                session.accessToken = token.accessToken;
                session.refreshToken = token.refreshToken;
            }
            return session;
        }
    },
    pages: {
        signin: "/accounts/login"
    },
    secret: process.env.AUTH_SECRET
};

const handler = NextAuth(authOptions);
export {handler as GET, handler as POST};