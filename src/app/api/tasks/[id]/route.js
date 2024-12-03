import Tasks from "@/models/tasks";
import { NextResponse } from "next/server";
import { db_Connect } from "@/helper/dbConnect";

export async function PUT(request, { params }) {
  await db_Connect();

  try {
    const { id } = await params;
    const { title, description, priority, assignee, deadline, estimatedTime, tags, isCompleted } = await request.json();

    if (!title || !priority || !assignee) {
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 }
      );
    }

    const task = await Tasks.findById(id);

    if (!task) {
      return NextResponse.json(
        { success: false, message: "Task not found" },
        { status: 404 }
      );
    }

    task.title = title;
    task.description = description || task.description;
    task.priority = priority;
    task.assignee = assignee;
    task.deadline = deadline || task.deadline;
    task.estimatedTime = estimatedTime || task.estimatedTime;
    task.tags = tags || task.tags;
    task.isCompleted = isCompleted !== undefined ? isCompleted : task.isCompleted;
    task.dateUpdated = new Date();

    await task.save();

    return NextResponse.json(
      {
        success: true,
        message: "Task updated successfully",
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
