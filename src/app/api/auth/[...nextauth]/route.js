import CredentialsProvider from 'next-auth/providers/credentials';
import NextAuth from "next-auth";
import {connectToDB} from "@/utils/database";
import User from "@/models/user";
import bcrypt from "bcryptjs";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {label: 'Email', type: 'email', placeholder: 'email@example.com'},
                password: {label: 'Password', type: 'text'}
            },
            async authorize(credentials) {
                await connectToDB();

                const user = await User.findOne({email: credentials.email});
                if (!user) {
                    throw new Error("No user found with this email found");
                }

                const isValidPassword = bcrypt.compareSync(credentials.password, user.password);
                if (!isValidPassword) {
                    throw new Error("Invalid password");
                }

                return {
                    id: user._id,
                    name: user.name,
                    email: user.email,
                    role: user.role
                };
            }
        })
    ],
    session: {
        strategy: 'jwt'
    },
    callbacks: {
        async jwt({token, user}) {
            if (user) {
                token.id = user.id;
                token.role = user.role;
            }
            return token;
        },
        async session({session, token}) {
            if (token) {
                session.user.id = token.id;
                session.user.role = token.role;
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