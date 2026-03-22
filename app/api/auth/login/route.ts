// app/api/auth/login/route.ts
import { NextResponse } from "next/server";
import { loginUser } from "@/modules/auth/auth.service";
import { connectDB } from "@/lib/db";

interface LoginPayload {
  email: string;
  password: string;
}

export async function POST(req: Request) {
  await connectDB();

  const { email, password } = (await req.json()) as LoginPayload;

  try {
    const { user, token } = await loginUser(email, password);

    const res = NextResponse.json({
      success: true,
      user,
    });

    // Set cookie for production only with secure
    res.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // optional: 7 days
    });

    return res;
  } catch (err: unknown) {
    let message = "Something went wrong";

    if (err instanceof Error) {
      message = err.message;
    }

    return NextResponse.json(
      { success: false, message },
      { status: 401 }
    );
  }
}