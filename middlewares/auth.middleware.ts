// auth.middleware.ts
import { cookies as nextCookies } from "next/headers";
import { verifyToken } from "@/modules/auth/auth.utils";

export const getAuthUser = async () => {
  // Await cookies() if it returns a promise
  const cookieStore = await nextCookies(); 
  const tokenCookie = cookieStore.get("token");

  if (!tokenCookie?.value) throw new Error("Unauthorized");

  return verifyToken(tokenCookie.value);
};