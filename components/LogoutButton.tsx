"use client";

import { useRouter } from "next/navigation";
import { ReactNode } from "react";

interface LogoutButtonProps {
  className?: string; // dynamic class
  children?: ReactNode; // optional children (icon + text)
}

export default function LogoutButton({ className, children }: LogoutButtonProps) {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });

      router.replace("/login"); // redirect to login
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  return (
    <button
      onClick={handleLogout}
      className={className} // apply dynamic class
    >
      {children || "Logout"} {/* fallback to text if no children */}
    </button>
  );
}