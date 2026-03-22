// app/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import LoginRedirectGuard from "@/components/LoginRedirectGuard";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) router.push("/dashboard");
      else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LoginRedirectGuard>
      <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
        <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
          <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
            Sign In
          </h1>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="flex flex-col">
              <label className="text-sm text-slate-600 mb-1">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
            </div>

            <div className="flex flex-col">
              <label className="text-sm text-slate-600 mb-1">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Signing In..." : "Sign In"}
            </button>
          </form>

          <p className="text-sm text-slate-500 mt-4 text-center">
            Don’t have an account?{" "}
            <a href="/register" className="text-primary font-medium hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </LoginRedirectGuard>
  );
}