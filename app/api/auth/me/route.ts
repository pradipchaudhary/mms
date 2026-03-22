// app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/middlewares/auth.middleware";
import { User } from "@/modules/user/user.model";

export async function GET() {
  await connectDB();
  try {
    const userPayload = await getAuthUser();
    const user = await User.findById((userPayload as any).id);
    return NextResponse.json({ success: true, user });
  } catch (err: any) {
    return NextResponse.json({ success: false, message: err.message }, { status: 401 });
  }
}