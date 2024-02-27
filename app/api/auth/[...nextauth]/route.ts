/**
 * NextAuth Configuration
 * @param {string} GOOGLE_CLIENT_ID - Google OAuth client ID.
 * @param {string} GOOGLE_CLIENT_SECRET - Google OAuth client secret.
 * @param {string} JWT_SECRET - Secret key for JSON Web Token (JWT) encryption.
 */

import NextAuth, { Session, User } from "next-auth";
import { NextApiRequest, NextApiResponse } from "next";
import GoogleProvider from "next-auth/providers/google";


const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  callbacks: {
    async signIn({ user, account }:any) {
      if (account.provider === "google") {
        const { name, email } = user;
        try {
        
        } catch (error) {
          console.log(error);
        }
      }

      return user;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };