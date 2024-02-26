import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(request: Request, { params }: any) {
  const id = params.id;
  const post = await prisma.post.delete({
    where:{id}
  })
  console.log({id});
  return NextResponse.json(request);
}
