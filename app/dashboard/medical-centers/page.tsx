"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IMedicalCenter } from "@/modules/medical-center/medicalCenter.types";


export default function MedicalCentersList() {
  const router = useRouter();
  const [medicalCenters, setMedicalCenters] = useState<IMedicalCenter[]>([]);

  useEffect(() => {
    async function fetchCenters() {
      try {
        const res = await fetch("/api/medical-centers");
        const data = await res.json();
        setMedicalCenters(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch medical centers:", error);
        setMedicalCenters([]);
      }
    }
    fetchCenters();
  }, []);


  // const handleDelete = async (id: string) => {
  //   if (!id) return alert("Invalid ID");

  //   if (!confirm("Are you sure you want to delete this medical center?")) return;

  //   try {
  //     const res = await fetch(`/api/medical-centers/${id}`, {
  //       method: "DELETE",
  //     });
  //     if (!res.ok) throw new Error("Delete failed");
  //     setMedicalCenters((prev) => prev.filter((c) => c.id !== id));
  //   } catch (error) {
  //     console.error(error);
  //     alert("Failed to delete medical center");
  //   }
  // };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-800">Medical Centers</h1>
        <button
          onClick={() => router.push("/dashboard/medical-centers/new")}
          className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700 transition"
        >
          Add Medical Center
        </button>
      </div>

      <div className="overflow-x-auto bg-white rounded-md shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left text-gray-600">Name</th>
              <th className="px-4 py-2 text-left text-gray-600">Address</th>
              <th className="px-4 py-2 text-left text-gray-600">Phone</th>
              <th className="px-4 py-2 text-left text-gray-600">Email</th>
              <th className="px-4 py-2 text-left text-gray-600">Remark</th>
              <th className="px-4 py-2 text-center text-gray-600">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {Array.isArray(medicalCenters) && medicalCenters.length > 0 ? (
              medicalCenters.map((center) => (
                <tr key={center._id}>
                  <td className="px-4 py-2">{center.medicalName}</td>
                  <td className="px-4 py-2">{center.address}</td>
                  <td className="px-4 py-2">{center.phone}</td>
                  <td className="px-4 py-2">{center.email}</td>
                  <td className="px-4 py-2">{center.remark}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() =>
                        router.push(`/dashboard/medical-centers/${center._id}/edit`)
                      }
                      className="text-blue-600 hover:underline"
                    >
                      Edit
                    </button>
                    {/* <button
                      onClick={() => handleDelete(center._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-4 text-center text-gray-500">
                  No medical centers found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}