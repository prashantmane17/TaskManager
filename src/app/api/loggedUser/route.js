import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { db_Connect } from "@/helper/dbConnect";

export async function GET(request) {
  await db_Connect();
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
    return NextResponse.json(
      { success: false, message: "Invalid token" },
      { status: 403 }
    );
  }
}
