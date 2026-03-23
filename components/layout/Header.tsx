"use client";

/**
 * Header Component
 * ----------------
 * - Displays search bar, notifications, and user profile
 * - Fetches authenticated user from `/api/auth/me`
 * - Optimized for Next.js (Vercel-ready)
 */

import { useEffect, useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import { Bell, Search, ChevronDown, Menu } from "lucide-react";

interface User {
  name: string;
  role: string;
  avatar?: string;
}

interface HeaderProps {
  isCollapsed: boolean;
  onMenuClick: () => void;
}

export function Header({ isCollapsed, onMenuClick }: HeaderProps) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    /**
     * Fetch logged-in user
     */
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        if (!res.ok) throw new Error("Failed to fetch user");

        const data: { success: boolean; user?: User } = await res.json();

        if (data.success && data.user) {
          setUser(data.user);
        }
      } catch (err: unknown) {
        console.error("Error fetching user:", err);
      }
    };

    fetchUser();
  }, []);

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-100 flex items-center justify-between px-4 sm:px-6 lg:px-8 sticky top-0 z-40">

      {/* ✅ Mobile Menu Button (FIX: use onMenuClick) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
        aria-label="Open menu"
      >
        <Menu className="w-5 h-5 text-slate-600" />
      </button>

      {/* Search */}
      <div className="flex items-center gap-4 flex-1 max-w-md ml-2">
        <div className="relative w-full group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
          <input
            type="text"
            placeholder="Search employees, projects..."
            className="w-full bg-slate-50 border-none rounded-xl py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-primary/20 transition-all outline-none text-slate-700"
          />
        </div>
      </div>

      {/* Notifications & Profile */}
      <div className="flex items-center gap-6">
        {/* Bell */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative p-2 text-slate-500 hover:bg-slate-50 rounded-full transition-colors"
        >
          <Bell className="w-5 h-5" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
        </motion.button>

        <div className="h-8 w-px bg-slate-100" />

        {/* User Info */}
        <div className="flex items-center gap-3 cursor-pointer group">
          <div className="text-right hidden sm:block">
            <p className="text-sm font-semibold text-slate-800 leading-none">
              {user?.name || "Loading..."}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {user?.role || "..."}
            </p>
          </div>

          {/* ✅ FIX: next/image instead of img */}
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/5">
            <Image
              src={user?.avatar || "https://picsum.photos/seed/admin/100/100"}
              alt={user?.name || "User"}
              width={40}
              height={40}
              className="object-cover"
              unoptimized // Optional if using external image without config
            />
          </div>

          {/* <ChevronDown className="w-4 h-4 text-slate-400 group-hover:text-slate-600 transition-colors" /> */}
        </div>
      </div>
    </header>
  );
}