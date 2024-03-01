import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { connnectToDb } from "@/helpers/server-helpers";
import prisma from "@/prisma";

export const POST = async (req: Request) => {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Invalid username or password" },
        { status: 422 }
      );
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await connnectToDb();

    const user = await prisma.user.create({
      data: {
        email,
        name,
        hashedPassword,
      },
    });
    return NextResponse.json({
      message: "User created successfully",
      user: user,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
