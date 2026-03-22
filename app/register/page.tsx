// app/register/page.tsx
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "reception" });
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/auth/register", {
      method: "POST",
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) router.push("/login");
    else alert(data.message);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 space-y-4">
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <select onChange={e => setForm({ ...form, role: e.target.value })} value={form.role}>
        <option value="superadmin">SuperAdmin</option>
        <option value="admin">Admin</option>
        <option value="hr">HR</option>
        <option value="reception">Reception</option>
      </select>
      <button type="submit">Register</button>
    </form>
  );
}