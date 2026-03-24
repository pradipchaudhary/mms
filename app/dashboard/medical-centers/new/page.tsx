"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

// Define the medical center form data type
interface MedicalCenterFormData {
  medicalName: string;
  address: string;
  phone: string;
  email: string;
  remark?: string;
}

/**
 * MedicalCenterForm Component
 * Reusable form component for creating or editing a medical center
 */
function MedicalCenterForm({
  form,
  setForm,
  onSubmit,
}: {
  form: MedicalCenterFormData;
  setForm: React.Dispatch<React.SetStateAction<MedicalCenterFormData>>;
  onSubmit: (e: React.FormEvent) => void;
}) {
  return (
    <form
      onSubmit={onSubmit}
      className="bg-white p-6 rounded-md space-y-4 shadow-md"
    >
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
        Submit
      </button>
    </form>
  );
}

/**
 * Page Component: CreateMedicalCenter
 * Page to create a new medical center
 */
export default function CreateMedicalCenter() {
  const router = useRouter();
  const [form, setForm] = useState<MedicalCenterFormData>({
    medicalName: "",
    address: "",
    phone: "",
    email: "",
    remark: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch("/api/medical-centers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      router.push("/dashboard/medical-centers");
    } catch {
      // Removed unused 'error' to fix ESLint warning
      alert("Failed to create medical center");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        Add Medical Center
      </h1>
      <MedicalCenterForm form={form} setForm={setForm} onSubmit={handleSubmit} />
    </div>
  );
}