import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  try {
    const slug = req.url.split("get-post/")[1];

    if (!slug) {
      return NextResponse.json({ error: "Slug must not be null" }, { status: 400 });
    }
    console.log(slug);

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
