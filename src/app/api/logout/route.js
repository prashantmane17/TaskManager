import { NextResponse } from "next/server";

export async function POST(request) {
  const response = NextResponse.json({ success: true, message: "Logged out successfully" });

  response.headers.set(
    "Set-Cookie", 
    "authToken=; Max-Age=0; Path=/; HttpOnly; SameSite=Strict"
  );

  return response;
}
