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
import { OverviewChart } from "@/components/dashboard/OverviewChart";
import { EmployeeTable } from "@/components/dashboard/EmployeeTable";

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

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
        <div className="xl:col-span-2 space-y-8">
          <OverviewChart />
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-800 tracking-tight">Recent Employees</h3>
              {/* <button
                onClick={() => onViewChange?.('Employees')}
                className="text-sm font-bold text-primary hover:underline"
              >
                View All
              </button> */}
            </div>
            <EmployeeTable />
          </div>
        </div>

        <div className="space-y-8">
          {/* Quick Actions / Upcoming Events */}
          <div
            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm"
          >
            <h3 className="text-lg font-bold text-slate-800 tracking-tight mb-4">Upcoming Events</h3>
            <div className="space-y-4">
              {[
                { title: 'Team Meeting', time: '10:00 AM', type: 'General' },
                { title: 'Interview: Sarah J.', time: '02:30 PM', type: 'HR' },
                { title: 'Project Kickoff', time: '04:00 PM', type: 'Product' },
              ].map((event, i) => (
                <div key={i} className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer group">
                  <div className="w-12 h-12 bg-slate-50 rounded-xl flex flex-col items-center justify-center border border-slate-100 group-hover:bg-white group-hover:border-primary/20 transition-all">
                    <CalendarCheck className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-800">{event.title}</p>
                    <p className="text-xs text-slate-500">{event.time} • {event.type}</p>
                  </div>
                </div>
              ))}
            </div>
            {/* <button
              onClick={() => onViewChange?.('Agent')}
              className="w-full mt-6 py-2.5 text-sm font-semibold text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-xl transition-all"
            >
              Manage Agents
            </button> */}
          </div>

          {/* Performance Summary */}
          <div
            className="bg-primary p-6 rounded-2xl text-white shadow-lg shadow-primary/10 relative overflow-hidden group"
          >
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
            <h3 className="text-lg font-bold mb-2 relative z-10">Monthly Goal</h3>
            <p className="text-primary-foreground/80 text-sm mb-6 relative z-10">You've reached 85% of your hiring goal this month. Keep it up!</p>

            <div className="w-full bg-white/20 h-2 rounded-full overflow-hidden mb-4 relative z-10">
              <div
                style={{ width: '85%' }}
                className="h-full bg-white rounded-full"
              />
            </div>
            <div className="flex justify-between text-xs font-bold text-primary-foreground/90 relative z-10">
              <span>Progress</span>
              <span>85%</span>
            </div>
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}