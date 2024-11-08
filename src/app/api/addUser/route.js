import { db_Connect } from "@/helper/dbConnect";
import { UserSchema } from "@/models/user";
import { NextResponse } from "next/server";
db_Connect();

export async function POST(request){
    const {name, email, password, phone} = await request.json();
    try {
        return NextResponse.json();
    } catch (error) {
        return NextResponse.json();
    }
}