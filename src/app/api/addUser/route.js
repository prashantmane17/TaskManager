import User from "@/models/user"; 
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { db_Connect } from "@/helper/dbConnect";

export async function POST(request) {
  await db_Connect();

  const { name, email, password } = await request.json();

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          message: "Use a different Email address",
        },
        {
          status: 400,
        }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, name: newUser.name },
      process.env.JWT_SECRET, // Ensure JWT_SECRET is defined in your .env
      { expiresIn: "1w" }     // Token expiration (1 week)
    );

    // Set the token in a cookie
    const response = NextResponse.json(
      {
        success: true,
        message: "Registered Successfully",
      },
      {
        status: 201,
      }
    );

    response.cookies.set("authToken", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 7 * 24 * 60 * 60, // 1 week in seconds
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      {
        status: 500,
      }
    );
  }
}
