import prisma from "@/prisma";
import { NextResponse } from "next/server";
import slugify from "slugify";

export async function POST(request: Request) {
  const res = await request.json();
  const { title, content, imageData, category, userName } = res;

  const slug = slugify(title, { lower: true });
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

  const existingPostWithSlug = await prisma.post.findFirst({
    where: { slug },
  });
  
  if (existingPostWithSlug) {
    return NextResponse.json(
      { error: 'A post with the same title already exists' },
      { status: 400 }
    );
  }
  
  try {
    const result = await prisma.post.create({
      data: {
        title,
        content,
        slug,
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
  } catch (error) {
    console.error("Error creating post:", error);
    return NextResponse.json(
      { error: "Failed to create post" },
      { status: 500 }
    );
  }
}
