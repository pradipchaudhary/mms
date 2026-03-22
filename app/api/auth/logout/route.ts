import { NextResponse } from "next/server";

export async function POST() {
  // Clear the token cookie
  const response = NextResponse.json({ success: true });
  response.cookies.set({
    name: "token",
    value: "",
    path: "/",
    httpOnly: true,
    maxAge: 0, // immediately expires
  });

  return response;
}