import Button from "@/components/ui/Button";
import { Eye, Edit, Trash2, Mail, Phone } from "lucide-react";
import { IMedicalCenter } from "../hooks/useMedicalCenters";

interface Props {
  center: IMedicalCenter;
  index: number;
  onView: () => void;
  onDelete: () => void;
}

export default function MedicalCenterRow({
  center,
  index,
  onView,
  onDelete,
}: Props) {
  return (
    <tr className="hover:bg-slate-50">
      <td className="px-6 py-4 text-sm text-slate-400">{index + 1}</td>

      <td className="px-6 py-4">
        <p className="font-semibold">{center.medicalName}</p>
        <span className="text-xs text-slate-400">
          ID: {center._id.slice(-6)}
        </span>
      </td>

      <td className="px-6 py-4 text-sm">
        <div className="flex flex-col">
          <span className="flex items-center gap-1">
            <Mail size={12} /> {center.email}
          </span>
          <span className="text-xs text-slate-400 flex gap-1">
            <Phone size={12} /> {center.phone || "—"}
          </span>
        </div>
      </td>

      <td className="px-6 py-4 text-right">
        <div className="flex justify-end">
          <Button variant="ghost" onClick={onView}>
            <Eye size={16} />
          </Button>

          <Button
            href={`/dashboard/medical-centers/edit/${center._id}`}
            variant="ghost"
            className="hover:text-blue-600"
          >
            <Edit size={16} />
          </Button>

          <Button variant="danger" onClick={onDelete}>
            <Trash2 size={16} />
          </Button>
        </div>
      </td>
    </tr>
  );
}