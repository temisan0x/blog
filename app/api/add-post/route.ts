import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const { title, content, imageData, category } = res; // Extract category from request body
  console.log("Received data", res);

  // Assuming you have a Category model in your Prisma schema
  const existingCategory = await prisma.category.findUnique({
    where: { id: category },
  });

  if (!existingCategory) {
    // Handle the case where the specified category doesn't exist
    return NextResponse.json({ error: "Invalid category specified" }, { status: 400 });
  }

  const result = await prisma.post.create({
    data: {
      title,
      content,
      imageData,
      published: true,
      author: {
        create: {
          name: "Temisan",
        },
      },
      category: {
        connect: {
          id: category,
        },
      },
    },
  });
  return NextResponse.json({result});
}