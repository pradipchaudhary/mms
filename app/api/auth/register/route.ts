// app/api/auth/register/route.ts

/**
 * POST /api/auth/register
 * Registers a new user
 */

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { registerUser } from "@/modules/auth/auth.service";
import { UserRole } from "@/modules/user/user.types";

/**
 * Request body type
 */
interface RegisterBody {
  name: string;
  email: string;
  password: string;
  role?: UserRole;
}

export async function POST(req: Request) {
  await connectDB();

  try {
    const body: RegisterBody = await req.json();

    const { name, email, password, role } = body;

    // Basic validation (important for Vercel/serverless safety)
    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, message: "Name, email, and password are required" },
        { status: 400 }
      );
    }

    const user = await registerUser({
      name,
      email,
      password,
      role,
    });

    return NextResponse.json({ success: true, user });

  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Internal Server Error";

    return NextResponse.json(
      { success: false, message },
      { status: 400 }
    );
  }
}