import Tasks from "@/models/tasks"; 
import { NextResponse } from "next/server";
import { db_Connect } from "@/helper/dbConnect";

export async function POST(request) {
  await db_Connect();

  try {
    const { title, description, priority, assignee, deadline, estimatedTime, tags } = await request.json();

    // Check for required fields
    if (!title || !priority || !assignee) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const newTask = new Tasks({
      title,
      description,
      priority,
      assignee,
      deadline,
      estimatedTime,
      tags,
      dateAdded: new Date() // Optional: explicitly set dateAdded, or remove this line to use schema default
    });

    await newTask.save();

    return NextResponse.json(
      {
        success: true,
        message: "Task registered successfully",
      },
      { status: 201 }
    );

  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
