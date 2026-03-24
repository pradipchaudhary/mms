"use client";

/**
 * Sidebar Component (Final)
 * ------------------------
 * - Collapsible sidebar
 * - Mobile responsive
 * - Real routing (Next.js)
 * - Active route detection
 */

import { motion, AnimatePresence } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Users,
  UserPlus,
  Stethoscope,
  Plane,
  CheckCircle,
  FileText,
  ClipboardList,
  Building2,
  Settings,
  Briefcase,
  ChevronRight,
  ChevronLeft,
  LogOut,
} from "lucide-react";

import { cn } from "@/lib/utils";
import LogoutButton from "../LogoutButton";

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
  isMobile?: boolean;
}

interface NavItem {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  label: string;
  href: string;
}

const BASE = "/dashboard";

export const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", href: `${BASE}` },

  // Candidate Management
  { icon: UserPlus, label: "Candidates", href: `${BASE}/candidates` },
  { icon: Users, label: "Employees", href: `${BASE}/employees` },

  // Process Pipeline
  { icon: Plane, label: "Flight", href: `${BASE}/flight` },
  { icon: CheckCircle, label: "Deployed", href: `${BASE}/deployed` },

  // Business / Operations
  { icon: Building2, label: "Clients / Companies", href: `${BASE}/company` },
  { icon: ClipboardList, label: "Job Demands", href: `${BASE}/jobs` },
  { icon: Stethoscope, label: "Medical Center", href: `${BASE}/medical-centers` },

  // Reports & Docs
  { icon: FileText, label: "Reports", href: `${BASE}/reports` },

  // System
  { icon: Settings, label: "Settings", href: `${BASE}/settings` },
];

export function Sidebar({ isCollapsed, onToggle, isMobile }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && (
        <div
          onClick={onToggle}
          className="fixed inset-0 bg-black/30 z-40 lg:hidden"
        />
      )}

      <motion.aside
        initial={false}
        animate={{
          width: isCollapsed ? 80 : 256,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "h-screen bg-white border-r border-slate-100 flex flex-col fixed top-0 left-0 z-50 overflow-hidden",
          isMobile && "w-64"
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "p-6 flex items-center justify-between",
            isCollapsed ? "px-4" : "px-6"
          )}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <motion.div
              layout
              className={cn(
                "w-8 h-8 bg-primary rounded-lg flex items-center justify-center relative",
                isCollapsed ? "-right-2" : "right-0"
              )}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
            >
              <Briefcase className="text-white w-5 h-5" />
            </motion.div>

            <AnimatePresence>
              {!isCollapsed && (
                <motion.h1
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-bold text-slate-800 whitespace-nowrap"
                >
                  ManpowerMS
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          {/* Toggle */}
          <button onClick={onToggle} className="relative -right-5">
            {isCollapsed ? <ChevronRight /> : <ChevronLeft />}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl transition group",
                  isActive
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                  isCollapsed && "justify-center px-0"
                )}
              >
                <item.icon
                  className={cn(
                    "w-5 h-5",
                    isActive
                      ? "text-primary"
                      : "text-slate-400 group-hover:text-slate-600"
                  )}
                />

                <AnimatePresence>
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -10 }}
                      className="text-sm whitespace-nowrap"
                    >
                      {item.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {isActive && !isCollapsed && (
                  <div className="ml-auto w-1 h-4 bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-amber-50">
          <LogoutButton
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 hover:text-red-500",
              isCollapsed && "justify-center px-0"
            )}
          >
            <LogOut className="w-5 h-5" />
            {!isCollapsed && <span>Logout</span>}
          </LogoutButton>
        </div>
      </motion.aside>
    </>
  );
}