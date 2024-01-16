/**
 * NextAuth Configuration
 * @param {string} GOOGLE_CLIENT_ID - Google OAuth client ID.
 * @param {string} GOOGLE_CLIENT_SECRET - Google OAuth client secret.
 * @param {string} JWT_SECRET - Secret key for JSON Web Token (JWT) encryption.
 */

import NextAuth, { Session, User } from "next-auth";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { NextApiRequest, NextApiResponse } from "next";
import { initMongoose } from "../../../lib/mongooseConfig";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "../../../mongodb";

initMongoose();

const googleClientId = process.env.GOOGLE_CLIENT_ID || "";
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "";
const jwtSecret = process.env.JWT_SECRET || "";

if (!googleClientId || !googleClientSecret) {
  throw new Error("Invalid/Missing GoogleClientId or GoogleClientSecret");
}

if (!jwtSecret) {
  throw new Error('Invalid/Missing environment variable: "JWT_SECRET"');
}

export const authOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: jwtSecret,
  providers: [
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    }),
  ],
  session: {
    jwt: true,
    maxAge: 30 * 24 * 60 * 60, // 30 days (in seconds)
  },
  callbacks: {
    session: async ({ token, session }: { token: any; session: Session }) => {
      if (session?.user && token?.sub) {
        (session.user as User).id = token.sub as string;
      }
      return session;
    },
  },
};

export default async function authHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await NextAuth(req, res, authOptions);
}
