import Button from "@/components/ui/Button";
import { Plus } from "lucide-react";
import Link from "next/link";

export default function CompanyPage() {
  return (
    <>
      {/* Top Navigation / Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-100 pb-8 mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">Medical Centers</h1>
          <p className="text-sm text-slate-500 mt-1">Manage all registered medical facilities and contact data.</p>
        </div>
        <Link href="/dashboard/medical-centers/create">
          <Button className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-md text-sm font-medium flex items-center gap-2 transition-all">
            <Plus size={16} /> Add Company
          </Button>
        </Link>
      </div>

      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Company Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lot No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Demand Qty</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Visa Stamped</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remaining</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Profession</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">issueDate</th>
            </tr>
          </thead>
          {/* <tbody className="bg-white divide-y divide-gray-200">
            {companies.map((company) => (
              <tr key={company._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-700">{company.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{company.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-600">{company.phone || "-"}</td>
                <td className="px-6 py-4 whitespace-nowrap flex space-x-2">
                  <Link href={`/companies/edit/${company._id}`}>
                    <Button className="bg-yellow-500 hover:bg-yellow-600">Edit</Button>
                  </Link>
                  <Button className="bg-red-500 hover:bg-red-600" onClick={() => deleteCompany(company._id)}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody> */}
        </table>
      </div>
    </>
  )
}