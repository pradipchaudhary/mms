import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import {
  createMedicalCenter,
  getMedicalCenters,
} from "@/modules/medical-center/medicalCenter.service";

// GET ALL
export async function GET() {
  try {
    await connectDB();
    const data = await getMedicalCenters();
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// CREATE
export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const data = await createMedicalCenter(body);

    return NextResponse.json(data, { status: 201 });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Something went wrong";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}