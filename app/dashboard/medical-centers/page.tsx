"use client";

import { useState } from "react";
import {
  useMedicalCenters,
  IMedicalCenter,
} from "@/modules/medical-center/hooks/useMedicalCenters";
import MedicalCenterHeader from "@/modules/medical-center/components/MedicalCenterHeader";
import MedicalCenterTable from "@/modules/medical-center/components/MedicalCenterTable";
import MedicalCenterModal from "@/modules/medical-center/components/MedicalCenterModal";

export default function Page() {
  const { centers, loading, deleteCenter } = useMedicalCenters();
  const [selected, setSelected] = useState<IMedicalCenter | null>(null);

  if (loading) return <p className="p-10 text-center">Loading...</p>;

  return (
    <div className="p-6">
      <MedicalCenterHeader />

      <MedicalCenterTable
        centers={centers}
        onView={setSelected}
        onDelete={deleteCenter}
      />

      {selected && (
        <MedicalCenterModal
          center={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </div>
  );
}