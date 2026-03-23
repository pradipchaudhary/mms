"use client";

/**
 * AuthGuard Component
 * -------------------
 * Protects routes by checking authentication status.
 * - Calls `/api/auth/me`
 * - Redirects to login if not authenticated
 * - Prevents UI flash before auth check completes
 */

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface AuthGuardProps {
  children: ReactNode;
  redirectPath?: string; // Optional redirect path
}

/**
 * Authenticated user shape
 */
interface AuthUser {
  id: string;
  name: string;
  role: string;

  // ✅ FIXED: replaced `any` with `unknown`
  [key: string]: unknown;
}

interface AuthResponse {
  success: boolean;
  user?: AuthUser;
}

export default function AuthGuard({
  children,
  redirectPath = "/login",
}: AuthGuardProps) {
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/me", {
          credentials: "include",
        });

        // Handle non-OK responses (important for Vercel edge cases)
        if (!res.ok) {
          router.replace(redirectPath);
          return;
        }

        const data: AuthResponse = await res.json();

        if (data.success && data.user) {
          setAuthenticated(true);
        } else {
          router.replace(redirectPath);
        }
      } catch (err: unknown) {
        console.error("Auth check failed:", err);
        router.replace(redirectPath);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [router, redirectPath]);

  // Prevent UI flicker during auth check
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-sm text-slate-500">
        Loading...
      </div>
    );
  }

  // While redirecting, render nothing
  if (!authenticated) return null;

  return <>{children}</>;
}