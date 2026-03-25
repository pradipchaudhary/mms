import Button from "@/components/ui/Button";
import { Plus, Download } from "lucide-react";

export default function MedicalCenterHeader() {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-6 mb-6 gap-4">
      <div>
        <h1 className="text-2xl font-semibold">Medical Centers</h1>
        <p className="text-sm text-slate-500">
          Manage all registered medical facilities.
        </p>
      </div>

      <div className="flex gap-2">
        <Button variant="default">
          <Download size={16} /> Export
        </Button>

        <Button href="/dashboard/medical-centers/create" variant="primary">
          <Plus size={16} /> Add Center
        </Button>
      </div>
    </div>
  );
}