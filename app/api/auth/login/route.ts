// api/auth/login.ts

import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import prisma from "@/prisma";
import { connectToDb } from "@/helpers/server-helpers";

export const POST = async (req: Request) => {
  try {
    const { email, password } = await req.json();
    
    if (!email || !password) {
      return NextResponse.json(
        { message: "Email or password is missing" },
        { status: 422 }
      );
    }

    await connectToDb();

    // Find the user by email
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 404 }
      );
    }

    // Check if the hashedPassword is present and not null
    if (user.hashedPassword !== null) {
      const isPasswordCorrect = await bcrypt.compare(password, user.hashedPassword);

      if (isPasswordCorrect) {
        // Password is correct, perform additional actions
        return NextResponse.json({
          message: "Login successful",
          user,
        });
      } else {
        // Password is incorrect
        return NextResponse.json(
          { message: "Invalid email or password" },
          { status: 401 }
        );
      }
    } else {
      // Handle the case where hashedPassword is null
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Error during login", error);
    return NextResponse.json(
      { message: "Server error during login" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
