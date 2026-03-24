import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import {
  getMedicalCenterById,
  updateMedicalCenter,
  deleteMedicalCenter,
} from "@/modules/medical-center/medicalCenter.service";
import mongoose from "mongoose";

/**
 * GET /api/medical-centers/[id]
 * Get single medical center by ID
 */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> } // params is a Promise in Next.js 16
) {
  try {
    await connectDB();

    const { id } = await context.params;

    // Validate MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const data = await getMedicalCenterById(id);

    return NextResponse.json(data);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}

/**
 * PUT /api/medical-centers/[id]
 * Update medical center by ID
 */
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const body = await req.json();

    const updated = await updateMedicalCenter(id, body);

    if (!updated) {
      return NextResponse.json({ error: "Medical center not found" }, { status: 404 });
    }

    return NextResponse.json(updated);
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}

/**
 * DELETE /api/medical-centers/[id]
 * Delete medical center by ID
 */
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const deleted = await deleteMedicalCenter(id);

    if (!deleted) {
      return NextResponse.json({ error: "Medical center not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message || "Something went wrong" }, { status: 500 });
  }
}