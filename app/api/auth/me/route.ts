// app/api/auth/me/route.ts

/**
 * GET /api/auth/me
 * Returns the currently authenticated user
 */

import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import { getAuthUser } from "@/middlewares/auth.middleware";
import { User, IUser } from "@/modules/user/user.model";

/**
 * Shape of JWT payload returned from getAuthUser
 */
interface AuthPayload {
  id: string;
  role?: string;
  email?: string;
}

export async function GET() {
  await connectDB();

  try {
    // Properly typed payload
    const userPayload = (await getAuthUser()) as AuthPayload | null;

    if (!userPayload?.id) {
      return NextResponse.json(
        { success: false, message: "Unauthorized" },
        { status: 401 }
      );
    }

    // Fetch user safely
    const user: IUser | null = await User.findById(userPayload.id).select("-password");

    if (!user) {
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, user });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Internal Server Error";

    return NextResponse.json(
      { success: false, message },
      { status: 500 }
    );
  }
}