import { NextApiRequest, NextApiResponse } from "next";

export async function GET() {
    try {
      return new Response("Hello world")
    } catch (error) {
      console.error(error);
    }
  }