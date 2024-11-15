
import { NextResponse } from "next/server";
import { db_Connect } from "@/helper/dbConnect";
import TeamMember from "@/models/teamMembers";

export async function GET(request) {
    await db_Connect();

    try {
        // Parse request body if necessary
        // const { userId } = await request.json(); // Assume the client sends userId to fetch tasks for a specific user

        //  Query the database for tasks
        // const tasks = await Tasks.find({ userId }); // Assuming tasks are associated with a userId field
        const members = await TeamMember.find();
        // Respond with tasks
        return NextResponse.json({
            success: true,
            members,
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
