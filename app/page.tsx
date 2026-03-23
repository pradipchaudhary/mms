import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// Make the server component async
export default async function RootPage() {
  // Await cookies() if it returns a Promise
  const cookieStore = await cookies(); // <-- await here
  const tokenCookie = cookieStore.get("token");
  const token = tokenCookie?.value;

  if (token) {
    // Logged in → redirect to dashboard
    redirect("/dashboard");
  } else {
    // Not logged in → redirect to login
    redirect("/login");
  }

  return null; // will never render
}