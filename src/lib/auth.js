import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcryptjs";
import connectToDatabase from "@/lib/mongodb";
import User from "@/models/User";

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",

            credentials: {
                email: {
                    label: "Email",
                    type: "email",
                },

                password: {
                    label: "Password",
                    type: "password",
                },
            },

            async authorize(credentials) {
                await connectToDatabase();

                const user = await User.findOne({
                    email: credentials.email,
                });

                if (!user || !user.password) {
                    return null;
                }

                const passwordIsCorrect = await bcrypt.compare(
                    credentials.password,
                    user.password
                );

                if (!passwordIsCorrect) {
                    return null;
                }

                return {
                    id: user._id.toString(),
                    name: user.name,
                    email: user.email,
                    role: user.role,
                };
            },
        }),

        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
    ],

    session: {
        strategy: "jwt",
    },

   
callbacks: {
    async signIn({ user, account }) {
        if (account?.provider === "google") {
            await connectToDatabase();

            const existingUser = await User.findOne({
                email: user.email,
            });

            if (!existingUser) {
                const newUser = await User.create({
                    name: user.name,
                    email: user.email,
                });

                user.role = newUser.role;
            } else {
                user.role = existingUser.role;
            }
        }

        return true;
    },

    async jwt({ token, user }) {
        if (token.email) {
            await connectToDatabase();

            const dbUser = await User.findOne({
                email: token.email,
            });

            if (dbUser) {
                token.id = dbUser._id.toString();
                token.role = dbUser.role;
            }
        }

        return token;
    },

    async session({ session, token }) {
        if (session.user) {
            session.user.id = token.id;
            session.user.role = token.role;
        }

        return session;
    },
},

    secret: process.env.NEXTAUTH_SECRET,
};