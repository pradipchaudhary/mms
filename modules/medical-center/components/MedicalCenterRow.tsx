import { Eye, Edit, Trash2, Mail, Phone } from "lucide-react";
import { IMedicalCenter } from "../hooks/useMedicalCenters";
import Link from "next/link";

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
    <tr className="hover:bg-slate-50 transition-colors duration-200">
      {/* Index */}
      <td className="px-6 py-4 text-sm text-slate-500">{index + 1}</td>

      {/* Medical Center Name */}
      <td className="px-6 py-4">
        <p className="font-medium text-slate-900">{center.medicalName}</p>
        <span className="text-xs text-slate-400">
          ID: {center._id.slice(-6)}
        </span>
      </td>

      {/* Email */}
      <td className="px-6 py-4 text-sm">
        <span className="flex items-center gap-2 text-slate-700">
          <Mail size={14} /> {center.email}
        </span>
      </td>

      {/* Phone */}
      <td className="px-6 py-4 text-sm text-slate-700">
        <span className="flex items-center gap-2">
          <Phone size={14} /> {center.phone || "—"}
        </span>
      </td>

      {/* Actions */}
      <td className="px-6 py-4 text-right">
        <div className="flex justify-end gap-2">
          {/* View */}
          <button
            onClick={onView}
            className="p-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-all shadow-sm"
            title="View Details"
          >
            <Eye size={16} />
          </button>

          {/* Edit */}
          <Link
            href={`/dashboard/medical-centers/edit/${center._id}`}
            className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-all shadow-sm"
            title="Edit Center"
          >
            <Edit size={16} />
          </Link>

          {/* Delete */}
          <button
            onClick={onDelete}
            className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-full transition-all shadow-sm"
            title="Delete Center"
          >
            <Trash2 size={16} />
          </button>
        </div>
      </td>
    </tr>
  );
}