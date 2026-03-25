"use client";

import { AlertCircle, Mail, MapPin, Phone, X } from "lucide-react";
import { IMedicalCenter } from "../hooks/useMedicalCenters";
import { useEffect } from "react";

export default function MedicalCenterModal({
  center,
  onClose,
}: {
  center: IMedicalCenter;
  onClose: () => void;
}) {
  // ✅ ESC key handler
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEsc);

    return () => {
      window.removeEventListener("keydown", handleEsc);
    };
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] animate-in fade-in duration-200" onClick={onClose} />

      {/* Modal Content */}
      <div className="relative bg-white w-full max-w-lg rounded-xl shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 fade-in duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
          <h3 className="font-semibold text-slate-900">{ }</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors relative z-10 bg-slate-200/50 rounded-full p-1 cursor-pointer">
            <X size={18} />
          </button>
        </div>
        <div className="relative -top-16 z-0 w-fit h-52 overflow-hidden">
          <img
            src={"/medical-center-placeholder.png"}
            className="object-cover object-center"
          />
        </div>

        <div className="p-6 space-y-6 -mt-12">
          <div>
            <h4 className="text-xl font-bold text-slate-900">{center.medicalName}</h4>
            <div className="mt-2 flex items-center gap-2">
              <span className={`h-2 w-2 rounded-full ${center.isActive ? 'bg-green-500' : 'bg-slate-300'}`} />
              <span className="text-[10px] uppercase text-slate-500">
                {center.isActive ? 'Operating' : 'Inactive'}
              </span>
            </div>
          </div>

          <div className="grid gap-4 pt-4 border-t border-slate-50">
            <div className="flex gap-4">
              <div className="text-slate-400 pt-1"><MapPin size={18} /></div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Address</p>
                <p className="text-sm text-slate-600 leading-relaxed">{center.address || "No address on file"}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-slate-400 pt-1"><Mail size={18} /></div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Official Email</p>
                <p className="text-sm text-slate-700 font-medium">{center.email}</p>
              </div>
            </div>

            <div className="flex gap-4">
              <div className="text-slate-400 pt-1"><Phone size={18} /></div>
              <div className="space-y-1">
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Contact Number</p>
                <p className="text-sm text-slate-700 font-medium">{center.phone || "N/A"}</p>
              </div>
            </div>
          </div>

          {center.remark && (
            <div className="bg-slate-50 p-4 rounded-lg flex gap-3 items-start border border-slate-100">
              <AlertCircle size={16} className="text-slate-400 mt-0.5" />
              <p className="text-xs text-slate-500 leading-relaxed">{center.remark}</p>
            </div>
          )}
        </div>

        <div className="px-6 py-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}