// api/posts/[slug].ts

import prisma from "@/prisma";
import { NextResponse } from "next/server";

// Define the API endpoint handler
export async function GET(req: any, res: any) {
  if (req.method !== "GET") {
    return NextResponse.json({ error: "Method not allowed" }, { status: 405 });
  }

  const { slug } = req;

  try {
    // Find the post based on the provided slug
    const post = await prisma.post.findFirst({
      where: { slug: slug },
    });

    if (!post) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ post: { ...post, imageUrl: post.imageData } });
  } catch (error) {
    console.error("Error fetching post:", error);
    return NextResponse.json(
      { error: "Failed to fetch post" },
      { status: 500 }
    );
  }
}
