// hooks/useAuth.ts
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const useAuth = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.json())
      .then(data => {
        if (!data.success) router.push("/login");
        else setUser(data.user);
      })
      .finally(() => setLoading(false));
  }, []);

  return { user, loading };
};