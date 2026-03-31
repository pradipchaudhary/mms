'use client';

import { MoreHorizontal, ExternalLink, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

const employees = [
  { id: '1', name: 'John Doe', role: 'Senior Developer', department: 'Engineering', status: 'Active', avatar: 'https://picsum.photos/seed/1/100/100' },
  { id: '2', name: 'Jane Smith', role: 'Product Manager', department: 'Product', status: 'Active', avatar: 'https://picsum.photos/seed/2/100/100' },
  { id: '3', name: 'Robert Brown', role: 'UI/UX Designer', department: 'Design', status: 'On Leave', avatar: 'https://picsum.photos/seed/3/100/100' },
  { id: '4', name: 'Alice Wilson', role: 'Marketing Lead', department: 'Marketing', status: 'Active', avatar: 'https://picsum.photos/seed/4/100/100' },
  { id: '5', name: 'Michael Chen', role: 'QA Engineer', department: 'Engineering', status: 'Terminated', avatar: 'https://picsum.photos/seed/5/100/100' },
];

const statusStyles = {
  'Active': 'bg-brand/10 text-brand border-brand/20',
  'On Leave': 'bg-brand/5 text-brand/70 border-brand/10',
  'Terminated': 'bg-slate-100 text-slate-500 border-slate-200',
};

export function EmployeeTable() {
  return (
    <div
      className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden"
    >
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50">
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Department</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-50">
            {employees.map((emp, idx) => (
              <tr
                key={emp.id}
                className="hover:bg-slate-50/50 transition-colors group"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-slate-100 group-hover:border-brand/30 transition-colors relative">
                      <Image
                        src={emp.avatar}
                        alt={emp.name}
                        fill
                        className="object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-800">{emp.name}</p>
                      <p className="text-xs text-slate-500">{emp.role}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="text-sm font-medium text-slate-600">{emp.department}</span>
                </td>
                <td className="px-6 py-4">
                  <span className={cn(
                    "px-2.5 py-1 rounded-full text-xs font-bold border",
                    statusStyles[emp.status as keyof typeof statusStyles]
                  )}>
                    {emp.status}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-slate-400 hover:text-brand hover:bg-brand/10 rounded-lg transition-all">
                      <Mail className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-brand hover:bg-brand/10 rounded-lg transition-all">
                      <Phone className="w-4 h-4" />
                    </button>
                    <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-all">
                      <MoreHorizontal className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
