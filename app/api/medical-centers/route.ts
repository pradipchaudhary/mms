import { connectDB } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDB();

    return NextResponse.json({
      success: true,
      message: "MongoDB Local Connected 🚀",
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { success: false, message: "DB connection failed" },
      { status: 500 }
    );
  }
}