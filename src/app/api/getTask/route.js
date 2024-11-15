import Task from "@/models/task"; // Import the Task model if tasks are stored in a separate collection
import { NextResponse } from "next/server";
import { db_Connect } from "@/helper/dbConnect";

export async function POST(request) {
    await db_Connect(); // Connect to the database

    try {
        // Parse request body if necessary
        // const { userId } = await request.json(); // Assume the client sends userId to fetch tasks for a specific user

        //  Query the database for tasks
        // const tasks = await Task.find({ userId }); // Assuming tasks are associated with a userId field
        const tasks = await Task.find();
        // Respond with tasks
        return NextResponse.json({
            success: true,
            tasks,
        });
    } catch (error) {
        console.error("Error fetching tasks:", error);
        return NextResponse.json(
            {
                success: false,
                message: "Failed to fetch tasks.",
            },
            { status: 500 }
        );
    }
}
