"use client";

/**
 * Dashboard Page
 * - Protected by AuthGuard
 * - Uses DashboardLayout
 * - Displays stats and actions
 */

import AuthGuard from "@/components/AuthGuard";
import { StatsCard } from "@/components/StatsCard";
import {
  Briefcase,
  CalendarCheck,
  Clock,
  Download,
  Filter,
  Plus,
  UserPlus,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

export default function DashboardPage() {
  return (
    <AuthGuard>
      {/* Page Title & Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <motion.h2
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight"
          >
            Dashboard Overview
          </motion.h2>

          {/* ✅ FIXED: Escaped apostrophe */}
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Welcome back, here&apos;s what&apos;s happening today.
          </p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-3">
          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Filter className="w-4 h-4" />
            Filters
          </button>

          <button className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs sm:text-sm font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Export
          </button>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-xl text-sm font-semibold hover:opacity-90 transition-all shadow-md shadow-primary/20"
          >
            <Plus className="w-4 h-4" />
            Add Employee
          </motion.button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <StatsCard
          label="Total Employees"
          value="1,284"
          change={12}
          trend="up"
          icon={Users}
          color="blue"
          delay={0.1}
        />
        <StatsCard
          label="Active Projects"
          value="42"
          change={5}
          trend="up"
          icon={Briefcase}
          color="blue"
          delay={0.2}
        />
        <StatsCard
          label="On Leave"
          value="18"
          change={2}
          trend="down"
          icon={Clock}
          color="yellow"
          delay={0.3}
        />
        <StatsCard
          label="New Hires"
          value="24"
          change={8}
          trend="up"
          icon={UserPlus}
          color="rose"
          delay={0.4}
        />
      </div>


    </AuthGuard>
  );
}