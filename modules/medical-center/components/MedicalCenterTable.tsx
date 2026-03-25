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
    <div className="border rounded-lg overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-50 text-xs uppercase text-slate-500">
          <tr>
            <th className="px-6 py-4">S.N</th>
            <th className="px-6 py-4">Medical</th>
            <th className="px-6 py-4">Contact</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>

        <tbody>
          {centers.map((c, i) => (
            <MedicalCenterRow
              key={c._id}
              center={c}
              index={i}
              onView={() => onView(c)}
              onDelete={() => onDelete(c._id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}