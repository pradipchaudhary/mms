// app/api/auth/register/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { registerUser } from "@/modules/auth/auth.service";

export async function POST(req: Request) {
  await connectDB();
  const { name, email, password, role } = await req.json();

  try {
    const user = await registerUser({ name, email, password, role });

    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
}