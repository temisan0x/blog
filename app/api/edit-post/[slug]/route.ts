import prisma from "@/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest, res: NextResponse) {
  try {
    const { title, content, imageData} = await req.json();
    const slug = req.url.split("edit-post/")[1];
    console.log(slug);
    if (!slug) {
      return NextResponse.json({ error: "Slug must not be null" }, { status: 400 });
    }

    const existingPost = await prisma.post.findFirst({
      where: { slug: slug },
    });

    if (!existingPost) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    // Update the post with the new data
    const updatedPost = await prisma.post.update({
      where: { slug: slug },
      data: {
        title: title || existingPost.title,
        content: content || existingPost.content,
        imageData: imageData || existingPost.imageData,
      },
    });

    return NextResponse.json({ post: updatedPost });
  } catch (error) {
    console.error("Error updating post:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
