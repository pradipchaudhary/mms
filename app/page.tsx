import { redirect } from "next/navigation";

export default function Home() {
  // redirect("/dashboard");
  return (
    <div className="flex h-screen items-center justify-center">
      <h1 className="text-4xl font-bold">Welcome to the Home Page</h1>
    </div>
  )
}
