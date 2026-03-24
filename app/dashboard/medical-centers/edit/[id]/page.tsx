"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";

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

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCenter = async () => {
      const res = await fetch(`/api/medical-centers/${id}`);
      const data = await res.json();
      setForm(data);
      setLoading(false);
    };
    fetchCenter();
  }, [id]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    await fetch(`/api/medical-centers/${id}`, {
      method: "PUT",
      body: JSON.stringify(form),
    });
    router.push("/dashboard/medical-centers");
  };

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Edit Medical Center</h1>
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
        <Button type="submit">Update</Button>
      </form>
    </div>
  );
}