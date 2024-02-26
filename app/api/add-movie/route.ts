import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const res = await request.json();
  const { title, content, imageData } = res;
  console.log("Recieved data", res);

  const decodedImageData = Buffer.from(imageData, 'base64');

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
    },
  });
  return NextResponse.json({ result});
}
