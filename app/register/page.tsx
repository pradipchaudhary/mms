// app/register/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "reception",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (data.success) router.push("/login");
      else alert(data.message);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
        <h1 className="text-2xl font-bold text-slate-800 mb-6 text-center">
          Create Account
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Name */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-600 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
          </div>

          {/* Email */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-600 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-600 mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              required
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition"
            />
          </div>

          {/* Role */}
          <div className="flex flex-col">
            <label className="text-sm text-slate-600 mb-1">Role</label>
            <select
              value={form.role}
              onChange={(e) => setForm({ ...form, role: e.target.value })}
              className="w-full px-4 py-3 rounded-xl border border-slate-300 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition bg-white text-slate-700"
            >
              <option value="superadmin">SuperAdmin</option>
              <option value="admin">Admin</option>
              <option value="hr">HR</option>
              <option value="reception">Reception</option>
            </select>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-primary text-white rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-md shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <p className="text-sm text-slate-500 mt-4 text-center">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary font-medium hover:underline"
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
}