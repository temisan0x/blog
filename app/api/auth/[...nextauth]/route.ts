import NextAuth from "next-auth";
import { Session, User } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials"; // Corrected import
import { connectToDb } from "@/helpers/server-helpers";
import prisma from "@/prisma";
import bcrypt from "bcrypt";

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", placeholder: "Enter your email address" },
        password: { label: "Password", placeholder: "Enter your password" },
      },
      async authorize(credentials) {
        if (!credentials || credentials.email || credentials.password)
          return null;
        try {
          await connectToDb();
          const user = await prisma.user.findFirst({
            where: { email: credentials.email },
          });
          if (!user?.hashedPassword) {
            return null;
          }
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password,
            user.hashedPassword
          );

          if (isPasswordCorrect) {
            return user;
          }
          return null;
        } catch (error) {
          console.error(error);
          return null;
        } finally {
          await prisma.$disconnect();
        }
      },
    }),
  ],
  callbacks: {
    session: async ({ token, session }: { token: any; session: Session }) => {
      if (token?.sub) {
        session.user.id = token.sub as string;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
