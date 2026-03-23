import { createMedicalCenter, getMedicalCenters } from "@/modules/medical-center/medicalCenter.service";
import { NextResponse } from "next/server";


export async function GET(req: Request) {
  try {
    const centers = await getMedicalCenters();
    return NextResponse.json(centers);
  } catch (error) {
    return NextResponse.json([], { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const center = await createMedicalCenter(data);
    return NextResponse.json(center);
  } catch (error: any) {
    return NextResponse.json({ message: error.message }, { status: 400 });
  }
}