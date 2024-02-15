/**
 * NextAuth Configuration
 * @param {string} GOOGLE_CLIENT_ID - Google OAuth client ID.
 * @param {string} GOOGLE_CLIENT_SECRET - Google OAuth client secret.
 * @param {string} JWT_SECRET - Secret key for JSON Web Token (JWT) encryption.
 */

import NextAuth, { Session, User } from "next-auth";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import { NextApiRequest, NextApiResponse } from "next";
// import { initMongoose } from "../../../../lib/mongooseConfig";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
// import clientPromise from "../../../../mongodb";

// initMongoose();

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    })
  ],
  // callbacks: {
  //   async signIn({ user, account }) {
  //     if (account.provider === "google") {
  //       const { name, email } = user;
  //       try {
  //         await connectMongoDB();
  //         const userExists = await User.findOne({ email });

  //         if (!userExists) {
  //           const res = await fetch("http://localhost:3000/api/users", {
  //             method: "POST",
  //             headers: {
  //               "Content-Type": "application/json",
  //             },
  //             body: JSON.stringify({
  //               name,
  //               email,
  //             }),
  //           });

  //           if (res.ok) {
  //             return user;
  //           }
  //         }
  //       } catch (error) {
  //         console.log(error);
  //       }
  //     }

  //     return user;
  //   },
  // },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST, authOptions };