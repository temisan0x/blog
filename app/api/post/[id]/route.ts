import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: any) {
  try {
    const id = params.id;

    // Check if the post exists before attempting to delete
    const existingPost = await prisma.post.findUnique({
      where: { id },
    });

    if (!existingPost) {
      return NextResponse.json(
        {
          error: `Post with ID ${id} not found.`,
        },
        { status: 404 }
      );
    }

    // Delete the post
    await prisma.post.delete({
      where: { id },
    });

    return NextResponse.json({
      message: `Post with ID ${id} deleted successfully.`,
    });
  } catch (error) {
    console.error("Error deleting post:", error);
    return NextResponse.json(
      {
        error: "Internal server error while deleting the post.",
      },
      { status: 500 }
    );
  }
}
