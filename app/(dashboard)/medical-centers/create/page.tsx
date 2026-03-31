"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

export default function CreateMedicalCenter() {
  const router = useRouter();
  const [form, setForm] = useState({
    medicalName: "",
    address: "",
    phone: "",
    email: "",
    remark: "",
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await fetch("/api/medical-centers", {
      method: "POST",
      body: JSON.stringify(form),
    });
    router.push("/medical-centers");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Create Medical Center</h1>
      <form onSubmit={handleSubmit}>
        <Input
          label="Medical Name"
          value={form.medicalName}
          onChange={(e) => setForm({ ...form, medicalName: e.target.value })}
          required
        />
        <Input
          label="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <Input
          label="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <Input
          label="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />
        <Input
          label="Remark"
          value={form.remark}
          onChange={(e) => setForm({ ...form, remark: e.target.value })}
        />
        <Button type="submit">Create</Button>
      </form>
    </div>
  );
}