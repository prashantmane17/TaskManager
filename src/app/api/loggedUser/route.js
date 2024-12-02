import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db_Connect } from "@/helper/dbConnect";

db_Connect;
export async function GET(request) {
  const token = request.cookies.get("authToken")?.value;
  if (!token) {
    return NextResponse.json(
      { success: false, message: "Authentication required" },
      { status: 401 }
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    return NextResponse.json({
      success: true,
      message: "Authenticated",
      user: decoded,
    });
  } catch (error) {
    // Token is invalid or verification failed
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 403 }
    );
  }
}
