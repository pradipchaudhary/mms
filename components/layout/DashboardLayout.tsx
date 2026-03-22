// src/components/layout/DashboardLayout.tsx
"use client";

import { useState, useEffect, ReactNode } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { Briefcase, Clock, Download, Filter, Plus, UserPlus, Users } from "lucide-react";
import { StatsCard } from "../StatsCard";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkIsDesktop = () => setIsDesktop(window.innerWidth >= 1024);
    checkIsDesktop();
    window.addEventListener("resize", checkIsDesktop);
    return () => window.removeEventListener("resize", checkIsDesktop);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50/50 flex font-sans selection:bg-primary/10 selection:text-primary overflow-x-hidden">

      {/* Sidebar Desktop */}
      <div className="hidden lg:block">
        <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed(!isCollapsed)} />
      </div>

      {/* Sidebar Mobile Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-50 lg:hidden"
            />
            <motion.div
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed inset-y-0 left-0 w-[280px] z-[60] lg:hidden"
            >
              <Sidebar isCollapsed={false} onToggle={() => setIsMobileMenuOpen(false)} isMobile />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Page Content */}
      <motion.div
        animate={{
          marginLeft: isDesktop ? (isCollapsed ? "80px" : "256px") : "0px"
        }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="flex-1 flex flex-col min-w-0 w-full"
      >
        <Header
          isCollapsed={isCollapsed}
          onMenuClick={() => setIsMobileMenuOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          <div className="max-w-full mx-auto space-y-6 sm:space-y-8">
            {children}
          </div>
        </main>
      </motion.div>
    </div>
  );
}