import { NextResponse } from "next/server";
import { db_Connect } from "@/helper/dbConnect";
import TeamMember from "@/models/teamMembers";

export async function POST(request) {
  await db_Connect();

  const { name, email, role } = await request.json();

  try {
    const existingUser = await TeamMember.findOne({ email });
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

    const newUser = new TeamMember({ name, email, role });
    await newUser.save();
    const response = NextResponse.json(
      {
        success: true,
        message: "Registered Successfully",
      },
      {
        status: 201,
      }
    );


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
