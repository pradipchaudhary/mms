"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";

export default function EditMedicalCenter() {
  const router = useRouter();
  const params = useParams();
  const { id } = params;
  const [form, setForm] = useState({
    medicalName: "",
    address: "",
    phone: "",
    email: "",
    remark: "",
  });

  useEffect(() => {
    async function fetchCenter() {
      try {
        const res = await fetch(`/api/medical-centers/${id}`);
        const data = await res.json();
        setForm(data);
      } catch (error) {
        alert("Failed to load medical center");
      }
    }
    fetchCenter();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch(`/api/medical-centers/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      router.push("/dashboard/medical-centers");
    } catch (error) {
      alert("Failed to update medical center");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Edit Medical Center
      </h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-md space-y-4">
        <input
          type="text"
          placeholder="Medical Name"
          value={form.medicalName}
          onChange={(e) => setForm({ ...form, medicalName: e.target.value })}
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-purple-500"
          required
        />
        <input
          type="text"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-purple-500"
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-purple-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-purple-500"
          required
        />
        <textarea
          placeholder="Remark"
          value={form.remark}
          onChange={(e) => setForm({ ...form, remark: e.target.value })}
          className="w-full border-b border-gray-300 py-2 focus:outline-none focus:border-purple-500 resize-none"
          rows={3}
        />
        <button
          type="submit"
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          Update
        </button>
      </form>
    </div>
  );
}