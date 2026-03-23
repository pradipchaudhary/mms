// src/components/LoginRedirectGuard.tsx
"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface LoginRedirectGuardProps {
  children: ReactNode;
}

export default function LoginRedirectGuard({ children }: LoginRedirectGuardProps) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data = await res.json();

        if (data.success) {
          // Logged in → redirect to dashboard
          router.replace("/dashboard");
        }
        // else stay on the page (login page)
      } catch (err) {
        console.error("Auth check failed:", err);
        // Stay on login page
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (loading) return <p>Loading...</p>;

  return <>{children}</>;
}