// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { loginUser } from "@/modules/auth/auth.service";
import { connectDB } from "@/lib/db";

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = await req.json();

  try {
    const { user, token } = await loginUser(email, password);

    const res = NextResponse.json({
      success: true,
      user,
    });

    res.cookies.set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      path: "/",
    });

    return res;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 401 }
    );
  }
}