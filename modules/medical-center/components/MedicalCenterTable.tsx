import MedicalCenterRow from "./MedicalCenterRow";
import { IMedicalCenter } from "../hooks/useMedicalCenters";

interface Props {
  centers: IMedicalCenter[];
  onView: (c: IMedicalCenter) => void;
  onDelete: (id: string) => void;
}

export default function MedicalCenterTable({
  centers,
  onView,
  onDelete,
}: Props) {
  return (
    <div className="border border-slate-200 rounded-xl overflow-hidden bg-white shadow-sm">

      {/* Scroll Wrapper */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">

          {/* Header */}
          <thead className="bg-slate-50 text-[11px] uppercase tracking-wider text-slate-500 sticky top-0 z-10">
            <tr>
              <th className="px-6 py-4 text-left font-semibold w-16">S.N</th>
              <th className="px-6 py-4 text-left font-semibold">Medical Facility</th>
              <th className="px-6 py-4 text-left font-semibold">Email</th>
              <th className="px-6 py-4 text-left font-semibold">Contact</th>
              <th className="px-6 py-4 text-right font-semibold w-32">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody className="divide-y divide-slate-100">
            {centers.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="text-center py-14 text-sm text-slate-400"
                >
                  No medical centers found.
                </td>
              </tr>
            ) : (
              centers.map((c, i) => (
                <MedicalCenterRow
                  key={c._id}
                  center={c}
                  index={i}
                  onView={() => onView(c)}
                  onDelete={() => onDelete(c._id)}
                />
              ))
            )}
          </tbody>

        </table>
      </div>

      {/* Footer (Optional - future pagination) */}
      {centers.length > 0 && (
        <div className="flex items-center justify-between px-6 py-3 bg-slate-50 text-xs text-slate-500">
          <span>
            Showing <strong>{centers.length}</strong> records
          </span>

          {/* Future pagination placeholder */}
          <span className="text-slate-400">Pagination coming soon</span>
        </div>
      )}
    </div>
  );
}