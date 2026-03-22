"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: ReactNode;
  redirectPath?: string; // Optional custom redirect
}

interface AuthResponse {
  success: boolean;
  user?: {
    id: string;
    name: string;
    role: string;
    [key: string]: any;
  };
}

export default function AuthGuard({
  children,
  redirectPath = "/login",
}: AuthGuardProps) {
  const [loading, setLoading] = useState(true);
  const [authenticated, setAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", { credentials: "include" });
        const data: AuthResponse = await res.json();

        if (data.success) {
          setAuthenticated(true);
        } else {
          router.replace(redirectPath);
        }
      } catch (err) {
        console.error("Auth check failed:", err);
        router.replace(redirectPath);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, redirectPath]);

  if (loading) return <p>Loading...</p>;
  if (!authenticated) return null; // while redirecting

  return <>{children}</>;
}