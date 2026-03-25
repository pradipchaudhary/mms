"use client";

import { useEffect, useState } from "react";
import Button from "@/components/ui/Button";
import { Plus, Download, Search } from "lucide-react";

interface Props {
  onSearch?: (value: string) => void;
}

export default function MedicalCenterHeader({ onSearch }: Props) {
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    onSearch?.(value); // pass to parent
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      onSearch?.(search);
    }, 300);

    return () => clearTimeout(delay);
  }, [search]);

  return (
    <div className="flex flex-col gap-4 border-b pb-6 mb-6">

      {/* Top Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">
            Medical Centers
          </h1>
          <p className="text-sm text-slate-500">
            Manage all registered medical facilities.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="default">
            <Download size={16} /> Export
          </Button>

          <Button
            href="/dashboard/medical-centers/create"
            variant="primary"
          >
            <Plus size={16} /> Add Center
          </Button>
        </div>
      </div>

      {/* 🔍 Search Section */}
      <div className="relative w-full sm:max-w-md">
        <Search
          size={16}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />

        <input
          type="text"
          value={search}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Search medical centers..."
          className="w-full pl-9 pr-3 py-2 text-sm border border-slate-200 rounded-md focus:outline-none focus:ring-2 focus:ring-[#5a20cb]/20 focus:border-[#5a20cb]"
        />
      </div>
    </div>
  );
}