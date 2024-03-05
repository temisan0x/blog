import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/prisma";
import { connectToDb } from "@/helpers/server-helpers";

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Name, email, or password is missing" },
        { status: 422 }
      );
    }

    await connectToDb();

    // Check if the email already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { message: "Email address is already registered" },
        { status: 422 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });

    return NextResponse.json({
      message: "User created successfully",
      user,
    });
  } catch (error) {
    console.error("Error registering user", error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
