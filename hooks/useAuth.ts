// hooks/useAuth.ts
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}

interface MeResponse {
  success: boolean;
  user?: User;
  message?: string;
}

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchUser = async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data: MeResponse = await res.json();

        if (!isMounted) return;

        if (!data.success) {
          router.push("/login");
        } else {
          setUser(data.user!);
        }
      } catch (err) {
        console.error("Error fetching user:", err);
        router.push("/login");
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchUser();

    return () => {
      isMounted = false;
    };
  }, [router]);

  return { user, loading };
};