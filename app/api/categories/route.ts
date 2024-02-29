import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { name } = await request.json();

    // Validate the input
    if (!name || typeof name !== "string") {
      return NextResponse.error();
    }

    // Create the category in the database
    const createdCategory = await prisma.category.create({
      data: {
        name: name.trim(),
        // Add any additional fields you may have in your Category model
      },
    });

    console.log("Category created:", createdCategory);

    // Return a success response
    return NextResponse.json({ message: "Category created successfully" });
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.error();
  }
}


export async function GET(req:Request){
  if (req.method === "GET") {
    try {
      const categories = await prisma.category.findMany({});
      console.log(categories);
      return NextResponse.json(categories);
    } catch (error) {
      console.error(error);
      return NextResponse.error();
    }
  } else {
    return NextResponse.json({ error: "Method Not Allowed" });
  }
}
