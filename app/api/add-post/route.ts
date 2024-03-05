import prisma from "@/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const { title, content, imageData, category, userName } = res; // Extract userName from request body
  console.log("Received data", res);

  // Find an existing category with the provided name
  const existingCategory = await prisma.category.findFirst({
    where: { name: category },
  });

  // Find an existing user with the provided name
  const existingUser = await prisma.user.findFirst({
    where: { name: userName },
  });

  if (!existingCategory) {
    return NextResponse.json(
      { error: `Category '${category}' not found` },
      { status: 400 }
    );
  }
  
  if (!existingUser) {
    return NextResponse.json(
      { error: `User '${userName}' not found` },
      { status: 400 }
    );
  }
  

  // Create a new post and connect it to the existing user and category
  const result = await prisma.post.create({
    data: {
      title,
      content,
      imageData,
      published: true,
      author: {
        connect: {
          id: existingUser.id,
        },
      },
      category: {
        connect: {
          id: existingCategory.id,
        },
      },
    },
  });

  return NextResponse.json({ result });
}