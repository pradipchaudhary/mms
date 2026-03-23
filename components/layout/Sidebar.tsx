"use client";

/**
 * Sidebar Component
 * -----------------
 * - Collapsible sidebar
 * - Mobile responsive (overlay mode)
 * - Navigation + logout
 */

import { motion, AnimatePresence } from "motion/react";
import {
  Users,
  LayoutDashboard,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  FileText,
  Shield,
  Briefcase,
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
  active: boolean;
}

const navItems: NavItem[] = [
  { icon: LayoutDashboard, label: "Dashboard", active: true },
  { icon: Users, label: "Employees", active: false },
  { icon: Briefcase, label: "Projects", active: false },
  { icon: Shield, label: "Security", active: false },
  { icon: FileText, label: "Reports", active: false },
  { icon: Settings, label: "Settings", active: false },
];

export function Sidebar({ isCollapsed, onToggle, isMobile }: SidebarProps) {
  return (
    <>
      {/* ✅ Mobile Overlay (FIX: using isMobile) */}
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
          x: isMobile ? 0 : 0,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "h-screen bg-white border-r border-slate-100 flex flex-col fixed top-0 z-50 overflow-hidden",

          // ✅ Desktop behavior
          "left-0",

          // ✅ Mobile behavior (slide in/out)
          isMobile
            ? "w-64"
            : ""
        )}
      >
        {/* Logo */}
        <div
          className={cn(
            "p-6 flex items-center justify-between transition-all duration-300",
            isCollapsed ? "px-4" : "px-6"
          )}
        >
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="shrink-0 w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Briefcase className="text-white w-5 h-5" />
            </div>

            <AnimatePresence mode="wait">
              {!isCollapsed && (
                <motion.h1
                  key="sidebar-title"
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  className="font-bold text-slate-800 tracking-tight whitespace-nowrap"
                >
                  ManpowerMS
                </motion.h1>
              )}
            </AnimatePresence>
          </div>

          {/* Toggle */}
          <button
            onClick={onToggle}
            aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="p-1.5 rounded-lg hover:bg-slate-50 text-slate-400 hover:text-slate-600 transition-colors"
          >
            {isCollapsed ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              className={cn(
                "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative",
                item.active
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-slate-500 hover:bg-slate-50 hover:text-slate-800",
                isCollapsed && "justify-center px-0"
              )}
            >
              <item.icon
                className={cn(
                  "w-5 h-5 shrink-0",
                  item.active
                    ? "text-primary"
                    : "text-slate-400 group-hover:text-slate-600"
                )}
              />

              <AnimatePresence mode="wait">
                {!isCollapsed && (
                  <motion.span
                    key={item.label}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    className="text-sm whitespace-nowrap"
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {item.active && !isCollapsed && (
                <motion.div
                  layoutId="active-nav"
                  className="ml-auto w-1 h-4 bg-primary rounded-full"
                />
              )}
            </button>
          ))}
        </nav>

        {/* Logout */}
        <div className="p-4 border-t border-slate-100">
          <LogoutButton
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-slate-500 hover:bg-red-50 hover:text-red-600 transition-all duration-200 group",
              isCollapsed && "justify-center px-0"
            )}
          >
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-red-500 shrink-0" />
            {!isCollapsed && (
              <span className="text-sm font-medium whitespace-nowrap">
                Logout
              </span>
            )}
          </LogoutButton>
        </div>
      </motion.aside>
    </>
  );
}