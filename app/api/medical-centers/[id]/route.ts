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
 */
export async function GET(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    const { id } = await context.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return NextResponse.json({ error: "Invalid ID format" }, { status: 400 });
    }

    const data = await getMedicalCenterById(id);
    return NextResponse.json(data);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Something went wrong";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * PUT /api/medical-centers/[id]
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
      return NextResponse.json(
        { error: "Medical center not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updated);
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Something went wrong";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}

/**
 * DELETE /api/medical-centers/[id]
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
      return NextResponse.json(
        { error: "Medical center not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Something went wrong";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}