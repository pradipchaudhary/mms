import { deleteMedicalCenter, getMedicalCenterById } from "@/modules/medical-center/medicalCenter.service";
import { NextResponse } from "next/server";


export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const center = await getMedicalCenterById(params.id);
    if (!center) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json(center);
  } catch (error) {
    return NextResponse.json({ message: "Failed to fetch" }, { status: 500 });
  }
}

// params comes from the second argument { params }
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json({ message: "ID is required" }, { status: 400 });
    }

    const deleted = await deleteMedicalCenter(id);

    if (!deleted) {
      return NextResponse.json({ message: "Medical center not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Failed to delete" }, { status: 500 });
  }
}