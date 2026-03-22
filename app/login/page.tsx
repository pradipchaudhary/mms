// app/login/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginRedirectGuard from "@/components/LoginRedirectGuard";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) router.push("/dashboard");
    else alert(data.message);
  };

  return (
    <LoginRedirectGuard>
      <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
        <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </LoginRedirectGuard>
  );
}


