import { createMedicalCenter, getMedicalCenters } from "@/modules/medical-center/medicalCenter.service";
import { NextResponse } from "next/server";
import { IMedicalCenter } from "@/modules/medical-center/medicalCenter.types";

/**
 * GET /api/medical-centers
 * Fetch all medical centers from the database.
 * @returns JSON array of medical centers or 500 on error.
 */
export async function GET() {
  try {
    const centers = await getMedicalCenters();
    return NextResponse.json(centers);
  } catch (err) {
    console.error("Failed to fetch medical centers:", err);
    return NextResponse.json([], { status: 500 });
  }
}

/**
 * POST /api/medical-centers
 * Create a new medical center.
 * Expects JSON body with medical center data.
 * @param req Request containing JSON body of type IMedicalCenter
 * @returns Created medical center or 400 on validation/error
 */
export async function POST(req: Request) {
  try {
    // Parse request JSON
    const data: IMedicalCenter = await req.json();

    // Create the medical center
    const center = await createMedicalCenter(data);

    return NextResponse.json(center, { status: 201 });
  } catch (err) {
    // Type-safe error handling
    const error = err instanceof Error ? err : new Error("Unknown error");
    console.error("Failed to create medical center:", error.message);
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}