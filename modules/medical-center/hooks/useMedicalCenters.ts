"use client";

import { useEffect, useState } from "react";

export interface IMedicalCenter {
  _id: string;
  medicalName: string;
  email: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
  remark?: string;
}

export const useMedicalCenters = () => {
  const [centers, setCenters] = useState<IMedicalCenter[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCenters = async () => {
    try {
      const res = await fetch("/api/medical-centers");
      const data = await res.json();
      setCenters(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const deleteCenter = async (id: string) => {
    if (!confirm("Delete this record?")) return;

    try {
      await fetch(`/api/medical-centers/${id}`, { method: "DELETE" });
      setCenters((prev) => prev.filter((c) => c._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchCenters();
  }, []);

  return { centers, loading, deleteCenter };
};