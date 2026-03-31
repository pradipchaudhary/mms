"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
import { ArrowLeft, Save } from "lucide-react";

export default function EditMedicalCenter() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;

  const [form, setForm] = useState({
    medicalName: "",
    address: "",
    phone: "",
    email: "",
    remark: "",
  });

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchCenter = async () => {
      try {
        const res = await fetch(`/api/medical-centers/${id}`);
        const data = await res.json();
        setForm(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchCenter();
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await fetch(`/api/medical-centers/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      router.push("/dashboard/medical-centers");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-slate-500 text-sm font-medium">
        Loading medical center...
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Edit Medical Center
          </h1>
          <p className="text-sm text-slate-500 mt-1">
            Update medical facility information.
          </p>
        </div>

        <Button
          variant="ghost"
          onClick={() => router.back()}
          className="flex items-center gap-2"
        >
          <ArrowLeft size={16} />
          Back
        </Button>
      </div>

      {/* Form Card */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-6 space-y-5">
        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Medical Name"
            value={form.medicalName}
            onChange={(e) =>
              setForm({ ...form, medicalName: e.target.value })
            }
            required
          />

          <Input
            label="Email Address"
            type="email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input
              label="Phone Number"
              value={form.phone}
              onChange={(e) =>
                setForm({ ...form, phone: e.target.value })
              }
            />

            <Input
              label="Address"
              value={form.address}
              onChange={(e) =>
                setForm({ ...form, address: e.target.value })
              }
            />
          </div>

          <Input
            label="Remark / Notes"
            value={form.remark}
            onChange={(e) =>
              setForm({ ...form, remark: e.target.value })
            }
          />

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-slate-100">
            <Button
              type="button"
              variant="ghost"
              onClick={() => router.back()}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="primary"
              className="flex items-center gap-2"
              disabled={submitting}
            >
              <Save size={16} />
              {submitting ? "Updating..." : "Update Center"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}