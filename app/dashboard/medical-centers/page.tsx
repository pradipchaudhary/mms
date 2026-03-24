"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { Eye, Edit, Trash2, X, Mail, Phone, MapPin, Plus, AlertCircle } from "lucide-react";

interface IMedicalCenter {
  _id: string;
  medicalName: string;
  email: string;
  phone?: string;
  address?: string;
  isActive?: boolean;
  remark?: string;
}

export default function MedicalCenterList() {
  const [centers, setCenters] = useState<IMedicalCenter[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCenter, setSelectedCenter] = useState<IMedicalCenter | null>(null);

  const fetchCenters = async () => {
    try {
      const res = await fetch("/api/medical-centers");
      const data = await res.json();
      setCenters(data);
    } catch (err) {
      console.error("Fetch error:", err);
    } finally {
      setLoading(false);
    }
  };

  const closeModal = useCallback(() => setSelectedCenter(null), []);

  // ESC key listener
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [closeModal]);

  useEffect(() => {
    fetchCenters();
  }, []);

  if (loading) return <div className="p-10 text-center text-slate-500 text-sm font-medium">Loading records...</div>;

  return (
    <div className="max-w-full mx-auto text-slate-900">
      {/* Top Navigation / Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-8 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Medical Centers</h1>
          <p className="text-sm text-slate-500 mt-1">Manage all registered medical facilities and contact data.</p>
        </div>
        <Link href="/dashboard/medical-centers/create">
          <Button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 transition-all">
            <Plus size={16} /> Add Center
          </Button>
        </Link>
      </div>

      {/* Professional Table */}
      <div className="overflow-hidden border border-slate-200 rounded-lg shadow-sm">
        <table className="w-full text-left border-collapse bg-white">
          <thead>
            <tr className="bg-slate-50 border-b border-slate-200">
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">S.N</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Medical Facility</th>
              <th className="px-6 py-4 text-[11px] font-bold text-slate-500 uppercase tracking-wider">Contact Detail</th>
              <th className="px-6 py-4 text-right text-[11px] font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {centers.map((center, index) => (
              <tr key={center._id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 text-sm text-slate-400 tabular-nums">{index + 1}</td>
                <td className="px-6 py-4">
                  <span className="text-sm font-semibold text-slate-800 block">{center.medicalName}</span>
                  <span className="text-[11px] text-slate-400 font-mono uppercase tracking-tighter">ID: {center._id.slice(-6)}</span>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-slate-600 flex flex-col gap-0.5">
                    <span className="flex items-center gap-1.5"><Mail size={13} className="text-slate-400" /> {center.email}</span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-400"><Phone size={13} /> {center.phone || "—"}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end items-center gap-1">
                    <button onClick={() => setSelectedCenter(center)} className="p-2 text-slate-400 hover:text-slate-900 hover:bg-slate-100 rounded-md transition-all" title="View">
                      <Eye size={18} />
                    </button>
                    <Link href={`/dashboard/medical-centers/edit/${center._id}`}>
                      <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-all" title="Edit">
                        <Edit size={18} />
                      </button>
                    </Link>
                    <button onClick={() => {/* delete logic */ }} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-all" title="Delete">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Clean Professional Detail Modal */}
      {selectedCenter && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200" onClick={closeModal} />

          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
              <h3 className="font-semibold text-slate-900">Facility Information</h3>
              <button onClick={closeModal} className="text-slate-400 hover:text-slate-600 transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              <div>
                <h4 className="text-xl font-bold text-slate-900">{selectedCenter.medicalName}</h4>
                <div className="mt-2 flex items-center gap-2">
                  <span className={`h-2 w-2 rounded-full ${selectedCenter.isActive ? 'bg-green-500' : 'bg-slate-300'}`} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {selectedCenter.isActive ? 'Operating' : 'Inactive'}
                  </span>
                </div>
              </div>

              <div className="grid gap-4 pt-4 border-t border-slate-50">
                <div className="flex gap-4">
                  <div className="text-slate-400 pt-1"><MapPin size={18} /></div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Address</p>
                    <p className="text-sm text-slate-600 leading-relaxed">{selectedCenter.address || "No address on file"}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-slate-400 pt-1"><Mail size={18} /></div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Official Email</p>
                    <p className="text-sm text-slate-700 font-medium">{selectedCenter.email}</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="text-slate-400 pt-1"><Phone size={18} /></div>
                  <div className="space-y-1">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contact Number</p>
                    <p className="text-sm text-slate-700 font-medium">{selectedCenter.phone || "N/A"}</p>
                  </div>
                </div>
              </div>

              {selectedCenter.remark && (
                <div className="bg-slate-50 p-4 rounded-lg flex gap-3 items-start border border-slate-100">
                  <AlertCircle size={16} className="text-slate-400 mt-0.5" />
                  <p className="text-xs text-slate-500 leading-relaxed">{selectedCenter.remark}</p>
                </div>
              )}
            </div>

            <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
              <button
                onClick={closeModal}
                className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}